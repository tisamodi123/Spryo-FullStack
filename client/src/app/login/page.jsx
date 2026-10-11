"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import styles from "@/styles/auth.module.css";
import { FaLock, FaEnvelope, FaWineGlassAlt, FaUserCheck, FaUserShield } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      setLoading(false);

      if (res && res.success) {
        setIsSuccess(true);
        const isAdmin = res.user?.role === "admin" || res.user?.isAdmin || form.email === "admin@gmail.com";

        if (isAdmin) {
          setMsg("Admin access granted! Entering Command Center...");
          setTimeout(() => {
            window.location.href = "/admin";
          }, 800);
        } else {
          setMsg(res.message || "Welcome back! Entering Spryo Lounge...");
          setTimeout(() => {
            window.location.href = "/profile";
          }, 800);
        }
      } else {
        setIsSuccess(false);
        setMsg(res?.message || "Invalid credentials. Please verify email and password.");
      }
    } catch (err) {
      setLoading(false);
      setIsSuccess(false);
      setMsg("Connection error. Please try again.");
    }
  };

  const fillDemo = (email, password) => {
    setForm({ email, password });
    setMsg("");
  };

  return (
    <div className={styles.authPage}>
      {/* Background Animated Glows */}
      <div className={styles.glowCyan}></div>
      <div className={styles.glowPurple}></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className={styles.glassCard}>
          {/* Logo/Icon section */}
          <div className="text-center mb-8">
            <div className={styles.iconCircle}>
              <FaWineGlassAlt />
            </div>
            <h1 className={styles.title}>
              WELCOME <br /> <span>BACK</span>
            </h1>
            <p className="text-white/50 [data-theme=light]:text-slate-600 text-xs font-bold tracking-[0.2em] uppercase mt-1">
              JWT Authenticated Access
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
              {loading ? "AUTHENTICATING..." : "LOGIN WITH JWT"}
            </button>
          </form>

          {/* Quick Demo Access Pills */}
          <div className="mt-5 pt-4 border-t border-white/10 [data-theme=light]:border-slate-200">
            <p className="text-[10px] uppercase font-bold tracking-wider text-white/50 [data-theme=light]:text-slate-500 text-center mb-2">
              Quick Test Credentials:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo("admin@gmail.com", "admin@123")}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/5 [data-theme=light]:bg-slate-100 hover:bg-white/10 border border-white/10 [data-theme=light]:border-slate-300 text-[11px] font-bold text-cyan-400 [data-theme=light]:text-slate-900 flex items-center justify-center gap-1.5 transition"
              >
                <FaUserShield size={11} /> Admin Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo("user@gmail.com", "user123")}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/5 [data-theme=light]:bg-slate-100 hover:bg-white/10 border border-white/10 [data-theme=light]:border-slate-300 text-[11px] font-bold text-white/80 [data-theme=light]:text-slate-900 flex items-center justify-center gap-1.5 transition"
              >
                <FaUserCheck size={11} /> User Demo
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 [data-theme=light]:text-slate-700 text-sm">
              New to the tribe?{" "}
              <Link href="/signup" className="text-[#00D1FF] [data-theme=light]:text-sky-600 font-black italic hover:underline ml-1">
                SIGNUP HERE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}