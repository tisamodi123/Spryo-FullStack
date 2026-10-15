"use client";
import React, { useState } from "react";
import styles from "@/styles/productcard.module.css";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";
import { FaPlus, FaCheck, FaStar } from "react-icons/fa";

export default function ProductCard({ item }) {
  if (!item) return null;

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const image = item.image || "/cola.png";
  const price = item.price || 99;
  const originalPrice = item.originalPrice || Math.round(price * 1.25);
  const rating = item.rating || 4.9;

  // Flavor based dynamic accent border
  const getFlavorClass = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("cola")) return styles.colaTheme;
    if (n.includes("orange")) return styles.orangeTheme;
    if (n.includes("lemon")) return styles.lemonTheme;
    if (n.includes("up")) return styles.upTheme;
    return styles.defaultTheme;
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(item, 1);
    if (!success) {
      showToast("Please sign in first to add items to your crate! 🔒");
      return;
    }
    setAdded(true);
    showToast(`${item.name} added to your crate! ✨`);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={`${styles.productCard} ${getFlavorClass(item.name)}`}>
      {/* Top Badges */}
      <div className={styles.topBadges}>
        <span className={styles.ratingBadge}>
          <FaStar className="text-amber-400" size={10} /> {rating}
        </span>
        <span className={styles.discountBadge}>SAVE 20%</span>
      </div>

      {/* Product Image Stage */}
      <Link href={`/product/${item._id || item.id}`} className={styles.imageStage}>
        <div className={styles.pedestalAura}></div>
        <img
          src={image}
          alt={item.name}
          className={styles.bottleImg}
          loading="lazy"
        />
      </Link>

      {/* Details Header */}
      <div className={styles.infoSection}>
        <div className={styles.brandTag}>SPRYO BOTANICALS • 330ML</div>
        <h3 className={styles.productName}>
          <Link href={`/product/${item._id || item.id}`}>
            {item.name}
          </Link>
        </h3>
        <p className={styles.productDescription}>
          {item.description || "Sub-zero cold-pressed sparkling soda with 100% natural fruit extract."}
        </p>

        {/* Pricing & Actions */}
        <div className={styles.footerRow}>
          <div className={styles.priceGroup}>
            <span className={styles.priceCurrent}>₹{price}</span>
            <span className={styles.priceOriginal}>₹{originalPrice}</span>
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={handleQuickAdd}
              className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ""}`}
              aria-label={`Add ${item.name} to crate`}
            >
              {added ? (
                <>
                  <FaCheck size={11} /> Added
                </>
              ) : (
                <>
                  <FaPlus size={10} /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}