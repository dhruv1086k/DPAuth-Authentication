import express from "express";
import { login, logout, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Endpoints Routes - Register, Login, Logout
// --------   /api/auth/register   --------
authRouter.post("/register", register);
// --------   /api/auth/login   --------
authRouter.post("/login", login);
// --------   /api/auth/logout   --------
authRouter.post("/logout", logout);

export default authRouter;
