"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { ok, data } = await adminFetch("/orders/admin/all");
      if (ok && Array.isArray(data?.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setOrders([]);
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
      const { ok } = await adminFetch(`/orders/status/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!ok) {
        fetchOrders();
      }
    } catch (err) {
      fetchOrders();
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending" || status === "Placed") return "bg-amber-100 text-amber-800 border border-amber-200";
    if (status === "Packed") return "bg-purple-100 text-purple-800 border border-purple-200";
    if (status === "Shipped") return "bg-blue-100 text-blue-800 border border-blue-200";
    if (status === "Delivered") return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    return "bg-rose-100 text-rose-800 border border-rose-200";
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium text-sm">Loading Live Orders from Database...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">Total live orders in MongoDB: {orders.length}</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
        >
          🔄 Refresh Orders
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="font-semibold text-lg">No orders placed in database yet.</p>
            <p className="text-sm mt-1">When a user completes checkout on the storefront, their order will appear here live.</p>
          </div>
        ) : (
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
                    <div className="font-bold text-sm text-slate-800">{order.userId?.name || order.user?.name || "Customer"}</div>
                    <div className="text-xs text-gray-500">{order.userId?.email || order.user?.email || "customer@gmail.com"}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">
                    {order.items?.length || 1} {order.items?.length === 1 ? "bottle" : "bottles"}
                  </td>
                  <td className="p-4 font-black text-slate-900">₹{order.totalAmount || order.total || 0}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={order.status || "Pending"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border border-gray-300 rounded-lg p-1.5 text-xs font-bold bg-white outline-none cursor-pointer hover:border-slate-500"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Pending">Pending</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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