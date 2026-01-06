import Order from "../models/Order.mjs";

export const createOrder = async (req, res) => {
  try {
    const { items, total, address } = req.body;

    // 🔥 AUTH MIDDLEWARE SE USER ID AATI HAI
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const order = await Order.create({
      userId,      //referring to the authenticated user
      items,
      total,
      address,
      status: "Placed"
    });

    return res.json({
      success: true,
      orderId: order._id
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
