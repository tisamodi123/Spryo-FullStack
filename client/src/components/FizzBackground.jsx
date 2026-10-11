"use client";
import styles from "@/styles/fizz.module.css";

export default function FizzBackground() {
  // Hum 15-20 bubbles generate karenge alag-alag sizes ke
  const bubbles = Array.from({ length: 20 });

  return (
    <div className={styles.fizzContainer}>
      {bubbles.map((_, i) => (
        <div key={i} className={styles.bubble}></div>
      ))}
    </div>
  );
}