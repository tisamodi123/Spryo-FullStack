"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaLeaf, 
  FaTruck, 
  FaRecycle, 
  FaBoxOpen, 
  FaShieldAlt 
} from "react-icons/fa";

const FAQ_CATEGORIES = [
  { id: "all", name: "All FAQs" },
  { id: "product", name: "Drink & Ingredients" },
  { id: "shipping", name: "Shipping & Chilled Delivery" },
  { id: "orders", name: "Orders & Crates" },
  { id: "eco", name: "Recycling & Sustainability" }
];

const FAQS = [
  {
    category: "product",
    question: "What makes SPRYO sparkling drinks different from typical sodas?",
    answer: "Unlike mass-market sodas loaded with artificial syrups, high-fructose corn syrup, and harsh chemical preservatives, SPRYO is crafted using Himalayan spring water, cold-pressed fruit extracts (like Nagpur orange zest and hand-crushed lemons), raw cane sugar, and sub-zero precision carbonation. This delivers a remarkably crisp, champagne-like effervescence without any heavy syrupy crash."
  },
  {
    category: "product",
    question: "What are the four signature SPRYO flavors?",
    answer: "Our current signature lineup includes: (1) Classic Cola — brewed with real kola nut extract, cinnamon bark, and organic citrus oil; (2) Cloudy Lemon — fresh squeezed lemon pulp, mint leaves, and a pinch of Himalayan rock salt; (3) Zesty Orange — sun-ripened orange peel infusion packed with vitamin C; and (4) Mountain Up — alpine botanical herbs with an energizing lemon-lime effervescence."
  },
  {
    category: "product",
    question: "Are SPRYO beverages gluten-free and 100% vegetarian?",
    answer: "Yes, absolutely! All SPRYO sparkling craft beverages are 100% vegetarian, gluten-free, dairy-free, and contain zero animal-derived coloring agents or additives."
  },
  {
    category: "product",
    question: "What is the shelf life and how should I store my crate?",
    answer: "Every bottle has a shelf life of 9 months from the date of bottling printed on the cap. For the optimal fizz experience, store bottles in a cool, dry place away from direct sunlight, and flash-chill them in your refrigerator for at least 2 hours before opening. Serve over ice for an unforgettable crisp bite!"
  },
  {
    category: "shipping",
    question: "How does Express Chilled Delivery work?",
    answer: "We ship directly from our state-of-the-art micro-bottling facilities. In metro cities (Surat, Mumbai, Ahmedabad, Bengaluru, Delhi NCR, Pune, Hyderabad), orders arrive within 24 to 48 hours in insulated, shock-absorbent eco-crates to guarantee the bottles reach your doorstep icy cold and intact."
  },
  {
    category: "shipping",
    question: "Is there a minimum order for free delivery?",
    answer: "Orders of ₹250 or more automatically qualify for 100% Free Express Chilled Delivery. For orders below ₹250, a nominal delivery fee of ₹40 is added at checkout."
  },
  {
    category: "orders",
    question: "What is your return or damaged bottle policy?",
    answer: "We take immense pride in our protective glass-safe packaging. In the rare event that a bottle arrives damaged or broken during transit, simply snap a picture and email it to Spryoindia@gmail.com or WhatsApp our support line at +91 8140065550 within 48 hours of delivery. We will promptly issue an instant replacement crate or refund without any hassle."
  },
  {
    category: "orders",
    question: "Can I customize a mixed crate of different flavors?",
    answer: "Yes! You can add individual bottles of any combination — for example, 2 Classic Cola, 1 Cloudy Lemon, and 1 Mountain Up — to build your dream 4-pack or 12-pack crate. We also offer special bundle discounts like 'COLA3FOR2' and 'SPRYO20' on our Offers page."
  },
  {
    category: "eco",
    question: "Are SPRYO glass bottles and crates recyclable?",
    answer: "100%! We are deeply committed to zero single-use plastic waste. Our bottles are made of heavy, infinitely recyclable amber and flint glass, and our shipping cartons use 100% recycled unbleached kraft paper. We also run a local bottle return reward program through our authorized regional distributors."
  },
  {
    category: "orders",
    question: "How can I become an authorized regional distributor or wholesale partner?",
    answer: "We are actively partnering with ambitious distributors, cafes, boutique hotels, and retail chains across India. Head over to our Distributor page (/distributor) to submit your details, or write to our business development desk directly at Spryoindia@gmail.com."
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQS.filter((faq) => {
    const matchCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchSearch = searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 text-xs font-black uppercase tracking-widest border border-cyan-400/20 [data-theme=light]:border-slate-300 mb-3">
            <FaQuestionCircle size={11} /> Help & FAQ Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic tracking-wide text-white [data-theme=light]:text-slate-900 uppercase">
            FREQUENTLY ASKED <span className="text-cyan-400 [data-theme=light]:text-sky-600">QUESTIONS</span>
          </h1>
          <p className="text-white/60 [data-theme=light]:text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Everything you need to know about SPRYO craft beverages, express chilled delivery, natural botanical ingredients, and crate orders.
          </p>

          {/* Quick Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers (e.g. ingredients, shipping, cola, refund)..."
              className="w-full bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-300 rounded-2xl px-5 py-3.5 text-sm text-white [data-theme=light]:text-slate-900 placeholder:text-white/40 [data-theme=light]:placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 [data-theme=light]:focus:border-black transition backdrop-blur-xl shadow-lg"
            />
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === cat.id
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                  : "bg-white/5 [data-theme=light]:bg-slate-100 text-white/70 [data-theme=light]:text-slate-700 hover:bg-white/10 [data-theme=light]:hover:bg-slate-200 border border-white/10 [data-theme=light]:border-slate-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white/5 [data-theme=light]:bg-white rounded-3xl border border-white/10 [data-theme=light]:border-slate-200">
              <p className="text-white/60 [data-theme=light]:text-slate-600 text-sm">
                No matching answers found for "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-3 text-cyan-400 [data-theme=light]:text-sky-600 text-xs font-bold hover:underline"
              >
                Clear filters and view all
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 [data-theme=light]:shadow-sm backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-cyan-400/30"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-white [data-theme=light]:text-slate-900 pr-2">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-white/10 [data-theme=light]:bg-slate-100 flex items-center justify-center shrink-0 text-cyan-400 [data-theme=light]:text-slate-800 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-cyan-400 text-black [data-theme=light]:bg-slate-900 [data-theme=light]:text-white" : ""
                      }`}
                    >
                      <FaChevronDown size={11} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-white/70 [data-theme=light]:text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-white/5 [data-theme=light]:border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* SUPPORT CARD: HUMAN-WRITTEN DIRECT CONTACT */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-cyan-950/30 via-slate-900/50 to-blue-950/30 [data-theme=light]:from-sky-50 [data-theme=light]:to-slate-100 border border-white/10 [data-theme=light]:border-slate-300 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-cyan-400 [data-theme=light]:text-sky-600 text-xs font-black uppercase tracking-wider">
                Still have questions?
              </span>
              <h2 className="text-2xl font-black italic text-white [data-theme=light]:text-slate-900 uppercase mt-1">
                TALK DIRECTLY WITH OUR TEAM
              </h2>
              <p className="text-white/60 [data-theme=light]:text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Whether you want to know about our batch bottling dates, order custom crates for an event, or explore partnership opportunities, our crew is here to help.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:Spryoindia@gmail.com?subject=SPRYO Customer Inquiry"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 hover:border-cyan-400/50 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 [data-theme=light]:text-slate-500 block">
                    Email Customer Care
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white [data-theme=light]:text-slate-900">
                    Spryoindia@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="tel:+918140065550"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 [data-theme=light]:bg-white border border-white/10 [data-theme=light]:border-slate-200 hover:border-emerald-400/50 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 [data-theme=light]:bg-slate-100 [data-theme=light]:text-slate-900 flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                  <FaPhoneAlt />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 [data-theme=light]:text-slate-500 block">
                    Phone & WhatsApp Desk (10 AM - 7 PM)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white [data-theme=light]:text-slate-900">
                    +91 8140065550
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}