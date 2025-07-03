import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-black text-2xl text-red-600 tracking-widest drop-shadow">SPORTSFLIX</Link>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/teams" className="text-white hover:text-red-500 font-semibold transition">Teams</Link>
          <Link to="/matches" className="text-white hover:text-red-500 font-semibold transition">Matches</Link>
          <Link to="/attendance" className="text-white hover:text-red-500 font-semibold transition">Attendance</Link>
          <Link to="/stats/player/1" className="text-white hover:text-red-500 font-semibold transition">My Stats</Link>
          <Link to="/profile/1" className="text-white hover:text-red-500 font-semibold transition">Profile</Link>
          <Link to="/login" className="text-white hover:text-red-500 font-semibold transition">Login</Link>
          <div className="ml-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
            <span className="text-white font-bold">U</span>
          </div>
        </div>
        {/* Hamburger icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/90 z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/teams" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>Teams</Link>
          <Link to="/matches" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>Matches</Link>
          <Link to="/attendance" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>Attendance</Link>
          <Link to="/stats/player/1" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>My Stats</Link>
          <Link to="/profile/1" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/login" className="text-white text-2xl font-semibold hover:text-red-500" onClick={() => setMenuOpen(false)}>Login</Link>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <button
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 