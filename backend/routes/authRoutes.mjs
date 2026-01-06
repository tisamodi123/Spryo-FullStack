import express from "express";
import { signup, login, profile, updateProfile, changePassword, getUserOrders } from "../controllers/authController.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.put("/profile",authMiddleware,updateProfile);
router.put("/profile/change-password",authMiddleware,changePassword);
router.get("/orders",authMiddleware,getUserOrders);

export default router;
