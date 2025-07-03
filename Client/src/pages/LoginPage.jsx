import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded); 
      setRole(decoded.role);
      setUserId(decoded.nameid);
    }
    
    try {
      const res = await axios.post("http://localhost:5169/api/Auth/login", form);
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token); 
        const role = decoded.role;
        localStorage.setItem("role", role);
        setMessage(`Login successful! Role: ${role}`);
        setForm({ username: "", password: "" });
        setTimeout(() => navigate("/#reload"), 500); 
        
      } else {
        setError(res.data.message || "Login failed.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-black flex items-center justify-center relative"
      style={{ backgroundColor: '#000000' }} 
    >
   
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      
      <div 
        className="relative z-10 w-full max-w-md p-8 bg-black/75 rounded-lg"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', padding: '48px', borderRadius: '8px' }} // Fallback
      >
        <h1 
          className="text-white text-3xl font-bold mb-8"
          style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}
        >
          Sign In
        </h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-red-600 focus:outline-none"
              style={{ 
                width: '100%', 
                backgroundColor: '#333333', 
                color: 'white', 
                padding: '12px 16px', 
                border: '1px solid #666666',
                borderRadius: '4px'
              }}
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
              style={{ 
                width: '100%', 
                backgroundColor: '#333333', 
                color: 'white', 
                padding: '12px 16px', 
                border: '1px solid #666666',
                borderRadius: '4px'
              }}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-200"
            style={{ 
              width: '100%', 
              backgroundColor: '#E50914', 
              color: 'white', 
              padding: '12px', 
              fontWeight: 'bold',
              borderRadius: '4px',
              border: 'none'
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        {message && <div className="mt-4 text-green-400 text-center">{message}</div>}
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
        
        <div className="mt-6 text-center">
          <span 
            className="text-gray-400"
            style={{ color: '#999999' }}
          >
            New to Sports Team? 
          </span>
          <a 
            href="/signup" 
            className="text-white hover:underline ml-1"
            style={{ color: 'white', marginLeft: '4px' }}
          >
            Sign up now
          </a>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;