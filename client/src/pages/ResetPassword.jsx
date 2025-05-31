import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState("");

  // Loading states
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;
      }
    });
  };

  // Progress Bar Component
  const ProgressBar = ({ isLoading }) => (
    <div
      className={`absolute top-0 left-0 w-full h-0.5 bg-white/20 overflow-hidden ${
        isLoading ? "block" : "hidden"
      }`}
    >
      <div className="h-full bg-gradient-to-r from-rose-400 to-pink-400 animate-pulse w-full origin-left transform animate-[loading_1.5s_ease-in-out_infinite]"></div>
    </div>
  );

  //   Email handler form
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      setIsEmailLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        {
          email,
        }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsEmailLoading(false);
    }
  };

  //   otp handler form
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      setIsOtpLoading(true);
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));
      setIsOtpSubmitted(true);
    } catch (err) {
      toast.error("Error verifying OTP");
    } finally {
      setIsOtpLoading(false);
    }
  };

  //   new password handler
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      setIsPasswordLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Progress Bar */}
      <ProgressBar
        isLoading={isEmailLoading || isOtpLoading || isPasswordLoading}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-16 w-4 h-4 bg-rose-400 rounded-full animate-bounce opacity-60"></div>
      <div
        className="absolute top-64 right-24 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-96 left-32 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 right-16 w-2 h-2 bg-rose-500 rounded-full animate-bounce opacity-70"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center space-x-2">
            <img
              src={assets.logo}
              alt=""
              className="w-28 sm:w-32 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        {/* Enter Email Form */}
        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all duration-500"
          >
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mb-3">
                Reset Password
              </h1>
              <p className="text-rose-200/80 text-lg leading-relaxed">
                Enter your registered email address and we'll send you a
                verification code
              </p>
            </div>

            {/* Email Input */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <img
                    src={assets.mail_icon}
                    alt=""
                    className="w-5 h-5 opacity-60 group-focus-within:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-rose-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-300 hover:bg-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isEmailLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isEmailLoading}
              className={`w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-rose-500/50 relative overflow-hidden group cursor-pointer ${
                isEmailLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2 text-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>{isEmailLoading ? "Sending..." : "Send Reset Code"}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </form>
        )}

        {/* OTP Input Form */}
        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitOtp}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all duration-500"
          >
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mb-3">
                Enter Verification Code
              </h1>
              <p className="text-rose-200/80 text-lg leading-relaxed">
                We sent a 6-digit code to your email. Enter it below to
                continue.
              </p>
            </div>

            {/* OTP Input Section */}
            <div className="mb-10">
              <div
                className="flex justify-center gap-3 mb-2"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="relative group">
                      <input
                        type="text"
                        maxLength="1"
                        required
                        disabled={isOtpLoading}
                        ref={(e) => (inputRefs.current[index] = e)}
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`w-14 h-14 max-sm:w-10 max-sm:h-10 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white text-center text-2xl font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-300 hover:bg-white/20 group-hover:border-rose-300 ${
                          isOtpLoading ? "opacity-50" : ""
                        }`}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))}
              </div>
              <p className="text-center text-rose-300/60 text-sm mt-4">
                Paste your code or enter each digit individually
              </p>
            </div>

            {/* Submit Button */}
            <button
              disabled={isOtpLoading}
              className={`w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-rose-500/50 relative overflow-hidden group cursor-pointer ${
                isOtpLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2 text-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{isOtpLoading ? "Verifying..." : "Verify Code"}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </form>
        )}

        {/* New Password Form */}
        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all duration-500"
          >
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mb-3">
                Create New Password
              </h1>
              <p className="text-rose-200/80 text-lg leading-relaxed">
                Enter your new password below to complete the reset process
              </p>
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <img
                    src={assets.lock_icon}
                    alt=""
                    className="w-5 h-5 opacity-60 group-focus-within:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-rose-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-300 hover:bg-white/10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isPasswordLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isPasswordLoading}
              className={`w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-rose-500/50 relative overflow-hidden group cursor-pointer ${
                isPasswordLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2 text-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {isPasswordLoading ? "Resetting..." : "Reset Password"}
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
