import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey123");

    if (decoded.id === "admin_super_id") {
      req.user = {
        _id: "admin_super_id",
        name: decoded.name || "Spryo Admin",
        email: decoded.email || "admin@gmail.com",
        role: "admin",
      };
      req.userID = "admin_super_id";
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; 
    req.userID = user._id.toString();
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
