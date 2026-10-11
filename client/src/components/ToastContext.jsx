"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import Link from "next/link";
import { FaCheckCircle, FaShoppingCart, FaTimes } from "react-icons/fa";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      message,
      type: options.type || "success",
      link: options.link || "/cart",
      linkText: options.linkText || "View Crate",
      duration: options.duration || 3500,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toasts Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#0f172a]/95 text-white border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
            style={{
              boxShadow: "0 10px 30px -5px rgba(0, 209, 255, 0.3)",
            }}
          >
            <div className="text-cyan-400 text-xl flex-shrink-0">
              <FaCheckCircle />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-white tracking-wide">{toast.message}</p>
              {toast.link && (
                <Link
                  href={toast.link}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline inline-flex items-center gap-1 mt-0.5"
                >
                  <FaShoppingCart size={11} /> {toast.linkText}
                </Link>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 transition"
            >
              <FaTimes size={13} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: () => {} };
  }
  return context;
};
