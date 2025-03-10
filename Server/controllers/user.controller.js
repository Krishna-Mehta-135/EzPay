import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {registerUserSchema} from "../validation/user.validation.js";
import zod from "zod";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Account } from "../models/user.model.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        console.log("JWT Secret in Token Generation:", process.env.JWT_SECRET);


        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        console.error("❌ Token Generation Error:", error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const signup = asyncHandler(async (req, res) => {
    const {username, email, fullName, password} = req.body;
    console.log(username);
    
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

    console.log("Created Account:", account);

    const token = jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET
    );

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    res.json({
        message: "User created successfully",
        token: token,
    });
});

const signin = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required to login");
    }
    if (!password) {
        throw new ApiError(400, "Password is required to login");
    }

    // Find user by email or username
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    // If user does not exist
    if (!user) {
        throw new ApiError(400, "Invalid username or email");
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Incorrect password");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Get user details without sensitive fields
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Cookie options
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: "Strict",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken,
        }, "User logged in successfully"));
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
