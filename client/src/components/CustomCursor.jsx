"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/cursor.module.css";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState("rgba(0, 209, 255, 0.6)"); // Default Cyan

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      // Agar element par 'data-color' attribute hai, toh rang badlo
      const color = e.target.closest('[data-color]')?.getAttribute('data-color');
      if (color) {
        setCursorColor(color);
      } else {
        setCursorColor("rgba(0, 209, 255, 0.6)");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div 
      className={styles.cursor} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        backgroundColor: cursorColor,
        boxShadow: `0 0 20px ${cursorColor}` 
      }}
    />
  );
}