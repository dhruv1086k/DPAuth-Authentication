import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={assets.logo} alt="" className="w-28 sm:w-32" />
        </div>

        {/* Login Button */}
        <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
