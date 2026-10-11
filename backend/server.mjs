// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.mjs";
// import connectDB from "./config/db.mjs";
// import cookieParser from "cookie-parser";
// import productRoutes from "./routes/productRoutes.mjs";
// import orderRoutes from "./routes/orderRoutes.mjs";
// import distributorRoutes from "./routes/distributorRoutes.mjs";
// import adminRoutes from "./routes/adminRoutes.mjs";

// dotenv.config();
// connectDB(); 

// const app = express();

// // --- 1. Define allowed origins first ---
// const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

// // --- 2. Use CORS only ONCE with the correct logic ---
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like Postman or mobile apps)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api", distributorRoutes);
// app.use("/api/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.send("API is working properly");
// });

// const PORT = process.env.PORT || 2002;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );

// // module.exports = app;

// export default app;
// //do not use app.listen()

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
import mongoose from "mongoose";

dotenv.config();
connectDB(); 

const app = express();

// --- 1. Define CORS configuration ---
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, mobile apps, curl)
      if (!origin) return callback(null, true);
      // Always allow in development / local testing or match origins
      return callback(null, true);
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
app.use("/api/products",productRoutes);

app.get("/", (req, res) => {
  res.send("API is working properly");
});

let isConnected = false;

// serverless deployment
async function connectToMongoDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      isConnected = true;
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
//add middleware to handle serverless deployment
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});



export default app;
//do not use app.listen() for vercel

// Local testing ke liye (Optional)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 2002;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}