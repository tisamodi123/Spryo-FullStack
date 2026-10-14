"use client";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";
import styles from "@/styles/faq.module.css";

export default function FAQ() {
  return (
    <div className={styles.contactWrapper}>
      <div className={styles.neonOrbit}></div>
      <div className={styles.neonOrbit2}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <FaRocket className="animate-bounce" />
            </div>
            <h2 className={styles.mainTitle}>
              JOIN THE <br/> <span>EVOLUTION</span>
            </h2>
          </div>

          <div className={styles.cardBody}>
            <p className={styles.description}>
              Have questions about <strong>careers</strong>, <strong>partnerships</strong>, or 
              <strong> regional distributorships</strong>? Our leadership team in Surat is excited to connect with you.
            </p>

            <a
              href="mailto:Spryoindia@gmail.com?subject=Career and Partnership Inquiry"
              className={styles.mailButton}
            >
              <FaEnvelopeOpenText className="text-xl shrink-0" />
              <span>Spryoindia@gmail.com</span>
            </a>

            <div className={styles.divider}></div>

            <div className={styles.footerInfo}>
              <p>⏱ RESPONSE TIME: <b>WITHIN 24 HOURS</b></p>
              <div className={styles.statusIndicator}>
                <span className={styles.pulseDot}></span>
                OPPORTUNITIES: ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}