"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const { ok, data: json } = await adminFetch("/admin/stats");
      if (ok && json.success) {
        setData(json);
      } else {
        setData({
          stats: { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 },
          recentOrders: []
        });
      }
    } catch {
      setData({
        stats: { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 },
        recentOrders: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading Dashboard Overview...</p>
      </div>
    );
  }

  const stats = data?.stats || { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 };
  const recentOrders = data?.recentOrders || [];

  return (
    <div className="p-6 space-y-8 text-black">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Live metrics and store stats</p>
        </div>
        <button 
          onClick={fetchStats}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-800 text-sm rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} color="border-green-500 text-green-600" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="border-blue-500 text-blue-600" />
        <StatCard title="Total Customers" value={stats.totalUsers} color="border-purple-500 text-purple-600" />
        <StatCard title="Total Products" value={stats.totalProducts} color="border-orange-500 text-orange-600" />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b text-sm">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map(order => (
                  <tr key={order._id} className="text-sm hover:bg-slate-50">
                    <td className="py-4 font-mono text-xs font-semibold">{order._id ? `#${order._id.slice(-6)}` : "N/A"}</td>
                    <td className="py-4">{order.userId?.name || order.user?.name || "Guest"}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-semibold">
                        {order.status || "Placed"}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-800">₹{order.total || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color}`}>
      <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">{title}</p>
      <h3 className="text-3xl font-extrabold mt-2 text-slate-800">{value}</h3>
    </div>
  );
}