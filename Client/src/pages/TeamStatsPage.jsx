import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const TeamStatsPage = () => {
  const [teamsStats, setTeamsStats] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStats, setEditStats] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;
      setRole(role);
    }
  }, []);

  useEffect(() => {
    const fetchTeamsStats = async () => {
      try {
        const res = await axios.get("http://localhost:5169/api/stats/teams/summary");
        setTeamsStats(res.data);
      } catch (err) {
        setTeamsStats([]);
      }
    };
    fetchTeamsStats();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5169/api/matches");
        console.log(res.data);
        setMatches(Array.isArray(res.data) ? res.data : []);
      } catch {
        setMatches([]);
      }
    };
    fetchMatches();
  }, []);

  const handleViewPlayers = async (teamId) => {
    setSelectedTeamId(teamId);
    setShowPlayers(true);
    try {
      const res = await axios.get(`http://localhost:5169/api/stats/team/${teamId}/players`);
      setPlayerStats(res.data);
    } catch (err) {
      setPlayerStats([]);
    }
  };

  const handleClosePlayers = () => {
    setShowPlayers(false);
    setPlayerStats([]);
    setSelectedTeamId(null);
  };

  const handleEditStats = (player) => {
    setEditStats({ ...player });
    setShowEditModal(true);
  };

  const handleDeleteStats = async (player) => {
    if (!window.confirm("Are you sure you want to delete this player's stats?")) return;
    try {
      await axios.delete(`http://localhost:5169/api/stats/${player.statId || player.playerId}`, { headers: { Authorization: `Bearer ${token}` } });
      const res = await axios.get(`http://localhost:5169/api/stats/team/${selectedTeamId}/players`);
      setPlayerStats(res.data);
    } catch (err) {
      alert("Failed to delete stats");
    }
  };

  const handleAddStats = () => {
    setEditStats({ playerId: "", matchId: matches.length > 0 ? matches[0].id : "", goals: 0, assists: 0, fouls: 0, minutesPlayed: 0 });
    setShowEditModal(true);
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    const statsPayload = {
      playerId: Number(editStats.playerId),
      matchId: Number(editStats.matchId),
      goals: Number(editStats.goals),
      assists: Number(editStats.assists),
      fouls: Number(editStats.fouls),
      minutesPlayed: Number(editStats.minutesPlayed)
    };
    console.log({id:editStats.id,...statsPayload});
    const token = localStorage.getItem("token");
    try {
      
      if (editStats.id) {
        await axios.put(`http://localhost:5169/api/stats/${editStats.id}`, { id: editStats.id, ...statsPayload }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`http://localhost:5169/api/stats`, statsPayload, { headers: { Authorization: `Bearer ${token}` } });
      }
      setShowEditModal(false);
      setEditStats(null);
      const res = await axios.get(`http://localhost:5169/api/stats/team/${selectedTeamId}/players`);
      setPlayerStats(res.data);
    } catch (err) {
      alert("Failed to save stats");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-4xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Team Stats</h2>
        <table className="w-full text-white mb-8">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2">Team</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Fouls</th>
              <th>Minutes Played</th>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>
            {teamsStats.map((team) => (
              <tr key={team.teamId} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2 font-bold">{team.teamName}</td>
                <td>{team.totalGoals}</td>
                <td>{team.totalAssists}</td>
                <td>{team.totalFouls}</td>
                <td>{team.totalMinutesPlayed}</td>
                <td>
                  <button
                    className="text-blue-400 hover:text-blue-600 text-xl"
                    title="View Players"
                    onClick={() => handleViewPlayers(team.teamId)}
                  >
                    <span role="img" aria-label="View">👁️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPlayers && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/20 relative">
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
                onClick={handleClosePlayers}
                title="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Player Stats</h3>
              {role === "Admin" && (
                <button
                  className="mb-4 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
                  onClick={handleAddStats}
                >
                  + Add Player Stats
                </button>
              )}
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-2">Player</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Fouls</th>
                    <th>Minutes Played</th>
                    {role === "Admin" && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {playerStats.map((player) => (
                    <tr key={player.playerId} className="border-b border-white/10">
                      <td className="py-2 font-bold">{player.username}</td>
                      <td>{player.goals}</td>
                      <td>{player.assists}</td>
                      <td>{player.fouls}</td>
                      <td>{player.minutesPlayed}</td>
                      {role === "Admin" && (
                        <td>
                          <button className="text-yellow-400 hover:text-yellow-600 mr-2" title="Edit" onClick={() => handleEditStats(player)}>✏️</button>
                          <button className="text-red-400 hover:text-red-600" title="Delete" onClick={() => handleDeleteStats(player)}>🗑️</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {showEditModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <form onSubmit={handleSaveStats} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 relative">
                    <button
                      className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
                      onClick={() => setShowEditModal(false)}
                      type="button"
                    >
                      &times;
                    </button>
                    <h4 className="text-xl font-bold text-white mb-4 text-center">{editStats?.statId ? "Edit" : "Add"} Player Stats</h4>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Player ID</label>
                      <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={editStats?.playerId || ""} onChange={e => setEditStats({ ...editStats, playerId: e.target.value })} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Match</label>
                      <select
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                        value={editStats?.matchId || ""}
                        onChange={e => setEditStats({ ...editStats, matchId: e.target.value })}
                        required
                      >
                        <option value="">Select Match</option>
                        {matches.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.homeTeamName && m.awayTeamName
                              ? `${m.homeTeamName} vs ${m.awayTeamName} (${m.matchDate ? m.matchDate.substring(0, 10) : ""})`
                              : m.name || `Match ${m.id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Goals</label>
                      <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={editStats?.goals || 0} onChange={e => setEditStats({ ...editStats, goals: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Assists</label>
                      <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={editStats?.assists || 0} onChange={e => setEditStats({ ...editStats, assists: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Fouls</label>
                      <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={editStats?.fouls || 0} onChange={e => setEditStats({ ...editStats, fouls: Number(e.target.value) })} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-1">Minutes Played</label>
                      <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 text-white" value={editStats?.minutesPlayed || 0} onChange={e => setEditStats({ ...editStats, minutesPlayed: Number(e.target.value) })} required />
                    </div>
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded mt-4">Save</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamStatsPage; 