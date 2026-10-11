
//for backend

// "use client";
// import { useEffect, useState } from "react";
// // lib/auth.js mein bhi naya logic apply ho chuka hoga
// import { getProfile, getLoggedInUser, logout } from "@/lib/auth";
// import styles from "@/styles/profile.module.css";
// import { FaUserEdit, FaSave, FaTimes, FaSignOutAlt, FaKey, FaMapMarkerAlt } from "react-icons/fa";
// // 1. API helpers import karein
// import { clientFetch, API_ENDPOINTS } from "@/lib/api";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", address: "" });
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     async function loadProfile() {
//       setLoading(true);
//       const res = await getProfile();
//       const local = getLoggedInUser();
//       const data = (res?.success && res.user) ? res.user : local;

//       if (data) {
//         setUser(data);
//         setForm({
//           name: data.name || "",
//           email: data.email || "",
//           address: data.address || "",
//         });
//       }
//       setLoading(false);
//     }
//     loadProfile();
//   }, []);

//   const handleSave = async () => {
//     setMsg("");
//     try {
//       const token = localStorage.getItem("token");
//       // 2. Profile update endpoint ko dynamic kiya
//       const { ok, data } = await clientFetch(`${API_ENDPOINTS.auth.profile || '/auth/profile'}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       if (ok && data.success) {
//         setUser(data.user);
//         setEditMode(false);
//         setMsg("✓ Profile updated successfully!");
//         setTimeout(() => setMsg(""), 3000);
//       } else {
//         setMsg(data.message || "Update failed");
//       }
//     } catch (err) { 
//       setMsg("Server error"); 
//     }
//   };

//   if (loading) return (
//     <div className={styles.loaderWrapper}>
//       <div className={styles.spinner}></div>
//     </div>
//   );

//   if (!user) return (
//     <div className={styles.authWrapper}>
//       <div className={styles.glassCard}>
//         <h1 className="text-2xl font-black italic">ACCESS DENIED</h1>
//         <p className="my-4 opacity-70">Please login to view your refreshment profile.</p>
//         <a href="/login" className={styles.primaryBtn}>Login Now</a>
//       </div>
//     </div>
//   );

//   return (
//     <div className={styles.pageWrapper}>
//       <div className={styles.glowTop}></div>
      
//       <div className="container mx-auto px-4 relative z-10 py-12">
//         <div className={styles.profileGrid}>
          
//           <div className={styles.sideCol}>
//             <div className={styles.avatarCard}>
//               <div className={styles.avatarWrapper}>
//                 <img src={user.avatar || "/avatar.png"} alt="User" />
//                 <div className={styles.onlineBadge}></div>
//               </div>
//               <h2 className={styles.userName}>{user.name}</h2>
//               <p className={styles.userEmail}>{user.email}</p>
//               <button onClick={logout} className={styles.logoutBtn}>
//                 <FaSignOutAlt /> Logout
//               </button>
//             </div>
//           </div>

//           <div className={styles.mainCol}>
//             <div className={styles.glassCard}>
//               <div className="flex justify-between items-center mb-8">
//                 <h1 className={styles.sectionTitle}>ACCOUNT DETAILS</h1>
//                 {!editMode && (
//                   <button onClick={() => setEditMode(true)} className={styles.editIconBtn}>
//                     <FaUserEdit /> EDIT
//                   </button>
//                 )}
//               </div>

//               {msg && <div className={styles.toastMsg}>{msg}</div>}

//               <div className={styles.formSpace}>
//                 <div className={styles.inputGroup}>
//                   <label>Full Name</label>
//                   {editMode ? (
//                     <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
//                   ) : (
//                     <div className={styles.displayValue}>{user.name}</div>
//                   )}
//                 </div>

//                 <div className={styles.inputGroup}>
//                   <label>Email Address</label>
//                   {editMode ? (
//                     <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
//                   ) : (
//                     <div className={styles.displayValue}>{user.email}</div>
//                   )}
//                 </div>

//                 <div className={styles.inputGroup}>
//                   <label>Delivery Address</label>
//                   {editMode ? (
//                     <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
//                   ) : (
//                     <div className={styles.displayValue}>
//                       <FaMapMarkerAlt className="inline mr-2 text-[#00D1FF]" /> 
//                       {user.address || "Not set yet"}
//                     </div>
//                   )}
//                 </div>

//                 {editMode && (
//                   <div className="flex gap-4 mt-8">
//                     <button onClick={handleSave} className={styles.saveBtn}><FaSave /> SAVE CHANGES</button>
//                     <button onClick={() => setEditMode(false)} className={styles.cancelBtn}><FaTimes /> CANCEL</button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className={`${styles.glassCard} mt-8`}>
//               <h2 className={styles.sectionTitle}><FaKey className="inline mr-2" /> SECURITY</h2>
//               <ChangePassword />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// function ChangePassword() {
//   const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
//   const [msg, setMsg] = useState("");

//   const handleChangePassword = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       // 3. Password change logic bhi clientFetch par shift
//       const { ok, data } = await clientFetch(`${API_ENDPOINTS.auth.changePassword || '/auth/change-password'}`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json", 
//           Authorization: `Bearer ${token}` 
//         },
//         body: JSON.stringify(form),
//       });

//       if (ok && data.success) {
//         setMsg("✓ Password Updated!");
//         setForm({ oldPassword: "", newPassword: "" });
//         setTimeout(() => setMsg(""), 3000);
//       } else { 
//         setMsg(data.message || "Error updating password"); 
//       }
//     } catch (err) { 
//       setMsg("Connection error"); 
//     }
//   };

//   return (
//     <div className={styles.passwordForm}>
//       {msg && <p className="text-[#00D1FF] mb-4 font-bold uppercase text-xs">{msg}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input type="password" placeholder="Current Password" value={form.oldPassword} onChange={(e) => setForm({...form, oldPassword: e.target.value})} className={styles.darkInput} />
//         <input type="password" placeholder="New Password" value={form.newPassword} onChange={(e) => setForm({...form, newPassword: e.target.value})} className={styles.darkInput} />
//       </div>
//       <button onClick={handleChangePassword} className={styles.securityBtn}>UPDATE PASSWORD</button>
//     </div>
//   );
// }


// for static

"use client";
import { useEffect, useState } from "react";
// Mocking the logout since we are going static
const logout = () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/login";
};

import styles from "@/styles/profile.module.css";
import { FaUserEdit, FaSave, FaTimes, FaSignOutAlt, FaKey, FaMapMarkerAlt } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      // Simulating a network delay ⏳
      setTimeout(() => {
        const mockUser = {
          name: "Spyro User",
          email: "spyro@refreshment.com",
          address: "123 Neon Street, Cyber City",
          avatar: "/avatar.png"
        };
        setUser(mockUser);
        setForm({
          name: mockUser.name,
          email: mockUser.email,
          address: mockUser.address,
        });
        setLoading(false);
      }, 800);
    }
    loadProfile();
  }, []);

  const handleSave = () => {
    setLoading(true);
    setMsg("");
    
    // Simulate a save delay
    setTimeout(() => {
      setUser({ ...user, ...form });
      setEditMode(false);
      setMsg("✓ Profile updated successfully! (Static Mode)");
      setLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }, 1000);
  };

  if (loading) return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );

  // In static mode, we usually show the profile directly. 
  // If you want to test the 'Access Denied' view, change 'user' to null.
  if (!user) return (
    <div className={styles.authWrapper}>
      <div className={styles.glassCard}>
        <h1 className="text-2xl font-black italic">ACCESS DENIED</h1>
        <p className="my-4 opacity-70">Please login to view your refreshment profile.</p>
        <button onClick={() => window.location.href='/login'} className={styles.primaryBtn}>Login Now</button>
      </div>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glowTop}></div>
      
      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className={styles.profileGrid}>
          
          <div className={styles.sideCol}>
            <div className={styles.avatarCard}>
              <div className={styles.avatarWrapper}>
                <img src={user.avatar || "/avatar.png"} alt="User" />
                <div className={styles.onlineBadge}></div>
              </div>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              <button onClick={logout} className={styles.logoutBtn}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          <div className={styles.mainCol}>
            <div className={styles.glassCard}>
              <div className="flex justify-between items-center mb-8">
                <h1 className={styles.sectionTitle}>ACCOUNT DETAILS</h1>
                {!editMode && (
                  <button onClick={() => setEditMode(true)} className={styles.editIconBtn}>
                    <FaUserEdit /> EDIT
                  </button>
                )}
              </div>

              {msg && <div className={styles.toastMsg}>{msg}</div>}

              <div className={styles.formSpace}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  {editMode ? (
                    <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                  ) : (
                    <div className={styles.displayValue}>{user.name}</div>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  {editMode ? (
                    <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                  ) : (
                    <div className={styles.displayValue}>{user.email}</div>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Delivery Address</label>
                  {editMode ? (
                    <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
                  ) : (
                    <div className={styles.displayValue}>
                      <FaMapMarkerAlt className="inline mr-2 text-[#00D1FF]" /> 
                      {user.address || "Not set yet"}
                    </div>
                  )}
                </div>

                {editMode && (
                  <div className="flex gap-4 mt-8">
                    <button onClick={handleSave} className={styles.saveBtn}><FaSave /> SAVE CHANGES</button>
                    <button onClick={() => setEditMode(false)} className={styles.cancelBtn}><FaTimes /> CANCEL</button>
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.glassCard} mt-8`}>
              <h2 className={styles.sectionTitle}><FaKey className="inline mr-2" /> SECURITY</h2>
              <ChangePassword />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");

  const handleChangePassword = () => {
    if (!form.oldPassword || !form.newPassword) {
        setMsg("Please fill both fields");
        return;
    }
    setMsg("✓ Password Updated! (Static Mode)");
    setForm({ oldPassword: "", newPassword: "" });
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className={styles.passwordForm}>
      {msg && <p className="text-[#00D1FF] mb-4 font-bold uppercase text-xs">{msg}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="password" placeholder="Current Password" value={form.oldPassword} onChange={(e) => setForm({...form, oldPassword: e.target.value})} className={styles.darkInput} />
        <input type="password" placeholder="New Password" value={form.newPassword} onChange={(e) => setForm({...form, newPassword: e.target.value})} className={styles.darkInput} />
      </div>
      <button onClick={handleChangePassword} className={styles.securityBtn}>UPDATE PASSWORD</button>
    </div>
  );
}