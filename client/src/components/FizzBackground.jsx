"use client";
import React from "react";
import styles from "@/styles/fizz.module.css";

/**
 * Modern, clean ambient background.
 * Replaced all floating bubbles, ice cubes, and sparkles with a sleek, subtle,
 * high-end ambient light gradient that adapts to flavor and theme.
 */
export default function FizzBackground({ flavor = "classic" }) {
  return (
    <div className={`${styles.ambientContainer} ${styles[flavor] || styles.classic}`} aria-hidden="true">
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>
      <div className={styles.ambientGridOverlay}></div>
    </div>
  );
}