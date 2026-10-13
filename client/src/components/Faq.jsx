"use client";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";
import styles from "@/styles/faq.module.css";

// 1. Function ka naam badal kar FAQ rakha
export default function FAQ() {
  return (
    // Agar styles.contactWrapper mein 'min-height: 100vh' hai, 
    // toh use hatana pad sakta hai taaki ye page ke beech mein fit ho jaye.
    <div className={styles.contactWrapper}>
      <div className={styles.neonOrbit}></div>
      <div className={styles.neonOrbit2}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <FaRocket className="animate-bounce" />
            </div>
            <h1 className={styles.mainTitle}>
              JOIN THE <br/> <span>REVOLUTION</span>
            </h1>
          </div>

          <div className={styles.cardBody}>
            <p className={styles.description}>
              Have questions about <strong>careers</strong>, <strong>partnerships</strong>, or 
              <strong> distributor</strong> opportunities? Our team is ready to help.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Spryoindia@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mailButton}
            >
              <FaEnvelopeOpenText className="text-xl shrink-0" />
              <span>Spryoindia@gmail.com</span>
            </a>

            <div className={styles.divider}></div>

            <div className={styles.footerInfo}>
              <p>⏱ RESPONSE TIME: <b>24–48 HOURS</b></p>
              <div className={styles.statusIndicator}>
                <span className={styles.pulseDot}></span>
                HIRING STATUS: ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}