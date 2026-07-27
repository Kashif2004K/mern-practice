import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const port = 5000;

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please proide all the fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, message: newProduct });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: true, message: "Server Error" });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
