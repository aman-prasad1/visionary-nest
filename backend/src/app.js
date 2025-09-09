import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorMiddleware } from './middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: function (origin, callback) {
       
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            process.env.CORS_ORIGIN,
            'http://localhost:5173', // Vite dev server
            'http://localhost:3000', // Alternative dev port mat puchna kisliye diye hai agar koi aur port use kar raha ho toh usko bhi add karna padega
        ].filter(Boolean);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

// routes import
import testRouter from "./routes/test.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import portfolioRouter from "./routes/portfolio.routes.js";
import uploadRouter from "./routes/upload.route.js";
import chatbotRouter from "./routes/chatbot.route.js";

// assigning routes
app.use("/test", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/portfolios", portfolioRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/chat", chatbotRouter);

app.use(errorMiddleware);
export { app };
