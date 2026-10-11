import { clientFetch, API_ENDPOINTS } from "@/lib/api";

// 1. SIGNUP API
export const registerUser = async (formData) => {
  try {
    // Ab hum hardcoded URL ki jagah API_ENDPOINTS use kar rahe hain
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.register || "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return data; 
  } catch (err) {
    return { success: false, message: "Server not reachable" };
  }
};

// 2. LOGIN API
export async function loginUser(formData) {
  try {
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.login || "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
      // Optional: User ki basic details bhi save kar sakte hain
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    return { success: false, message: "Server error" };
  }
}

// 3. PROFILE API
export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found" };

  try {
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.profile || "/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return { success: false, message: "Invalid token" };
  }
}

// 4. LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // Agar save kiya hai toh
  window.location.href = "/login";
}

// 5. GET LOGGED IN USER (JWT Decode)
export function getLoggedInUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // JWT token ke middle part (payload) ko decode karna
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
}