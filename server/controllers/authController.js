import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import transporter from "../config/nodeMailer.js";

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

    // Sending a welcome mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to DPAuth",
      text: `Your account has been successfully created using this email: ${email}
        You’re all set to start building secure and seamless authentication into your apps. If you ever need help or have questions, we’re just a message away.`,
    };

    await transporter.sendMail(mailOptions);

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

// =============================== Controller function for email verification OTP ================================
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    // userId is added to req.body using a middleware

    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)); // login to generate otp

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // expiry date of otp is 10 mins

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your DPAuth OTP Code",
      text: `Hi there,
        Your One-Time Password (OTP) is:
        ${otp}
        Use this code to verify your account. It’s valid for the next 10 minutes.
        If you didn’t request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent on your mail" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ============================= controller function for verifying verification OTP ==============================
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // checking for wrong otp
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // checking for expired otp
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true; // account will be verified after correct otp
    // resetting values
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// =============================== controller function for is user loggedin ==================================
export const isUserAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ============================== controller function for send password reset OTP ================================
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000)); // login to generate reset otp

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // expiry date of reset otp is 10 mins

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your DPAuth Password Reset OTP Code",
      text: `Hi there,
        Your One-Time Password (OTP) for resetting your password is:
        ${otp}
        Use this code to reset your account password. It’s valid for the next 10 minutes.
        If you didn’t request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset OTP sent on your mail",
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
