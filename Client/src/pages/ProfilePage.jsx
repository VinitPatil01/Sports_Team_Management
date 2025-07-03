import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        // Replace with your actual profile endpoint and auth header if needed
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5169/api/Auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-black py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-10 text-center">Profile</h2>
        {loading ? (
          <div className="text-white text-center">Loading profile...</div>
        ) : error ? (
          <div className="text-red-400 text-center">{error}</div>
        ) : user ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center text-4xl text-white font-bold mb-4">
                {user.name ? user.name[0] : "U"}
              </div>
              <div className="text-2xl font-bold text-white mb-2">{user.name}</div>
              <div className="text-gray-300 mb-2">{user.email}</div>
              <div className="text-gray-400 mb-2">Role: {user.role}</div>
            </div>
            {/* Add more profile actions/info here if needed */}
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white text-center">No user found.</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 