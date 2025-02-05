import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            //Index is set to true beacuse it will make searching easy and fast. It might be a little exprnsive.
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        fullName: {
            type: String,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },

        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema)