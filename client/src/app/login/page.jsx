"use client";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import styles from "@/styles/auth.module.css";
import { FaLock, FaEnvelope, FaWineGlassAlt } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAdminChoice, setShowAdminChoice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      setLoading(false);

      if (res && res.success) {
        setIsSuccess(true);
        const isAdmin = res.user?.role === "admin" || res.user?.isAdmin || form.email.trim().toLowerCase() === "admin@gmail.com";

        if (isAdmin) {
          setShowAdminChoice(true);
        } else {
          setMsg(res.message || "Welcome back! Redirecting...");
          setTimeout(() => {
            window.location.href = "/profile";
          }, 700);
        }
      } else {
        setIsSuccess(false);
        setMsg(res?.message || "Invalid email or password.");
      }
    } catch (err) {
      setLoading(false);
      setIsSuccess(false);
      setMsg("Connection error. Please try again.");
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Background Animated Glows */}
      <div className={styles.glowCyan}></div>
      <div className={styles.glowPurple}></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className={styles.glassCard}>
          {showAdminChoice ? (
            <div className="text-center py-2 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-amber-500/20">
                👑
              </div>
              <div>
                <h2 className="text-xl font-black text-white [data-theme=light]:text-slate-900 tracking-tight">
                  ADMIN ACCESS CONFIRMED
                </h2>
                <p className="text-white/60 [data-theme=light]:text-slate-600 text-xs mt-1.5 font-medium">
                  Welcome back, Spryo Administrator! Where would you like to go?
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "http://localhost:3001/admin/dashboard";
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold p-4 rounded-xl text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-between group cursor-pointer text-left border-0"
                >
                  <div>
                    <div className="font-black text-sm flex items-center gap-2">
                      <span>📊 Admin Dashboard</span>
                      <span className="text-[10px] bg-blue-700 text-white px-2 py-0.5 rounded-full uppercase">PORT 3001</span>
                    </div>
                    <div className="text-xs text-blue-100 font-normal mt-0.5">
                      Manage live orders, products, and customer database
                    </div>
                  </div>
                  <span className="text-lg font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                  className="w-full bg-slate-800/80 hover:bg-slate-700/80 [data-theme=light]:bg-slate-200 [data-theme=light]:hover:bg-slate-300 text-white [data-theme=light]:text-slate-900 font-extrabold p-4 rounded-xl text-sm transition flex items-center justify-between group cursor-pointer text-left border border-white/10 [data-theme=light]:border-slate-300"
                >
                  <div>
                    <div className="font-black text-sm flex items-center gap-2">
                      <span>🥤 Spryo Storefront</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 [data-theme=light]:text-emerald-700 px-2 py-0.5 rounded-full uppercase">PORT 3000</span>
                    </div>
                    <div className="text-xs text-white/60 [data-theme=light]:text-slate-600 font-normal mt-0.5">
                      Browse drinks, place test orders & view customer experience
                    </div>
                  </div>
                  <span className="text-lg font-bold group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Logo / Header section */}
              <div className="text-center mb-8">
                <div className={styles.iconCircle}>
                  <FaWineGlassAlt />
                </div>
                <h1 className={styles.title}>
                  WELCOME <br /> <span>BACK</span>
                </h1>
                <p className="text-white/50 [data-theme=light]:text-slate-600 text-xs font-semibold tracking-wider uppercase mt-1">
                  The House of Refreshment
                </p>
              </div>

              {/* Success / Error Message Display */}
              {msg && (
                <div className={`${styles.alert} ${isSuccess ? styles.success : styles.error}`}>
                  {msg}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={styles.inputField}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.inputField}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/60 [data-theme=light]:text-slate-700 text-sm">
                  New to the tribe?{" "}
                  <Link href="/signup" className="text-[#00D1FF] [data-theme=light]:text-sky-600 font-black italic hover:underline ml-1">
                    SIGNUP HERE
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}