"use client";
import { useState } from "react";
// import styles from "@/styles/productcard.module.css"; 
// import { clientFetch, API_ENDPOINTS } from "@/lib/api"; // 1. Central API import

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  //review submit function for backend
  // const submitReview = async () => {
  //   if (!comment.trim()) return alert("Please add a comment!");
  //   setLoading(true);
    
  //   const token = localStorage.getItem("token");

  //   try {
  //     // 2. Hardcoded URL ki jagah Dynamic Path use kiya
  //     const endpoint = `${API_ENDPOINTS.products}/${productId}/reviews`;
      
  //     const { ok, data } = await clientFetch(endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ rating: Number(rating), comment }),
  //     });
      
  //     if (ok) {
  //       alert("Refreshment review added! 🥤");
  //       window.location.reload();
  //     } else {
  //       alert(data.message || "Failed to submit. Check if you're logged in!");
  //     }
  //   } catch (err) {
  //     alert("Something went wrong. Check your connection!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //review submit static function
  const submitReview = async () => {
    if (!comment.trim()) return alert("Please add a comment!");
    setLoading(true);

    // STATIC LOGIC: Hum koi API call nahi karenge.
    // Hum sirf loading simulate karenge aur state update karenge.
    
    setTimeout(() => {
      alert("Refreshment review added! (Static Mode) 🥤");
      setComment(""); // Form clear karne ke liye
      setRating(5);   // Default rating reset
      setLoading(false);
    }, 1000); // 1 second ka nakli delay
  };
  return (
    // Responsive: Mobile par margin aur padding adjust ki gayi
    <div className="relative mt-8 md:mt-12 p-[1px] md:p-1 bg-gradient-to-r from-[#00D1FF] to-[#9333ea] rounded-[1.5rem] md:rounded-[2.5rem]">
      <div className="bg-[#0a0412] p-5 md:p-8 rounded-[1.4rem] md:rounded-[2.4rem] backdrop-blur-xl">
        <h3 className="text-xl md:text-2xl font-black italic text-white mb-6 uppercase tracking-tighter">
          Share Your <span className="text-[#00D1FF]">Fizz</span> Experience
        </h3>

        <div className="space-y-5">
          {/* Rating Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] md:text-xs font-bold uppercase ml-2">Select Vibe</label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"> 
              {[5, 4, 3, 2, 1].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`flex-1 min-w-[50px] py-3 rounded-xl font-bold transition-all border ${
                    rating === n 
                    ? "bg-[#00D1FF] border-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)]" 
                    : "bg-white/5 border-white/10 text-white hover:border-white/30"
                  }`}
                >
                  {n} ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] md:text-xs font-bold uppercase ml-2">Your Thoughts</label>
            <textarea
              placeholder="How's the taste? Is it refreshing?..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all outline-none min-h-[100px] md:min-h-[120px] resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={submitReview}
            disabled={loading}
            className="w-full group relative overflow-hidden bg-white text-black font-black uppercase py-4 rounded-2xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? "Processing..." : "POST MY REVIEW 🚀"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}