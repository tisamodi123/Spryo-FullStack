// backend/models/userModel.mjs
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", userSchema);
