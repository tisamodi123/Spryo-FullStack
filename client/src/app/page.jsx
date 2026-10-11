"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import styles from "@/styles/home.module.css";
import { 
  FaBolt, 
  FaLeaf, 
  FaArrowRight, 
  FaStar, 
  FaShieldAlt, 
  FaTruck, 
  FaFire,
  FaCheckCircle 
} from "react-icons/fa";
import FizzBackground from "@/components/FizzBackground";
import Link from "next/link";

const FLAVORS_DATA = [
  {
    id: "cola",
    name: "Classic Cola",
    tagline: "BOLD & TIMELESS",
    color: "#ff0055",
    glow: "rgba(255, 0, 85, 0.2)",
    accentBg: "from-rose-600/20 to-purple-900/30",
    image: "/cola.png",
    fizzScore: 98,
    flavorNotes: "Cinnamon bark, rich caramel & carbonated bite",
  },
  {
    id: "orange",
    name: "Zesty Orange",
    tagline: "CITRUS TSUNAMI",
    color: "#ff6a00",
    glow: "rgba(255, 106, 0, 0.25)",
    accentBg: "from-orange-600/20 to-amber-900/30",
    image: "/orange.png",
    fizzScore: 94,
    flavorNotes: "Nagpur orange zest & sun-ripened citrus blast",
  },
  {
    id: "lemon",
    name: "Cloudy Lemon",
    tagline: "ELECTRIC CHILL",
    color: "#d4ff00",
    glow: "rgba(212, 255, 0, 0.2)",
    accentBg: "from-yellow-500/20 to-lime-900/30",
    image: "/lemon.png",
    fizzScore: 96,
    flavorNotes: "Crushed mint, fresh lime pulp & sparkling brine",
  },
  {
    id: "up",
    name: "Mountain Up",
    tagline: "ALPINE RUSH",
    color: "#00d1ff",
    glow: "rgba(0, 209, 255, 0.25)",
    accentBg: "from-cyan-500/20 to-blue-900/30",
    image: "/up.png",
    fizzScore: 99,
    flavorNotes: "Mountain dew herbs & glacier-pure crispness",
  },
];

export default function Page() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFlavor, setActiveFlavor] = useState("classic");
  const [isPaused, setIsPaused] = useState(false);

  // Auto flavor rotation every 4 seconds unless user interacts/pauses
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % FLAVORS_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const staticProducts = [
      { 
        _id: "1", 
        name: "Classic Cola", 
        price: 99, 
        originalPrice: 125,
        rating: 4.9,
        image: "/cola.png", 
        category: "cola",
        tag: "Bestseller" 
      },
      { 
        _id: "2", 
        name: "Zesty Orange", 
        price: 95, 
        originalPrice: 120,
        rating: 4.8,
        image: "/orange.png", 
        category: "orange",
        tag: "Fresh Harvest" 
      },
      { 
        _id: "3", 
        name: "Cloudy Lemon", 
        price: 89, 
        originalPrice: 110,
        rating: 4.9,
        image: "/lemon.png", 
        category: "lemon",
        tag: "Citrus Chill" 
      },
      { 
        _id: "4", 
        name: "Mountain Up", 
        price: 85, 
        originalPrice: 105,
        rating: 4.7,
        image: "/up.png", 
        category: "up",
        tag: "Energy Boost" 
      },
    ];

    setProducts(staticProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 600) setActiveFlavor("classic");
      else if (scrollPos < 1200) setActiveFlavor("lemon");
      else if (scrollPos < 1800) setActiveFlavor("orange");
      else setActiveFlavor("cola");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentFlavor = FLAVORS_DATA[heroIndex];

  return (
    <div className={styles.mainContainer}>
      <FizzBackground flavor={activeFlavor} />

      {/* 🔵 HERO SECTION */}
      <section 
        className={styles.heroSection}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={styles.heroGlow}
          style={{ background: `radial-gradient(circle, ${currentFlavor.glow} 0%, transparent 70%)` }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 h-full py-16">
          <div className="text-left order-2 md:order-1">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/90 mb-5">
              <span className="flex text-amber-400">
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
              </span>
              <span>4.9 / 5 Rating</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-cyan-400 font-bold">50,000+ Bottles Sipped</span>
            </div>

            <span className={styles.tagline}>MADE FOR THE NEW INDIA</span>
            <h1 className={styles.heroTitle}>
              TASTE THE <br /> <span>EVOLUTION</span>
            </h1>

            <p className={styles.heroDesc}>
              Premium sparkling craft drinks infused with cold-pressed natural botanicals. 
              Elevate your vibe with 100% effervescent crispness.
            </p>

            {/* Interactive Flavor Switcher Tabs */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-white/60 font-bold mb-3">
                Select Signature Flavor:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FLAVORS_DATA.map((flavor, idx) => (
                  <button
                    key={flavor.id}
                    onClick={() => {
                      setHeroIndex(idx);
                      setIsPaused(true);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center gap-2 border ${
                      heroIndex === idx
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                        : "bg-white/5 text-white/80 border-white/10 hover:bg-white/15 hover:border-white/20"
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: flavor.color }}
                    ></span>
                    {flavor.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a href="#products" className={styles.primaryBtn}>
                EXPLORE CRATE <FaArrowRight />
              </a>
              <Link href="/products" className={styles.secondaryBtn}>
                VIEW ALL FLAVORS
              </Link>
            </div>

            {/* Hero Quick Feature Badges */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <span className="text-cyan-400 font-black text-xl">100%</span>
                <p className="text-xs text-white/60 font-medium mt-0.5">Natural Brew</p>
              </div>
              <div>
                <span className="text-green-400 font-black text-xl">0%</span>
                <p className="text-xs text-white/60 font-medium mt-0.5">Artificial Dye</p>
              </div>
              <div>
                <span className="text-amber-400 font-black text-xl">{currentFlavor.fizzScore}%</span>
                <p className="text-xs text-white/60 font-medium mt-0.5">Fizz Intensity</p>
              </div>
            </div>
          </div>

          {/* Right Hero Bottle Section with Live Flavor Details */}
          <div className={`${styles.heroImgContainer} order-1 md:order-2 flex flex-col items-center justify-center relative`}>
            <div className={styles.bottleBackdropRing}></div>
            <img 
              key={heroIndex} 
              src={currentFlavor.image} 
              alt={currentFlavor.name} 
              className={styles.floatingBottle} 
            />

            {/* Floating Flavor Info Badge */}
            <div className={styles.floatingFlavorCard}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                  {currentFlavor.tagline}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300">
                  {currentFlavor.fizzScore}% Fizz
                </span>
              </div>
              <p className="text-xs text-white/80 mt-1 font-medium">
                {currentFlavor.flavorNotes}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 STORY & VALUES SECTION */}
      <section className={styles.storySection}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={styles.storyMedia}>
            <div className={styles.dynamicFrame}>
              <img src={currentFlavor.image} alt="Story Bottle" className={styles.storyImg} />
            </div>
          </div>
          <div className={styles.storyContent}>
            <span className="text-[#00D1FF] font-black tracking-[4px] uppercase text-xs sm:text-sm">
              Our Craft & Legacy
            </span>
            <h2 className={styles.sectionTitle}>
              BORN TO BE <span>DIFFERENT</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mt-5 leading-relaxed">
              Born with an obsession for pure sparkle and botanical refreshment. 
              Every bottle is precision carbonated at sub-zero temperatures to capture 
              the crispest fizz on earth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className={styles.valueCard}>
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-lg mb-2">
                  <FaBolt />
                </div>
                <h4 className="text-white font-bold text-sm">Instant Energy Burst</h4>
                <p className="text-xs text-white/60 mt-1">Electrolytes & natural caffeine for all-day focus.</p>
              </div>

              <div className={styles.valueCard}>
                <div className="w-10 h-10 rounded-xl bg-green-400/10 text-green-400 flex items-center justify-center text-lg mb-2">
                  <FaLeaf />
                </div>
                <h4 className="text-white font-bold text-sm">100% Real Extracts</h4>
                <p className="text-xs text-white/60 mt-1">Cold-pressed botanical infusions with zero junk.</p>
              </div>

              <div className={styles.valueCard}>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg mb-2">
                  <FaTruck />
                </div>
                <h4 className="text-white font-bold text-sm">Express Chilled Delivery</h4>
                <p className="text-xs text-white/60 mt-1">Direct from our micro-brewery to your doorstep.</p>
              </div>

              <div className={styles.valueCard}>
                <div className="w-10 h-10 rounded-xl bg-rose-400/10 text-rose-400 flex items-center justify-center text-lg mb-2">
                  <FaShieldAlt />
                </div>
                <h4 className="text-white font-bold text-sm">Eco-Crate Promise</h4>
                <p className="text-xs text-white/60 mt-1">Infinitely recyclable glass & sustainable crates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟡 PRODUCTS SECTION (THE CRATE) */}
      <section id="products" className={styles.productsSection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-14 gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                Freshly Bottled
              </span>
              <h2 className={styles.sectionTitle}>THE <span>CRATE</span></h2>
              <p className="text-white/60 text-sm mt-1">
                Handcrafted, flash-chilled, and ready to quench your thirst.
              </p>
            </div>
            <Link href="/products" className={styles.viewAllBtn}>
              VIEW FULL CRATE RANGE <FaArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p className="text-sm font-semibold tracking-wider">CHILLING BOTTLES...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.slice(0, 4).map((p) => (
                <div key={p._id} className={styles.cardWrapper}>
                  <ProductCard item={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ⚡ PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-cyan-900/40 via-purple-900/40 to-black/60 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-400 text-black text-xs font-black uppercase tracking-wider inline-block mb-3">
              Limited Drop
            </span>
            <h3 className="text-2xl md:text-3xl font-black italic text-white">
              USE CODE <span className="text-cyan-400">"SPRYO20"</span> FOR 20% OFF
            </h3>
            <p className="text-white/70 text-sm mt-2">
              Order any crate of 4 bottles or more and enjoy free express chilled delivery right to your door.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm tracking-wide text-center transition shadow-lg shadow-cyan-500/20"
            >
              CLAIM YOUR CRATE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}