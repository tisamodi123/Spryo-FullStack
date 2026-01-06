import express from "express";
import User from "../models/userModel.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import adminMiddleware from "../middleware/adminMiddleware.mjs";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, users });
});

router.post("/users/:id/toggle", authMiddleware, adminMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ success: true });
});

export default router;
