import axios from "axios";
import fs from "fs";
import FormData from "form-data";
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

    const avatarImageFileDTO = req.file;

    let avatarLocalPath;

    if (req.file) {
        avatarLocalPath = avatarImageFileDTO.path;
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

    // Upload to image storage server
    let externalAvatarUrl;
    try {
        const formData = new FormData();
        formData.append("file", fs.createReadStream(avatarLocalPath));

        const response = await axios.post(
            "http://localhost:5000/api/v1/images/upload",
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                withCredentials: true,
            }
        );

        externalAvatarUrl = response.data.url;
    } catch (error) {
        throw new ApiError(
            500,
            "Failed to upload avatar to image storage server."
        );
    } finally {
        // Cleanup local file
        try {
            await fs.promises.unlink(avatarLocalPath);
        } catch (unlinkError) {
            console.error(`Failed to delete local file: ${unlinkError}`);
        }
    }

    // const avatar = `${process.env.BACKEND_URL}/${avatarLocalPath.replace(/\\/g, "/")}`;

    // if (!avatar) {
    //     throw new ApiError(400, "Avatar file is required.");
    // }

    const user = await User.create({
        email,
        fullName,
        avatar: externalAvatarUrl,
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
