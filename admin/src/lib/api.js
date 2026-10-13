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
export async function getAdminAuthToken() {
  if (typeof window === "undefined") return null;

  let token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (token) return token;

  // Auto-login as Spryo Admin if no token present
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
      return data.token;
    }
  } catch (err) {
    // Backend offline / network error
  }

  return null;
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
    const res = await fetch(url, { ...options, headers });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: json };
  } catch (err) {
    return { ok: false, status: 500, data: { success: false, message: err.message || "Network Error" } };
  }
}
