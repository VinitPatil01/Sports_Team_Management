import React from "react";

const UsersListPage = () => {
  // Placeholder data
  const users = [
    { id: 1, username: "player1", role: "Player" },
    { id: 2, username: "admin1", role: "Admin" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">All Users</h2>
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-white/10">
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">Username</th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white/10 hover:bg-white/20 transition rounded-lg shadow">
                <td className="px-6 py-3 text-white font-medium">{user.username}</td>
                <td className="px-6 py-3 text-white">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListPage; 