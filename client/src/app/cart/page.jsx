"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import CartItem from "@/components/CartItem";
import { useRouter } from "next/navigation";
import styles from "@/styles/cart.module.css";
import { 
  FaShoppingCart, 
  FaArrowLeft, 
  FaTrashAlt, 
  FaShieldAlt, 
  FaTag, 
  FaCheckCircle, 
  FaTruck 
} from "react-icons/fa";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, total } = useCart();
  const router = useRouter();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const discountAmount = couponApplied ? Math.round(total * 0.2) : 0;
  const finalTotal = Math.max(0, total - discountAmount);

  const freeDeliveryThreshold = 250;
  const progressPercent = Math.min(100, Math.round((total / freeDeliveryThreshold) * 100));

  const applyCoupon = (e) => {
    e.preventDefault();
    if (!coupon.trim()) return;

    if (coupon.trim().toUpperCase() === "SPRYO20") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid promo code. Try 'SPRYO20'");
      setCouponApplied(false);
    }
  };

  const goToCheckout = () => {
    if (!items.length) return;
    router.push("/checkout");
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.glowEffect}></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <Link href="/products" className={styles.backLink}>
              <FaArrowLeft /> CONTINUE REFRESHING
            </Link>
            <h1 className={styles.pageTitle}>
              YOUR <span>CRATE</span>
            </h1>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className={styles.clearBtn}>
              <FaTrashAlt /> EMPTY CRATE
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FaShoppingCart />
            </div>
            <h2>YOUR CRATE IS THIRSTY</h2>
            <p>Looks like you haven't added any sparkling drinks yet.</p>
            <Link href="/products" className={styles.shopBtn}>
              EXPLORE DRINKS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT - ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-2xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-bold text-white [data-theme=light]:text-slate-800 mb-2">
                  <span className="flex items-center gap-2 text-cyan-400 [data-theme=light]:text-sky-600">
                    <FaTruck />
                    {total >= freeDeliveryThreshold
                      ? "🎉 You've unlocked FREE Chilled Delivery!"
                      : `Add ₹${freeDeliveryThreshold - total} more for FREE Chilled Delivery`}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/10 [data-theme=light]:bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {items.map((item) => (
                <div key={item._id || item.id} className={styles.itemWrapper}>
                  <CartItem
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQty={updateQty}
                  />
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="lg:sticky lg:top-24 h-fit space-y-4">
              {/* Promo Code Box */}
              <div className="bg-white/5 [data-theme=light]:bg-white p-4 rounded-2xl border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-sm backdrop-blur-md">
                <form onSubmit={applyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (try SPRYO20)"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setCouponError("");
                      }}
                      className="w-full bg-black/30 [data-theme=light]:bg-slate-50 border border-white/15 [data-theme=light]:border-slate-300 rounded-xl px-3 py-2 text-xs text-white [data-theme=light]:text-slate-900 placeholder-white/40 [data-theme=light]:placeholder-slate-400 uppercase font-semibold focus:outline-none focus:border-cyan-400 [data-theme=light]:focus:border-sky-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 [data-theme=light]:bg-slate-900 hover:bg-cyan-400 [data-theme=light]:hover:bg-sky-600 hover:text-black [data-theme=light]:hover:text-white text-white text-xs font-black transition"
                  >
                    APPLY
                  </button>
                </form>

                {couponApplied && (
                  <p className="text-xs text-green-400 [data-theme=light]:text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <FaCheckCircle /> 20% Discount applied successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-400 [data-theme=light]:text-rose-600 font-semibold mt-2">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Order Summary Card */}
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>ORDER SUMMARY</h2>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                {couponApplied && (
                  <div className={`${styles.summaryRow} text-green-400 font-semibold`}>
                    <span className="flex items-center gap-1">
                      <FaTag size={10} /> Discount (20%)
                    </span>
                    <span>−₹{discountAmount}</span>
                  </div>
                )}

                <div className={styles.summaryRow}>
                  <span>Chilled Delivery</span>
                  <span className={styles.freeText}>
                    {total >= freeDeliveryThreshold ? "FREE" : "₹40"}
                  </span>
                </div>

                <div className={styles.divider}></div>

                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total Amount</span>
                  <span>₹{finalTotal + (total >= freeDeliveryThreshold ? 0 : 40)}</span>
                </div>

                <button onClick={goToCheckout} className={styles.checkoutBtn}>
                  PROCEED TO PAY
                </button>

                <div className={styles.secureTag}>
                  <FaShieldAlt /> 100% SECURE ENCRYPTED CHECKOUT
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}