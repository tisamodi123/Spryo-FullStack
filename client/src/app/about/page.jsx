"use client";
import Link from "next/link";
import styles from "@/styles/about.module.css";
import { FaHandshake, FaBriefcase, FaStar, FaGlobe, FaBolt, FaUsers } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className={styles.aboutWrapper}>
      {/* 🔵 HERO SECTION: Cinematic Look */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <img src="/spryo.jpg" className={styles.heroImg} alt="Spryo Legacy" />
        
        <div className="relative z-10 text-center px-6">
          <span className={styles.eyebrow}>THE LEGACY OF FRESHNESS</span>
          <h1 className={styles.mainTitle}>
            WE ARE <br /> <span>SPRYO</span>
          </h1>
          <div className={styles.scrollIndicator}>
             <div className={styles.mouse}></div>
          </div>
        </div>
      </section>

      {/* 🟢 STORY SECTION: Glassmorphic Overlap */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 pb-24">
        
        <div className={styles.glassCard}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className={styles.badge}>EST. 2020</div>
              <h2 className={styles.sectionHeading}>
                Crafting the <span>Ultimate</span> Chill Experience
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Spryo is a modern beverage powerhouse dedicated to bringing high-octane refreshment to the new India. 
                Our mission is bold — to deliver the most electric flavors for every celebration.
              </p>
              <div className={styles.featureList}>
                 <div className={styles.featureItem}><FaBolt className="text-yellow-400" /> High-Carbonation Tech</div>
                 <div className={styles.featureItem}><FaStar className="text-blue-400" /> Premium Ingredients</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Fans Worldwide', value: '50K+', icon: <FaUsers /> },
                { label: 'Unique Blends', value: '120+', icon: <FaBolt /> },
                { label: 'Global Hubs', value: '25+', icon: <FaGlobe /> },
                { label: 'Years of Fizz', value: '4+', icon: <FaStar /> }
              ].map((stat, i) => (
                <div key={i} className={styles.statBox}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟡 VALUES SECTION */}
        <section className="mt-32">
          <div className="text-center mb-16">
             <span className="text-[#00D1FF] font-black tracking-widest uppercase text-xs">Our DNA</span>
             <h2 className="text-4xl md:text-5xl font-black text-white italic mt-4 uppercase">CORE VALUES</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Premium Quality", icon: "💎", desc: "Finest extracts sourced from around the globe." },
              { title: "Eco-Logic", icon: "♻️", desc: "100% recyclable glass & PET for a cleaner world." },
              { title: "Speed Burst", icon: "⚡", desc: "Always chilled, delivered with lightning speed." },
              { title: "Fizz Family", icon: "🔥", desc: "A community that celebrates every single bubble." },
            ].map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className="font-black text-white text-xl mb-3 italic">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🟣 CTA SECTION: Partnerships */}
        <div className={styles.ctaBox}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black italic text-white mb-6 uppercase tracking-tighter">
              Ready to <span className="text-[#00D1FF]">SPRYO</span> Up?
            </h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg font-medium">
              Join India's fastest-growing refreshment network. Whether you're a business or a creative mind, let's mix things up.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/distributor" className={styles.mainBtn}>
                <FaHandshake /> BECOME A PARTNER
              </Link>
              <Link href="/careers" className={styles.outlineBtn}>
                <FaBriefcase /> JOIN THE TEAM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}