"use client";

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useCart } from "@/components/CartContext";
import ProductCard from '@/components/ProductCard';
import pstyles from '@/styles/products.module.css';
import { FaThLarge, FaBars } from 'react-icons/fa';
// import PerfectPour from "@/components/PerfectPour";
// 1. Central API helper aur endpoints import karein
// import { clientFetch, API_ENDPOINTS } from "@/lib/api";

// 1. Static Data yahan define karein (Imports ke neeche)
const STATIC_PRODUCTS = [
  {
    
    _id: "1",
    name: "Classic Cola",
    category: "cola",
    price: 99,
    image: "/cola.png", // Apne images ka sahi path check karein
    description: "The timeless taste of refreshing cola.",
  },
  {
    _id: "2",
    name: "Zesty Lemon",
    category: "lemon",
    price: 89,
    image: "/lemon.png",
    description: "Crisp and citrusy lemon refreshment.",
  },
  {
    _id: "3",
    name: "Orange orange",
    category: "orange",
    price: 95,
    image: "/orange.png",
    description: "Full of tangy orange flavor.",
  },
  {
    _id: "4",
    name: "Sky High Up",
    category: "up",
    price: 85,
    image: "/up.png",
    description: "Light and bubbly lime drink.",
  }
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    search: "",
    minPrice: "",
    maxPrice: "",
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

  const buildQuery = (f) => {
    const q = new URLSearchParams();
    if (f.category !== "All") q.set("category", f.category);
    if (f.search) q.set("search", f.search);
    return q.toString();
  };
//if we use backend
  // const loadProducts = async (f = filters) => {
  //   try {
  //     setLoading(true);
  //     const query = buildQuery(f);
      
  //     // 2. Localhost URL ki jagah clientFetch aur API_ENDPOINTS use kiya
  //     const { ok, data } = await clientFetch(`${API_ENDPOINTS.products}${query ? "?" + query : ""}`);
      
  //     if (ok && data.success) {
  //       setProducts(data.products);
  //     } else {
  //       setProducts([]);
  //     }
  //   } catch (err) {
  //     console.error("Products Load Error:", err);
  //     setProducts([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 2. LoadProducts function jo static data ko filter karega
  const loadProducts = (f = filters) => {
    setLoading(true);
    
    // Thoda sa delay taaki skeleton loading effect dikhe (optional)
    setTimeout(() => {
      let filtered = STATIC_PRODUCTS.filter((p) => {
        const matchCategory = f.category === "All" || p.category === f.category;
        const matchSearch = p.name.toLowerCase().includes(f.search.toLowerCase());
        return matchCategory && matchSearch;
      });

      setProducts(filtered);
      setLoading(false);
    }, 300); 
  };

  const debouncedLoad = useMemo(() => debounce(loadProducts, 400), []);

  useEffect(() => {
    if (filters.search) debouncedLoad(filters);
    else loadProducts(filters);
    return () => debouncedLoad.cancel();
  }, [filters]);

  const displayed = useMemo(() => {
    const arr = [...products];
    if (filters.sort === "price_low") arr.sort((a, b) => a.price - b.price);
    if (filters.sort === "price_high") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [products, filters.sort]);

  const [view, setView] = useState('grid');

  return (
    <div className={`${pstyles.pageWrapper} ${currentThemeClass}`}>
      
      <div className={pstyles.pourFixedPosition}>
        {/* <PerfectPour category={filters.category} /> */}
      </div>

      {/* HERO SECTION */}
      <section className={pstyles.heroSection}>
        {(filters.category === 'All' || filters.category === 'cola') && (
          <div className={pstyles.patternOverlay}></div>
        )}
     
        <div className="container mx-auto px-6 relative z-10 text-center pt-24 pb-32">
          <h1 className={pstyles.mainTitle}>
            {filters.category === 'All' ? 'SPRYO' : filters.category} <span className={pstyles.titleStroke}>COLLECTION</span>
          </h1>
        </div>
      </section>

      {/* FLOATING TOOLBAR */}
      <div className="container mx-auto px-4 -mt-20 relative z-30 mb-12">
        <div className={pstyles.glassToolbar}>
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            
            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Find your flavor..."
                value={filters.search}
                onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
                className={pstyles.cyberInput}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilters(p => ({ ...p, category: c }))}
                  className={`${pstyles.pillBtn} ${filters.category === c ? pstyles.pillActive : ''}`}
                >
                  <span className="capitalize">{c}</span>
                </button>
              ))}
            </div>

            <div className="hidden md:block flex-grow"></div>

            {/* Sort & View */}
            <div className="flex items-center gap-4">
              <select
                value={filters.sort}
                onChange={(e) => setFilters(p => ({ ...p, sort: e.target.value }))}
                className={pstyles.cyberSelect}
              >
                <option value="popularity">Trending</option>
                <option value="price_low">Price: Low</option>
                <option value="price_high">Price: High</option>
              </select>
              
              <div className={pstyles.viewToggleBtn}>
                <button 
                  onClick={() => setView('grid')} 
                  className={`${pstyles.viewBtn} ${view === 'grid' ? pstyles.viewActive : ''}`}
                  aria-label="Grid View"
                >
                  <FaThLarge size={13} />
                </button>
                <button 
                  onClick={() => setView('list')} 
                  className={`${pstyles.viewBtn} ${view === 'list' ? pstyles.viewActive : ''}`}
                  aria-label="List View"
                >
                  <FaBars size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <main className="container mx-auto px-4 pb-24">
        <div className={view === 'grid' ? pstyles.productGrid : pstyles.productList}>
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => <div key={i} className={pstyles.skeletonCard} />)
          ) : displayed.length === 0 ? (
            <div className={pstyles.emptyState}>
               <p className="text-xl font-bold tracking-widest uppercase">No products match filters</p>
               <button onClick={() => setFilters({category: 'All', search: '', sort: 'popularity'})} className="mt-4 underline uppercase text-sm font-bold">Clear All</button>
            </div>
          ) : (
            displayed.map((item) => (
              <div key={item._id} className={pstyles.cardContainer}>
                <ProductCard item={item} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;