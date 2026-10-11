// admin/src/lib/api.js

export function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname || "localhost";
    return `http://${hostname}:2002/api`;
  }
  return "http://localhost:2002/api";
}

export async function adminFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Check token from localStorage if present
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: json };
  } catch (err) {
    console.error(`API Fetch Error [${url}]:`, err);
    return { ok: false, status: 500, data: { success: false, message: err.message || "Network Error" } };
  }
}
