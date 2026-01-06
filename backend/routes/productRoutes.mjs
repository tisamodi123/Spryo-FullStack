import express from "express";
import { addReview, getProducts } from "../controllers/productController.mjs";
import Product from "../models/Product.mjs";
import {authMiddleware} from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Drink Not Found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: "Server Error" });
  }
});

router.post("/:id/reviews", authMiddleware, addReview);

export default router;
