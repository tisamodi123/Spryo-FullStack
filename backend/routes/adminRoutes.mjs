import express from "express";
import User from "../models/userModel.mjs";
import Product from "../models/Product.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import adminMiddleware from "../middleware/adminMiddleware.mjs";

import { getDashboardStats } from "../controllers/adminController.mjs";



const router = express.Router();

//dashboard state route
router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);

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

// 1. Naya Product Add Karna
router.post("/products", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product Added!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Product Update Karna (Price/Stock)
router.put("/products/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Product Delete Karna
router.delete("/products/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
