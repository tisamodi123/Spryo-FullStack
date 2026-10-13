import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.adminToken) {
    token = req.cookies.adminToken;
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey123");

    if (decoded.id === "admin_super_id" || decoded.email === "admin@gmail.com" || decoded.role === "admin") {
      req.user = {
        _id: decoded.id || "admin_super_id",
        name: decoded.name || "Spryo Admin",
        email: decoded.email || "admin@gmail.com",
        role: "admin",
      };
      req.userID = String(decoded.id || "admin_super_id");
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.email === "admin@gmail.com" || user.role === "admin") {
      user.role = "admin";
    }

    req.user = user; 
    req.userID = user._id.toString();
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
