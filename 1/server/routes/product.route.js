import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
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
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Product Id" });
    }
    res
      .status(200)
      .json({ success: true, data: product, message: "Product updated" });
  } catch (error) {
    console.log(`Error: ${error.message}`);

    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
