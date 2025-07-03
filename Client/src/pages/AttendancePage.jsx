import React, { useEffect, useState } from "react";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:5169";


function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const AttendancePage = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [playerAttendance, setPlayerAttendance] = useState([]);

 
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [teamAttendance, setTeamAttendance] = useState([]);
  const [viewPlayerId, setViewPlayerId] = useState("");
  const [viewPlayerAttendance, setViewPlayerAttendance] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    const payload = parseJwt(t);
    setRole(payload?.role || payload?.Role || null);
    setUserId(payload?.nameid || payload?.NameIdentifier || payload?.sub || null);
  }, []);

  useEffect(() => {
    if (role === "Player" && token) {
      (async () => {
        try {
          const res = await axios.get(`/api/matches/player/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
          if (!Array.isArray(res.data) || res.data.length === 0) {
            console.error("No matches found for player", userId, res.data);
          }
          setMatches(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          console.error("Error fetching matches for player", err);
          setMatches([]);
        }
      })();
    }
  }, [role, token, userId]);

  useEffect(() => {
    if (role === "Admin" && token) {
      (async () => {
        try {
          const res = await axios.get(`/api/Teams`, { headers: { Authorization: `Bearer ${token}` } });
          setTeams(Array.isArray(res.data) ? res.data : []);
        } catch {
          setTeams([]);
        }
      })();
    }
  }, [role, token]);


  useEffect(() => {
    if (role === "Player" && token && userId) {
      (async () => {
        try {
          const res = await axios.get(`/api/Attendance/player/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
          setPlayerAttendance(Array.isArray(res.data) ? res.data : []);
        } catch {
          setPlayerAttendance([]);
        }
      })();
    }
  }, [role, token, userId]);


  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    if (!selectedMatch || !userId) {
      console.error("Missing match or user ID");
      return;
    }
    try {
      const body = {
        playerId: Number(userId),
        matchId: Number(selectedMatch),
        isPresent: isPresent,
        attendanceDate: new Date().toISOString()
      };
      console.log("POST body:", body);
      await axios.post(`/api/Attendance`, body, { headers: { Authorization: `Bearer ${token}` } });
      const res = await axios.get(`/api/Attendance/player/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      setPlayerAttendance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error marking attendance", err);
      if (err.response && err.response.data && err.response.data.errors) {
        console.error("Validation errors:", err.response.data.errors);
      }
    }
  };

  const handleGetTeamAttendance = async (e) => {
    e.preventDefault();
    if (!selectedTeam || !selectedDate) return;
    try {
      const res = await axios.get(`/api/Attendance?teamId=${selectedTeam}&date=${selectedDate}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log("Attendance API response:", res.data);
      setTeamAttendance(Array.isArray(res.data) ? res.data : []);
    } catch {
      setTeamAttendance([]);
    }
  };


  const handleViewPlayerAttendance = async (playerId) => {
    setViewPlayerId(playerId);
    try {
      const res = await axios.get(`/api/Attendance/player/${playerId}`, { headers: { Authorization: `Bearer ${token}` } });
      setViewPlayerAttendance(Array.isArray(res.data) ? res.data : []);
    } catch {
      setViewPlayerAttendance([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Attendance</h2>
        {role === "Player" && (
          <>
            <form className="mb-8 flex gap-4 flex-col sm:flex-row" onSubmit={handleMarkAttendance}>
              <select value={selectedMatch} onChange={e => setSelectedMatch(e.target.value)} className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none">
                <option value="">Select Match</option>
                {matches.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.homeTeamName} vs {m.awayTeamName} ({m.matchDate ? m.matchDate.substring(0, 10) : ""})
                  </option>
                ))}
              </select>
              <select value={isPresent ? "present" : "absent"} onChange={e => setIsPresent(e.target.value === "present")} className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none">
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded transition duration-200">Mark Attendance</button>
            </form>
            <h3 className="text-xl font-bold text-white mb-4">My Attendance</h3>
            <ul>
              {playerAttendance.map((a, idx) => (
                <li key={idx} className="border-b border-white/10 py-2 flex justify-between items-center text-white">
                  <span>{a.attendanceDate ? a.attendanceDate.substring(0, 10) : "-"}</span>
                  <span className={a.isPresent ? "text-green-400" : "text-red-400"}>{a.isPresent ? "Present" : "Absent"}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {role === "Admin" && (
          <>
            <form className="mb-8 flex gap-4 flex-col sm:flex-row" onSubmit={handleGetTeamAttendance}>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none" />
              <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)} className="bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none">
                <option value="">Select Team</option>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name || t.teamName || `Team ${t.id}`}</option>
                ))}
              </select>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded transition duration-200">Get Attendance</button>
            </form>
            <h3 className="text-xl font-bold text-white mb-4">Team Attendance</h3>
            <ul>
              {teamAttendance.map((a, idx) => (
                <li key={idx} className="border-b border-white/10 py-2 flex justify-between items-center text-white">
                  <span>{a.player || a.playerName || `Player ${a.playerId}`}</span>
                  <span className={a.isPresent ? "text-green-400" : "text-red-400"}>{a.isPresent ? "Present" : "Absent"}</span>
                  <button className="ml-4 text-blue-400 underline" onClick={() => handleViewPlayerAttendance(a.playerId)}>View</button>
                </li>
              ))}
            </ul>
            {viewPlayerId && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-2">Attendance for Player {viewPlayerId}</h4>
                <ul>
                  {viewPlayerAttendance.map((a, idx) => (
                    <li key={idx} className="border-b border-white/10 py-2 flex justify-between items-center text-white">
                      <span>{a.attendanceDate ? a.attendanceDate.substring(0, 10) : "-"}</span>
                      <span className={a.isPresent ? "text-green-400" : "text-red-400"}>{a.isPresent ? "Present" : "Absent"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {!role && <div className="text-white text-center">Loading...</div>}
      </div>
    </div>
  );
};

export default AttendancePage; 