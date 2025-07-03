import React from "react";

const AttendancePage = () => {
  // Placeholder data
  const attendanceList = [
    { id: 1, player: "player1", status: "Present" },
    { id: 2, player: "player2", status: "Absent" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Attendance</h2>
        <form className="mb-8 flex gap-4 flex-col sm:flex-row">
          <input type="date" className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none" />
          <select className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none">
            <option>Team Alpha</option>
            <option>Team Beta</option>
          </select>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded transition duration-200">Get Attendance</button>
        </form>
        <ul>
          {attendanceList.map((a) => (
            <li key={a.id} className="border-b border-white/10 py-2 flex justify-between items-center text-white">
              <span>{a.player}</span>
              <span className={a.status === "Present" ? "text-green-400" : "text-red-400"}>{a.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendancePage; 