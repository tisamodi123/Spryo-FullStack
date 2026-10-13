// admin/src/lib/api.js

export function getApiBaseUrl() {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname || "localhost";
    return `http://${hostname}:2002/api`;
  }
  return "http://localhost:2002/api";
}

// Check logged in admin
export function getAdminUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("adminUser");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

// Admin manual login with httpOnly cookies & JWT
export async function adminLogin(email, password) {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Receives and stores httpOnly secure cookie
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.success) {
      if (data.user?.role !== "admin") {
        return { success: false, message: "Access Denied: This account is not an administrator." };
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("adminToken", data.token);
      }
      return { success: true, user: data.user, token: data.token };
    }

    return { success: false, message: data?.message || "Invalid credentials." };
  } catch (err) {
    return { success: false, message: "Connection to server failed. Please ensure backend is running." };
  }
}

// Admin logout
export async function adminLogout() {
  const baseUrl = getApiBaseUrl();
  try {
    await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include", // Clears httpOnly cookie on server
    });
  } catch {}

  if (typeof window !== "undefined") {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }
}

// Universal fetch for admin actions with credentials: "include"
export async function adminFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Always send httpOnly cookies
    });

    if (res.status === 401 || res.status === 403) {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        window.location.href = "/login";
      }
    }

    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: json };
  } catch (err) {
    return { ok: false, status: 500, data: { success: false, message: err.message || "Network Error" } };
  }
}
