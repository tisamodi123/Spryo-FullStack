"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cw_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch (err) {
      console.error("Error reading cart from localStorage", err);
    }
  }, []);

  // persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("cw_cart", JSON.stringify(items));
    } catch (err) {
      console.error("Error saving cart to localStorage", err);
    }
  }, [items]);

  // helpers
  const addToCart = (product, qty = 1) => {
    // Enforce login requirement
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }
      return false;
    }

    const id = product._id || product.id;
    setItems(prev => {
      const exists = prev.find(p => (p._id || p.id) === id);
      if (exists) {
        return prev.map(p => ( (p._id||p.id) === id ? { ...p, qty: (p.qty||0) + qty } : p ));
      }
      return [...prev, { ...(product), qty }];
    });
    return true;
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(p => (p._id || p.id) !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setItems(prev => prev.map(p => ((p._id||p.id) === id ? { ...p, qty } : p)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((s, it) => s + (it.qty || 0), 0);
  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (it.qty || 0)), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
