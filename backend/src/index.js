import { connectDB } from './db/index.js';
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

// Validate required environment variables
const requiredEnvVars = [
    'MONGO_URI',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
    'ACCESS_TOKEN_EXPIRY',
    'REFRESH_TOKEN_EXPIRY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    console.error('Please check your .env file');
    process.exit(1);
}

// Initialize database connection
let dbConnected = false;

const initializeDatabase = async () => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }
};

// For Vercel serverless functions
export default async (req, res) => {
    try {
        await initializeDatabase();
        return app(req, res);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on PORT: ${process.env.PORT || 8000}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection Failed !!!", error);
        process.exit(1);
    });
}