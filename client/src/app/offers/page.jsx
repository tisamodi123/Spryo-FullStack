"use client";
import { useState } from "react";
import Link from "next/link";
import { FaTag, FaCopy, FaCheck, FaArrowRight, FaFire, FaGlassWhiskey } from "react-icons/fa";

const offers = [
  {
    title: "Buy 2 Get 1 Free - Spryo Classic Cola",
    code: "COLA3FOR2",
    discount: "Free Bottle",
    desc: "Order any two bottles of our craft Spryo Classic Cola and get the third on us.",
    validity: "Valid till 31 Dec 2025",
    badge: "Most Popular",
  },
  {
    title: "Flat 20% Off - Citrus Dual Pack",
    code: "SPRYO20",
    discount: "20% OFF",
    desc: "Experience zesty refreshment with our Cloudy Lemon & Zesty Orange bundle.",
    validity: "Valid till 31 Dec 2025",
    badge: "Trending",
  },
  {
    title: "Weekend Fizz Combo - Mountain Up & Cola",
    code: "FIZZUP",
    discount: "Save ₹40",
    desc: "High-intensity effervescence duo packed for extreme botanical crispness.",
    validity: "Limited Batch Special",
    badge: "Weekend Drop",
  },
  {
    title: "First Crate Welcome Gift",
    code: "WELCOME10",
    discount: "10% OFF + Free Delivery",
    desc: "First time trying Spryo? Enjoy 10% instant off plus complimentary chilled shipping.",
    validity: "Valid on First Order",
    badge: "New Member",
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 text-xs font-black uppercase tracking-widest border border-cyan-400/20 [data-theme=light]:border-slate-300 mb-3">
            <FaTag size={11} /> Exclusive Deals
          </span>
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-wide text-white [data-theme=light]:text-slate-900 uppercase">
            Special <span className="text-cyan-400 [data-theme=light]:text-sky-600">Offers</span> & Drops
          </h1>
          <p className="text-white/60 [data-theme=light]:text-slate-600 text-sm mt-2 max-w-lg mx-auto">
            Unlock limited discounts, complimentary bottles, and seasonal coupons for your next crate.
          </p>
        </div>

        <div className="grid gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-md hover:border-cyan-400/40 transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 border border-cyan-400/30 [data-theme=light]:border-slate-300">
                    {offer.badge}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {offer.discount}
                  </span>
                </div>
                <h2 className="font-black text-xl text-white [data-theme=light]:text-slate-900">
                  {offer.title}
                </h2>
                <p className="text-white/60 [data-theme=light]:text-slate-600 text-xs mt-1.5 leading-relaxed">
                  {offer.desc}
                </p>
                <span className="inline-block text-[11px] text-white/40 [data-theme=light]:text-slate-500 font-medium mt-2">
                  ⏳ {offer.validity}
                </span>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 [data-theme=light]:border-slate-100">
                <div className="flex items-center gap-2 bg-white/10 [data-theme=light]:bg-slate-100 px-3.5 py-2 rounded-xl border border-white/10 [data-theme=light]:border-slate-200">
                  <span className="font-mono font-black text-xs text-cyan-400 [data-theme=light]:text-slate-900 tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => copyToClipboard(offer.code)}
                    className="text-xs text-white/70 [data-theme=light]:text-slate-600 hover:text-white cursor-pointer ml-1"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold text-[11px]">
                        <FaCheck /> Copied!
                      </span>
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                </div>

                <Link
                  href="/products"
                  className="px-4 py-2 rounded-xl bg-cyan-400 [data-theme=light]:bg-black text-black [data-theme=light]:text-white font-black text-xs tracking-wider uppercase hover:opacity-90 transition flex items-center gap-1.5"
                >
                  Shop Now <FaArrowRight size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-cyan-400/10 [data-theme=light]:bg-slate-100 border border-cyan-400/20 [data-theme=light]:border-slate-200">
          <FaFire className="text-3xl text-cyan-400 [data-theme=light]:text-sky-600 mx-auto mb-2" />
          <h3 className="text-lg font-black text-white [data-theme=light]:text-slate-900">
            Have a custom distributor promo code?
          </h3>
          <p className="text-xs text-white/60 [data-theme=light]:text-slate-600 mt-1 max-w-md mx-auto">
            You can apply any coupon code at checkout or apply it directly in your crate cart.
          </p>
          <Link
            href="/distributor"
            className="inline-block mt-4 text-xs font-black uppercase tracking-wider text-cyan-400 [data-theme=light]:text-black hover:underline"
          >
            Visit Distributor Hub →
          </Link>
        </div>
      </div>
    </div>
  );
}
