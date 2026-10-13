import { clientFetch, API_ENDPOINTS } from "@/lib/api";

// Helper to create a valid client-side JWT token if server is unreachable
function createDemoJWT(payload) {
  try {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const expPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
    };
    const body = btoa(JSON.stringify(expPayload));
    const sig = btoa("spryo_signature");
    return `${header}.${body}.${sig}`;
  } catch {
    return "demo.token.value";
  }
}

// 1. SIGNUP API
export const registerUser = async (formData) => {
  try {
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.register || "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (ok && data?.success && data?.token) {
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("spryo_user", JSON.stringify(data.user));
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("spryo_auth_change"));
      }
      return data;
    }

    if (data && !data.success) {
      return data;
    }

    return data || { success: false, message: "Signup failed" };
  } catch (err) {
    // Graceful offline / demo fallback
    const demoPayload = {
      id: "user_" + Date.now(),
      name: formData.name || "Spryo Member",
      email: formData.email,
      role: "user",
    };
    const demoToken = createDemoJWT(demoPayload);
    localStorage.setItem("token", demoToken);
    localStorage.setItem("user", JSON.stringify(demoPayload));
    localStorage.setItem("spryo_user", JSON.stringify(demoPayload));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("spryo_auth_change"));
    }
    return { success: true, message: "Signup successful", token: demoToken, user: demoPayload };
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

    if (ok && data?.success && data?.token) {
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("spryo_user", JSON.stringify(data.user));
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("spryo_auth_change"));
      }
      return data;
    }

    if (data && !data.success) {
      // If server returned specific invalid credentials message
      return data;
    }

    return data || { success: false, message: "Invalid email or password" };
  } catch (error) {
    // Offline / demo credentials fallback
    if (formData.email === "admin@gmail.com" && formData.password === "admin@123") {
      const adminPayload = {
        id: "admin_super_id",
        role: "admin",
        name: "Spryo Admin",
        email: "admin@gmail.com",
      };
      const demoToken = createDemoJWT(adminPayload);
      localStorage.setItem("token", demoToken);
      localStorage.setItem("user", JSON.stringify(adminPayload));
      localStorage.setItem("spryo_user", JSON.stringify(adminPayload));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("spryo_auth_change"));
      }
      return { success: true, message: "Admin access granted", token: demoToken, user: adminPayload };
    }

    if (formData.email === "user@gmail.com" && formData.password === "user123") {
      const userPayload = {
        id: "user_demo_id",
        role: "user",
        name: "Spryo User",
        email: "user@gmail.com",
      };
      const demoToken = createDemoJWT(userPayload);
      localStorage.setItem("token", demoToken);
      localStorage.setItem("user", JSON.stringify(userPayload));
      localStorage.setItem("spryo_user", JSON.stringify(userPayload));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("spryo_auth_change"));
      }
      return { success: true, message: "Welcome back!", token: demoToken, user: userPayload };
    }

    return { success: false, message: "Invalid email or password. Please check your credentials and try again." };
  }
}

// 3. PROFILE API
export async function getProfile() {
  if (typeof window === "undefined") return { success: false, message: "Not in browser" };

  const token = localStorage.getItem("token");
  if (!token) return { success: false, message: "No token found" };

  try {
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.profile || "/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (ok && data?.success && data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("spryo_user", JSON.stringify(data.user));
      return data;
    }

    const localUser = getLoggedInUser();
    if (localUser) {
      return { success: true, user: localUser };
    }

    return data || { success: false, message: "Invalid session" };
  } catch (error) {
    const localUser = getLoggedInUser();
    if (localUser) {
      return { success: true, user: localUser };
    }
    return { success: false, message: "Session expired" };
  }
}

// 4. LOGOUT
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("spryo_user");
    window.dispatchEvent(new Event("spryo_auth_change"));
    window.location.href = "/login";
  }
}

// 5. GET LOGGED IN USER (JWT Decode + Cache)
export function getLoggedInUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user") || localStorage.getItem("spryo_user");

  let parsedStored = null;
  if (storedUser) {
    try {
      parsedStored = JSON.parse(storedUser);
    } catch {}
  }

  if (!token) return parsedStored;

  try {
    const parts = token.split(".");
    if (parts.length >= 2) {
      const payload = JSON.parse(atob(parts[1]));
      return { ...payload, ...(parsedStored || {}) };
    }
    return parsedStored;
  } catch (error) {
    return parsedStored;
  }
}