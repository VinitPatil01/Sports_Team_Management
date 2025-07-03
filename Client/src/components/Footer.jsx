import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur border-t border-white/10 py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span className="font-black text-xl text-red-600 tracking-widest">SPORTSFLIX</span>
          <span className="ml-2">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex space-x-6 text-sm">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/teams" className="hover:text-red-500 transition">Teams</Link>
          <Link to="/matches" className="hover:text-red-500 transition">Matches</Link>
          <Link to="/attendance" className="hover:text-red-500 transition">Attendance</Link>
          <Link to="/profile/1" className="hover:text-red-500 transition">Profile</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 