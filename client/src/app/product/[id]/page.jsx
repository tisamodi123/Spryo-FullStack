"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from '@/components/CartContext';
import styles from '@/styles/product.module.css';
import Link from 'next/link';
import ReviewForm from "@/components/ReviewForm";
import { clientFetch, API_ENDPOINTS } from "@/lib/api";
import { useToast } from "@/components/ToastContext";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [tab, setTab] = useState('details');

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const staticProducts = [
    {
      _id: "1",
      name: "Classic Cola",
      price: 99,
      originalPrice: 125,
      discount: 20,
      category: "Sparkling Craft Soda",
      volume: "330 ml",
      description: "The timeless, bold effervescence of rich caramel, cinnamon bark, and zero synthetic syrups. Precision-carbonated at sub-zero temperatures.",
      image: "/cola.png",
      ingredients: ["Carbonated Himalayan Spring Water", "Pure Cane Sugar", "Natural Kola Nut Extract", "Cinnamon Bark", "Organic Citrus Oil", "Caffeine (32mg)"],
      numReviews: 8,
      reviews: [
        { _id: "r1", name: "Chetan V.", rating: 5, comment: "Hands down the best artisanal cola in India!" },
        { _id: "r2", name: "Aashu M.", rating: 5, comment: "Super crisp fizz, doesn't feel heavy or overly sweet." }
      ]
    },
    {
      _id: "2",
      name: "Cloudy Lemon",
      price: 89,
      originalPrice: 110,
      discount: 19,
      category: "Sparkling Craft Soda",
      volume: "330 ml",
      description: "Crisp and electrifying sparkling lemonade crafted with fresh hand-crushed citrus pulp and botanical brine. Perfect hot summer refresher.",
      image: "/lemon.png",
      ingredients: ["Carbonated Spring Water", "Cold-Pressed Lemon Pulp", "Lime Zest", "Raw Cane Sugar", "Pink Himalayan Rock Salt", "Mint Oil"],
      numReviews: 6,
      reviews: [
        { _id: "r3", name: "Rahul S.", rating: 5, comment: "Ek dum mast taste hai! The citrus bite is incredible." },
        { _id: "r4", name: "Sneha K.", rating: 5, comment: "Tastes like real squeezed lemons with perfect fizz." }
      ]
    },
    {
      _id: "3",
      name: "Zesty Orange",
      price: 95,
      originalPrice: 120,
      discount: 21,
      category: "Sparkling Craft Soda",
      volume: "330 ml",
      description: "A sun-drenched explosion of cold-pressed Nagpur orange peels and refreshing mineral fizz that awakens the senses.",
      image: "/orange.png",
      ingredients: ["Carbonated Spring Water", "Nagpur Orange Juice Concentrate", "Orange Peel Infusion", "Cane Sugar", "Citric Acid", "Vitamin C"],
      numReviews: 5,
      reviews: [
        { _id: "r5", name: "Rishi P.", rating: 5, comment: "Juicy citrus taste with awesome fizz!" },
        { _id: "r6", name: "Shital M.", rating: 4, comment: "Very refreshing, my whole family loved it." }
      ]
    },
    {
      _id: "4",
      name: "Mountain Up",
      price: 85,
      originalPrice: 105,
      discount: 19,
      category: "Sparkling Craft Soda",
      volume: "330 ml",
      description: "Alpine-pure botanical coolers with a high-energy lime and lemon effervescence. Crafted for an instant electric refresher.",
      image: "/up.png",
      ingredients: ["Carbonated Spring Water", "Mountain Botanical Herbs", "Green Lime Extract", "Electrolytes (Sodium & Potassium)", "Cane Sugar"],
      numReviews: 7,
      reviews: [
        { _id: "r7", name: "Keyur B.", rating: 5, comment: "Better than Sprite or Mountain Dew by miles!" },
        { _id: "r8", name: "Sneha T.", rating: 5, comment: "Zero synthetic aftertaste, pure crisp fizz." }
      ]
    }
  ];


  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { ok, data } = await clientFetch(`${API_ENDPOINTS.products || '/products'}/${id}`);
      if (ok && data?.success && data?.product) {
        setProduct(data.product);
        setSelectedImg(data.product.image);
        setLoading(false);
        return;
      }
    } catch (error) {
      // Fallback to static product catalog
    }

    const foundProduct = staticProducts.find((p) => String(p._id) === String(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImg(foundProduct.image);
    } else {
      setProduct(null);
    }
    setLoading(false);
  };
  //     setLoading(false);
  //   }, 500); // 0.5s ka nakli loading time
  // };

  useEffect(() => { 
    if (id) fetchProduct(); 
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#1a0b2e] [data-theme=light]:bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D1FF] [data-theme=light]:border-sky-600"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#1a0b2e] [data-theme=light]:bg-slate-50 flex flex-col items-center justify-center text-white [data-theme=light]:text-slate-900">
      <h2 className="text-2xl font-bold mb-4">Drink not found.</h2>
      <Link href="/products" className="text-[#00D1FF] [data-theme=light]:text-sky-600 underline">Back to Shop</Link>
    </div>
  );

  const getThemeClass = () => {
    const n = product.name.toLowerCase();
    if (n.includes('lemon')) return styles.lemonTheme;
    if (n.includes('cola')) return styles.colaTheme;
    return styles.defaultTheme;
  };

  return (
    <div className={`${styles.productPage} ${getThemeClass()}`}>
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        <Link href="/products" className="inline-block mb-8 text-white/70 [data-theme=light]:text-slate-600 hover:text-[#00D1FF] [data-theme=light]:hover:text-sky-600 font-extrabold tracking-wider transition">
          ← BACK TO COLLECTION
        </Link>

        <div className={styles.mainGrid}>
          {/* LEFT: Image Section */}
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <img src={selectedImg} alt={product.name} className={styles.mainImg} />
              <div className={styles.glowCircle}></div>
            </div>
            <div className={styles.thumbnails}>
              {[product.image, ...(product.images || [])].filter(Boolean).map((img, i) => (
                <div 
                  key={i} 
                  className={`${styles.thumb} ${selectedImg === img ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Info Section */}
          <div className={styles.infoSection}>
            <span className={styles.categoryBadge}>{product.category}</span>
            <h1 className={styles.productTitle}>{product.name}</h1>
            
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>₹{product.price}</span>
              {product.originalPrice && <span className={styles.oldPrice}>₹{product.originalPrice}</span>}
              {product.discount && <span className={styles.discountBadge}>{product.discount}% OFF</span>}
            </div>

            <p className={styles.shortDesc}>{product.description?.substring(0, 150)}...</p>

            <div className={styles.actionBox}>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button 
                className={styles.addToCartBtn}
                onClick={() => { 
                  addToCart(product, quantity); 
                  showToast(`${product.name} (x${quantity}) added to your crate! 🍹`); 
                }}
              >
                ADD TO CRATE
              </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
              <div className={styles.tabHeader}>
                {['details', 'ingredients', 'reviews'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTab(t)}
                    className={`${styles.tabLink} ${tab === t ? styles.tabActive : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                {tab === 'details' && <p>{product.description}</p>}
                
                {tab === 'ingredients' && (
                  <p>{product.ingredients?.join(', ') || 'Premium carbonated water, sugar, flavorings.'}</p>
                )}

                {tab === 'reviews' && (
                  <div className={styles.reviewsWrapper}>
                    <h2 className="text-2xl font-bold mb-6 text-white [data-theme=light]:text-slate-900 uppercase italic">
                      Customer Vibes ({product.numReviews || 0})
                    </h2>

                    <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((r) => (
                          <div key={r._id} className="bg-white/5 [data-theme=light]:bg-white p-4 rounded-2xl border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <strong className="text-[#00D1FF] [data-theme=light]:text-sky-600">{r.name}</strong>
                              <div className="text-yellow-400 text-sm">
                                {"★".repeat(r.rating)}
                                <span className="text-white/20 [data-theme=light]:text-slate-300">{"★".repeat(5 - r.rating)}</span>
                              </div>
                            </div>
                            <p className="text-white/70 [data-theme=light]:text-slate-700 italic text-sm">"{r.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/40 [data-theme=light]:text-slate-400 italic">No reviews yet. Be the first to taste!</p>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 [data-theme=light]:border-slate-200">
                      <ReviewForm productId={product._id} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;