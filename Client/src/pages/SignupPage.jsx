import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Player",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5169/api/Auth/register", form);
      if (res.status === 200 || res.status === 201) {
        setMessage("Registration successful! You can now sign in.");
        setForm({ username: "", email: "", password: "", role: "Player" });
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
        
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-black/75 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.75)', padding: '48px', borderRadius: '8px' }}>
        <h1 className="text-white text-3xl font-bold mb-8 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
              style={{ backgroundColor: '#333333', color: 'white', padding: '12px 16px', border: '1px solid #666666', borderRadius: '4px' }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
              style={{ backgroundColor: '#333333', color: 'white', padding: '12px 16px', border: '1px solid #666666', borderRadius: '4px' }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
              style={{ backgroundColor: '#333333', color: 'white', padding: '12px 16px', border: '1px solid #666666', borderRadius: '4px' }}
              required
            />
          </div>
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
              style={{ backgroundColor: '#333333', color: 'white', padding: '12px 16px', border: '1px solid #666666', borderRadius: '4px' }}
            >
              <option value="Player">Player</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-200 disabled:opacity-60"
            style={{ backgroundColor: '#E50914', color: 'white', padding: '12px', fontWeight: 'bold', borderRadius: '4px', border: 'none' }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {message && <div className="mt-4 text-green-400 text-center">{message}</div>}
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
        <div className="mt-6 text-center">
          <span className="text-gray-400" style={{ color: '#999999' }}>
            Already have an account?
          </span>
          <a href="/login" className="text-white hover:underline ml-1" style={{ color: 'white', marginLeft: '4px' }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 