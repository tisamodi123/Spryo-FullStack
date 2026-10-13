"use client";
import { FaArrowRight, FaHandshake, FaChartLine, FaTruck, FaRocket, FaUserTie } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "@/styles/careers.module.css";
// import FAQ from "@/app/faq/page";
import FAQ from "@/components/Faq";
import Link from "next/link";

export default function CareersPage() {
  const router = useRouter(); 
  const roles = [
    {
      title: "Distributor",
      icon: <FaHandshake />,
      desc: "Partner with SPRYO and distribute one of India’s fastest-growing craft beverage brands in your region.",
      color: "#FFB800" // Gold
    },
    {
      title: "Sales Lead",
      icon: <FaChartLine />,
      desc: "Drive regional plans, manage distributor relationships and grow market share in the new era.",
      color: "#00D1FF" // Cyan
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Background Glows */}
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className={styles.badge}>Join the Revolution</span>
          <h1 className={styles.heroTitle}>
            BUILD YOUR FUTURE <br/>
            <span className={styles.brandText}>WITH SPRYO</span>
          </h1>
          <p className={styles.heroLead}>
            Don't just find a job. Build a legacy with India's most refreshing beverage brand.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={() => router.push('/distributor')} className={styles.mainCta}>
              Apply for Partnership <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* --- WHY JOIN SECTION --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={styles.sectionTitle}>WHY CHOOSE US?</h2>
          <div className={styles.featureGrid}>
            <Feature 
              icon={<FaRocket />} 
              title="Hyper Growth" 
              desc="Scale your career or business at the speed of refreshment." 
            />
            <Feature 
              icon={<FaTruck />} 
              title="Full Support" 
              desc="Logistics, marketing, and backend—we've got your back." 
            />
            <Feature 
              icon={<FaHandshake />} 
              title="Global Legacy" 
              desc="Join a brand that stands for trust and premium quality." 
            />
          </div>
        </div>
      </section>

      {/* --- OPPORTUNITIES SECTION --- */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className={styles.sectionTitle}>CURRENT OPENINGS</h2>
          <div className={styles.roleGrid}>
            {roles.map((role, index) => (
              <div key={index} className={styles.roleCard}>
                <div className={styles.roleIcon} style={{color: role.color}}>{role.icon}</div>
                <h3 className={styles.roleHeader}>{role.title}</h3>
                <p className={styles.roleDesc}>{role.desc}</p>
                <button onClick={() => router.push('/distributor')} className={styles.roleBtn}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT/CTA BLOCK --- */}
      <section className="py-24 px-6 text-center">
        <div className={styles.ctaBox}>
          <h2 className="text-4xl font-black italic mb-4">READY TO GROW?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-lg">
            Let's discuss how we can build something great together.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className="text-[#00D1FF]">CALL US</span>
              <p>+91 81400 65550</p>
            </div>
            <div className={styles.contactDivider}></div>
            <div className={styles.contactItem}>
              <span className="text-[#FFB800]">EMAIL US</span>
              <p>Spryoindia@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}> 
        <div className={styles.faqWrapper}>
          <h2 className={styles.sectionTitle}>
            FREQUENTLY <span className={styles.faqHighlight}>ASKED</span>
          </h2>
          <div className="mt-8">
            <FAQ />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconCircle}>{icon}</div>
      <h3 className="text-xl font-black italic uppercase mb-2">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}