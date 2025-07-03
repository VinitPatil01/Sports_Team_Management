import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80" alt="sports bg" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">Welcome to <span className="text-red-600">SportsFlix</span></h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">Manage your teams, matches, attendance, and stats with a beautiful, modern platform inspired by Netflix. Join now and elevate your sports management experience!</p>
        <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-xl shadow-lg transition">Get Started</Link>
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-64 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold mb-2">Team Management</h2>
            <p className="text-gray-200">Create, edit, and manage teams with ease.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-64 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold mb-2">Match Scheduling</h2>
            <p className="text-gray-200">Organize matches and track results.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-64 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold mb-2">Attendance & Stats</h2>
            <p className="text-gray-200">Monitor attendance and player performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 