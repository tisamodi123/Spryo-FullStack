"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/orders.module.css";
import { 
  FaBox, 
  FaHistory, 
  FaTimesCircle, 
  FaChevronRight, 
  FaTruck, 
  FaCheckCircle, 
  FaRedo,
  FaShoppingBag
} from "react-icons/fa";
import { clientFetch } from "@/lib/api";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";

const defaultOrders = [
  {
    _id: "SPRYO-849201",
    id: "SPRYO-849201",
    status: "Delivered",
    date: "Yesterday, 4:30 PM",
    total: 198,
    items: [
      { productId: "1", name: "Classic Cola", qty: 1, price: 99, image: "/cola.png" },
      { productId: "2", name: "Cloudy Lemon", qty: 1, price: 89, image: "/lemon.png" },
    ],
  },
  {
    _id: "SPRYO-432890",
    id: "SPRYO-432890",
    status: "Out for Delivery",
    date: "Today, 11:15 AM",
    total: 280,
    items: [
      { productId: "3", name: "Zesty Orange", qty: 2, price: 95, image: "/orange.png" },
      { productId: "4", name: "Mountain Up", qty: 1, price: 85, image: "/up.png" },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const getProductImage = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("cola")) return "/cola.png";
    if (n.includes("orange")) return "/orange.png";
    if (n.includes("lemon")) return "/lemon.png";
    if (n.includes("up") || n.includes("mountain")) return "/up.png";
    return "/cola.png";
  };

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      let combined = [];

      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
          const { ok, data } = await clientFetch("/orders/my", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (ok && Array.isArray(data?.orders)) {
            combined = [...data.orders];
          }
        }
      } catch (err) {}

      try {
        const stored = localStorage.getItem("spryo_orders");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            combined = [...combined, ...parsed];
          }
        }
      } catch (err) {}

      if (combined.length > 0) {
        const map = new Map();
        for (const item of combined) {
          const key = item._id || item.id;
          if (!map.has(key)) map.set(key, item);
        }
        setOrders(Array.from(map.values()));
      } else {
        setOrders(defaultOrders);
      }
      setLoading(false);
    }

    loadOrders();
  }, []);

  const cancelOrder = (orderId) => {
    if (!confirm("Are you sure you want to cancel this refreshment order?")) return;

    setOrders((prev) => {
      const updated = prev.map((o) =>
        (o._id === orderId || o.id === orderId) ? { ...o, status: "Cancelled" } : o
      );
      try {
        localStorage.setItem("spryo_orders", JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });

    showToast("Order has been cancelled.");
  };

  const reorderItems = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.qty || 1);
    });
    showToast(`Items from #${(order._id || order.id).slice(-6)} added to your crate! 🍹`);
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.spinner}></div>
        <p className="text-cyan-400 font-bold tracking-widest text-xs mt-3">
          FETCHING YOUR CRATE HISTORY...
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className={styles.emptyPage}>
        <FaBox className="text-6xl text-cyan-400/30 mb-6" />
        <h2 className="text-3xl font-black italic text-white">NO ORDERS YET</h2>
        <p className="text-white/60 mb-8 mt-2">
          Your crate history is empty. Try one of our craft sparkling beverages today!
        </p>
        <Link href="/products" className={styles.browseBtn}>
          EXPLORE DRINKS
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.glowBg}></div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className={styles.iconCircle}>
              <FaHistory />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-widest">
                Refreshment Hub
              </span>
              <h1 className={styles.pageTitle}>
                MY <span>ORDERS</span>
              </h1>
            </div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
          >
            <FaShoppingBag /> ORDER MORE
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((o) => {
            const currentStatus = o.status || "Confirmed";
            const orderRef = (o._id || o.id || "SPRYO-000000").toString();

            return (
              <div key={orderRef} className={styles.orderCard}>
                {/* Order Top Bar */}
                <div className={styles.orderHeader}>
                  <div className={styles.idGroup}>
                    <p className="text-[10px] tracking-widest text-white/50 uppercase font-black">
                      ORDER REFERENCE
                    </p>
                    <p className="font-mono text-[#00D1FF] font-bold text-base">
                      #{orderRef.toUpperCase()}
                    </p>
                    {o.date && (
                      <span className="text-[11px] text-white/40 font-medium">
                        Placed: {o.date}
                      </span>
                    )}
                  </div>

                  <div
                    className={`${styles.statusBadge} ${
                      currentStatus.toLowerCase() === "delivered"
                        ? "bg-green-500/20 text-green-400 border-green-500/40"
                        : currentStatus.toLowerCase() === "cancelled"
                        ? "bg-red-500/20 text-red-400 border-red-500/40"
                        : "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                    } border px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider`}
                  >
                    {currentStatus}
                  </div>
                </div>

                {/* Progress Tracker (If Active) */}
                {currentStatus.toLowerCase() !== "cancelled" && (
                  <div className="px-6 py-4 border-b border-white/5 bg-black/20">
                    <div className="flex items-center justify-between text-xs text-white/70 max-w-lg mx-auto">
                      <div className="flex flex-col items-center gap-1 text-cyan-400 font-bold">
                        <FaCheckCircle />
                        <span>Placed</span>
                      </div>
                      <div className="h-0.5 flex-1 bg-cyan-400/40 mx-2"></div>
                      <div
                        className={`flex flex-col items-center gap-1 font-bold ${
                          currentStatus === "Out for Delivery" || currentStatus === "Delivered"
                            ? "text-cyan-400"
                            : "text-white/40"
                        }`}
                      >
                        <FaTruck />
                        <span>Chilled & En Route</span>
                      </div>
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          currentStatus === "Delivered" ? "bg-cyan-400" : "bg-white/10"
                        }`}
                      ></div>
                      <div
                        className={`flex flex-col items-center gap-1 font-bold ${
                          currentStatus === "Delivered" ? "text-green-400" : "text-white/40"
                        }`}
                      >
                        <FaCheckCircle />
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items in Order */}
                <div className={styles.itemsArea}>
                  {o.items?.map((i, idx) => (
                    <div key={i.productId || i._id || idx} className={styles.itemRow}>
                      <div className="flex items-center gap-4">
                        <div className={styles.imgThumb}>
                          <img
                            src={i.image || getProductImage(i.name)}
                            alt={i.name}
                            className="max-h-14 object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-black italic text-base text-white">{i.name}</h4>
                          <p className="text-xs text-white/50">
                            Quantity: {i.qty} • ₹{i.price} each
                          </p>
                        </div>
                      </div>
                      <p className="font-extrabold text-[#00D1FF] text-base">
                        ₹{i.price * i.qty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className={styles.orderFooter}>
                  <div className={styles.totalBox}>
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">
                      TOTAL PAID
                    </span>
                    <span className="text-2xl font-black italic text-white">₹{o.total}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => reorderItems(o)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black tracking-wide transition shadow-md shadow-cyan-400/20"
                    >
                      <FaRedo size={10} /> RE-ORDER
                    </button>

                    {currentStatus !== "Delivered" && currentStatus !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(o._id || o.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 transition"
                      >
                        <FaTimesCircle /> CANCEL
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}