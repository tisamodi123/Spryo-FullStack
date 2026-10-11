"use client";
import { useState } from "react";
import { useToast } from "@/components/ToastContext";
import { FaCheckCircle, FaStar } from "react-icons/fa";

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Please enter a short review before submitting!");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setComment("");
      setRating(5);
      setLoading(false);
      setSubmitted(true);
      showToast("Thank you! Your verified customer review has been posted. ⭐");
      setTimeout(() => setSubmitted(false), 4000);
    }, 600);
  };

  return (
    <div className="relative mt-8 md:mt-12 p-[1px] md:p-1 bg-gradient-to-r from-[#00D1FF] to-[#9333ea] rounded-[1.5rem] md:rounded-[2.5rem]">
      <div className="bg-[#0a0412] p-5 md:p-8 rounded-[1.4rem] md:rounded-[2.4rem] backdrop-blur-xl">
        <h3 className="text-xl md:text-2xl font-black italic text-white mb-6 uppercase tracking-tight">
          Share Your <span className="text-[#00D1FF]">Fizz</span> Experience
        </h3>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center">
            <FaCheckCircle className="text-green-400 text-3xl mx-auto mb-2" />
            <h4 className="text-white font-bold text-base">Review Submitted!</h4>
            <p className="text-white/60 text-xs mt-1">Thank you for helping other sippers discover the fizz.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Rating Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase ml-2">
                Select Rating
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[5, 4, 3, 2, 1].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`flex-1 min-w-[50px] py-2.5 rounded-xl font-bold transition-all border text-xs flex items-center justify-center gap-1 ${
                      rating === n
                        ? "bg-[#00D1FF] border-[#00D1FF] text-black shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                        : "bg-white/5 border-white/10 text-white hover:border-white/30"
                    }`}
                  >
                    <span>{n}</span>
                    <FaStar size={10} className={rating === n ? "text-black" : "text-amber-400"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Box */}
            <div className="flex flex-col gap-2">
              <label className="text-white/50 text-[10px] md:text-xs font-bold uppercase ml-2">
                Your Review
              </label>
              <textarea
                placeholder="How was the fizz, crispness, and refreshing flavor?..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all outline-none min-h-[100px] md:min-h-[110px] resize-none text-sm"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={submitReview}
              disabled={loading}
              className="w-full bg-white hover:bg-cyan-400 hover:text-black text-black font-black uppercase py-3.5 rounded-2xl transition-all disabled:opacity-50 text-xs tracking-wider"
            >
              {loading ? "SUBMITTING REVIEW..." : "POST MY REVIEW 🚀"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}