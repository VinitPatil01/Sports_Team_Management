import React from "react";

const PlayerAttendancePage = () => {
  // Placeholder data
  const attendance = [
    { date: "2024-07-01", status: "Present" },
    { date: "2024-07-10", status: "Absent" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">My Attendance</h2>
        <ul>
          {attendance.map((a, idx) => (
            <li key={idx} className="border-b border-white/10 py-2 flex justify-between items-center text-white">
              <span>{a.date}</span>
              <span className={a.status === "Present" ? "text-green-400" : "text-red-400"}>{a.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerAttendancePage; 