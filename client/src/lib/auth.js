import { clientFetch, API_ENDPOINTS } from "@/lib/api";

// 1. SIGNUP API (Pure real API, zero hardcoded fallback secrets)
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

    return data || { success: false, message: "Signup failed." };
  } catch (err) {
    return { success: false, message: "Unable to connect to authentication server." };
  }
};

// 2. LOGIN API (Pure real API, zero hardcoded credentials)
export async function loginUser(formData) {
  try {
    const { ok, data } = await clientFetch(API_ENDPOINTS.auth.login || "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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

    return data || { success: false, message: "Invalid email or password." };
  } catch (error) {
    return { success: false, message: "Unable to connect to server. Please ensure backend is running." };
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
      credentials: "include",
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
export async function logout() {
  if (typeof window !== "undefined") {
    try {
      await clientFetch("/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("spryo_user");
    window.dispatchEvent(new Event("spryo_auth_change"));
    window.location.href = "/login";
  }
}

// 5. GET LOGGED IN USER
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