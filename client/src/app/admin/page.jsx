"use client";
import { useEffect } from "react";

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = "http://localhost:3001/admin/dashboard";
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#fff" }}>
      <p>Redirecting to Spryo Admin Dashboard (Port 3001)...</p>
    </div>
  );
}
