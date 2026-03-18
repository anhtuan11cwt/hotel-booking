import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Xin chào từ máy chủ");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
