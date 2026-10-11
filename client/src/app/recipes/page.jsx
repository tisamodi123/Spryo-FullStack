"use client";
import Link from "next/link";
import styles from "@/styles/recipes.module.css";
import { FaWineGlassAlt, FaUtensils, FaArrowRight } from "react-icons/fa";

const recipes = [
 { id: "lemon", title: "Lemon", image: "/lemon.png", color: "#FFD700" },
  { id: "up", title: "UP", image: "/up.png", color: "#00D1FF" },
  { id: "orange", title: "Orange", image: "/orange.png", color: "#FF6B00" },
  { id: "cola-fizz", title: "Cola Fizz", image: "/cola.png", color: "#FF003C" },
];

export default function RecipesPage() {
  return (
    <div className={styles.recipeContainer}>
     <header className={styles.hero}>
  <div className="relative z-10">
    <span className={styles.tagline}>Spryo Mixology</span>
    <h1 className={styles.title}>
      CRAFTED 
      <span>SERVES</span>
    </h1>
    <p>Premium blends engineered for the bold. Experience the fizz like never before.</p>
  </div>
</header>

      <div className={styles.recipeGrid}>
        {recipes.map((r) => (
          <Link href={`/recipes/${r.id}/view`} key={r.id} className={styles.recipeCard} data-color={r.color}>
            <div className={styles.cardGlow} style={{ background: r.color }}></div>
            <div className={styles.imageBox}>
              <img src={r.image} alt={r.title} />
              {/* <span className={styles.badge}>{r.category}</span> */}
            </div>
            <div className={styles.cardContent}>
              <h3>{r.title}</h3>
              <div className={styles.viewLink}>
                MIX IT NOW <FaArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}