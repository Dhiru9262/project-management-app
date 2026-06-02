// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

// Local imports
import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express();

const isProd = process.env.NODE_ENV === "production";

// Trust Render/Vercel proxy so secure cookies work behind HTTPS termination
app.set("trust proxy", 1);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup for cookies (cross-site: Vercel frontend -> Render backend)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Session setup (needed for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // Cross-site cookies require SameSite=None + Secure in production
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//  Passport setup
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
