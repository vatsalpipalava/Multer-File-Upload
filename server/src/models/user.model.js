import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
