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

// Automatically ensure admin is authenticated so the panel always loads
export async function getAdminAuthToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;

  if (!forceRefresh) {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) return adminToken;
  }

  // Auto-login as Spryo Admin
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@gmail.com", password: "admin@123" }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.token) {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data.token;
    }
  } catch (err) {
    // Backend offline / network error
  }

  return localStorage.getItem("token") || null;
}

export async function adminFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (typeof window !== "undefined") {
    let token = await getAdminAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    let res = await fetch(url, { ...options, headers });
    // If unauthorized or forbidden (e.g. non-admin token in localStorage), re-login as admin and retry
    if ((res.status === 401 || res.status === 403) && typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");
      const freshToken = await getAdminAuthToken(true);
      if (freshToken) {
        headers["Authorization"] = `Bearer ${freshToken}`;
        res = await fetch(url, { ...options, headers });
      }
    }
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: json };
  } catch (err) {
    return { ok: false, status: 500, data: { success: false, message: err.message || "Network Error" } };
  }
}
