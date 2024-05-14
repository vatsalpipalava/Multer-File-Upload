import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const fileUpload = asyncHandler(async (req, res) => {
    const { email, fullName } = req.body;

    // if(user.email || user.fullName) {
    //     throw new ApiError()
    // }

    if (
        [email, fullName].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required.");
    }

    let avatarLocalPath;

    if (req.file) {
        avatarLocalPath = req.file.path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const existedUser = await User.findOne({
        $or: [{ email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with email already exists.");
    }

    const avatar = `${process.env.BACKEND_URL}/${avatarLocalPath.replace(/\\/g, "/")}`;

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const user = await User.create({
        email,
        fullName,
        avatar,
    });

    if (!user) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user."
        );
    }

    return res
        .status(201)
        .json(new ApiResponse(200, user, "User Registered Successfully."));
});

const allUser = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users.length === 0) {
        throw new ApiError(404, "User Not Found");
    }

    setTimeout(() => {
        return res
            .status(200)
            .json(new ApiResponse(200, users, "All users fetch successfully."));
    }, 5000);
});

export { fileUpload, allUser };
