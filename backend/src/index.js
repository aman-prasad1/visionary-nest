import { connectDB } from './db/index.js';
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});


const PORT = parseInt(process.env.PORT, 10) || 5000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    })
})
.catch((error) => {
    console.error("MongoDB connection Failed:", error);
    process.exit(1);
})