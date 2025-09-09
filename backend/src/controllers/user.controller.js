import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


export const getMyDetails = asyncHandler(async(req, res) => {
    const userId = req?.user?._id;

    const user = await User.findById(userId).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, {user}, "User fetched successfully")
        )
})

export const getUserDetails = asyncHandler(async(req, res) => {
    const userId = req.params.id;
    
    const user = await User.findById(userId).select("-password -refreshToken");

    if(!user) {
        throw new ApiError(404, "User Not Found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {user}, "User fetched successfully")
        )
})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const body = req?.body;
    const userId = req.user._id;
    const avatarFile = req.file;

    const user = await User.findById(userId);
    
    if(body?.fullname && body.fullname.trim() !== "") {
        user.fullname = body.fullname;
    }
    if(body?.bio && body.bio.trim() !== "") {
        user.bio = body.bio;
    }

    if(!avatarFile) {
        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, null, "Profile updated")
            )
    }

    // changing avatar file

    const oldAvatarPublicId = user.avatar.public_id;

    const newAvatar = await uploadOnCloudinary(avatarFile, "avatars"); // uploading new avatar file

    if(!newAvatar) {
        throw new ApiError(500, "Something went wrong while updating avatar");
    }

    user.avatar.public_id = newAvatar.public_id;
    user.avatar.public_url = newAvatar.secure_url;
    await user.save(); // saving new avatar in user model

    // deleting old avatar from cloudinary
    deleteFromCloudinary(oldAvatarPublicId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "User updated")
        )
})

export const changeProfilePassword = asyncHandler(async(req, res) => {
    const { currentPassword, newPassword, newConfirmPassword } = req.body;

    if([newPassword, newConfirmPassword].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if(newPassword !== newConfirmPassword) {
        throw new ApiError(400, "New password and confirm password should be same");
    }

    if(newPassword.length < 8) {
        throw new ApiError(400, "Password must contains 8 characters");
    }

    const user = await User.findById(req.user._id);
    const passwordCorrect = await user.isPasswordCorrect(currentPassword);
    if(!passwordCorrect) {
        throw new ApiError(400, "Wrong Password");
    }

    user.password = newPassword;
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Password Updated Successfully")
        )
})