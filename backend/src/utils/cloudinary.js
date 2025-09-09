import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { ApiError } from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new ApiError(400, 'File buffer is missing'));
        }
        
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) reject(error);
                else {
                    // Normalize the response shape for consistent usage across controllers
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                        bytes: result.bytes,
                        format: result.format
                    });
                }
            }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
};

const deleteFromCloudinary = async (public_id) => {
    if (!public_id) return null;
    try {
        // Deleting image from cloudinary
        const response = await cloudinary.uploader.destroy(public_id);
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };