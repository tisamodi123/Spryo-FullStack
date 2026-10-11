"use client";
import React, { useMemo } from "react";
import styles from "@/styles/fizz.module.css";

export default function FizzBackground({ flavor = "classic" }) {
  // Generate a realistic set of 32 rising fizzy bubbles with randomized parameters
  const bubbles = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => {
      const size = Math.floor(4 + (i % 6) * 3 + (i % 3) * 2); // 4px to 22px
      const left = ((i * 3.1 + (i % 7) * 11) % 96) + 2; // distributed 2% to 98%
      const duration = 6 + (i % 7) * 1.5; // 6s to 15s
      const delay = -((i * 1.7) % 12); // pre-staggered so page starts with bubbles already rising!
      const sway = 15 + (i % 5) * 8; // sideways wobble amplitude

      return { id: i, size, left, duration, delay, sway };
    });
  }, []);

  // 4 floating translucent crystal ice cubes
  const iceCubes = useMemo(() => {
    return [
      { id: "ice1", top: "18%", left: "8%", size: 48, rotate: 15, duration: 14, delay: 0 },
      { id: "ice2", top: "42%", right: "6%", size: 62, rotate: -25, duration: 18, delay: -4 },
      { id: "ice3", top: "68%", left: "12%", size: 54, rotate: 35, duration: 16, delay: -8 },
      { id: "ice4", top: "85%", right: "14%", size: 42, rotate: -10, duration: 12, delay: -2 },
    ];
  }, []);

  // Condensation sparkles
  const sparkles = useMemo(() => {
    return [
      { id: "sp1", top: "25%", left: "30%", delay: 1 },
      { id: "sp2", top: "35%", right: "28%", delay: 3 },
      { id: "sp3", top: "60%", left: "45%", delay: 2 },
      { id: "sp4", top: "75%", right: "38%", delay: 4 },
    ];
  }, []);

  return (
    <div className={`${styles.fizzContainer} ${styles[flavor] || styles.classic}`} aria-hidden="true">
      {/* 🧊 FLOATING ICE CUBES */}
      {iceCubes.map((ice) => (
        <div
          key={ice.id}
          className={styles.iceCube}
          style={{
            top: ice.top,
            left: ice.left,
            right: ice.right,
            width: `${ice.size}px`,
            height: `${ice.size}px`,
            animationDuration: `${ice.duration}s`,
            animationDelay: `${ice.delay}s`,
            transform: `rotate(${ice.rotate}deg)`,
          }}
        >
          <div className={styles.iceInnerHighlight}></div>
        </div>
      ))}

      {/* ✨ BEVERAGE CONDENSATION SPARKLES */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className={styles.sparkle}
          style={{
            top: sp.top,
            left: sp.left,
            right: sp.right,
            animationDelay: `${sp.delay}s`,
          }}
        ></div>
      ))}

      {/* 🫧 RISING CARBONATED FIZZ BUBBLES */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`${styles.bubble} ${b.size > 12 ? styles.largeBubble : styles.microBubble}`}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            "--sway": `${b.sway}px`,
          }}
        >
          <div className={styles.bubbleGlint}></div>
        </div>
      ))}
    </div>
  );
}