// backend/controllers/adminController.mjs
import User from "../models/userModel.mjs";
import Product from "../models/Product.mjs";
import Order from "../models/Order.mjs";


// GET all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// BLOCK / UNBLOCK user
// export const toggleUserBlock = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     res.json({ success: true, isBlocked: user.isBlocked });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// -----admin-----
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Revenue (Delivered / completed orders ka total sum)
    const deliveredOrders = await Order.find({ status: { $in: ["Delivered", "Shipped", "Placed", "Packed"] } });
    const totalRevenue = deliveredOrders.reduce((acc, item) => acc + (Number(item.total) || 0), 0);

    // 2. Counts
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    // 3. Recent Orders
    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts
      },
      recentOrders: recentOrders || []
    });
  } catch (error) {
    console.error("Admin stats fetch error:", error);
    res.status(500).json({ success: false, message: "Stats fetch failed: " + error.message });
  }
};