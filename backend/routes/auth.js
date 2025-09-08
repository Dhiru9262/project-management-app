// backend/routes/auth.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Student login route
router.get(
  "/google/student",
  (req, res, next) => {
    req.session.role = "student";
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Teacher login route
router.get(
  "/google/teacher",
  (req, res, next) => {
    req.session.role = "teacher";
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/google/failure",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // ✅ Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set JWT in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/dashboard`);
  }
);

// Failure route
router.get("/google/failure", (req, res) => {
  res
    .status(401)
    .json({ success: false, message: "Google authentication failed" });
});

export default router;
