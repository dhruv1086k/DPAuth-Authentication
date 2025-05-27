import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("signup");

  //   form data state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stateChange = () => {
    setState(`${state === "signup" ? "signin" : "signup"}`);
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true; // for sending cookies with the request
      if (state === "signup") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        }); // {data} will store the data coming from this endpoint

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        }); // {data} will store the data coming from this endpoint

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

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

        {/* Main Form Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl mb-4 shadow-lg">
              <FaUserAlt className="text-white text-xl" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              {state === "signup" ? "Join Us Today" : "Welcome Back"}
            </h1>
            <p className="text-purple-200/80 text-sm">
              {state === "signup"
                ? "Start your journey with us"
                : "Sign in to continue your journey"}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state === "signup" && (
              // Full Name Input
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUserAlt className="h-5 w-5 text-purple-300 group-focus-within:text-purple-100 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:bg-white/10"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IoMail className="h-5 w-5 text-purple-300 group-focus-within:text-purple-100 transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:bg-white/10"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-100 transition-colors duration-300" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 hover:bg-white/10"
                />
              </div>
            </div>

            {state !== "signup" && (
              // Forgot Password Link
              <div className="text-left">
                <button
                  type="button"
                  className="text-purple-300 hover:text-white text-sm transition-colors duration-300 hover:underline decoration-purple-300"
                  onClick={() => navigate("/reset-password")}
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600 hover:via-indigo-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden group">
              <span className="relative z-10">
                {state === "signup" ? "Create Account" : "Sign In"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            {/* Toggle State Link */}
            <div className="text-center pt-4">
              {state === "signup" ? (
                <span className="text-purple-200 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => stateChange()}
                    className="text-white font-medium hover:text-purple-300 transition-colors duration-300 underline decoration-purple-400 underline-offset-2 hover:decoration-white"
                  >
                    Sign in here
                  </button>
                </span>
              ) : (
                <span className="text-purple-200 text-sm">
                  New to our platform?{" "}
                  <button
                    type="button"
                    onClick={() => stateChange()}
                    className="text-white font-medium hover:text-purple-300 transition-colors duration-300 underline decoration-purple-400 underline-offset-2 hover:decoration-white"
                  >
                    Create account
                  </button>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
