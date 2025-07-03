import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("edit");
  const [form, setForm] = useState({ name: "", description: "" });
  const [actionMsg, setActionMsg] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [removePlayerId, setRemovePlayerId] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);
  const navigate = useNavigate();

  const fetchTeam = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5169/api/teams/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTeam(res.data);
      setPlayers(res.data.players || []);
    } catch (err) {
      setError("Failed to load team details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:5169/api/users", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAllPlayers(res.data);
    } catch (err) {
      setAllPlayers([]);
    }
  };

  useEffect(() => {
    fetchTeam();
    fetchAllPlayers();
  }, [id]);

  const openEditModal = () => {
    setForm({ name: team.name, description: team.description });
    setModalType("edit");
    setModalOpen(true);
    setActionMsg("");
  };

  const openAddPlayerModal = () => {
    setPlayerId("");
    setModalType("addPlayer");
    setModalOpen(true);
    setActionMsg("");
  };

  const openRemovePlayerModal = (playerId) => {
    setRemovePlayerId(playerId);
    setModalType("removePlayer");
    setModalOpen(true);
    setActionMsg("");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setActionMsg("");
    try {
      await axios.put(`http://localhost:5169/api/teams/${id}`, {
        id: team.id,
        name: form.name,
        description: form.description,
      });
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      setActionMsg("Failed to update team.");
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    setActionMsg("");
    try {
      await axios.post(
        `http://localhost:5169/api/teams/${id}/add-player?playerId=${playerId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      setActionMsg("Failed to add player.");
      console.log(err);
    }
  };

  const handleRemovePlayer = async () => {
    setActionMsg("");
    try {
      await axios.delete(
        `http://localhost:5169/api/teams/${id}/remove-player/${removePlayerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      setActionMsg("Failed to remove player.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <button
          className="mb-8 text-white hover:text-red-500 font-semibold text-lg"
          onClick={() => navigate(-1)}
        >
          ← Back to Teams
        </button>
        {loading ? (
          <div className="text-white text-center">Loading team details...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : team ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-white">{team.name}</h2>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                onClick={openEditModal}
              >
                Edit
              </button>
            </div>
            <div className="text-gray-300 mb-4">description: {team.description}</div>
            <div className="flex gap-4 mb-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full shadow-lg text-lg"
                onClick={openAddPlayerModal}
              >
                + Add Player
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Players</h3>
            <ul className="divide-y divide-white/10">
              {players.length === 0 ? (
                <li className="text-gray-400 py-2">No players in this team.</li>
              ) : (
                players.map((player) => (
                  <li key={player.id} className="py-2 flex justify-between items-center text-white">
                    <span>{player.name}</span>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => openRemovePlayerModal(player.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <div className="text-white text-center">No team found.</div>
        )}
      </div>
      {/* Edit Modal */}
      <Modal isOpen={modalOpen && modalType === "edit"} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Team</h2>
        <form className="space-y-4" onSubmit={handleEdit}>
          <input
            type="text"
            name="name"
            placeholder="Team Name"
            value={form.name}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={form.description}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-200"
          >
            Save Changes
          </button>
        </form>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
      {/* Add Player Modal */}
      <Modal isOpen={modalOpen && modalType === "addPlayer"} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Add Player</h2>
        <form className="space-y-4" onSubmit={handleAddPlayer}>
          <select
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          >
            <option value="">Select Player</option>
            {allPlayers.map((user) => (
              <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-200"
          >
            Add Player
          </button>
        </form>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
      {/* Remove Player Modal */}
      <Modal isOpen={modalOpen && modalType === "removePlayer"} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Remove Player</h2>
        <p className="text-white mb-6 text-center">Are you sure you want to remove this player?</p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            onClick={handleRemovePlayer}
          >
            Remove
          </button>
        </div>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
    </div>
  );
};

export default TeamDetailsPage; 