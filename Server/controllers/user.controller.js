import {ApiError} from "../../../Videotube/Server/src/utils/ApiError";
import {User} from "../models/user.model";
import {asyncHandler} from "../utils/asynHandler";
import {registerUserSchema} from "../validation/user.validation";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generationg tokens");
    }
};

const signup = asyncHandler(async (req, res) => {
    const {username, email, fullname, password} = req.body;

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

    const user = await User.create(username, email, fullname, password);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200, createduser, "User registered sucessfully"));
});

const signin = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "username or email  are required to login");
    }
    if (!password) {
        throw new ApiError(400, "Password is required to login");
    }

    const user = await User.findOne({
        $or: [{username}, {email}],
    });

    const isPasswordValid = user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(404, "Password is incorrect");
    }
    //access and refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken,
            },
            "User logged in successfully"
        )
    );
});

export {
    signup,
    signin
}