import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

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

// auth routes
app.use("/api/auth", authRouter);

// user routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
