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
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-purple-200 flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center space-x-2">
          <img
            src={assets.logo}
            alt=""
            className="w-28 sm:w-32"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl">
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
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-6">
            {state === "signup" && (
              // Full Name Input
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUserAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IoMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            {state !== "signup" && (
              // Forgot Password Link
              <div className="text-left">
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
                  onClick={() => navigate("/reset-password")}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Sign Up Button */}
            <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              {state === "signup" ? "Sign Up" : "Login"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              {state === "signup" ? (
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
              ) : (
                <span className="text-gray-400 text-sm">
                  New Register?{" "}
                  <button
                    type="button"
                    onClick={() => stateChange()}
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                  >
                    Sign Up here
                  </button>
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
