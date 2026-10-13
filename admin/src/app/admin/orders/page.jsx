"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

const defaultOrders = [
  {
    _id: "SPRYO-849201",
    user: { name: "Chetan Verma", email: "chetan@gmail.com" },
    items: [{ name: "Classic Cola", qty: 2 }],
    totalAmount: 198,
    status: "Delivered",
  },
  {
    _id: "SPRYO-432890",
    user: { name: "Priya Patel", email: "priya@gmail.com" },
    items: [{ name: "Cloudy Lemon", qty: 1 }],
    totalAmount: 89,
    status: "Shipped",
  },
  {
    _id: "SPRYO-912403",
    user: { name: "Rahul Sharma", email: "rahul@gmail.com" },
    items: [{ name: "Mountain Up", qty: 2 }, { name: "Zesty Orange", qty: 1 }],
    totalAmount: 265,
    status: "Pending",
  },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch("/orders/admin/all");
      if (ok && Array.isArray(data?.orders) && data.orders.length > 0) {
        setOrders(data.orders);
      } else {
        setOrders(defaultOrders);
      }
    } catch (err) {
      setOrders(defaultOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    );

    try {
      await adminFetch(`/orders/status/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      // Local state is already updated
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-amber-100 text-amber-800 border border-amber-200";
    if (status === "Shipped") return "bg-blue-100 text-blue-800 border border-blue-200";
    if (status === "Delivered") return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    return "bg-rose-100 text-rose-800 border border-rose-200";
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-sm">Loading Store Orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">Total placed customer orders: {orders.length}</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
        >
          🔄 Refresh Orders
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Order ID</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Customer</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Items</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Total</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold uppercase text-gray-600 tracking-wider">Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-slate-50 transition">
                <td className="p-4 text-xs font-mono font-bold text-slate-700">#{order._id.slice(-6)}</td>
                <td className="p-4">
                  <div className="font-bold text-sm text-slate-800">{order.user?.name || "Customer"}</div>
                  <div className="text-xs text-gray-500">{order.user?.email || "customer@gmail.com"}</div>
                </td>
                <td className="p-4 text-sm text-gray-600 font-medium">
                  {order.items?.length || 1} {order.items?.length === 1 ? "bottle" : "bottles"}
                </td>
                <td className="p-4 font-black text-slate-900">₹{order.totalAmount || order.total || 198}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-gray-300 rounded-lg p-1.5 text-xs font-bold bg-white outline-none cursor-pointer hover:border-slate-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}