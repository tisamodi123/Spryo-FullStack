import User from "../models/userModel.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../models/Order.mjs";

// --------------------SIGNUP --------------------
export const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required." });
    }
    email = String(email).trim().toLowerCase();

    // Block any attempt to signup as admin
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@gmail.com").toLowerCase();
    if (
      email === adminEmail ||
      email.startsWith("admin@") ||
      email.includes("admin") ||
      String(name).toLowerCase().includes("admin")
    ) {
      return res.status(403).json({
        success: false,
        forbidden: true,
        message: "Registration with administrative identities is strictly forbidden. This incident has been logged.",
      });
    }

    // Additional password strength check
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists with this email." });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    // Create user (strictly "user" role)
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: "user"
    });

    // Generate JWT token for immediate auto-login
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Return safe payload
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = String(email).trim().toLowerCase();
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@gmail.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin@123";

    // Strict verified Admin credentials check from environment
    if (email === adminEmail && password === adminPassword) {
      await User.updateOne({ email: adminEmail }, { role: "admin" }).catch(() => {});
      const adminToken = jwt.sign(
        { id: "admin_super_id", role: "admin", name: "Spryo Admin", email: adminEmail },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };
      res.cookie("token", adminToken, cookieOptions);
      res.cookie("adminToken", adminToken, cookieOptions);

      return res.json({
        success: true,
        message: "Admin access granted",
        token: adminToken,
        user: {
          id: "admin_super_id",
          name: "Spryo Admin",
          email: adminEmail,
          role: "admin",
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Blocked by admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Role check: Only the actual admin email can have admin role
    const roleToUse = user.email.toLowerCase() === adminEmail ? "admin" : "user";
    if (user.role !== roleToUse) {
      user.role = roleToUse;
      await user.save().catch(() => {});
    }

    // JWT WITH ROLE & USER DATA
    const token = jwt.sign(
      { id: user._id, role: roleToUse, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Cookie options for secure session
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie("token", token, cookieOptions);
    if (roleToUse === "admin") {
      res.cookie("adminToken", token, cookieOptions);
    }

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: roleToUse,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- LOGOUT --------------------
export const logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  res.clearCookie("token", cookieOptions);
  res.clearCookie("adminToken", cookieOptions);
  return res.json({ success: true, message: "Logged out successfully" });
};

// --------------------CLIENT PROFILE --------------------
export const profile = async (req, res) => {
  try {
    const userId = req.userID;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (userId === "admin_super_id") {
      return res.status(200).json({
        success: true,
        user: {
          id: "admin_super_id",
          name: "Spryo Admin",
          email: "admin@gmail.com",
          role: "admin",
          address: "Spryo Beverages Headquarters",
        },
      });
    }

    // Find user and exclude sensitive fields
    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//----------update profile-----------
export const updateProfile = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (req.userID === "admin_super_id") {
      return res.json({
        success: true,
        user: {
          id: "admin_super_id",
          name: name || "Spryo Admin",
          email: email || "admin@gmail.com",
          role: "admin",
          address: address || "Spryo Beverages Headquarters",
        },
      });
    }

    const user = await User.findById(req.userID);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;

    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//----------change password------------

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userID);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Old password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userID }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

