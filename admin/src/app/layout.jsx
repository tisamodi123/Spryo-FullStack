import Link from "next/link";
import "./globals.css"; // CSS import karna mat bhulna

export const metadata = {
  title: "Spryo Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 text-white p-6 space-y-6 shrink-0 h-screen sticky top-0">
            <h2 className="text-2xl font-bold border-b border-slate-700 pb-4">Admin Panel</h2>
            <nav className="flex flex-col gap-3">
              <Link href="/admin/dashboard" className="hover:text-blue-400 transition">📊 Dashboard</Link>
              <Link href="/admin/products" className="text-blue-400 font-semibold transition">🥤 Manage Products</Link>
              <Link href="/admin/orders" className="hover:text-blue-400 transition">📦 Orders</Link>
              <Link href="/admin/users" className="hover:text-blue-400 transition">👥 Users</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 text-black overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}