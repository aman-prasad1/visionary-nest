import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if ([fullname, email, username, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    if (!req.file) {
        throw new ApiError(400, "Avatar file is required");
    }

    // The `uploadOnCloudinary` utility should only receive the folder name, not the full path.
    const avatar = await uploadOnCloudinary(req.file, "avatars");

    if (!avatar || !avatar.url) {
        throw new ApiError(500, "Avatar upload failed on the server.");
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar: {
            public_id: avatar.public_id,
            // Use `secure_url` for HTTPS and consistency. The old code used `url`.
            public_url: avatar.secure_url,
        },
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Return the full user object for consistency with the login response.
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // finding user with given username or email
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
  });

  if (!user) {
      throw new ApiError(404, "User not found");
  }

  // validating password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  const loggedUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedUser, accessToken, refreshToken }, "User logged in successfully")
    );

});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true });

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});
