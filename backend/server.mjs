import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";
import distributorRoutes from "./routes/distributorRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Serverless DB Connection Middleware
let isConnected = false;
async function connectToMongoDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      isConnected = true;
      return;
    }
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}

app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});

// REST API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", distributorRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "SPRYO API is running" });
});

// Local / Server Entry
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 2002;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;