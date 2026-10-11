"use client";
import React from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";

export default function CartItem({ item, onRemove, onUpdateQty }) {
  const id = item._id || item.id;
  const qty = item.qty || 1;

  return (
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between transition-colors">
      {/* Drink Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl p-2 flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-white/10 to-transparent [data-theme=light]:from-slate-100 [data-theme=light]:to-slate-50 border border-white/10 [data-theme=light]:border-slate-200">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain filter drop-shadow-md transition-transform hover:scale-110"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00D1FF] [data-theme=light]:text-sky-600">
            {item.category || "SPARKLING SODA"}
          </span>
          <h3 className="font-extrabold text-base sm:text-lg text-white [data-theme=light]:text-slate-900 truncate">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-emerald-400 [data-theme=light]:text-emerald-600">
              ₹{item.price}
            </span>
            <span className="text-xs text-white/40 [data-theme=light]:text-slate-400">
              each
            </span>
          </div>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center bg-white/5 [data-theme=light]:bg-slate-100 border border-white/10 [data-theme=light]:border-slate-200 rounded-full p-1">
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 [data-theme=light]:text-slate-700 hover:text-white [data-theme=light]:hover:text-black hover:bg-white/10 [data-theme=light]:hover:bg-slate-200 transition text-xs"
            onClick={() => onUpdateQty(id, Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
          >
            <FaMinus size={9} />
          </button>
          <span className="w-8 text-center font-extrabold text-sm text-white [data-theme=light]:text-slate-900">
            {qty}
          </span>
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 [data-theme=light]:text-slate-700 hover:text-white [data-theme=light]:hover:text-black hover:bg-white/10 [data-theme=light]:hover:bg-slate-200 transition text-xs"
            onClick={() => onUpdateQty(id, qty + 1)}
            aria-label="Increase quantity"
          >
            <FaPlus size={9} />
          </button>
        </div>

        {/* Total Price for this item */}
        <div className="text-right min-w-[70px]">
          <div className="font-black text-base text-white [data-theme=light]:text-slate-900">
            ₹{item.price * qty}
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          className="text-white/40 [data-theme=light]:text-slate-400 hover:text-rose-500 [data-theme=light]:hover:text-rose-600 transition p-2 rounded-lg"
          onClick={() => onRemove(id)}
          title="Remove from cart"
          aria-label="Remove item"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  );
}
