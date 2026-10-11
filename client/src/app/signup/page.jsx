"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import styles from "@/styles/auth.module.css";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await registerUser(form);
      setLoading(false);

      if (res && res.success) {
        setIsSuccess(true);
        setMsg(res.message || "Account created successfully! Entering Spryo Lounge...");
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1000);
      } else {
        setIsSuccess(false);
        setMsg(res?.message || "Failed to create account. Try another email or password.");
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

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className={styles.glassCard}>
          {/* Top Branding */}
          <div className="text-center mb-8">
            <div className={styles.iconCircle}>
              <FaUserPlus />
            </div>
            <h1 className={styles.title}>
              JOIN THE <br /> <span>TRIBE</span>
            </h1>
            <p className="text-white/50 [data-theme=light]:text-slate-600 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Start Your Refreshing Journey
            </p>
          </div>

          {/* Success / Error Alert */}
          {msg && (
            <div className={`${styles.alert} ${isSuccess ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                placeholder="Full Name"
                className={styles.inputField}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>

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
                placeholder="Password (Min 6 chars)"
                className={styles.inputField}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 [data-theme=light]:text-slate-700 text-sm">
              Already a member?{" "}
              <Link href="/login" className="text-[#00D1FF] [data-theme=light]:text-sky-600 font-black italic hover:underline ml-1">
                LOGIN HERE
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/30 [data-theme=light]:text-slate-500 text-[10px] mt-6 tracking-widest uppercase">
          © 2026 SPRYO BEVERAGES INDIA
        </p>
      </div>
    </div>
  );
}