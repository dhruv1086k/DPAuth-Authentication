import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData, isLoggedin } = useContext(AppContext);

  const navigate = useNavigate();
  return (
    <div className="relative w-full flex flex-col items-center text-center px-4 py-16 overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
      <div
        className="absolute top-32 right-24 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-60 left-32 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-80 right-16 w-2 h-2 bg-purple-500 rounded-full animate-bounce opacity-70"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Profile Image Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse"></div>
            <div className="relative bg-white p-2 rounded-full shadow-2xl">
              <img
                src={assets.header_img}
                alt=""
                className="w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-xl transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
            {/* Floating Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-300/30 animate-spin-slow"></div>
          </div>
        </div>

        {/* Welcome Text Section */}
        <div className="mb-12 space-y-6">
          {/* Greeting */}
          <div className="inline-flex items-center justify-center space-x-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
            <span className="text-gray-700 text-lg font-medium">
              Hey {userData ? userData.name : "Developer"}!
            </span>
            <img
              src={assets.hand_wave}
              alt=""
              className="w-8 h-8 animate-waving"
            />
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            Welcome to our app
          </h2>

          {/* Description */}
          <div className="relative">
            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              Let's start with a quick product tour and we will have you up and
              running in no time!
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
          {isLoggedin ? (
            <button className="relative px-12 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden">
              Howdy😊
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="relative px-12 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-full hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes waving {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }
        .animate-waving {
          animation: waving 2s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;
