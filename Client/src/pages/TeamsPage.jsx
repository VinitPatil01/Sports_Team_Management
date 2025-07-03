import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import { jwtDecode } from "jwt-decode";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [form, setForm] = useState({ name: "", coach: "" });
  const [modalType, setModalType] = useState("create"); 
  const [deleteId, setDeleteId] = useState(null);
  const [actionMsg, setActionMsg] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const fetchTeams = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5169/api/teams");
      setTeams(res.data);
    } catch (err) {
      setError("Failed to load teams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const openCreateModal = () => {
    setForm({ name: "", coach: "" });
    setModalType("create");
    setModalOpen(true);
    setEditTeam(null);
    setActionMsg("");
  };

  const openEditModal = (team) => {
    setForm({ name: team.name, coach: team.coach });
    setModalType("edit");
    setEditTeam(team);
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
      await axios.post("http://localhost:5169/api/teams", {
        name: form.name,
        coach: form.coach,
      });
      setModalOpen(false);
      fetchTeams();
    } catch (err) {
      setActionMsg("Failed to create team.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setActionMsg("");
    try {
      await axios.put(`http://localhost:5169/api/teams/${editTeam.id}`, {
        id: editTeam.id,
        name: form.name,
        coach: form.coach,
      });
      setModalOpen(false);
      fetchTeams();
    } catch (err) {
      setActionMsg("Failed to update team.");
    }
  };

  const handleDelete = async () => {
    setActionMsg("");
    try {
      await axios.delete(`http://localhost:5169/api/teams/${deleteId}`);
      setModalOpen(false);
      fetchTeams();
    } catch (err) {
      setActionMsg("Failed to delete team.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;
      setRole(role);      
    }
  }, []);

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">Teams</h2>
          {role === "Admin" && (
            <button
              className="bg-red-600 hover:bg-red-700 transition text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg"
              onClick={openCreateModal}
            >
              + Add Team
            </button>
          )}
        </div>
        {loading ? (
          <div className="text-white text-center">Loading teams...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition"
              >
                <div className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>{team.name}</span>
                  <button
                    className="ml-2 p-1 rounded hover:bg-white/20"
                    title="View Details"
                    onClick={() => navigate(`/teams/${team.id}`)}
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="text-gray-300 mb-2">Coach: {team.coach}</div>
                {role === "Admin" && (
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                      onClick={() => openEditModal(team)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                      onClick={() => openDeleteModal(team.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen && (modalType === "create" || modalType === "edit")}
        onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {modalType === "create" ? "Add Team" : "Edit Team"}
        </h2>
        <form className="space-y-4" onSubmit={modalType === "create" ? handleCreate : handleEdit}>
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
            name="coach"
            placeholder="Coach Name"
            value={form.coach}
            onChange={handleFormChange}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600"
            required
          />
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
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Delete Team</h2>
        <p className="text-white mb-6 text-center">Are you sure you want to delete this team?</p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          {role === "Admin" && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
        {actionMsg && <div className="mt-4 text-red-400 text-center">{actionMsg}</div>}
      </Modal>
    </div>
  );
};

export default TeamsPage; 