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

const STATIC_USER = { name: "Guest User", email: "guest@spryo.com" };

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

  useEffect(() => {
    // Check local session or fallback to mock guest
    try {
      const stored = localStorage.getItem("spryo_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(STATIC_USER);
      }
    } catch {
      setUser(STATIC_USER);
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
    try {
      localStorage.removeItem("spryo_user");
    } catch {}
    setProfileOpen(false);
  };

  return (
    <header className={`${styles.headerRoot} ${scrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.headerInner}>
          {/* BRANDING */}
          <Link href="/" className="flex items-center gap-3 z-[101] group">
            <div className={styles.logoBadge}>
              <span>S</span>
            </div>
            <div className="flex flex-col">
              <span className={styles.brandName}>SPRYO</span>
              <span className={styles.brandSub}>PREMIUM FIZZ</span>
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
          <div className="flex items-center gap-2.5 sm:gap-4 z-[101]">
            {/* Search Bar */}
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

            {/* User Profile / Login */}
            <div className={styles.userSection}>
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
                      <div className="px-3 py-2 border-b border-white/10 text-xs text-white/70">
                        Signed in as <br />
                        <span className="font-semibold text-cyan-400">{user.email}</span>
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
              aria-label="Toggle menu"
            >
              {open ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <div className={`${styles.mobileMenu} ${open ? styles.mobileVisible : ""}`}>
          <div className={styles.mobileLinks}>
            {/* Mobile Theme Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="text-xs uppercase tracking-widest text-white/60 font-bold">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-cyan-300"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>

            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? styles.activeMobile : ""}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10 w-full my-2" />
            <Link href="/products" className="text-cyan-400 font-bold">
              Explore Crate (Drinks)
            </Link>
            <Link href="/cart" className="flex items-center justify-between">
              <span>View Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-black text-xs font-bold">
                {itemCount}
              </span>
            </Link>
            {!user ? (
              <Link href="/login" className="text-cyan-400 font-bold mt-2">
                Login / Signup
              </Link>
            ) : (
              <>
                <Link href="/profile">My Account</Link>
                <Link href="/orders">My Orders</Link>
                <button onClick={handleLogout} className="text-red-400 mt-2 text-left font-semibold">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}