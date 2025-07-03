import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PlayerStatsPage = () => {
  const { id, teamId } = useParams(); 
  const [stats, setStats] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;
      setRole(role);
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (teamId) {
          
          const res = await axios.get(`http://localhost:5169/api/stats/team/${teamId}/players`);
          const player = res.data.find((p) => String(p.playerId) === String(id));
          setStats(player ? [player] : []);
          setPlayerName(player ? player.username : "");
        } else {
          
          const res = await axios.get(`http://localhost:5169/api/stats/player/${id}`);
          setStats(Array.isArray(res.data) ? res.data : []);
        }
      } catch {
        setStats([]);
      }
    };
    fetchStats();
  }, [id, teamId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">
          Player Stats {playerName && `- ${playerName}`}
        </h2>
        {teamId ? (
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2">Player</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Fouls</th>
                <th>Minutes Played</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.playerId} className="border-b border-white/10">
                  <td className="py-2 font-bold">{s.username}</td>
                  <td>{s.goals}</td>
                  <td>{s.assists}</td>
                  <td>{s.fouls}</td>
                  <td>{s.minutesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ul className="space-y-4">
            {Array.isArray(stats) && stats.length > 0 ? (
              <>
                <li className="flex justify-between text-white text-lg"><span>Goals:</span> <span>{stats.reduce((sum, s) => sum + s.goals, 0)}</span></li>
                <li className="flex justify-between text-white text-lg"><span>Assists:</span> <span>{stats.reduce((sum, s) => sum + s.assists, 0)}</span></li>
                <li className="flex justify-between text-white text-lg"><span>Fouls:</span> <span>{stats.reduce((sum, s) => sum + s.fouls, 0)}</span></li>
                <li className="flex justify-between text-white text-lg"><span>Minutes Played:</span> <span>{stats.reduce((sum, s) => sum + s.minutesPlayed, 0)}</span></li>
              </>
            ) : (
              <li className="text-white text-center">No stats available.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayerStatsPage; 