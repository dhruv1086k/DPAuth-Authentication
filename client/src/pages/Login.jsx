import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("signup");

  const stateChange = () => {
    setState(`${state === "signup" ? "signin" : "signup"}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-purple-200 flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2">
          <img src={assets.logo} alt="" className="w-28 sm:w-32" />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {state === "signup" ? "Create account" : "Login"}
          </h1>
          <p className="text-gray-400">
            {state === "signup"
              ? "Create your account"
              : "Login to your account"}
          </p>
        </div>
        <form action="">
          <div className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"></div>
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* <Lock className="h-5 w-5 text-gray-400" /> */}
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign Up Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => stateChange()}
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                >
                  Login here
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
