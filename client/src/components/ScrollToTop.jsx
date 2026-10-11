"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/scrollToTop.module.css";
import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll check karne ke liye logic
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const FloatingGirlSVG = () => (
  <svg width="80" height="120" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body & Dress (Neon Cyan) */}
    <path d="M40 60 C 35 80, 65 80, 60 60 L 55 110 L 45 110 Z" fill="#00D1FF" opacity="0.8" />
    
    {/* Head */}
    <circle cx="50" cy="45" r="15" fill="#FFE0BD" />
    
    {/* Hair (Dark Purple to match theme) */}
    <path d="M35 45 Q 35 25 50 25 Q 65 25 65 45 L 68 55 Q 50 50 32 55 Z" fill="#1a0b2e" />
    
    {/* Hand pointing up (The Paperboat move) */}
    <path d="M58 55 L 65 20 M 65 20 L 63 25 M 65 20 L 67 25" stroke="#FFE0BD" strokeWidth="3" strokeLinecap="round" />
    
    {/* Legs */}
    <path d="M48 110 L 45 140" stroke="#FFE0BD" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 110 L 55 130 Q 55 140 60 140" stroke="#FFE0BD" strokeWidth="3" strokeLinecap="round" />
    
    {/* Neon Glow Aura */}
    <circle cx="50" cy="75" r="45" stroke="#00D1FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
      <animateTransform attributeName="transform" type="rotate" from="0 50 75" to="360 50 75" dur="10s" repeatCount="indefinite" />
    </circle>
  </svg>
);
  return (
    <>
      {isVisible && (
        <div className={styles.scrollContainer} onClick={scrollToTop}>
          <div className={styles.speechBubble}>Back to Top!</div>
          <div className={styles.characterWrapper}>
           <FloatingGirlSVG />
            <div className={styles.neonTrail}></div>
          </div>
        </div>
      )}
    </>
  );
}