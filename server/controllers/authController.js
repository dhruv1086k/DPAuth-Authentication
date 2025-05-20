import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";

// Controller function for User Register
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
    const user = new userModel.create({
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
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Controller function for User sign in
export const login = async (req, res) => {
  const { email, password } = req.body;


};
