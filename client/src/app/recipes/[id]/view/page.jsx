"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/recipeView.module.css";
import { FaChevronLeft, FaClock, FaFireAlt, FaGlassMartiniAlt, FaCheckCircle } from "react-icons/fa";
import FizzBackground from "@/components/FizzBackground";

const recipeData = {
  "lemon": {
    title: "Lemon Cool & Fizzy Burst",
    image: "/lemon.png",
    color: "#D4FF00",
    time: "4 Mins",
    intensity: "Fresh",
    glass: "Highball",
    ingredients: ["200ml SPRYO Lemon", "Fresh Mint Leaves", "Crushed Ice", "Sea Salt Pinch"],
    steps: ["Fill highball glass with crushed ice.", "Rub mint leaves on the rim.", "Pour chilled SPRYO Lemon.", "Add a pinch of sea salt for that extra kick."]
  },
  "cola-fizz": {
    title: "Cola Iconic Fizz",
    image: "/cola.png",
    color: "#FF003C",
    time: "3 Mins",
    intensity: "Classic",
    glass: "Rocks Glass",
    ingredients: ["200ml SPRYO Cola", "Fresh Lemon Slices", "Crushed Ice", "Mint Leaves"],
    steps: ["Add ice until half full.", "Squeeze a lemon wedge.", "Slowly pour SPRYO Cola.", "Garnish with a fresh mint sprig."]
  },
  "orange": {
    title: "Orange Sunset Spark",
    image: "/orange.png",
    color: "#FF6B00",
    time: "5 Mins",
    intensity: "Zesty",
    glass: "Copa Glass",
    ingredients: ["200ml SPRYO Orange", "Cinnamon Stick", "Orange Zest", "Ice Cubes"],
    steps: ["Pour SPRYO Orange over large ice cubes.", "Add orange zest for aroma.", "Garnish with a cinnamon stick.", "Stir once gently for a smoky orange vibe."]
  },
  "up": {
    title: "Arctic Up Tonic",
    image: "/up.png",
    color: "#00D1FF",
    time: "3 Mins",
    intensity: "Chilled",
    glass: "Tall Glass",
    ingredients: ["200ml SPRYO Up", "Cucumber Slices", "Premium Tonic", "Ice"],
    steps: ["Place cucumber slices vertically in the glass.", "Fill with ice.", "Top with SPRYO Up.", "Stir slowly to keep the fizz alive."]
  }
};

export default function RecipeView() {
  const { id } = useParams();
  
  // ERROR FIX: Check if ID exists in data, else fallback to 'lemon'
  const recipe = recipeData[id] || recipeData["lemon"];

  // Agar recipe fir bhi na mile (safer check)
  if (!recipe) return <div className="text-white">Recipe not found...</div>;

  return (
    <div className={styles.viewPage} style={{ "--theme-color": recipe.color }}>
        <FizzBackground /> 
      <div className={styles.fluidGlow}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/recipes" className={styles.backBtn}>
          <FaChevronLeft /> BACK TO MIXES
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-10">
          <div className={styles.visualSection}>
            <div className={styles.mainCircle}></div>
            <img src={recipe.image} alt={recipe.title} className={styles.heroBottle} />
            <h1 className={styles.sideTitle}>{recipe.title.split(' ')[0]}</h1>
          </div>

          <div className={styles.infoSection}>
            <span className={styles.badge}>SIGNATURE SERVE</span>
            <h2 className={styles.mainTitle}>{recipe.title}</h2>
            
            <div className={styles.statsGrid}>
              <div className={styles.statBox}><FaClock /> {recipe.time}</div>
              <div className={styles.statBox}><FaFireAlt /> {recipe.intensity}</div>
              <div className={styles.statBox}><FaGlassMartiniAlt /> {recipe.glass}</div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.ingredientsCard}>
                <h3>INGREDIENTS</h3>
                <ul>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}><FaCheckCircle className={styles.check} /> {ing}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.methodCard}>
                <h3>THE METHOD</h3>
                <div className={styles.stepsScroll}>
                  {recipe.steps.map((step, i) => (
                    <div key={i} className={styles.stepItem}>
                      <span>0{i + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/products" className={styles.orderBtn}>
              ORDER THE MAIN INGREDIENT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}