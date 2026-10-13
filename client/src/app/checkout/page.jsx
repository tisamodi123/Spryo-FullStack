"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import styles from "@/styles/checkout.module.css";
import { FaTruck, FaFileInvoiceDollar, FaLock, FaChevronLeft, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";

import { clientFetch } from "@/lib/api";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!items.length) {
      alert("Your crate is empty! Please add drinks first.");
      return;
    }

    for (let field in form) {
      if (!form[field].trim()) {
        alert(`Please provide your ${field.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    setLoading(true);

    const orderId = "SPRYO-" + Math.floor(100000 + Math.random() * 900000);

    // Call backend API (persists real live order in MongoDB)
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await clientFetch("/orders/place", {
        method: "POST",
        headers,
        body: JSON.stringify({ items, total, totalAmount: total, address: form }),
      });
    } catch (err) {
      console.warn("Live order sync warning:", err);
    }

    try {
      const pastOrders = JSON.parse(localStorage.getItem("spryo_orders") || "[]");
      pastOrders.unshift({
        _id: orderId,
        id: orderId,
        date: "Today, Just now",
        items: [...items],
        total,
        address: form,
        status: "Processing",
      });
      localStorage.setItem("spryo_orders", JSON.stringify(pastOrders));
    } catch (e) {
      console.warn("Order storage error", e);
    }

    clearCart();
    setLoading(false);
    router.push(`/checkout/success?id=${orderId}`);
  };

  if (!items.length) {
    return (
      <div className={styles.checkoutWrapper}>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-2xl mx-auto mb-4">
            <FaShoppingBag />
          </div>
          <h2 className="text-3xl font-black italic text-white [data-theme=light]:text-slate-900 mb-2">YOUR CRATE IS EMPTY</h2>
          <p className="text-white/60 [data-theme=light]:text-slate-600 mb-6">You need to select at least one sparkling drink to checkout.</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm tracking-wide transition"
          >
            EXPLORE DRINKS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.bgGlow}></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <Link href="/cart" className={styles.backBtn}>
          <FaChevronLeft /> BACK TO CRATE
        </Link>

        <h1 className={styles.pageTitle}>
          CHECKOUT <span>DETAILS</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <FaTruck className="text-[#00D1FF]" />
                <h2>SHIPPING INFORMATION</h2>
              </div>

              <div className={styles.inputGrid}>
                {Object.keys(form).map((key) => (
                  <div key={key} className={styles.fieldGroup}>
                    <label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                      className={styles.neonInput}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Confirm */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className={styles.summaryCard}>
              <div className={styles.cardHeaderDark}>
                <FaFileInvoiceDollar className="text-cyan-400" />
                <h2>YOUR CRATE ({items.length})</h2>
              </div>

              <div className={styles.orderList}>
                {items.map((i, idx) => (
                  <div key={i._id || i.id || idx} className={styles.orderItem}>
                    <div>
                      <p className={styles.itemName}>{i.name}</p>
                      <p className={styles.itemQty}>Qty: {i.qty}</p>
                    </div>
                    <span className={styles.itemPrice}>₹{i.price * i.qty}</span>
                  </div>
                ))}
              </div>

              <div className={styles.calcArea}>
                <div className="flex justify-between mb-2 text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between mb-4 text-green-400 font-bold text-sm">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className={styles.placeOrderBtn}
              >
                {loading ? "PREPARING CRATE..." : "CONFIRM ORDER & PAY"}
              </button>

              <div className={styles.securityNote}>
                <FaLock /> 256-BIT SSL ENCRYPTED CHECKOUT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}