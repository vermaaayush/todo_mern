import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from 'express-session';

// Initialize app
const app = express();

// Enable CORS with credentials
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Your frontend URL, e.g. 'https://easydocbyaayush.netlify.app'
    credentials: true                 // Ensure credentials (cookies) are sent with requests
}));

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// Trust proxies (important for Render to handle secure cookies)
app.set('trust proxy', 1);

// Use session management
app.use(session({
    secret: process.env.SESSION_SECRET || '11223344556677889900',  // Store in env variables in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,          // Prevents JavaScript from accessing cookies
        secure: true,            // Ensures cookies are only sent over HTTPS (important for production)
        sameSite: 'None',        // Required for cross-origin cookies
        maxAge: 1000 * 60 * 60,  // Session expiration (optional, e.g., 1 hour)
    }
}));

// Import routes
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

// Use routes
app.use("/users", userRouter);
app.use("/todo", todoRouter);

// Export app
export { app };
