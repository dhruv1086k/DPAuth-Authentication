import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";

// ==================================== Controller function for User Register ====================================
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  //   checking for missing details
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    // Checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // hashing password before storing it to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // saving data in DB
    await user.save();

    // generating token for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    }); // creating the token using mongodb _id

    // setting token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // if env is production we will get true otherwise false
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ===================================== Controller function for User sign in ====================================
export const login = async (req, res) => {
  const { email, password } = req.body;

  //   checking for missing details
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    // checking if user exists
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // checking for correct password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    // generating token for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    }); // creating the token using mongodb _id

    // setting token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // if env is production we will get true otherwise false
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================== Controller function for User logout ====================================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // if env is production we will get true otherwise false
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
