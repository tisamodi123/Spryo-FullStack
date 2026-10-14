"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Always default to dark mode when the website is opened
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      // By default the website always opens in dark mode
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.removeItem("spryo_theme");
      sessionStorage.removeItem("spryo_theme");
    } catch (e) {
      console.warn("Theme storage error", e);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      document.documentElement.setAttribute("data-theme", nextTheme);
    } catch (e) {
      console.warn("Theme toggle error", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: "dark", toggleTheme: () => {}, mounted: false };
  }
  return context;
};
