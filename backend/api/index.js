import { connectDB } from '../src/db/index.js';
import { app } from '../src/app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

// Initialize database connection for serverless
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

// Vercel serverless function handler
export default async (req, res) => {
    try {
        await initializeDatabase();
        return app(req, res);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
};
