import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    // Personal
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },

    // Business
    firmName: { type: String, required: true },
    experience: { type: String, required: true },
    investment: { type: String, required: true },
    area: { type: String, required: true },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Distributor ||
  mongoose.model("Distributor", distributorSchema);
