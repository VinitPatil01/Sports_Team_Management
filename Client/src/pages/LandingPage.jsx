import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import iplLogo from "../assets/ipl.png";
import liverpoolLogo from "../assets/liverpool.png";
import manUnitedLogo from "../assets/man_united.png";
import mumbaiIndiansLogo from "../assets/mumbai_indians.png";
import premierLeagueLogo from "../assets/premier_league.png";
import rcbLogo from "../assets/RCB.png";

const LandingPage = () => {
  useEffect(() => {
    if (window.location.hash === "#reload") {
      window.location.hash = ""; 
      window.location.reload();
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black relative overflow-hidden">
     
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80" alt="sports bg" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>
 
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">Welcome to <span className="text-red-600">SportsFlix</span></h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">Manage your teams, matches, attendance, and stats with a beautiful, modern platform. Join now and elevate your sports management experience!</p>
  
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-full max-w-2xl shadow-lg border border-white/20 mb-8">
          <h2 className="text-2xl font-bold mb-2 text-red-400">About SportsFlix</h2>
          <p className="text-gray-200">SportsFlix is your all-in-one sports team management platform. Whether you're a coach, player, or fan, our mission is to simplify team organization, match scheduling, and performance tracking with a beautiful, intuitive interface. Built for modern sports communities, by sports lovers.</p>
        </div>
        <Link to="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-xl shadow-lg transition">Get Started</Link>
      </div>
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
  
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-full max-w-3xl shadow-lg border border-white/20 mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">1. Register & Create Teams</h3>
            <p className="text-gray-200">Sign up and set up your teams in minutes. Invite players and assign roles easily.</p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">2. Schedule Matches</h3>
            <p className="text-gray-200">Organize matches, set dates and locations, and notify your team instantly.</p>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">3. Track Attendance & Stats</h3>
            <p className="text-gray-200">Mark attendance, record stats, and monitor player performance over time.</p>
          </div>
        </div>
      </div>
    
      <div className="relative z-10 w-full flex flex-col items-center mt-16 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide">Our Clients</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img src={iplLogo} alt="IPL" className="h-16 md:h-20 object-contain" />
          <img src={liverpoolLogo} alt="Liverpool" className="h-16 md:h-20 object-contain" />
          <img src={manUnitedLogo} alt="Man United" className="h-16 md:h-20 object-contain" />
          <img src={mumbaiIndiansLogo} alt="Mumbai Indians" className="h-16 md:h-20 object-contain" />
          <img src={premierLeagueLogo} alt="Premier League" className="h-16 md:h-20 object-contain" />
          <img src={rcbLogo} alt="RCB" className="h-16 md:h-20 object-contain" />
        </div>
      </div>
  
      <div className="relative z-10 w-full flex flex-col items-center mt-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide">Testimonials</h2>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          <div className="bg-white/10 rounded-xl p-6 text-white w-80 shadow-lg border border-white/20 flex flex-col items-center">
            <p className="italic mb-4">"SportsFlix made managing my cricket team a breeze. The UI is stunning and my players love it!"</p>
            <span className="font-bold text-red-400">— Priya, Coach</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-white w-80 shadow-lg border border-white/20 flex flex-col items-center">
            <p className="italic mb-4">"I can finally track my stats and attendance in one place. Highly recommended!"</p>
            <span className="font-bold text-red-400">— Rahul, Player</span>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-white w-80 shadow-lg border border-white/20 flex flex-col items-center">
            <p className="italic mb-4">"Our club's communication and organization has never been better."</p>
            <span className="font-bold text-red-400">— Sarah, Club Manager</span>
          </div>
        </div>
      </div>
  
      <div className="relative z-10 w-full flex flex-col items-center mb-8">
        <div className="flex gap-6 mb-4">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 text-2xl"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 text-2xl"><i className="fab fa-facebook"></i> Facebook</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 text-2xl"><i className="fab fa-instagram"></i> Instagram</a>
        </div>
        <Link to="/about" className="bg-white/10 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-lg shadow-lg border border-white/20 transition">Learn More About Us</Link>
      </div>
    </div>
  );
};

export default LandingPage; 