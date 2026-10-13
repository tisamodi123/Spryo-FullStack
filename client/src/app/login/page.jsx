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
          setMsg("Admin access granted! Redirecting to Dashboard...");
          setTimeout(() => {
            window.location.href = "http://localhost:3001/admin/dashboard";
          }, 700);
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
        </div>
      </div>
    </div>
  );
}