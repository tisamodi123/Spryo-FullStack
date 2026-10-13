"use client";
import Link from "next/link";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import styles from "@/styles/header.module.css";
import { useCart } from "@/components/CartContext";
import { useTheme } from "@/components/ThemeContext";
import { usePathname, useRouter } from "next/navigation";
import { 
  FaUserCircle, 
  FaBars, 
  FaTimes, 
  FaShoppingCart, 
  FaSearch, 
  FaSun, 
  FaMoon 
} from "react-icons/fa";
import { logout, getLoggedInUser } from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const { itemCount } = useCart();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const syncUser = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const loggedUser = getLoggedInUser();
        setUser(loggedUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUser();

    const onAuthChange = () => syncUser();
    window.addEventListener("spryo_auth_change", onAuthChange);
    window.addEventListener("storage", onAuthChange);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("spryo_auth_change", onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Drinks", href: "/products" },
    { name: "Recipes", href: "/recipes" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
    logout();
  };

  return (
    <header className={`${styles.headerRoot} ${scrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.headerInner}>
          {/* BRANDING */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 z-[101] group shrink-0">
            <div className={styles.logoBadge}>
              <span>S</span>
            </div>
            <div className="flex flex-col">
              <span className={styles.brandName}>SPRYO</span>
              <span className={`${styles.brandSub} hidden sm:inline-block`}>PREMIUM FIZZ</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className={styles.navDesktop}>
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3.5 z-[101]">
            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className={styles.searchContainer}>
              <FaSearch className="text-cyan-400 text-xs sm:text-sm" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks..."
                aria-label="Search drinks"
              />
            </form>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={styles.themeToggleBtn}
              title={mounted && theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {mounted && theme === "light" ? (
                <FaMoon className="text-amber-500 hover:rotate-12 transition-transform" />
              ) : (
                <FaSun className="text-amber-400 hover:rotate-45 transition-transform" />
              )}
            </button>

            {/* Cart Button with Dynamic Live Badge */}
            <Link href="/cart" className={styles.cartBtn} aria-label="Shopping Cart">
              <FaShoppingCart />
              {itemCount > 0 && (
                <span className={styles.cartCount}>
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login - Hidden on mobile, visible on sm+ */}
            <div className={`${styles.userSection} hidden sm:block`}>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={styles.profileToggle}
                    aria-label="User Account"
                  >
                    <FaUserCircle className="text-xl text-cyan-400" />
                    <span className="hidden lg:inline text-xs font-bold tracking-wide">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </button>
                  {profileOpen && (
                    <div className={styles.profileDrop}>
                      <div className="px-3 py-2 border-b border-white/10 [data-theme=light]:border-slate-200 text-xs text-white/70 [data-theme=light]:text-slate-600">
                        Signed in as <br />
                        <span className="font-semibold text-cyan-400 [data-theme=light]:text-sky-600">{user.email}</span>
                      </div>
                      <Link href="/profile" onClick={() => setProfileOpen(false)}>
                        My Profile
                      </Link>
                      <Link href="/orders" onClick={() => setProfileOpen(false)}>
                        My Orders
                      </Link>
                      <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className={styles.joinBtn}>
                  Login
                </Link>
              )}
            </div>

            {/* Hamburger for Mobile */}
            <button
              className={styles.menuToggle}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <div className={`${styles.mobileMenu} ${open ? styles.mobileVisible : ""}`}>
          <div className={styles.mobileLinks}>
            {/* Mobile Header with Close & Brand */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 [data-theme=light]:border-slate-200 mb-3 w-full">
              <div className="flex items-center gap-2">
                <div className={styles.logoBadge} style={{ width: 28, height: 28, fontSize: '0.9rem' }}>
                  <span>S</span>
                </div>
                <span className="font-black text-sm tracking-wide text-white [data-theme=light]:text-slate-900">SPRYO</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 [data-theme=light]:text-slate-700 hover:bg-white/10 [data-theme=light]:hover:bg-slate-100"
                aria-label="Close menu"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-white/5 [data-theme=light]:bg-slate-100 border border-white/15 [data-theme=light]:border-slate-300 rounded-xl px-3 py-2 w-full mb-3">
              <FaSearch className="text-cyan-400 [data-theme=light]:text-black text-xs shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flavors, drinks..."
                className="bg-transparent border-none outline-none text-xs text-white [data-theme=light]:text-black placeholder:text-white/40 [data-theme=light]:placeholder:text-slate-500 pl-2 w-full"
              />
            </form>

            {/* Mobile Theme Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-white/10 [data-theme=light]:border-slate-200 mb-2 w-full">
              <span className="text-xs uppercase tracking-widest text-white/60 [data-theme=light]:text-black font-bold">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 [data-theme=light]:bg-slate-200 text-xs font-bold text-cyan-300 [data-theme=light]:text-black"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>

            {/* Navigation Links */}
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${pathname === link.href ? styles.activeMobile : ""} text-white [data-theme=light]:text-black font-bold`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-white/10 [data-theme=light]:border-slate-200 w-full my-2" />

            <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center justify-between text-white [data-theme=light]:text-black font-bold">
              <span>View Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400 [data-theme=light]:bg-black text-black [data-theme=light]:text-white text-xs font-bold">
                {itemCount}
              </span>
            </Link>

            {/* User Account in Mobile Menu */}
            {!user ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-3 w-full py-2.5 rounded-xl bg-cyan-400 [data-theme=light]:bg-black text-black [data-theme=light]:text-white text-center font-black text-xs tracking-wider"
              >
                LOGIN / SIGN UP
              </Link>
            ) : (
              <div className="mt-3 pt-3 border-t border-white/10 [data-theme=light]:border-slate-200 w-full flex flex-col gap-2">
                <div className="text-xs text-white/60 [data-theme=light]:text-slate-700 font-semibold truncate">
                  {user.email}
                </div>
                <Link href="/profile" onClick={() => setOpen(false)} className="text-white [data-theme=light]:text-black text-sm font-bold">
                  My Profile
                </Link>
                <Link href="/orders" onClick={() => setOpen(false)} className="text-white [data-theme=light]:text-black text-sm font-bold">
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-red-400 [data-theme=light]:text-red-600 text-left font-semibold text-xs mt-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}