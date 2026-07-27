import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
