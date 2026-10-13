"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch("/admin/users");
      if (ok && Array.isArray(data?.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (id) => {
    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, isBlocked: !u.isBlocked } : u))
    );

    try {
      const { ok } = await adminFetch(`/admin/users/${id}/toggle`, { method: "POST" });
      if (!ok) {
        fetchUsers(); // Revert on failure
      }
    } catch (err) {
      fetchUsers();
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-sm">Loading Live Customers from Database...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customer Management</h1>
          <p className="text-sm text-gray-500 mt-1">Total registered users in MongoDB: {users.length}</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
        >
          🔄 Refresh Users
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="font-semibold text-lg">No customers registered in database yet.</p>
            <p className="text-sm mt-1">Users will appear here in real-time as they sign up on the storefront.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Name</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Email</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Joined On</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-800">{user.name || "Spryo Member"}</td>
                  <td className="p-4 text-sm text-gray-600">{user.email}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Just now"}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                      {user.isBlocked ? 'Blocked' : 'Active Member'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggle(user._id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${user.isBlocked ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50' : 'border-red-400 text-red-600 hover:bg-red-50'}`}
                    >
                      {user.isBlocked ? 'Unblock Access' : 'Block User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}