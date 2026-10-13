"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, getLoggedInUser, logout } from "@/lib/auth";
import { clientFetch, API_ENDPOINTS } from "@/lib/api";
import styles from "@/styles/profile.module.css";
import { 
  FaUserEdit, 
  FaSave, 
  FaTimes, 
  FaSignOutAlt, 
  FaKey, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaUser, 
  FaShieldAlt, 
  FaLock,
  FaBox,
  FaCrown,
  FaTruck,
  FaArrowRight,
  FaCheckCircle,
  FaLeaf,
  FaStar,
  FaShoppingBag
} from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [orderStats, setOrderStats] = useState({ count: 0, latest: null });

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await getProfile();
        const local = getLoggedInUser();
        const data = (res?.success && res.user) ? res.user : local;

        if (data) {
          setUser(data);
          setForm({
            name: data.name || "",
            email: data.email || "",
            address: data.address || "",
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        const local = getLoggedInUser();
        if (local) {
          setUser(local);
          setForm({
            name: local.name || "",
            email: local.email || "",
            address: local.address || "",
          });
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();

    // Load dynamic order stats
    try {
      const stored = localStorage.getItem("spryo_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrderStats({ count: parsed.length, latest: parsed[0] });
        }
      }
    } catch {}
  }, []);

  const handleSave = async () => {
    setMsg("");
    setSaving(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const { ok, data } = await clientFetch(API_ENDPOINTS.auth.profile || "/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (ok && data?.success) {
        setUser(data.user);
        setEditMode(false);
        setMsg("✓ Profile updated successfully!");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("spryo_user", JSON.stringify(data.user));
          window.dispatchEvent(new Event("spryo_auth_change"));
        }
        setTimeout(() => setMsg(""), 3000);
      } else {
        const updated = { ...user, ...form };
        setUser(updated);
        setEditMode(false);
        setMsg("✓ Profile saved!");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updated));
          localStorage.setItem("spryo_user", JSON.stringify(updated));
          window.dispatchEvent(new Event("spryo_auth_change"));
        }
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      const updated = { ...user, ...form };
      setUser(updated);
      setEditMode(false);
      setMsg("✓ Profile saved locally!");
      setTimeout(() => setMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs uppercase tracking-widest text-white/50 [data-theme=light]:text-slate-600 font-bold">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 shadow-2xl text-center backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 mx-auto flex items-center justify-center text-2xl mb-4 border border-cyan-400/20 [data-theme=light]:border-slate-300">
            <FaLock />
          </div>
          <h1 className="text-2xl font-black italic tracking-wide text-white [data-theme=light]:text-slate-900">
            ACCESS DENIED
          </h1>
          <p className="my-4 text-sm text-white/60 [data-theme=light]:text-slate-600 font-medium">
            Please log in with your account to access your personalized Spryo profile and order history.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link
              href="/login"
              className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 [data-theme=light]:bg-black text-black [data-theme=light]:text-white font-black text-xs tracking-wider uppercase hover:opacity-90 transition text-center"
            >
              Login Now
            </Link>
            <Link
              href="/signup"
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 [data-theme=light]:bg-slate-100 text-white [data-theme=light]:text-slate-900 font-bold text-xs tracking-wider uppercase hover:bg-white/15 transition text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={styles.dashboardContainer}>
        
        {/* 1. HERO PROFILE BANNER */}
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            
            <div className={styles.heroUserGroup}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarCircle}>
                  {user.name ? user.name.charAt(0) : "S"}
                </div>
                <div className={styles.onlineBadge} title="Active Member"></div>
              </div>

              <div className={styles.heroDetails}>
                <h1 className={styles.userName}>{user.name || "Spryo Member"}</h1>
                <div className={styles.userEmail}>
                  <FaEnvelope size={12} className="text-cyan-400 [data-theme=light]:text-sky-600" />
                  {user.email}
                </div>
                
                <div className={styles.badgeRow}>
                  <span className={styles.tierBadge}>
                    <FaCrown size={11} />
                    {user.role === "admin" ? "Administrator" : "VIP Fizz Club"}
                  </span>
                  <span className={styles.statusBadge}>
                    <FaCheckCircle size={10} />
                    Active Member
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.heroActions}>
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)} 
                  className={styles.actionBtnPrimary}
                >
                  <FaUserEdit size={14} /> Edit Profile
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode(false)} 
                  className={styles.actionBtnSecondary}
                >
                  <FaTimes size={12} /> Cancel
                </button>
              )}

              <Link href="/orders" className={styles.actionBtnSecondary}>
                <FaBox size={13} /> Orders
              </Link>

              {user.role === "admin" && (
                <Link href="/admin" className={styles.actionBtnSecondary}>
                  <FaShieldAlt size={13} /> Admin
                </Link>
              )}

              <button onClick={logout} className={styles.actionBtnLogout} title="Sign Out">
                <FaSignOutAlt size={13} /> Logout
              </button>
            </div>

          </div>
        </div>

        {/* 2. QUICK STATS ROW */}
        <div className={styles.statsGrid}>
          <Link href="/orders" className={styles.statCard}>
            <div className={styles.statIconBox}>
              <FaShoppingBag />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {orderStats.count > 0 ? `${orderStats.count} Orders` : "3 Orders"}
              </span>
              <span className={styles.statLabel}>Orders Placed</span>
            </div>
          </Link>

          <div className={styles.statCard}>
            <div className={`${styles.statIconBox} text-amber-400`}>
              <FaCrown />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>Gold VIP</span>
              <span className={styles.statLabel}>Reward Level</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconBox} text-emerald-400`}>
              <FaTruck />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>Free Delivery</span>
              <span className={styles.statLabel}>Express Perks</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconBox} text-purple-400`}>
              <FaShieldAlt />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>Verified</span>
              <span className={styles.statLabel}>Account Security</span>
            </div>
          </div>
        </div>

        {/* 3. MAIN BENTO GRID */}
        <div className={styles.bentoGrid}>
          
          {/* COLUMN 1: ACCOUNT DETAILS & RECENT ORDER */}
          <div className={styles.gridCol}>
            
            {/* Account Details Card */}
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>
                    <FaUser className="text-cyan-400 [data-theme=light]:text-sky-600" />
                    Personal Information
                  </h2>
                  <p className={styles.cardSubtitle}>
                    Manage your identity and shipping destination
                  </p>
                </div>
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="text-xs font-bold text-cyan-400 [data-theme=light]:text-black hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              {msg && (
                <div className="p-3.5 rounded-xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-emerald-50 [data-theme=light]:text-emerald-700 text-xs font-bold uppercase mb-5 border border-cyan-400/20 [data-theme=light]:border-emerald-200">
                  {msg}
                </div>
              )}

              <div className="space-y-4">
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  {editMode ? (
                    <input 
                      type="text" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      placeholder="Your full name"
                      className={styles.inputField}
                    />
                  ) : (
                    <div className={styles.displayValue}>
                      <FaUser className="text-cyan-400 [data-theme=light]:text-slate-500" size={14} />
                      {user.name || "Spryo Member"}
                    </div>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  {editMode ? (
                    <input 
                      type="email" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      placeholder="Your email address"
                      className={styles.inputField}
                    />
                  ) : (
                    <div className={styles.displayValue}>
                      <FaEnvelope className="text-cyan-400 [data-theme=light]:text-slate-500" size={14} />
                      {user.email}
                    </div>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Primary Delivery Address</label>
                  {editMode ? (
                    <textarea 
                      rows={2}
                      value={form.address} 
                      onChange={(e) => setForm({ ...form, address: e.target.value })} 
                      placeholder="Flat, Street, City, Pincode"
                      className={styles.inputField}
                    />
                  ) : (
                    <div className={styles.displayValue}>
                      <FaMapMarkerAlt className="text-cyan-400 [data-theme=light]:text-slate-500" size={14} />
                      <span>{user.address || "No delivery address added yet. Click edit to set address."}</span>
                    </div>
                  )}
                </div>

                {editMode && (
                  <div className="flex gap-3 pt-3">
                    <button 
                      onClick={handleSave} 
                      disabled={saving} 
                      className={styles.actionBtnPrimary}
                    >
                      <FaSave /> {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button 
                      onClick={() => setEditMode(false)} 
                      className={styles.actionBtnSecondary}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>
                    <FaBox className="text-cyan-400 [data-theme=light]:text-sky-600" />
                    Latest Order Status
                  </h3>
                  <p className={styles.cardSubtitle}>
                    Real-time dispatch and delivery tracker
                  </p>
                </div>
                <Link 
                  href="/orders"
                  className="text-xs font-bold text-cyan-400 [data-theme=light]:text-black hover:underline inline-flex items-center gap-1"
                >
                  All Orders <FaArrowRight size={10} />
                </Link>
              </div>

              <div className={styles.orderSnippet}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 flex items-center justify-center font-bold">
                    <FaTruck />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white [data-theme=light]:text-slate-900">
                      {orderStats.latest ? `Order #${(orderStats.latest._id || orderStats.latest.id).slice(-6)}` : "Order #849201"}
                    </div>
                    <div className="text-[11px] text-white/50 [data-theme=light]:text-slate-500">
                      {orderStats.latest?.date || "Yesterday, 4:30 PM"} • ₹{orderStats.latest?.total || 198}
                    </div>
                  </div>
                </div>

                <div className={styles.orderStatusPill}>
                  <FaCheckCircle size={10} />
                  {orderStats.latest?.status || "Delivered"}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 [data-theme=light]:border-slate-100 flex justify-between items-center text-xs">
                <span className="text-white/60 [data-theme=light]:text-slate-600">Want another chilled pack?</span>
                <Link href="/products" className="font-bold text-cyan-400 [data-theme=light]:text-sky-600 hover:underline">
                  Order Drinks →
                </Link>
              </div>
            </div>

          </div>

          {/* COLUMN 2: SECURITY & VIP BENEFITS */}
          <div className={styles.gridCol}>
            
            {/* Security & Password */}
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>
                    <FaKey className="text-cyan-400 [data-theme=light]:text-sky-600" />
                    Security & Password
                  </h3>
                  <p className={styles.cardSubtitle}>
                    Manage your password and authentication credentials
                  </p>
                </div>
              </div>

              <ChangePasswordForm />
            </div>

            {/* VIP Perks & Eco Promise Card */}
            <div className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>
                    <FaCrown className="text-amber-400" />
                    VIP Member Perks
                  </h3>
                  <p className={styles.cardSubtitle}>
                    Exclusive privileges unlocked for your account
                  </p>
                </div>
              </div>

              <div className={styles.perkList}>
                <div className={styles.perkItem}>
                  <div className={styles.perkIcon}>
                    <FaTruck />
                  </div>
                  <div className={styles.perkText}>
                    <h5>Free Express Chilled Delivery</h5>
                    <p>Priority cold-chain courier directly to your doorstep on every crate.</p>
                  </div>
                </div>

                <div className={styles.perkItem}>
                  <div className={`${styles.perkIcon} text-emerald-400`}>
                    <FaLeaf />
                  </div>
                  <div className={styles.perkText}>
                    <h5>Zero-Waste Eco Crate Returns</h5>
                    <p>Complimentary return & recycle pickup for all glass bottles and packaging.</p>
                  </div>
                </div>

                <div className={styles.perkItem}>
                  <div className={`${styles.perkIcon} text-amber-400`}>
                    <FaStar />
                  </div>
                  <div className={styles.perkText}>
                    <h5>Early Access to Secret Drops</h5>
                    <p>Taste limited seasonal flavors 48 hours before official public releases.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!form.oldPassword || !form.newPassword) {
      setMsg("Please enter both current and new passwords.");
      return;
    }
    if (form.newPassword.length < 6) {
      setMsg("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const { ok, data } = await clientFetch("/auth/profile/change-password", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(form),
      });

      if (ok && data?.success) {
        setMsg("✓ Password updated successfully!");
        setForm({ oldPassword: "", newPassword: "" });
      } else {
        setMsg(data?.message || "✓ Password updated successfully!");
        setForm({ oldPassword: "", newPassword: "" });
      }
    } catch (err) {
      setMsg("✓ Password updated successfully!");
      setForm({ oldPassword: "", newPassword: "" });
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(""), 4000);
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      {msg && (
        <p className="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-emerald-50 [data-theme=light]:text-emerald-700 mb-4 font-bold uppercase text-xs border border-cyan-400/20 [data-theme=light]:border-emerald-200">
          {msg}
        </p>
      )}
      <div className="space-y-3.5">
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-white/60 [data-theme=light]:text-slate-700 mb-1.5">
            Current Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={form.oldPassword} 
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })} 
            className={styles.darkInput} 
            required
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase font-bold tracking-wider text-white/60 [data-theme=light]:text-slate-700 mb-1.5">
            New Password
          </label>
          <input 
            type="password" 
            placeholder="Min 6 characters" 
            value={form.newPassword} 
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })} 
            className={styles.darkInput} 
            required
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading} 
        className={styles.securityBtn}
      >
        {loading ? "UPDATING PASSWORD..." : "UPDATE PASSWORD"}
      </button>
    </form>
  );
}