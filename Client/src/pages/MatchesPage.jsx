import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'
  const [editMatch, setEditMatch] = useState(null);
  const [form, setForm] = useState({ matchDate: "", location: "", homeTeamId: "", awayTeamId: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [actionMsg, setActionMsg] = useState("");
  const navigate = useNavigate();

  const fetchMatches = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5169/api/matches");
      setMatches(res.data);
    } catch (err) {
      setError("Failed to load matches.");
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

  useEffect(() => {
    fetchMatches();
    fetchTeams();
  }, []);

  const openCreateModal = () => {
    setForm({ matchDate: "", location: "", homeTeamId: "", awayTeamId: "" });
    setModalType("create");
    setModalOpen(true);
    setEditMatch(null);
    setActionMsg("");
  };

  const openEditModal = (match) => {
    setForm({
      matchDate: match.matchDate ? match.matchDate.slice(0, 16) : "",
      location: match.location,
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
    });
    setModalType("edit");
    setEditMatch(match);
    setModalOpen(true);
    setActionMsg("");
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setModalOpen(true);
    setActionMsg("");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setActionMsg("");
    try {
      await axios.post("http://localhost:5169/api/matches", {
        matchDate: form.matchDate,
        location: form.location,
        homeTeamId: Number(form.homeTeamId),
        awayTeamId: Number(form.awayTeamId),
      });
      setModalOpen(false);
      fetchMatches();
    } catch (err) {
      setActionMsg("Failed to create match.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setActionMsg("");
    try {
      await axios.put(`http://localhost:5169/api/matches/${editMatch.id}`, {
        id: editMatch.id,
        matchDate: form.matchDate,
        location: form.location,
        homeTeamId: Number(form.homeTeamId),
        awayTeamId: Number(form.awayTeamId),
      });
      setModalOpen(false);
      fetchMatches();
    } catch (err) {
      setActionMsg("Failed to update match.");
    }
  };

  const handleDelete = async () => {
    setActionMsg("");
    try {
      await axios.delete(`http://localhost:5169/api/matches/${deleteId}`);
      setModalOpen(false);
      fetchMatches();
    } catch (err) {
      setActionMsg("Failed to delete match.");
    }
  };

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">Matches</h2>
          <button className="bg-red-600 hover:bg-red-700 transition text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg" onClick={openCreateModal}>+ Schedule Match</button>
        </div>
        {loading ? (
          <div className="text-white text-center">Loading matches...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {matches.map((match) => (
              <div key={match.id} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition">
                <div className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>{getTeamName(match.homeTeamId)} <span className="text-red-500">vs</span> {getTeamName(match.awayTeamId)}</span>
                  <button
                    className="ml-2 p-1 rounded hover:bg-white/20"
                    title="View Details"
                    onClick={() => navigate(`/matches/${match.id}`)}
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="text-gray-300 mb-2">{match.location}</div>
                <div className="text-gray-400 mb-4">{new Date(match.matchDate).toLocaleString()}</div>
                <div className="flex gap-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition" onClick={() => openEditModal(match)}>Edit</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition" onClick={() => openDeleteModal(match.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen && (modalType === "create" || modalType === "edit")}
        onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {modalType === "create" ? "Schedule Match" : "Edit Match"}
        </h2>
        <form className="space-y-4" onSubmit={modalType === "create" ? handleCreate : handleEdit}>
          <input
            type="datetime-local"
            name="matchDate"
            value={form.matchDate}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          />
          <select
            name="homeTeamId"
            value={form.homeTeamId}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          >
            <option value="">Select Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <select
            name="awayTeamId"
            value={form.awayTeamId}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          >
            <option value="">Select Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-200"
          >
            {modalType === "create" ? "Create" : "Save Changes"}
          </button>
        </form>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
      {/* Delete Modal */}
      <Modal isOpen={modalOpen && modalType === "delete"} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Delete Match</h2>
        <p className="text-white mb-6 text-center">Are you sure you want to delete this match?</p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
    </div>
  );
};

export default MatchesPage; 