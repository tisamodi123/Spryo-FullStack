
//for backend

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { loginUser } from "@/lib/auth";
// import styles from "@/styles/auth.module.css";
// import { FaLock, FaEnvelope, FaWineGlassAlt } from "react-icons/fa";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setMsg("");
//   setLoading(true);

//   // 1. Check for Hardcoded Admin Credentials
//   if (form.email === "admin@gmail.com" && form.password === "admin@123") {
//     setMsg("Admin access granted! Entering Command Center...");
//     setTimeout(() => {
//       window.location.href = "/admin"; // Redirect to Admin Dashboard
//     }, 800);
//     return;
//   }

//   // 2. Normal User Login (Database Check)
//   const res = await loginUser(form);
//   setLoading(false);

//   if (!res || !res.success) {
//     setMsg(res?.message || "Invalid Credentials. Try again.");
//     return;
//   }

//   // Check if the database user is an admin (Optional but secure)
//   if (res.user?.isAdmin || res.user?.role === "admin") {
//     setMsg("Admin verified. Redirecting...");
//     setTimeout(() => (window.location.href = "/admin"), 700);
//   } else {
//     setMsg("Welcome back! Loading your profile...");
//     setTimeout(() => (window.location.href = "/profile"), 700);
//   }
// };

//   return (
//     <div className={styles.authPage}>
//       {/* Background Glows */}
//       <div className={styles.glowCyan}></div>
//       <div className={styles.glowPurple}></div>

//       <div className="relative z-10 w-full max-w-md px-4">
//         <div className={styles.glassCard}>
//           {/* Logo/Icon section */}
//           <div className="text-center mb-8">
//             <div className={styles.iconCircle}>
//               <FaWineGlassAlt />
//             </div>
//             <h1 className={styles.title}>
//               WELCOME <br /> <span>BACK</span>
//             </h1>
//             <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
//               The House of Refreshment
//             </p>
//           </div>

//           {msg && (
//             <div className={`${styles.alert} ${msg.includes("successful") ? styles.success : styles.error}`}>
//               {msg}
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
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
//                 placeholder="Password"
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
//               {loading ? "AUTHENTICATING..." : "LOGIN TO ACCOUNT"}
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-white/60 text-sm">
//               New to the tribe?{" "}
//               <Link href="/signup" className="text-[#00D1FF] font-black italic hover:underline ml-1">
//                 SIGNUP HERE
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//for static mode
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/auth.module.css";
import { FaLock, FaEnvelope, FaWineGlassAlt } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    // --- STATIC AUTHENTICATION LOGIC ---
    // We use a timeout to simulate the delay of a real server request ⏳
    setTimeout(() => {
      setLoading(false);

      // 1. Static Admin Check
      if (form.email === "admin@gmail.com" && form.password === "admin@123") {
        setMsg("Admin access granted! Entering Command Center...");
        // In a real app, you'd save a token here. For static, we just redirect.
        setTimeout(() => {
          window.location.href = "/admin"; 
        }, 1000);
        return;
      }

      // 2. Static Normal User Check
      // We define a hardcoded "user" for testing purposes
      if (form.email === "user@gmail.com" && form.password === "user123") {
        setMsg("Welcome back! Loading your profile...");
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1000);
      } else {
        // 3. Fallback for "Invalid Credentials"
        setMsg("Invalid Credentials. Try 'user@gmail.com' / 'user123'");
      }
    }, 1500); // 1.5 seconds simulation time
  };

  return (
    <div className={styles.authPage}>
      {/* Background Glows */}
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
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
              The House of Refreshment
            </p>
          </div>

          {/* Success/Error Message Display */}
          {msg && (
            <div className={`${styles.alert} ${msg.includes("Welcome") || msg.includes("granted") ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              {loading ? "AUTHENTICATING..." : "LOGIN TO ACCOUNT"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              New to the tribe?{" "}
              <Link href="/signup" className="text-[#00D1FF] font-black italic hover:underline ml-1">
                SIGNUP HERE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}