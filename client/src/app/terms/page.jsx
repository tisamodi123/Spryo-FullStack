"use client";
import Link from "next/link";
import styles from "@/styles/legal.module.css";
import { FaScaleBalanced, FaUserShield, FaBottleWater, FaBoxOpen, FaShieldHalved } from "react-icons/fa6";

export default function TermsPage() {
  const sections = [
    {
      id: "01",
      title: "Acceptance of Terms",
      icon: <FaScaleBalanced />,
      content: "By accessing and using the Spryo platform, you acknowledge and accept all terms stated on this page. If you do not agree with any part of these terms, please discontinue using our platform immediately."
    },
    {
      id: "02",
      title: "User Responsibilities",
      icon: <FaUserShield />,
      content: "You must be at least 13 years old to use our platform. All account information provided must be accurate. Any attempt to misuse or disrupt our services may lead to immediate account suspension.",
      list: ["Accurate account details", "Minimum age: 13 years", "No unauthorized access"]
    },
    {
      id: "03",
      title: "Our 4 Signature Drinks",
      icon: <FaBottleWater />,
      content: "Spryo specializes in 4 premium cold drinks. All images, descriptions, and prices are for reference purposes only and may be updated or modified without prior notice."
    },
    {
      id: "04",
      title: "Refund & Cancellation",
      icon: <FaBoxOpen />,
      content: "Orders cannot be cancelled once they are prepared for dispatch. Refunds are only issued if the product delivered is damaged, defective, or incorrect upon arrival.",
      highlight: true
    },
    {
      id: "05",
      title: "Limitation of Liability",
      icon: <FaShieldHalved />,
      content: "Spryo shall not be held responsible for delays caused by third-party partners, weather conditions, or unforeseen circumstances beyond our control."
    }
  ];

  return (
    <div className={styles.legalWrapper}>
      {/* Dynamic Background Elements */}
      <div className={styles.neonOrbit}></div>
      <div className={styles.glowSpot}></div>

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <span className={styles.eyebrow}>LEGAL FRAMEWORK</span>
          <h1 className={styles.mainTitle}>
            TERMS & <span>CONDITIONS</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mt-6 italic">
            "Rules of the Spryo Universe. Designed for a fair and refreshing experience."
          </p>
        </div>

        {/* Content Flow */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className={styles.glassCard}>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Icon & ID */}
                <div className="flex-shrink-0 flex md:flex-col items-center gap-4">
                  <div className={styles.iconCircle}>{section.icon}</div>
                  <span className={styles.idNumber}>{section.id}</span>
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                  <h2 className={styles.cardTitle}>{section.title}</h2>
                  <p className={styles.cardText}>{section.content}</p>

                  {section.list && (
                    <div className={styles.tagGrid}>
                      {section.list.map((item, i) => (
                        <span key={i} className={styles.miniTag}>✦ {item}</span>
                      ))}
                    </div>
                  )}

                  {section.highlight && (
                    <div className={styles.warningBox}>
                      <span className="text-yellow-400 font-black mr-2">!</span>
                      Dispatch times vary by region and partner availability.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Footer */}
        <footer className={styles.legalFooter}>
          <p>LAST UPDATED: DECEMBER {new Date().getFullYear()} • SPRYO BEVERAGES PVT LTD</p>
          <div className="flex justify-center gap-8 mt-6">
            <Link href="/privacy" className={styles.footerLink}>PRIVACY</Link>
            <Link href="/contact" className={styles.footerLink}>SUPPORT</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}