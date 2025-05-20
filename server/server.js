import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Endpoints
app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
