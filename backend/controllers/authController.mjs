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
      return res.json({ message: "Name, email and password are required." });
    }
    email = String(email).trim().toLowerCase();

    //additional password strength check
    if (password.length < 6) {
      return res.json({ message: "Password must be at least 6 characters." });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ message: "User already exists with this email." });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    // Create user (do not return password)
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: "user" //default role
    });

    // Return minimal safe payload
    return res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.json({ message: "Server error" });
  }
};

// -------------------- LOGIN --------------------
// export const login = async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and password are required.",
//       });
//     }

//     email = String(email).trim().toLowerCase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "Invalid credentials." });
//     }

//     // 🔒 BLOCK CHECK
//     if (user.isBlocked) {
//       return res.status(403).json({
//         success: false,
//         message: "You are blocked by admin",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials." });
//     }

//     // 🔑 JWT WITH ROLE
//     const payload = {
//       id: user._id,
//       role: user.role,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // 🔥 KEY
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.json({ success: false, message: "Server error" });
//   }
// };
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Blocked by admin"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 🔥 TOKEN ME ROLE BHEJNA
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role   // 👈 ADMIN / USER
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// --------------------CLIENT PROFILE --------------------
// controllers/authController.js (or controllers/userController.js)
export const profile = async (req, res) => {
  try {
    // Ensure auth middleware set req.userID
    // User.findById(req.userID):queries MongoDB for the user document whose _id matches req.userID.        // req.userID was already set by earlier middleware (e.g. JWT verification). If it isn’t set the query will be invalid or return null
    const userId = req.userID;
    if (!userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Find user and exclude sensitive fields
    const user = await User.findById(userId).select("-password -__v"); // exclude password and mongoose version key

    if (!user) {
      return res
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Profile error:", err);
    // Return generic message to client; log full error on server
    return res.json({ success: false, message: "Server error" });
  }
};

//----------update profile-----------
export const updateProfile=async(req,res)=>{
  try {
    const{name,email,address}=req.body;

    const user=await User.findById(req.userID);
    if(!user) return res.json("User not found");

    user.name=name || user.name;
    user.email=email || user.email;
    user.address=address || user.address;

    await user.save();

    res.json(user);
  } catch (error) {
    res.json("Server Error....");
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

