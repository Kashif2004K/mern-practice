import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";

import { connectDB } from "./config/db.js";

import router from "./routes/product.route.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
});
