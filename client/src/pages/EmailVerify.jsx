import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);
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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  //   redirect user to home on revisiting verify-email page
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-16 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
      <div
        className="absolute top-64 right-24 w-3 h-3 bg-teal-400 rounded-full animate-bounce opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-96 left-32 w-5 h-5 bg-cyan-400 rounded-full animate-bounce opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 right-16 w-2 h-2 bg-emerald-500 rounded-full animate-bounce opacity-70"
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

        <form
          onSubmit={onSubmitHandler}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 w-full max-w-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500"
        >
          {/* Header Section */}
          <div className="text-center mb-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl mb-6 shadow-lg">
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
                  d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-3">
              Verify Your Email
            </h1>
            <p className="text-emerald-200/80 text-lg leading-relaxed">
              We sent a 6-digit verification code to your email address. Enter
              it below to verify your account.
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
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white text-center text-2xl font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 hover:bg-white/20 group-hover:border-emerald-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
            </div>
            <p className="text-center text-emerald-300/60 text-sm mt-4">
              Paste your code or enter each digit individually
            </p>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/50 relative overflow-hidden group cursor-pointer">
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
              <span>Verify Email Address</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
