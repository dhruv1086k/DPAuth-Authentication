import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true; // we have to send cookies with this request

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true; // so that we can send cookies
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUserdialog = () => {
    setDialogBoxOpen(!dialogBoxOpen);
  };

  return (
    <nav className="absolute z-20 top-0 w-full px-6 py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={assets.logo} alt="" className="w-28 sm:w-32" />
        </div>

        {userData ? (
          <div
            className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer relative"
            onClick={handleUserdialog}
          >
            {userData.name[0].toUpperCase()}
            <div
              className={`absolute top-0 right-0 z-10 text-black rounded pt-10 ${
                dialogBoxOpen ? "block" : "hidden"
              }`}
            >
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                {/* if user is already verified this will be hidden */}
                {!userData.isAccountVerified && (
                  <li
                    onClick={() => sendVerificationOtp()}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Login Button
          <button
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
