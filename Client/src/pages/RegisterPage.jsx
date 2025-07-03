import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Sign Up</h2>
        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Username</label>
            <input type="text" className="w-full bg-white/20 text-white border-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 placeholder-gray-300" placeholder="Your username" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Email</label>
            <input type="email" className="w-full bg-white/20 text-white border-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 placeholder-gray-300" placeholder="you@email.com" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Password</label>
            <input type="password" className="w-full bg-white/20 text-white border-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 placeholder-gray-300" placeholder="••••••••" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 font-semibold">Role</label>
            <select className="w-full bg-white/20 text-white border-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500">
              <option value="Player">Player</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 transition text-white font-bold py-3 rounded-lg shadow-lg mt-2">Sign Up</button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-400">Already have an account? </span>
          <a href="/login" className="text-red-400 hover:underline font-semibold">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 