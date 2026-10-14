"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import styles from "@/styles/success.module.css";
import { FaCheckCircle, FaBoxOpen, FaArrowRight } from "react-icons/fa";

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
            Your chilled crate is packed and prepared for express delivery. Get ready for an icy botanical rush!
          </p>

          <div className={styles.orderIdBox}>
            <span className="text-[10px] tracking-[3px] opacity-50 block mb-1 uppercase font-black">
              Order Reference
            </span>
            <p className="text-[#00D1FF] font-mono text-xl font-bold tracking-wider">
              #{orderId || "SPRYO-849201"}
            </p>
          </div>

          <div className={styles.actionGrid}>
            <Link href="/orders" className={styles.primaryBtn}>
              <FaBoxOpen className="text-xl" /> VIEW YOUR ORDERS
            </Link>
            
            <Link href="/products" className={styles.secondaryBtn}>
              EXPLORE MORE FLAVORS <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <p className="mt-8 text-white/40 text-[10px] tracking-widest uppercase font-bold italic">
            SPRYO · Pure Botanical Refreshment · Handcrafted in India
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className={styles.loader}>Loading Details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}