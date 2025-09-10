import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { ApiError } from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            return reject(new ApiError(400, 'File buffer is missing'));
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder, // Correct: Just the folder name, not the full path
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

export { uploadOnCloudinary };