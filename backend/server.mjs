import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.mjs";
import connectDB from "./config/db.mjs";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";
import distributorRoutes from "./routes/distributorRoutes.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";

dotenv.config();
connectDB(); 

const app = express();

// --- 1. Define allowed origins first ---
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

// --- 2. Use CORS only ONCE with the correct logic ---
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", distributorRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is working properly");
});

const PORT = process.env.PORT || 2002;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);