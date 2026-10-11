"use client";

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import ProductCard from "@/components/ProductCard";
import pstyles from "@/styles/products.module.css";
import { FaThLarge, FaBars, FaSearch, FaTimes, FaStar, FaPlus, FaCheck } from "react-icons/fa";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/ToastContext";
import Link from "next/link";

const STATIC_PRODUCTS = [
  {
    _id: "1",
    name: "Classic Cola",
    category: "cola",
    price: 99,
    originalPrice: 125,
    rating: 4.9,
    volume: "330 ml",
    image: "/cola.png",
    description: "The timeless, bold effervescence of rich caramel, cinnamon bark, and zero synthetic syrups.",
  },
  {
    _id: "2",
    name: "Cloudy Lemon",
    category: "lemon",
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    volume: "330 ml",
    image: "/lemon.png",
    description: "Crisp and electrifying sparkling lemonade crafted with fresh hand-crushed citrus pulp.",
  },
  {
    _id: "3",
    name: "Zesty Orange",
    category: "orange",
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    volume: "330 ml",
    image: "/orange.png",
    description: "A sun-drenched explosion of cold-pressed orange peels and refreshing mineral fizz.",
  },
  {
    _id: "4",
    name: "Mountain Up",
    category: "up",
    price: 85,
    originalPrice: 105,
    rating: 4.7,
    volume: "330 ml",
    image: "/up.png",
    description: "Alpine-pure botanical coolers with a high-energy lime and lemon effervescence.",
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const [filters, setFilters] = useState({
    category: "All",
    search: "",
    sort: "popularity",
  });

  const categories = ["All", "cola", "lemon", "orange", "up"];

  const colorThemes = {
    All: pstyles.themeAll,
    cola: pstyles.themeCola,
    lemon: pstyles.themeLemon,
    orange: pstyles.themeOrange,
    up: pstyles.themeUp,
  };

  const currentThemeClass = colorThemes[filters.category] || pstyles.themeAll;

  // Filter products based on search & category
  const filterProducts = (f = filters) => {
    setLoading(true);
    setTimeout(() => {
      let filtered = STATIC_PRODUCTS.filter((p) => {
        const matchCategory = f.category === "All" || p.category === f.category;
        const matchSearch =
          p.name.toLowerCase().includes(f.search.toLowerCase()) ||
          p.description.toLowerCase().includes(f.search.toLowerCase());
        return matchCategory && matchSearch;
      });

      setProducts(filtered);
      setLoading(false);
    }, 150);
  };

  const debouncedFilter = useMemo(() => debounce(filterProducts, 300), []);

  useEffect(() => {
    if (filters.search) debouncedFilter(filters);
    else filterProducts(filters);
    return () => debouncedFilter.cancel();
  }, [filters]);

  const displayed = useMemo(() => {
    const arr = [...products];
    if (filters.sort === "price_low") arr.sort((a, b) => a.price - b.price);
    if (filters.sort === "price_high") arr.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, filters.sort]);

  const [view, setView] = useState("grid");

  const handleQuickAdd = (p) => {
    addToCart(p, 1);
    setAddedItem(p._id);
    showToast(`${p.name} added to your crate! 🍹`);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className={`${pstyles.pageWrapper} ${currentThemeClass}`}>
      {/* HERO SECTION */}
      <section className={pstyles.heroSection}>
        <div className={pstyles.patternOverlay}></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center pt-12 sm:pt-20 pb-20 sm:pb-28">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[3px] sm:tracking-[4px] text-cyan-400 [data-theme=light]:text-sky-600 mb-2 inline-block">
            Handcrafted Sparkling Beverages
          </span>
          <h1 className={pstyles.mainTitle}>
            {filters.category === "All" ? "SPRYO" : filters.category.toUpperCase()}{" "}
            <span className={pstyles.titleHighlight}>COLLECTION</span>
          </h1>
          <p className="text-white/60 [data-theme=light]:text-slate-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-lg mx-auto">
            Explore pure sparkling refreshment brewed with cold-pressed natural botanicals.
          </p>
        </div>
      </section>

      {/* FLOATING TOOLBAR */}
      <div className="container mx-auto px-4 -mt-14 relative z-30 mb-12">
        <div className={pstyles.glassToolbar}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 w-full">
            {/* Search Input with Clear Button */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search flavors, notes..."
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                className={pstyles.cyberInput}
              />
              {filters.search ? (
                <button
                  onClick={() => setFilters((p) => ({ ...p, search: "" }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 [data-theme=light]:text-slate-400 hover:text-white [data-theme=light]:hover:text-black"
                >
                  <FaTimes size={13} />
                </button>
              ) : (
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 [data-theme=light]:text-slate-400" size={13} />
              )}
            </div>

            {/* Category Filter Pills - Flex Wrap so all fit without horizontal swiper */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-0.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilters((p) => ({ ...p, category: c }))}
                  className={`${pstyles.pillBtn} ${filters.category === c ? pstyles.pillActive : ""}`}
                >
                  <span className="capitalize">{c}</span>
                </button>
              ))}
            </div>

            {/* Sort & View Toggle */}
            <div className="flex items-center justify-between lg:justify-end gap-3">
              <select
                value={filters.sort}
                onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
                className={pstyles.cyberSelect}
                aria-label="Sort products"
              >
                <option value="popularity">Trending</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className={pstyles.viewToggleBtn}>
                <button
                  onClick={() => setView("grid")}
                  className={`${pstyles.viewBtn} ${view === "grid" ? pstyles.viewActive : ""}`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <FaThLarge size={13} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`${pstyles.viewBtn} ${view === "list" ? pstyles.viewActive : ""}`}
                  aria-label="List View"
                  title="List View"
                >
                  <FaBars size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS DISPLAY */}
      <main className="container mx-auto px-4 pb-24">
        {loading ? (
          <div className={pstyles.productGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={pstyles.skeletonCard} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className={pstyles.emptyState}>
            <p className="text-xl font-bold tracking-wider uppercase mb-2">
              No matching drinks found
            </p>
            <p className="text-sm text-white/50 mb-6">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              onClick={() => setFilters({ category: "All", search: "", sort: "popularity" })}
              className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-black text-xs uppercase tracking-wide hover:bg-cyan-300 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : view === "grid" ? (
          <div className={pstyles.productGrid}>
            {displayed.map((item) => (
              <div key={item._id} className={pstyles.cardContainer}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          /* RESPONSIVE HORIZONTAL LIST VIEW */
          <div className={pstyles.productList}>
            {displayed.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 transition"
              >
                <Link
                  href={`/product/${item._id}`}
                  className="w-32 h-32 flex items-center justify-center flex-shrink-0 bg-white/5 rounded-2xl p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-28 object-contain drop-shadow-lg"
                  />
                </Link>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-amber-400 font-bold inline-flex items-center gap-1">
                      <FaStar size={10} /> {item.rating}
                    </span>
                    <span className="text-xs text-white/40">•</span>
                    <span className="text-xs text-white/60">{item.volume}</span>
                  </div>

                  <Link href={`/product/${item._id}`}>
                    <h3 className="text-xl font-black italic text-white hover:text-cyan-400 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-white/60 mt-1 max-w-md">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black italic text-white">₹{item.price}</span>
                    <span className="text-xs text-white/40 line-through">₹{item.originalPrice}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/product/${item._id}`}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
                    >
                      DETAILS
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(item)}
                      className={`px-5 py-2 rounded-full text-xs font-black tracking-wide transition flex items-center gap-1.5 ${
                        addedItem === item._id
                          ? "bg-green-500 text-white"
                          : "bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-400/20"
                      }`}
                    >
                      {addedItem === item._id ? (
                        <>
                          <FaCheck size={11} /> ADDED
                        </>
                      ) : (
                        <>
                          <FaPlus size={10} /> ADD TO CRATE
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;