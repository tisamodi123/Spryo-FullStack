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
  FaCheckCircle 
} from "react-icons/fa";
import Link from "next/link";

const FLAVORS_DATA = [
  {
    id: "cola",
    name: "Classic Cola",
    tagline: "BOLD & TIMELESS",
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.2)",
    image: "/cola.png",
    fizzScore: 98,
    flavorNotes: "Cinnamon bark, rich caramel & crisp carbonated bite",
  },
  {
    id: "orange",
    name: "Zesty Orange",
    tagline: "CITRUS TSUNAMI",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.2)",
    image: "/orange.png",
    fizzScore: 94,
    flavorNotes: "Nagpur orange zest & sun-ripened citrus blast",
  },
  {
    id: "lemon",
    name: "Cloudy Lemon",
    tagline: "ELECTRIC CHILL",
    color: "#84cc16",
    glow: "rgba(132, 204, 22, 0.2)",
    image: "/lemon.png",
    fizzScore: 96,
    flavorNotes: "Crushed mint, fresh lime pulp & sparkling mineral brine",
  },
  {
    id: "up",
    name: "Mountain Up",
    tagline: "ALPINE RUSH",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.2)",
    image: "/up.png",
    fizzScore: 99,
    flavorNotes: "Mountain dew herbs & glacier-pure botanical crispness",
  },
];

export default function Page() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto flavor rotation every 5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % FLAVORS_DATA.length);
    }, 5000);
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
        tag: "Bestseller",
        description: "The timeless effervescence of roasted cinnamon bark, real caramel, and sub-zero carbonation.",
      },
      { 
        _id: "2", 
        name: "Zesty Orange", 
        price: 95, 
        originalPrice: 120,
        rating: 4.8,
        image: "/orange.png", 
        category: "orange",
        tag: "Fresh Harvest",
        description: "Sun-ripened Nagpur oranges cold-pressed with aromatic zest and refreshing mineral fizz.",
      },
      { 
        _id: "3", 
        name: "Cloudy Lemon", 
        price: 89, 
        originalPrice: 110,
        rating: 4.9,
        image: "/lemon.png", 
        category: "lemon",
        tag: "Citrus Chill",
        description: "Handcrafted cloudy lemonade made with hand-crushed limes, garden mint, and micro-fizz.",
      },
      { 
        _id: "4", 
        name: "Mountain Up", 
        price: 85, 
        originalPrice: 105,
        rating: 4.7,
        image: "/up.png", 
        category: "up",
        tag: "Energy Boost",
        description: "Alpine botanicals and glacier crispness infused with clean electrolytes for peak focus.",
      },
    ];

    setProducts(staticProducts);
    setLoading(false);
  }, []);

  const currentFlavor = FLAVORS_DATA[heroIndex];

  return (
    <div className={styles.mainContainer}>
      {/* 🔵 HERO SECTION */}
      <section 
        className={styles.heroSection}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={styles.heroGlow}
          style={{ background: currentFlavor.glow }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="text-left order-2 md:order-1">
            {/* Social Proof Pill */}
            <div className={styles.socialProofPill}>
              <span className="flex text-amber-400 gap-0.5">
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
                <FaStar size={11} />
              </span>
              <span>4.9 / 5 Rating</span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span className="text-cyan-400 font-semibold">50,000+ Bottles Delivered</span>
            </div>

            <span className={styles.tagline}>CRAFT SPARKLING BOTANICALS</span>
            <h1 className={styles.heroTitle}>
              TASTE THE <br /> 
              <span className={styles.heroTitleGradient}>EVOLUTION</span>
            </h1>

            <p className={styles.heroDesc}>
              Premium sparkling sodas infused with cold-pressed natural botanicals. 
              Sub-zero carbonated for unmatched effervescent crispness with zero synthetic junk.
            </p>

            {/* Interactive Flavor Switcher Tabs */}
            <div className="mt-8">
              <p className={styles.flavorSelectorLabel}>
                Signature Flavors:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {FLAVORS_DATA.map((flavor, idx) => (
                  <button
                    key={flavor.id}
                    onClick={() => {
                      setHeroIndex(idx);
                      setIsPaused(true);
                    }}
                    className={`${styles.flavorTab} ${
                      heroIndex === idx ? styles.flavorTabActive : ""
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
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
                Explore The Crate <FaArrowRight size={13} />
              </a>
              <Link href="/products" className={styles.secondaryBtn}>
                All Drinks
              </Link>
            </div>

            {/* Hero Quick Feature Badges */}
            <div className={styles.featureStripRow}>
              <div>
                <div className={styles.featureStatVal}>100%</div>
                <div className={styles.featureStatLabel}>Natural Botanicals</div>
              </div>
              <div>
                <div className={styles.featureStatVal}>0%</div>
                <div className={styles.featureStatLabel}>Artificial Dyes</div>
              </div>
              <div>
                <div className={styles.featureStatVal}>{currentFlavor.fizzScore}%</div>
                <div className={styles.featureStatLabel}>Sub-Zero Fizz</div>
              </div>
            </div>
          </div>

          {/* Right Hero Bottle Section with Pedestal Aura */}
          <div className={`${styles.heroImgContainer} order-1 md:order-2`}>
            <div 
              className={styles.bottleSpotlight}
              style={{ background: `radial-gradient(circle, ${currentFlavor.glow} 0%, transparent 70%)` }}
            ></div>
            <img 
              key={heroIndex} 
              src={currentFlavor.image} 
              alt={currentFlavor.name} 
              className={styles.floatingBottle} 
            />

            {/* Floating Flavor Info Badge */}
            <div className={styles.floatingFlavorCard}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  {currentFlavor.tagline}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300">
                  {currentFlavor.fizzScore}% Crispness
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 font-normal leading-relaxed">
                {currentFlavor.flavorNotes}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 PILLARS TICKER STRIP */}
      <div className={styles.pillarsStrip}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6 py-2">
          <div className={styles.pillarItem}>
            <span className={styles.pillarDot}></span>
            <span>Cold-Pressed Botanical Infusions</span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarDot}></span>
            <span>Sub-Zero Precision Carbonation</span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarDot}></span>
            <span>100% Infinitely Recyclable Glass</span>
          </div>
          <div className={styles.pillarItem}>
            <span className={styles.pillarDot}></span>
            <span>Handcrafted In Micro-Batches</span>
          </div>
        </div>
      </div>

      {/* 🟢 STORY & CRAFT SECTION */}
      <section className={styles.storySection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs">
              Our Craft & Legacy
            </span>
            <h2 className={styles.sectionTitle}>
              ENGINEERED FOR <span>REFRESHMENT</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
              We started SPRYO with a simple conviction: soda should be honest, sophisticated, and deeply satisfying. 
              Every bottle is carbonated at sub-zero temperatures with real fruit extracts and clean electrolytes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={styles.valueCard}>
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-lg mb-3">
                <FaBolt />
              </div>
              <h4>Clean Energy</h4>
              <p>Natural green tea caffeine & electrolytes for smooth, sustained focus without a crash.</p>
            </div>

            <div className={styles.valueCard}>
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center text-lg mb-3">
                <FaLeaf />
              </div>
              <h4>100% Real Extracts</h4>
              <p>Cold-pressed citrus, fresh herbs, and botanical infusions without synthetic dyes or high-fructose corn syrup.</p>
            </div>

            <div className={styles.valueCard}>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg mb-3">
                <FaTruck />
              </div>
              <h4>Express Chilled</h4>
              <p>Dispatched in temperature-controlled sustainable packaging direct to your doorstep.</p>
            </div>

            <div className={styles.valueCard}>
              <div className="w-10 h-10 rounded-xl bg-rose-400/10 text-rose-400 flex items-center justify-center text-lg mb-3">
                <FaShieldAlt />
              </div>
              <h4>Eco-Crate Promise</h4>
              <p>Heavyweight recyclable amber glass bottles and cardboard crates engineered with 0% single-use plastic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟡 PRODUCTS SECTION (THE CRATE) */}
      <section id="products" className={styles.productsSection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Small-Batch Drops
              </span>
              <h2 className={styles.sectionTitle}>THE <span>SIGNATURE CRATE</span></h2>
              <p className="text-slate-400 text-sm mt-1">
                Handcrafted, flash-chilled, and ready to quench your thirst.
              </p>
            </div>
            <Link href="/products" className={styles.viewAllBtn}>
              View All 4 Drinks <FaArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p className="text-sm font-semibold tracking-wider">CHILLING BOTTLES...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} item={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ⚡ PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className={styles.promoBanner}>
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Special Launch Offer
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              USE CODE <span className="text-cyan-400">"SPRYO20"</span> FOR 20% OFF
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Order any crate of 4 bottles or more and enjoy complimentary express chilled delivery to your door.
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/products"
              className={styles.primaryBtn}
            >
              Claim Your Crate <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}