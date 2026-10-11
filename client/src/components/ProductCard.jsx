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

  // Flavor based dynamic styling
  const getFlavorClass = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("cola")) return styles.colaBg;
    if (n.includes("orange")) return styles.orangeBg;
    if (n.includes("lemon")) return styles.lemonBg;
    if (n.includes("up")) return styles.upBg;
    if (n.includes("power") || n.includes("energy")) return styles.powerBg;
    return styles.defaultBg;
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
    setAdded(true);
    showToast(`${item.name} added to your crate! 🍹`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className={`${styles.campaCard} ${getFlavorClass(item.name)} group`}>
      {/* Top Badges */}
      <div className={styles.topBadges}>
        <span className={styles.ratingBadge}>
          <FaStar className="text-amber-400" size={10} /> {rating}
        </span>
        <span className={styles.discountBadge}>20% OFF</span>
      </div>

      {/* Brand & Flavor Title */}
      <div className={styles.brandHeader}>
        <span className={styles.brandName}>SPRYO CRAFT</span>
        <h3 className={styles.flavorTitle}>
          {item.name.split(" ").pop()}
        </h3>
      </div>

      {/* Product Image with Floating Effect */}
      <Link href={`/product/${item._id || item.id}`} className={styles.imageContainer}>
        <img
          src={image}
          alt={item.name}
          className={styles.floatingBottle}
          loading="lazy"
        />
        <div className={styles.bottleGlow}></div>
      </Link>

      {/* Price Section */}
      <div className={styles.cardPriceRow}>
        <div className={styles.priceContainer}>
          <span className={styles.currency}>₹</span>
          <span className={styles.priceValue}>{price}</span>
          <span className={styles.oldPrice}>₹{originalPrice}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className={styles.campaFooter}>
        <Link
          href={`/product/${item._id || item.id}`}
          className={styles.viewBtn}
        >
          VIEW
        </Link>

        <button
          onClick={handleQuickAdd}
          className={`${styles.quickAddBtn} ${added ? styles.quickAddSuccess : ""}`}
          title="Add to Crate"
          aria-label={`Add ${item.name} to crate`}
        >
          {added ? (
            <>
              <FaCheck size={12} /> ADDED
            </>
          ) : (
            <>
              <FaPlus size={11} /> ADD
            </>
          )}
        </button>
      </div>
    </article>
  );
}