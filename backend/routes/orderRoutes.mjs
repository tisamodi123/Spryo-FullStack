import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Order from "../models/Order.mjs";
import User from "../models/userModel.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { createOrder } from "../controllers/orderController.mjs";
import adminMiddleware from "../middleware/adminMiddleware.mjs";

const router = express.Router();

router.post("/", authMiddleware, createOrder); 

// Place Order (supports authenticated user or guest checkout)
router.post("/place", async (req, res) => {
  try {
    let validUserId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey123");
        if (decoded?.id && decoded.id !== "admin_super_id" && mongoose.Types.ObjectId.isValid(decoded.id)) {
          validUserId = decoded.id;
        }
      } catch (e) {
        // Token error ignored, fallback to guest/existing user
      }
    }

    if (!validUserId && req.body.userId && mongoose.Types.ObjectId.isValid(req.body.userId)) {
      validUserId = req.body.userId;
    }

    if (!validUserId) {
      // Find an existing registered user or create/use a customer record
      const existingUser = await User.findOne({ role: "user" }) || await User.findOne();
      if (existingUser) {
        validUserId = existingUser._id;
      } else {
        const guestUser = await User.create({
          name: req.body.address?.fullName || "Guest Customer",
          email: req.body.address?.email || `guest_${Date.now()}@spryo.com`,
          password: "guest_checkout_secret",
          role: "user",
        });
        validUserId = guestUser._id;
      }
    }

    const rawItems = Array.isArray(req.body.items) ? req.body.items : [];
    const formattedItems = rawItems.map((item) => ({
      productId: String(item.productId || item._id || item.id || "prod_1"),
      name: item.name || "Craft Drink",
      qty: Number(item.qty || 1),
      price: Number(item.price || 0),
    }));

    const totalVal = Number(req.body.totalAmount || req.body.total || 0);

    const order = await Order.create({
      userId: validUserId,
      items: formattedItems,
      total: totalVal,
      address: req.body.address || {},
      status: "Placed",
    });

    res.json({ success: true, orderId: order._id, order });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Order failed",
    });
  }
});

//cancel order
router.post("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.userId.toString() !== req.userID)
      return res.status(403).json({ success: false, message: "Unauthorized" });

    if (order.status !== "Pending")
      return res.status(400).json({ success: false, message: "Cannot cancel processed order" });

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// My Orders
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userID }).sort({
      createdAt: -1,
    });

    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: "Cannot fetch orders" });
  }
});

// ----admin---
// 1. Saare orders get karne ke liye (Admin only)
router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Order status update karne ke liye
router.put("/status/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
