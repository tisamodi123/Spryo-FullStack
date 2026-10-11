"use client";
import styles from "@/styles/privacy.module.css";
import { FaShieldAlt, FaUserLock, FaDatabase, FaChild, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function PrivacyPage() {
  return (
    <div className={styles.privacyWrapper}>
      {/* Decorative Glow Elements */}
      <div className={styles.glowBlue}></div>
      <div className={styles.glowPurple}></div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className={styles.eyebrow}>DATA PROTECTION</span>
          <h1 className={styles.mainTitle}>
            PRIVACY <span>POLICY</span>
          </h1>
          <div className={styles.divider}></div>
          <p className="text-white/50 text-lg max-w-2xl mx-auto italic mt-6">
            Your trust is our most important ingredient. Here is how we protect your refreshment data.
          </p>
        </div>

        {/* Main Content: Glassmorphic Sections */}
        <div className="space-y-10">
          
          {/* Section 1: Our Commitment */}
          <section className={styles.glassSection}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className={styles.iconBox}><FaShieldAlt /></div>
              <div>
                <h2 className={styles.sectionHeading}>OUR COMMITMENT</h2>
                <p className={styles.textBody}>
                  At <strong className="text-[#00D1FF]">Spryo</strong>, we focus on doing a few things perfectly—specifically our 4 signature cold drinks. 
                  This commitment to quality extends to how we handle your personal information. We treat your data with the same precision as our carbonation levels.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Data Usage Grid */}
          <section className={styles.glassSection}>
             <div className="flex items-center gap-4 mb-8">
                <div className={styles.smallIcon}><FaDatabase /></div>
                <h2 className={styles.sectionHeading}>HOW WE USE INFORMATION</h2>
             </div>
             <div className="grid md:grid-cols-2 gap-4">
                {[
                  "To maintain and improve your Spryo experience.",
                  "To process transactions with high-grade security.",
                  "To analyze beverage trends and user preferences.",
                  "To respond to your queries with lightning speed."
                ].map((item, i) => (
                  <div key={i} className={styles.dataTag}>
                    <span className="text-[#22c55e]">✦</span> {item}
                  </div>
                ))}
             </div>
          </section>

          {/* Section 3: Rights & Security */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className={styles.glassSection}>
              <div className={styles.smallIcon}><FaUserLock /></div>
              <h2 className={styles.sectionHeading + " mt-4"}>YOUR RIGHTS</h2>
              <ul className="mt-4 space-y-3 text-white/60 text-sm">
                <li><strong className="text-white">Access:</strong> Request data we hold about you.</li>
                <li><strong className="text-white">Deletion:</strong> Wipe your data from our systems.</li>
                <li><strong className="text-white">Opt-out:</strong> Control your marketing preferences.</li>
              </ul>
            </section>

            <section className={styles.glassSection}>
              <div className={styles.smallIcon}><FaChild /></div>
              <h2 className={styles.sectionHeading + " mt-4"}>CHILDREN'S PRIVACY</h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                Spryo is for everyone, but we do not knowingly collect personal info from anyone under 13. Safety first, refreshment second.
              </p>
            </section>
          </div>

          {/* Contact Section: The High-Impact Footer */}
          <section className={styles.contactFooter}>
            <h2 className="text-3xl font-black italic text-white mb-8 text-center uppercase">Contact Privacy Team</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className={styles.contactItem}>
                <FaEnvelope className="text-[#00D1FF] text-2xl" />
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Email Support</p>
                  <a href="mailto:Spryoindia@gmail.com" className="text-white font-bold text-lg hover:text-[#00D1FF]">Spryoindia@gmail.com</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className="text-[#22c55e] text-2xl" />
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Global HQ</p>
                  <p className="text-white font-medium text-sm">Surat, Gujarat - 394101, India</p>
                </div>
              </div>
            </div>
            <div className={styles.footerBrand}>SPRYO INDIA © 2025</div>
          </section>

        </div>
      </div>
    </div>
  );
}