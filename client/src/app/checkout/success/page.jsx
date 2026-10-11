"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 1. Suspense import karein
import Link from "next/link";
import styles from "@/styles/success.module.css";
import { FaCheckCircle, FaBoxOpen, FaArrowRight } from "react-icons/fa";

// 2. Asli UI ko ek alag function mein move karein
function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("id");

  return (
    <div className={styles.successWrapper}>
      <div className={styles.bubble1}></div>
      <div className={styles.bubble2}></div>
      <div className={styles.bubble3}></div>

      <div className="relative z-10 max-w-2xl w-full px-4 text-center">
        <div className={styles.glassCard}>
          <div className={styles.iconContainer}>
            <FaCheckCircle className={styles.mainIcon} />
            <div className={styles.iconPulse}></div>
          </div>

          <h1 className={styles.title}>
            ORDER <br /> <span>CONFIRMED!</span>
          </h1>

          <p className={styles.subtext}>
            The refreshment is on its way. Your tribe is ready to deliver.
          </p>

          <div className={styles.orderIdBox}>
            <span className="text-[10px] tracking-[3px] opacity-50 block mb-1 uppercase font-black">
              Transaction ID
            </span>
            <p className="text-[#00D1FF] font-mono text-xl font-bold tracking-wider">
              #{orderId || "BBR-992104"}
            </p>
          </div>

          <div className={styles.actionGrid}>
            <Link href="/orders" className={styles.primaryBtn}>
              <FaBoxOpen className="text-xl" /> TRACK ORDER
            </Link>
            
            <Link href="/products" className={styles.secondaryBtn}>
              CONTINUE SHOPPING <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <p className="mt-8 text-white/30 text-[10px] tracking-widest uppercase font-bold italic">
            SPRYO · The Evolution of Sparkling Drinks
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Main Export mein Suspense Wrap karein
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className={styles.loader}>Loading Details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}