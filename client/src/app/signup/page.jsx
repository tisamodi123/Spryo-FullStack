
//for backend

// "use client";
// import { registerUser } from "@/lib/auth";
// import { useState } from "react";
// import Link from "next/link";
// import styles from "@/styles/auth.module.css"; 
// import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setLoading(true);

//     const res = await registerUser(form);
//     setLoading(false);

//     if (!res.success) {
//       setMsg(res.message);
//       return;
//     }

//     setMsg("Signup successful! Redirecting to login...");
//     // 1.5 seconds delay taaki user success message dekh sake
//     setTimeout(() => (window.location.href = "/login"), 1500);
//   };

//   return (
//     <div className={styles.authPage}>
//       {/* Background Animated Glows */}
//       <div className={styles.glowCyan}></div>
//       <div className={styles.glowPurple}></div>

//       <div className="relative z-10 w-full max-w-md px-4 py-10">
//         <div className={styles.glassCard}>
//           {/* Top Branding */}
//           <div className="text-center mb-8">
//             <div className={styles.iconCircle}>
//               <FaUserPlus />
//             </div>
//             <h1 className={styles.title}>
//               JOIN THE <br /> <span>TRIBE</span>
//             </h1>
//             <p className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase mt-2">
//               Start Your Refreshing Journey
//             </p>
//           </div>

//           {msg && (
//             <div className={`${styles.alert} ${msg.toLowerCase().includes("successful") ? styles.success : styles.error}`}>
//               {msg}
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div className={styles.inputWrapper}>
//               <FaUser className={styles.inputIcon} />
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className={styles.inputField}
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className={styles.inputWrapper}>
//               <FaEnvelope className={styles.inputIcon} />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className={styles.inputField}
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className={styles.inputWrapper}>
//               <FaLock className={styles.inputIcon} />
//               <input
//                 type="password"
//                 placeholder="Create Password"
//                 className={styles.inputField}
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={styles.submitBtn}
//             >
//               {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-white/60 text-sm">
//               Already a member?{" "}
//               <Link href="/login" className="text-[#00D1FF] font-black italic hover:underline ml-1">
//                 LOGIN HERE
//               </Link>
//             </p>
//           </div>
//         </div>
        
//         <p className="text-center text-white/20 text-[10px] mt-6 tracking-widest uppercase">
//           © 2025 SPRYO BEVERAGES INDIA
//         </p>
//       </div>
//     </div>
//   );
// }


//for static
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/auth.module.css"; 
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    // --- STATIC SIGNUP LOGIC ---
    // Instead of calling an API, we simulate a network delay ⏳
    setTimeout(() => {
      setLoading(false);

      // Simple validation check for demo purposes
      if (form.email.includes("@")) {
        setMsg("Signup successful! Redirecting to login...");
        
        // Save to localStorage just for the demo session (optional)
        localStorage.setItem("static_user", JSON.stringify(form));

        // Redirect after a short delay so the user can see the success message
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMsg("Error: Please enter a valid email address.");
      }
    }, 1200); // 1.2 second simulated delay
  };

  return (
    <div className={styles.authPage}>
      {/* Background Animated Glows */}
      <div className={styles.glowCyan}></div>
      <div className={styles.glowPurple}></div>

      <div className="relative z-10 w-full max-w-md px-4 py-10">
        <div className={styles.glassCard}>
          {/* Top Branding */}
          <div className="text-center mb-8">
            <div className={styles.iconCircle}>
              <FaUserPlus />
            </div>
            <h1 className={styles.title}>
              JOIN THE <br /> <span>TRIBE</span>
            </h1>
            <p className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase mt-2">
              Start Your Refreshing Journey
            </p>
          </div>

          {/* Success/Error Message Display */}
          {msg && (
            <div className={`${styles.alert} ${msg.toLowerCase().includes("successful") ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                placeholder="Create Password"
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
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Already a member?{" "}
              <Link href="/login" className="text-[#00D1FF] font-black italic hover:underline ml-1">
                LOGIN HERE
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center text-white/20 text-[10px] mt-6 tracking-widest uppercase">
          © 2026 SPRYO BEVERAGES INDIA
        </p>
      </div>
    </div>
  );
}