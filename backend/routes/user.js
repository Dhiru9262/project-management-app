// backend/routes/user.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected route
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;
