"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/orders.module.css";
import { FaBox, FaHistory, FaTimesCircle, FaChevronRight } from "react-icons/fa";
// 1. Central API helper aur endpoints import karein
// import { clientFetch, API_ENDPOINTS } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductImage = (name) => {
    const n = name.toLowerCase();
    if (n.includes("cola")) return "/cola.png";
    if (n.includes("orange")) return "/orange.png";
    if (n.includes("lemon")) return "/lemon.png";
    if (n.includes("up") || n.includes("tonic") || n.includes("citrus")) return "/up.png";
    return "/up.png"; 
  };

  //for backend
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }
      
  //     try {
  //       // 2. Localhost URL ki jagah clientFetch use kiya
  //       const { ok, data } = await clientFetch(`${API_ENDPOINTS.orders}/my`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (ok && data.success) {
  //         setOrders(data.orders);
  //       }
  //     } catch (err) {
  //       console.error("Order Fetch Error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchOrders();
  // }, []);
  // const cancelOrder = async (id) => {
  //   if (!confirm("Discard this refreshment order?")) return;
  //   const token = localStorage.getItem("token");
    
  //   try {
  //     // 3. Cancel API call ko bhi dynamic kiya
  //     const { ok, data } = await clientFetch(`${API_ENDPOINTS.orders}/cancel/${id}`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (ok && data.success) {
  //       setOrders((prev) =>
  //         prev.map((o) => (o._id === id ? { ...o, status: "Cancelled" } : o))
  //       );
  //     } else {
  //       alert(data.message || "Failed to cancel order");
  //     }
  //   } catch (err) {
  //     alert("Error cancelling order. Please try again.");
  //   }
  // };

  //for static
   const staticOrders = [
    {
      _id: "ord_7891011",
      status: "Delivered",
      total: 398,
      items: [
        { productId: "1", name: "Classic Lemon Chill", qty: 2, price: 199 }
      ]
    },
    {
      _id: "ord_1234567",
      status: "Pending",
      total: 199,
      items: [
        { productId: "4", name: "Classic Cola", qty: 1, price: 199 }
      ]
    }
  ];
  useEffect(() => {
  // We simulate a small delay to make it feel like a real app
  const timer = setTimeout(() => {
    setOrders(staticOrders);
    setLoading(false);
  }, 1000); // 1 second delay

  return () => clearTimeout(timer);
}, []);
  if (loading) return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
      <p>FETCHING YOUR HISTORY...</p>
    </div>
  );

  if (!orders.length) return (
    <div className={styles.emptyPage}>
      <FaBox className="text-6xl opacity-20 mb-6" />
      <h2 className="text-3xl font-black italic">NO ORDERS YET</h2>
      <p className="opacity-60 mb-8">Your crate is waiting to be filled.</p>
      <Link href="/products" className={styles.browseBtn}>EXPLORE PRODUCTS</Link>
    </div>
  );

  return (
    <div className={styles.ordersPage}>
      <div className={styles.glowBg}></div>
      
      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className={styles.iconCircle}><FaHistory /></div>
          <h1 className={styles.pageTitle}>MY <span>ORDERS</span></h1>
        </div>

        <div className="space-y-8">
          {orders.map((o) => (
            <div key={o._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.idGroup}>
                  <p className="text-[10px] tracking-widest opacity-50 uppercase font-black">Ref ID</p>
                  <p className="font-mono text-[#00D1FF]">#{o._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className={`${styles.statusBadge} ${styles[o.status.toLowerCase()]}`}>
                  {o.status}
                </div>
              </div>

              <div className={styles.itemsArea}>
                {o.items.map((i) => (
                  <div key={i.productId} className={styles.itemRow}>
                    <div className="flex items-center gap-4">
                      <div className={styles.imgThumb}>
                        <img 
                          src={i.image || getProductImage(i.name)} 
                          alt={i.name} 
                        />
                      </div>
                      <div>
                        <h4 className="font-black italic text-lg">{i.name}</h4>
                        <p className="text-sm opacity-50">Quantity: {i.qty}</p>
                      </div>
                    </div>
                    <p className="font-bold text-[#00D1FF]">₹{i.price * i.qty}</p>
                  </div>
                ))}
              </div>

              <div className={styles.orderFooter}>
                <div className={styles.totalBox}>
                  <span className="opacity-50 text-sm">GRAND TOTAL</span>
                  <span className="text-2xl font-black italic">₹{o.total}</span>
                </div>
                
                <div className="flex gap-3">
                   <button className={styles.detailsBtn}>
                    DETAILS <FaChevronRight className="text-xs" />
                  </button>
                  {o.status === "Pending" && (
                    <button onClick={() => cancelOrder(o._id)} className={styles.cancelBtn}>
                      <FaTimesCircle /> CANCEL
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}