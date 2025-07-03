import React from "react";

const TeamStatsPage = () => {
  // Placeholder data
  const stats = {
    goals: 20,
    assists: 15,
    fouls: 8,
    minutesPlayed: 1800,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Team Stats</h2>
        <ul className="space-y-4">
          <li className="flex justify-between text-white text-lg"><span>Goals:</span> <span>{stats.goals}</span></li>
          <li className="flex justify-between text-white text-lg"><span>Assists:</span> <span>{stats.assists}</span></li>
          <li className="flex justify-between text-white text-lg"><span>Fouls:</span> <span>{stats.fouls}</span></li>
          <li className="flex justify-between text-white text-lg"><span>Minutes Played:</span> <span>{stats.minutesPlayed}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default TeamStatsPage; 