import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {registerUserSchema} from "../validation/user.validation.js";
import zod from "zod";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Account} from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        console.log("❌ User not found!");
        throw new ApiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return {accessToken, refreshToken};
};

const signup = asyncHandler(async (req, res) => {
    const {username, email, fullName, password} = req.body;

    const validationResult = registerUserSchema.safeParse(req.body);

    //validationResult .success property is coming from zod instead of apiError . When we safeparse zod gives an object with success true or false
    if (!validationResult.success) {
        return res.status(400).json({errors: validationResult.error.issues});
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}],
    });

    if (existingUser) {
        throw new ApiError(409, "Email or username already exists");
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullName: req.body.fullName,
    });
    const userId = user._id;

    //Create new account for the user
    const account = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: true, // Works only on HTTPS (set to false in development)
        sameSite: "Strict", // Helps prevent CSRF attacks
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    res.status(201).json({
        message: "User created successfully",
        user: createdUser,
        accessToken,
    });
});

const signin = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required to login");
    }
    if (!password) {
        throw new ApiError(400, "Password is required to login");
    }

    // Find user
    const user = await User.findOne({$or: [{username}, {email}]});
    if (!user) {
        throw new ApiError(400, "Invalid username or email");
    }

    // Validate password
    if (!(await user.isPasswordCorrect(password))) {
        throw new ApiError(400, "Incorrect password");
    }

    // Generate tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    // Cookie options
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: "Strict",
    };

    // Store only refreshToken in cookies
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: await User.findById(user._id).select("-password -refreshToken"),
                accessToken, // Access token in response (stored in memory on frontend)
            },
            "User logged in successfully"
        )
    );
});

const updateInformation = asyncHandler(async (req, res) => {
    const updateBody = zod.object({
        password: zod.string().optional(),
        fullName: zod.string().optional(),
        username: zod.string().optional(),
    });

    const {success} = updateBody.safeParse(req.body);
    if (!success) {
        throw new ApiError(411, "Error while updating information");
    }

    const user = await User.updateOne({_id: req.userId}, req.body);

    return res.status(201).json(new ApiResponse(200, user, "User updated successfully"));
});

const getUsers = asyncHandler(async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                email: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            _id: user._id,
        })),
    });
});

export {signup, signin, updateInformation, getUsers};
