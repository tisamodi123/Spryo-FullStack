// src/lib/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2002",
//   withCredentials: true, // send httpOnly cookies
// });

// export default API; 

// src/lib/api.js




//norml way for api calls
// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2002/api";

//for vercel-website deploy

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2002/api";

export const API_ENDPOINTS = {
  // Yahan se BASE_URL hata dijiye, sirf path rakhiye
  products: "/products", 
  adminStats: "/admin/stats",
  auth: {
    login: "/auth/login",
    register: "/auth/signup",
    profile: "/auth/profile",
  },
  orders: "/orders",
};

// Client-friendly wrapper for API communication
export async function clientFetch(path, opts = {}) {
  const url = `${BASE_URL}${path}`;
  
  try {
    const res = await fetch(url, opts);
    
    // Verify response content type is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { ok: false, status: res.status, data: { message: "Server error: Not JSON" } };
    }

    const json = await res.json();
    return { ok: res.ok, status: res.status, data: json };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { ok: false, status: 500, data: { message: "Network error" } };
  }
}

// server-friendly helper
export async function serverFetch(path, opts = {}) {
  const url = `${BASE_URL}${path}`;
  return await fetch(url, { ...opts });
}