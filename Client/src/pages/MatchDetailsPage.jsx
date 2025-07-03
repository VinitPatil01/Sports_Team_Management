import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MatchDetailsPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:5169/api/matches/${id}`);
        setMatch(res.data);
      } catch (err) {
        setError("Failed to load match details.");
      } finally {
        setLoading(false);
      }
    };
    const fetchTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5169/api/teams");
        setTeams(res.data);
      } catch (err) {
        setTeams([]);
      }
    };
    fetchMatch();
    fetchTeams();
  }, [id]);

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <button
          className="mb-8 text-white hover:text-red-500 font-semibold text-lg"
          onClick={() => navigate(-1)}
        >
          ← Back to Matches
        </button>
        {loading ? (
          <div className="text-white text-center">Loading match details...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : match ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
              {getTeamName(match.homeTeamId)} <span className="text-red-500">vs</span> {getTeamName(match.awayTeamId)}
            </h2>
            <div className="text-gray-300 text-lg mb-2 text-center">{match.location}</div>
            <div className="text-gray-400 text-center mb-6">{new Date(match.matchDate).toLocaleString()}</div>
            
            <div className="mt-8 flex justify-center">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg"
                onClick={() => navigate("/matches")}
              >
                Back to Matches
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white text-center">No match found.</div>
        )}
      </div>
    </div>
  );
};

export default MatchDetailsPage; 