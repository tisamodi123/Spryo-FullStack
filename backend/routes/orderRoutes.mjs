import express from "express";
import Order from "../models/Order.mjs";
import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { createOrder } from "../controllers/orderController.mjs";

const router = express.Router();

router.post("/", authMiddleware, createOrder); 

// Place Order
router.post("/place", authMiddleware, async (req, res) => {
  try {
    console.log("USER ID:", req.userID);
    console.log("BODY:", req.body);

    const order = await Order.create({
      userId: req.userID,
      items: req.body.items,
      total: req.body.total,
    });

    res.json({ success: true, orderId: order._id });
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

export default router;
