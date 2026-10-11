"use client";
import React from "react";

export default function CartItem({ item, onRemove, onUpdateQty }) {
  const id = item._id || item.id;
  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-center">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{item.name}</div>
        <div className="text-sm text-gray-500">{item.category}</div>
        <div className="text-green-600 font-bold mt-1">₹{item.price}</div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => onUpdateQty(id, Math.max(1, (item.qty || 1) - 1))}
          >-</button>
          <div className="px-3">{item.qty || 1}</div>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => onUpdateQty(id, (item.qty || 1) + 1)}
          >+</button>
        </div>
        <button
          className="text-sm text-red-600"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
