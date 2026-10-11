"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/pour.module.css";

export default function PerfectPour({ category }) {
  const [fillLevel, setFillLevel] = useState(0);

  const liquidColors = {
    cola: "linear-gradient(to top, #ff003c, #4a0011)",
    lemon: "linear-gradient(to top, #d4ff00, #4a5400)",
    orange: "linear-gradient(to top, #ff6b00, #4a2100)",
    up: "linear-gradient(to top, #00d1ff, #003a4a)",
    All: "linear-gradient(to top, #ffffff1a, #ffffff05)"
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      // 0 to 100 percentage based on full page scroll
      const percentage = (currentScroll / scrollHeight) * 100;
      setFillLevel(percentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.hugeGlass}>
      <div 
        className={styles.liquid} 
        style={{ 
          height: `${fillLevel}%`, 
          background: liquidColors[category] || liquidColors.All,
          boxShadow: `0 0 40px ${category === 'All' ? 'rgba(255,255,255,0.1)' : 'currentColor'}`
        }}
      >
        <div className={styles.waveContainer}>
            {/* Animated SVG Wave */}
            <svg className={styles.waves} viewBox="0 24 150 28" preserveAspectRatio="none">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className={styles.parallax}>
                <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.3)" />
                <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              </g>
            </svg>
        </div>
      </div>
    </div>
  );
}