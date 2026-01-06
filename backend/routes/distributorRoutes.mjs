import express from "express";
import connectDB from "../config/db.mjs";
import Distributor from "../models/Distributor.mjs";

const router = express.Router();

// POST /api/distributor
router.post("/distributor", async (req, res) => {
  try {
    await connectDB();

    const { personal, business } = req.body;

    const distributor = await Distributor.create({
      name: personal.name,
      email: personal.email,
      phone: personal.phone,
      city: personal.city,
      firmName: business.firmName,
      experience: business.experience,
      investment: business.investment,
      area: business.area,
    });

    res.status(201).json({
      success: true,
      distributor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
