"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "@/styles/parallax.module.css";

export default function ParallaxHero() {
  const { scrollYProgress } = useScroll();
  
  // Elements ko alag-alag speed par move karne ke liye
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Bottle
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]); // Lemon Slice
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]); // Spinning Ice

  return (
    <section className={styles.parallaxSection}>
      <div className={styles.stickyContent}>
        {/* Main Title jo piche rahega */}
        <motion.h2 className={styles.bgTitle} style={{ y: y1 }}>
          REFRESH
        </motion.h2>

        {/* Floating Elements */}
        <motion.img 
          src="/lemon-slice.png" 
          style={{ y: y2, rotate: rotate }} 
          className={styles.floatLemon} 
        />
        
        <motion.div className={styles.mainBottleWrapper} style={{ y: y1 }}>
          <img src="/cola.png" alt="Bottle" className={styles.centerBottle} />
        </motion.div>

        <div className={styles.foregroundText}>
          <h3>TASTE THE FUTURE</h3>
          <p>Zero Alcohol. Infinite Energy.</p>
        </div>
      </div>
    </section>
  );
}