import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
<<<<<<< HEAD
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
=======
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
>>>>>>> ac367c1 (Initial commit to new repo)
        console.log(`MongoDB connected !! DB_HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Error !!!");
        process.exit(1);
    }
}

export { connectDB };