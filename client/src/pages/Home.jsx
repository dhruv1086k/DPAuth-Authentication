import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className='min-h-screen relative flex flex-col items-center justify-center bg-[url("/bg_img.png")] bg-cover bg-center'>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -top-48 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
