import express from "express";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
