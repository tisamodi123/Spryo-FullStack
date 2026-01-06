import Product from "./models/Product.mjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as seedModule from "./seedProducts.mjs";

dotenv.config();

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.insertMany([
       {
      name: "Cola",
      price: 20,
      category: "cola",
      image: "/cola.png",
      description: "Classic refreshing cola drink."
    },
    {
      name: "lemon",
      price: 20,
      category: "lemon",
      image: "/lemon.png",
      description: "Lemon lime carbonated drink."
    },
    {
      name: "orange",
      price: 20,
      category: "orange",
      image: "/orange.png",
      description: "orange carbonated drink."
    },
    {
      name: "up",
      price: 20,
      category: "up",
      image: "/up.png",
      description: "Fresh up flavor juice."
    },
    ]);
    console.log("Products seeded");
    process.exit();
}

seed();