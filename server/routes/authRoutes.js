import express from "express";
import {
  isUserAuthenticated,
  login,
  logout,
  register,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// Endpoints Routes - Register, Login, Logout
// --------   /api/auth/register   --------
authRouter.post("/register", register);

// --------   /api/auth/login   --------
authRouter.post("/login", login);

// --------   /api/auth/logout   --------
authRouter.post("/logout", logout);

// --------   /api/auth/send-verify-otp   --------
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

// --------   /api/auth/verify-account   --------
authRouter.post("/verify-account", userAuth, verifyEmail);

// --------   /api/auth/is-auth   --------
authRouter.post("/is-auth", userAuth, isUserAuthenticated);
// This route serves as an authentication status checker.
// userAuth middleware will run and it will give {success: true} only if we are using correct token
// isUserAuthenticated will work only when userAuth will be passed and isUserAuthenticated will only show a {success: true}

export default authRouter;
