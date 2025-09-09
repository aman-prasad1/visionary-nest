import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadFile = asyncHandler(async (req, res) => {
  const file = req.file;
  const { folder } = req.body;

  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  // Validate file type and size
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    throw new ApiError(400, "Invalid file type. Only images and PDFs are allowed.");
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new ApiError(400, "File size too large. Maximum size is 5MB.");
  }

  // Upload to Cloudinary
  const uploadResult = await uploadOnCloudinary(file, folder || 'general');

  if (!uploadResult) {
    throw new ApiError(500, "Failed to upload file to cloud storage");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "File uploaded successfully", {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        size: uploadResult.bytes
      })
    );
});