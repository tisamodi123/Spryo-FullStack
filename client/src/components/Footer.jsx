"use client";
import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import styles from "@/styles/footer.module.css";
import { 
  FaInstagram, 
  FaTwitter, 
  FaDiscord, 
  FaYoutube, 
  FaArrowRight, 
  FaCheckCircle,
  FaChevronDown 
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  // Reusable, unified Brand component ensuring 100% consistency across all screen sizes
  const BrandSection = () => (
    <div className={styles.brandBox}>
      <div className="flex items-center gap-3">
        <div className={styles.brandIcon}>S</div>
        <h2 className={styles.brandName}>SPRYO</h2>
      </div>
      <p className={styles.description}>
        Premium sparkling beverages and natural refreshments crafted for great taste and everyday hydration.
      </p>
      <div className={styles.socialRow}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
          <FaInstagram size={14} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter">
          <FaTwitter size={14} />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Discord">
          <FaDiscord size={14} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
          <FaYoutube size={14} />
        </a>
      </div>
    </div>
  );

  return (
    <footer className={styles.footerRoot}>
      <Container>
        <div className={styles.glassCard}>
          {/* =========================================
              DESKTOP GRID (lg:grid - 1024px and above)
              ========================================= */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-10 relative z-10 items-start">
            {/* BRAND SECTION (4 Cols) */}
            <div className="lg:col-span-4">
              <BrandSection />
            </div>

            {/* LINKS COLUMN: FLAVORS & SHOP (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className={styles.colTitle}>Flavors & Shop</h4>
              <nav className={styles.nav}>
                <Link href="/products">All Drinks</Link>
                <Link href="/about">Our Craft Story</Link>
                <Link href="/recipes">Cocktails & Mixes</Link>
                <Link href="/careers">Careers & Team</Link>
              </nav>
            </div>

            {/* LINKS COLUMN: HELP & TRUST (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className={styles.colTitle}>Help & Trust</h4>
              <nav className={styles.nav}>
                <Link href="/faq">FAQ & Shipping</Link>
                <Link href="/distributor">Distributor Hub</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </nav>
            </div>

            {/* NEWSLETTER SECTION (4 Cols) */}
            <div className="lg:col-span-4 space-y-3.5">
              <h4 className={styles.colTitle}>Stay Sparkling</h4>
              <p className="text-xs text-white/60 [data-theme=light]:text-slate-600 leading-relaxed">
                Get early drops, secret batches, and exclusive crate discounts.
              </p>

              <form onSubmit={handleSubscribe} className={styles.newsletterBox}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.sendBtn} aria-label="Subscribe">
                  {subscribed ? <FaCheckCircle className="text-green-400" /> : <FaArrowRight />}
                </button>
              </form>

              {subscribed && (
                <p className="text-[11px] text-green-400 font-bold flex items-center gap-1">
                  ✓ You're on the VIP Fizz List!
                </p>
              )}
              <p className="text-[10px] text-white/40 [data-theme=light]:text-slate-400 tracking-widest uppercase">
                Zero Spam. Pure Fizz.
              </p>
            </div>
          </div>

          {/* =========================================
              TABLET & MOBILE ACCORDION (block lg:hidden)
              Collapsible accordion swiper footer for iPad Mini, Surface Pro & Mobile
              ========================================= */}
          <div className="block lg:hidden relative z-10">
            {/* BRAND HEADER & SOCIALS */}
            <div className="mb-5">
              <BrandSection />
            </div>

            {/* ACCORDION WRAPPER */}
            <div className={styles.mobileAccordionWrapper}>
              {/* 1. FLAVORS & SHOP ACCORDION */}
              <div className={`${styles.accordionItem} ${openSection === "flavors" ? styles.accordionItemActive : ""}`}>
                <button
                  type="button"
                  onClick={() => toggleSection("flavors")}
                  className={styles.accordionHeader}
                  aria-expanded={openSection === "flavors"}
                >
                  <span>Flavors & Shop</span>
                  <span className={`${styles.accordionChevron} ${openSection === "flavors" ? styles.chevronRotated : ""}`}>
                    <FaChevronDown size={11} />
                  </span>
                </button>
                <div className={`${styles.accordionBody} ${openSection === "flavors" ? styles.accordionOpen : ""}`}>
                  <nav className={styles.nav}>
                    <Link href="/products">All Drinks</Link>
                    <Link href="/about">Our Craft Story</Link>
                    <Link href="/recipes">Cocktails & Mocktails</Link>
                    <Link href="/careers">Careers & Team</Link>
                  </nav>
                </div>
              </div>

              {/* 2. HELP & TRUST ACCORDION */}
              <div className={`${styles.accordionItem} ${openSection === "help" ? styles.accordionItemActive : ""}`}>
                <button
                  type="button"
                  onClick={() => toggleSection("help")}
                  className={styles.accordionHeader}
                  aria-expanded={openSection === "help"}
                >
                  <span>Help & Trust</span>
                  <span className={`${styles.accordionChevron} ${openSection === "help" ? styles.chevronRotated : ""}`}>
                    <FaChevronDown size={11} />
                  </span>
                </button>
                <div className={`${styles.accordionBody} ${openSection === "help" ? styles.accordionOpen : ""}`}>
                  <nav className={styles.nav}>
                    <Link href="/faq">FAQ & Shipping</Link>
                    <Link href="/distributor">Become a Distributor</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                  </nav>
                </div>
              </div>

              {/* 3. STAY SPARKLING (NEWSLETTER) ACCORDION */}
              <div className={`${styles.accordionItem} ${openSection === "newsletter" ? styles.accordionItemActive : ""}`}>
                <button
                  type="button"
                  onClick={() => toggleSection("newsletter")}
                  className={styles.accordionHeader}
                  aria-expanded={openSection === "newsletter"}
                >
                  <span>Stay Sparkling (VIP Drops)</span>
                  <span className={`${styles.accordionChevron} ${openSection === "newsletter" ? styles.chevronRotated : ""}`}>
                    <FaChevronDown size={11} />
                  </span>
                </button>
                <div className={`${styles.accordionBody} ${openSection === "newsletter" ? styles.accordionOpen : ""}`}>
                  <p className="text-xs text-white/60 [data-theme=light]:text-slate-600 mb-3">
                    Get early drops, private secret batches, and exclusive crate discounts.
                  </p>
                  <form onSubmit={handleSubscribe} className={styles.newsletterBox}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                    />
                    <button type="submit" className={styles.sendBtn} aria-label="Subscribe">
                      {subscribed ? <FaCheckCircle className="text-green-400" /> : <FaArrowRight />}
                    </button>
                  </form>
                  {subscribed && (
                    <p className="text-[11px] text-green-400 font-bold mt-2 flex items-center gap-1">
                      ✓ You're on the VIP Fizz List!
                    </p>
                  )}
                  <p className="text-[10px] text-white/40 [data-theme=light]:text-slate-400 tracking-widest uppercase mt-2">
                    Zero Spam. Pure Fizz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STRIP */}
          <div className={styles.footerBottom}>
            <div className={styles.line}></div>
            <div className="flex flex-col md:flex-row justify-between items-center py-5 sm:py-6 gap-3 sm:gap-4 text-center md:text-left">
              <span className="text-[10px] sm:text-[11px] opacity-60 tracking-[1.5px] sm:tracking-[2px]">
                © 2025 SPRYO BEVERAGES INC. ALL RIGHTS RESERVED.
              </span>
              <div className="flex gap-4 sm:gap-5 items-center justify-center">
                <span className="text-[10px] sm:text-[11px] opacity-60 tracking-wider">ALL NATURAL</span>
                <div className={styles.dot}></div>
                <span className="text-[10px] sm:text-[11px] opacity-60 tracking-wider">100% RECYCLABLE</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;