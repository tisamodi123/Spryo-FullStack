"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  FaStar, 
  FaCheckCircle, 
  FaQuoteLeft, 
  FaArrowRight, 
  FaHeart, 
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck
} from "react-icons/fa";

const REVIEWS = [
  {
    id: 1,
    name: "Aarav Patel",
    city: "Surat, Gujarat",
    flavor: "Classic Cola",
    rating: 5,
    tag: "Verified Buyer",
    date: "2 days ago",
    title: "Best craft cola I've ever tasted in India",
    content: "Honestly didn't expect this level of fizz and depth! The hint of cinnamon and natural caramel is so clean — zero syrupy aftertaste like commercial sodas. Arrived ice-cold in Surat within 24 hours.",
    fizzMatch: "100% Satisfied"
  },
  {
    id: 2,
    name: "Rhea Mukherjee",
    city: "Bengaluru, Karnataka",
    flavor: "Cloudy Lemon",
    rating: 5,
    tag: "Verified Buyer",
    date: "3 days ago",
    title: "Real hand-crushed citrus punch!",
    content: "You can genuinely taste the lemon pulp and rock salt in Cloudy Lemon. It's become our weekend terrace drink. Paired it with gin during a friend's housewarming and everyone asked where I ordered the crates from.",
    fizzMatch: "Party Favorite"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    city: "Mumbai, Maharashtra",
    flavor: "Mountain Up",
    rating: 5,
    tag: "Verified Buyer",
    date: "5 days ago",
    title: "Replaced my daily energy drink habit",
    content: "The botanical herbs combined with high carbonation give such a clean rush without the jittery sugar crash. The glass bottle packaging feels premium and heavy in hand. Highly recommend ordering the 12-pack crate.",
    fizzMatch: "Daily Refreshment"
  },
  {
    id: 4,
    name: "Ananya Sharma",
    city: "New Delhi",
    flavor: "Zesty Orange",
    rating: 5,
    tag: "Verified Buyer",
    date: "1 week ago",
    title: "Nagpur oranges with champagne-like bubbles",
    content: "Zesty Orange hits completely different than generic orange drinks. It's vibrant, tangy, and smells like fresh winter citrus peels. Even the delivery crate had insulated ice pads keeping them chilled.",
    fizzMatch: "Citrus Perfection"
  },
  {
    id: 5,
    name: "Dr. Kunal Singhania",
    city: "Pune, Maharashtra",
    flavor: "Classic Cola",
    rating: 5,
    tag: "Verified Buyer",
    date: "1 week ago",
    title: "Clean ingredients you can actually read",
    content: "As someone conscious about artificial dyes and high-fructose corn syrup, SPRYO is a breath of fresh air. Kola nut extract, real cane sugar, and natural spring water. Super proud to support a homegrown Indian beverage.",
    fizzMatch: "Healthier Choice"
  },
  {
    id: 6,
    name: "Pooja Varma",
    city: "Jaipur, Rajasthan",
    flavor: "Cloudy Lemon",
    rating: 5,
    tag: "Verified Buyer",
    date: "2 weeks ago",
    title: "Pure thirst quencher in the desert heat",
    content: "Jaipur afternoons are scorching, and this cold cloudy lemon served over crushed ice with fresh mint is an absolute lifesaver. The fizz stays active till the very last sip.",
    fizzMatch: "Beat The Heat"
  },
  {
    id: 7,
    name: "Rohan Deshmukh",
    city: "Ahmedabad, Gujarat",
    flavor: "Mountain Up",
    rating: 4,
    tag: "Verified Buyer",
    date: "2 weeks ago",
    title: "Crisp alpine notes with great bite",
    content: "High carbonation is on point. Mountain Up has a very distinct botanical herbal profile that feels super refreshing after an intense workout session or long drive.",
    fizzMatch: "High Energy"
  },
  {
    id: 8,
    name: "Meera Krishnan",
    city: "Hyderabad, Telangana",
    flavor: "Zesty Orange",
    rating: 5,
    tag: "Verified Buyer",
    date: "3 weeks ago",
    title: "The whole family fought over the last bottle",
    content: "Ordered the mixed crate for my brother's birthday dinner. The Orange and Cola disappeared first. Re-ordering another 24-bottle crate for Diwali celebrations right away!",
    fizzMatch: "Family Loved"
  }
];

const FLAVOR_OPTIONS = ["All Flavors", "Classic Cola", "Cloudy Lemon", "Zesty Orange", "Mountain Up"];

export default function TestimonialsPage() {
  const [selectedFlavor, setSelectedFlavor] = useState("All Flavors");

  const filteredReviews = selectedFlavor === "All Flavors"
    ? REVIEWS
    : REVIEWS.filter((r) => r.flavor.toLowerCase() === selectedFlavor.toLowerCase());

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 text-xs font-black uppercase tracking-widest border border-cyan-400/20 [data-theme=light]:border-slate-300 mb-3">
            <FaHeart className="text-rose-400" size={11} /> Real Sippers. Real Stories.
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic tracking-wide text-white [data-theme=light]:text-slate-900 uppercase">
            HEAR THE <span className="text-cyan-400 [data-theme=light]:text-sky-600">FIZZ</span> TRIBE
          </h1>
          <p className="text-white/60 [data-theme=light]:text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Real feedback from thousands of customers who made the switch to SPRYO's all-natural, sub-zero precision carbonated craft sodas.
          </p>
        </div>

        {/* TRUST STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-3xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-md backdrop-blur-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-sm mb-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <span className="text-2xl font-black text-white [data-theme=light]:text-slate-900">4.9 / 5</span>
            <p className="text-[11px] uppercase tracking-wider text-white/50 [data-theme=light]:text-slate-500 font-bold mt-0.5">Average Rating</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black text-cyan-400 [data-theme=light]:text-sky-600">50,000+</span>
            <p className="text-[11px] uppercase tracking-wider text-white/50 [data-theme=light]:text-slate-500 font-bold mt-0.5">Bottles Sipped</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black text-emerald-400">98.4%</span>
            <p className="text-[11px] uppercase tracking-wider text-white/50 [data-theme=light]:text-slate-500 font-bold mt-0.5">Repeat Crate Orders</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black text-purple-400">100%</span>
            <p className="text-[11px] uppercase tracking-wider text-white/50 [data-theme=light]:text-slate-500 font-bold mt-0.5">Natural Botanicals</p>
          </div>
        </div>

        {/* FLAVOR FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FLAVOR_OPTIONS.map((flavor) => (
            <button
              key={flavor}
              onClick={() => setSelectedFlavor(flavor)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                selectedFlavor === flavor
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                  : "bg-white/5 [data-theme=light]:bg-slate-100 text-white/70 [data-theme=light]:text-slate-700 hover:bg-white/10 [data-theme=light]:hover:bg-slate-200 border border-white/10 [data-theme=light]:border-slate-300"
              }`}
            >
              {flavor}
            </button>
          ))}
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 rounded-3xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-md hover:border-cyan-400/30 transition duration-300 backdrop-blur-xl relative flex flex-col justify-between"
            >
              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 border border-cyan-400/20 [data-theme=light]:border-slate-200 font-black text-sm flex items-center justify-center">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white [data-theme=light]:text-slate-900 flex items-center gap-1.5">
                        {rev.name}
                        <FaCheckCircle className="text-emerald-400 text-xs" title="Verified Customer" />
                      </h3>
                      <p className="text-[11px] text-white/50 [data-theme=light]:text-slate-500 flex items-center gap-1 font-medium">
                        <FaMapMarkerAlt size={10} className="text-cyan-400 [data-theme=light]:text-sky-600" />
                        {rev.city}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                {/* Flavor Badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-800 text-[11px] font-bold mb-3 border border-cyan-400/20 [data-theme=light]:border-slate-200">
                  <span>🥤 {rev.flavor}</span>
                  <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  <span className="text-emerald-400">{rev.fizzMatch}</span>
                </div>

                {/* Title & Content */}
                <h4 className="font-extrabold text-base text-white [data-theme=light]:text-slate-900 mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-white/70 [data-theme=light]:text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Bottom timestamp */}
              <div className="mt-5 pt-3.5 border-t border-white/5 [data-theme=light]:border-slate-100 flex items-center justify-between text-[11px] text-white/40 [data-theme=light]:text-slate-400 font-medium">
                <span>{rev.tag}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900/40 to-blue-950/40 [data-theme=light]:from-sky-50 [data-theme=light]:to-slate-100 border border-white/10 [data-theme=light]:border-slate-300 backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-black italic text-white [data-theme=light]:text-slate-900 uppercase">
            READY TO JOIN THE <span className="text-cyan-400 [data-theme=light]:text-sky-600">SPRYO</span> EXPERIENCE?
          </h2>
          <p className="text-white/60 [data-theme=light]:text-slate-600 text-sm mt-2 max-w-xl mx-auto">
            Get your freshly bottled chilled craft crate delivered right to your doorstep. Use code <strong>"SPRYO20"</strong> for 20% off your first 4-pack.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm tracking-wide transition shadow-lg shadow-cyan-400/20 inline-flex items-center gap-2"
            >
              EXPLORE OUR FLAVORS <FaArrowRight size={12} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-full bg-white/10 [data-theme=light]:bg-white text-white [data-theme=light]:text-slate-900 hover:bg-white/15 [data-theme=light]:hover:bg-slate-200 border border-white/10 [data-theme=light]:border-slate-300 font-bold text-sm tracking-wide transition"
            >
              OUR CRAFT STORY
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
