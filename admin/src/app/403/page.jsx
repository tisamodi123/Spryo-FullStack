"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminForbidden403Page() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl bg-slate-900/95 border border-rose-500/30 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        
        {/* Pulsing Lock Icon */}
        <div className="relative inline-flex items-center justify-center mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-4xl shadow-inner shadow-rose-500/30">
            🔒
          </div>
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 text-[10px] font-black items-center justify-center text-white">✕</span>
          </span>
        </div>

        {/* Status Code & Heading */}
        <div>
          <div className="inline-block px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            HTTP 403 • FORBIDDEN ACCESS
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            Administrative Access <span className="text-rose-500 underline decoration-rose-500/50">Denied</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            This administrative control system is strictly restricted to the authorized owner. Unauthorized sessions are automatically terminated.
          </p>
        </div>

        {/* Security Incident Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
            <span>ADMIN_FIREWALL_VERIFICATION</span>
            <span className="text-rose-400 font-bold">UNAUTHORIZED</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-slate-400">
            <div>PORTAL: <span className="text-slate-200">Spryo Admin (Port 3001)</span></div>
            <div>VERIFICATION: <span className="text-rose-400">FAILED</span></div>
            <div>TIMESTAMP: <span className="text-slate-300">{timestamp || "LIVE"}</span></div>
            <div>ACTION: <span className="text-emerald-400">SESSION TERMINATED</span></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <span>👑</span>
            <span>Admin Sign In</span>
          </Link>

          <a
            href="http://localhost:3000"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <span>🥤</span>
            <span>Back to Storefront</span>
          </a>
        </div>

      </div>

      <div className="mt-8 text-center text-xs text-slate-600 font-mono">
        Spryo Security Architecture • Protected by Role-Based Encryption
      </div>
    </div>
  );
}
