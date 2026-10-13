"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/lib/api";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Manage Products", href: "/admin/products", icon: "🥤" },
    { label: "Live Orders", href: "/admin/orders", icon: "📦" },
    { label: "Customers", href: "/admin/users", icon: "👥" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6 shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-black shadow-lg shadow-blue-500/20">
              👑
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">Spryo Admin</h2>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Secure Session
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-800">
          <a
            href="http://localhost:3000"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span>🥤</span>
            <span>Spryo Storefront</span>
          </a>

          <button
            onClick={() => adminLogout()}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition text-left cursor-pointer"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 text-slate-900 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
