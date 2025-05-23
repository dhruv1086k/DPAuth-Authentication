import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Robot Icon */}
        <div className="mb-8 flex justify-center">
          <img
            src={assets.header_img}
            alt=""
            className="w-36 h-36 rounded-full mb-6"
          />
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-gray-600 text-lg mb-4 flex items-center justify-center space-x-2">
            <span>Hey Developer!</span>
            <img src={assets.hand_wave} alt="" className="w-8 h-8" />
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to our app
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
            Let's start with a quick product tour and we will have you up and
            running in no time!
          </p>
        </div>

        {/* Get Started Button */}
        <button className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
