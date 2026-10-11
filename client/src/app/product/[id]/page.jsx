"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from '@/components/CartContext';
import styles from '@/styles/product.module.css';
import Link from 'next/link';
import ReviewForm from "@/components/ReviewForm";
// 1. Central API helper aur endpoints import karein for backend
// import { clientFetch, API_ENDPOINTS } from "@/lib/api";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [tab, setTab] = useState('details');
  const [toastShown, setToastShown] = useState(false);

  const { addToCart } = useCart();

     // STATIC DATA: Organized as an Array for easy searching
  const staticProducts = [
    {
      _id: "2",
      name: "Classic Lemon Chill",
      price: 199,
      originalPrice: 250,
      discount: 20,
      category: "Soft Drink",
      description: "Experience the ultimate refreshment with our hand-crafted lemon soda. Perfect for hot summer days.",
      image: "/lemon.png",
      numReviews: 5,
      reviews: [
        { _id: "r1", name: "Rahul", rating: 5, comment: "Ek dum mast taste hai!" },
        { _id: "r2", name: "Sneha", rating: 4, comment: "Very refreshing." }
      ]
    },
    {
      _id: "3",
      name: "Classic Orange",
      price: 199,
      originalPrice: 250,
      discount: 20,
      category: "Soft Drink",
      description: "A tangy and zesty orange burst that awakens your senses with every bubbly sip.",
      image: "/orange.png",
      numReviews: 5,
      reviews: [
        { _id: "r3", name: "Rishi", rating: 5, comment: "Ek dum mast taste hai!" },
        { _id: "r4", name: "Shital", rating: 4, comment: "Very refreshing." }
      ]
    },
    {
      _id: "4",
      name: "Classic Up",
      price: 199,
      originalPrice: 250,
      discount: 20,
      category: "Soft Drink",
      description: "The crisp, clean taste of lime and lemon in a perfectly balanced fizz.",
      image: "/up.png",
      numReviews: 5,
      reviews: [
        { _id: "r5", name: "Keyu", rating: 5, comment: "nice!" },
        { _id: "r6", name: "Sneha", rating: 4, comment: "Very nice." }
      ]
    },
    {
      _id: "1",
      name: "Classic Cola",
      price: 199,
      originalPrice: 250,
      discount: 20,
      category: "Soft Drink",
      description: "The timeless, bold flavor of premium cola that never goes out of style.",
      image: "/cola.png",
      numReviews: 5,
      reviews: [
        { _id: "r7", name: "Chetan", rating: 5, comment: "good" },
        { _id: "r8", name: "Aashu", rating: 4, comment: "Very good." }
      ]
    }
  ];


const fetchProduct = async () => {
  setLoading(true);
  
  // Fake a delay to simulate a real database
  setTimeout(() => {
    // 💡 Logic: Find the one product in our list where _id matches the URL id
    const foundProduct = staticProducts.find(p => p._id === id);

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImg(foundProduct.image);
    } else {
      // Optional: Handle what happens if the ID doesn't exist
      setProduct(null);
    }
    
    setLoading(false);
  }, 500); 
};

//backend use
  // const fetchProduct = async () => {
  //   try {
  //     setLoading(true);
  //     // 2. Localhost URL ki jagah clientFetch use kiya
  //     const { ok, data } = await clientFetch(`${API_ENDPOINTS.products}/${id}`);
      
  //     if (ok && data.success) {
  //       setProduct(data.product);
  //       setSelectedImg(data.product.image);
  //     }
  //   } catch (error) {
  //     console.error("Fetch Product Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //for backend
  //    const fetchProduct = async () => {
  //   setLoading(true);
  //   // Yahan hum backend se fetch karne ke bajaye static data set kar rahe hain
  //   setTimeout(() => {
  //     setProduct(staticProduct);
  //     setSelectedImg(staticProduct.image);
  //     setLoading(false);
  //   }, 500); // 0.5s ka nakli loading time
  // };

  useEffect(() => { 
    if (id) fetchProduct(); 
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#1a0b2e] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D1FF]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#1a0b2e] flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Drink not found.</h2>
      <Link href="/products" className="text-[#00D1FF] underline">Back to Shop</Link>
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
        
        <Link href="/products" className="inline-block mb-8 text-white/60 hover:text-white font-bold">
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
                onClick={() => { addToCart(product, quantity); setToastShown(true); setTimeout(() => setToastShown(false), 2000); }}
              >
                ADD TO REFRESHMENT
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
                    <h2 className="text-2xl font-bold mb-6 text-white uppercase italic">
                      Customer Vibes ({product.numReviews || 0})
                    </h2>

                    <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((r) => (
                          <div key={r._id} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                              <strong className="text-[#00D1FF]">{r.name}</strong>
                              <div className="text-yellow-400 text-sm">
                                {"★".repeat(r.rating)}
                                <span className="text-white/20">{"★".repeat(5 - r.rating)}</span>
                              </div>
                            </div>
                            <p className="text-white/70 italic text-sm">"{r.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/40 italic">No reviews yet. Be the first to taste!</p>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                      <ReviewForm productId={product._id} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastShown && <div className={styles.toast}>✓ Added to your collection</div>}
    </div>
  );
};

export default Page;