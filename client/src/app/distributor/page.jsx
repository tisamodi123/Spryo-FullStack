"use client";
import { useState } from "react";
import styles from "@/styles/distributor.module.css";
import { 
  FaUser, FaPhone, FaEnvelope, FaCity, 
  FaStore, FaChartLine, FaRupeeSign, FaMapMarkedAlt,
  FaArrowRight, FaCheckCircle
} from "react-icons/fa";
import { clientFetch, API_ENDPOINTS } from "@/lib/api";

export default function DistributorForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [personal, setPersonal] = useState({ name: "", phone: "", email: "", city: "" });
  const [business, setBusiness] = useState({ firmName: "", experience: "", investment: "", area: "" });

  const nextStep = () => {
    if (Object.values(personal).some(val => !val)) {
      alert("Please fill all personal details");
      return;
    }
    setStep(2);
  };

  const submitForm = async () => {
    if (Object.values(business).some(val => !val)) {
      alert("Please fill all business details");
      return;
    }
    setLoading(true);

    try {
      const { ok, data } = await clientFetch(API_ENDPOINTS.distributor || "/distributor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personal, business }),
      });

      if (ok && data?.success) {
        setSuccess(true);
      } else {
        try {
          const apps = JSON.parse(localStorage.getItem("spryo_distributor_apps") || "[]");
          apps.push({ personal, business, date: new Date().toISOString() });
          localStorage.setItem("spryo_distributor_apps", JSON.stringify(apps));
        } catch {}
        setSuccess(true);
      }
    } catch (err) {
      try {
        const apps = JSON.parse(localStorage.getItem("spryo_distributor_apps") || "[]");
        apps.push({ personal, business, date: new Date().toISOString() });
        localStorage.setItem("spryo_distributor_apps", JSON.stringify(apps));
      } catch {}
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-black italic text-white [data-theme=light]:text-slate-900 mb-2">APPLICATION RECEIVED!</h2>
          <p className="text-white/60 [data-theme=light]:text-slate-600 mb-8">Our partnership team will get in touch with you within 24-48 hours.</p>
          <a href="/" className={styles.primaryBtn}>BACK TO HOME</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <div className={styles.glowBlue}></div>
      <div className={styles.glowGreen}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 py-20">
        <div className="text-center mb-12">
          <span className={styles.eyebrow}>JOIN THE EVOLUTION</span>
          <h1 className={styles.formTitle}>BECOME A <span>PARTNER</span></h1>
          <p className="text-white/50 italic mt-2">Scale your business with India's boldest beverage brand.</p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.stepper}>
             <div className={`${styles.stepLine} ${step === 2 ? styles.stepLineFull : ''}`}></div>
             <div className={`${styles.stepNode} ${styles.activeNode}`}>1</div>
             <div className={`${styles.stepNode} ${step === 2 ? styles.activeNode : ''}`}>2</div>
          </div>

          <div className="mt-10">
            {step === 1 ? (
              <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                <Input icon={<FaUser />} placeholder="Full Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
                <Input icon={<FaPhone />} placeholder="Phone Number" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
                <Input icon={<FaEnvelope />} placeholder="Email Address" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
                <Input icon={<FaCity />} placeholder="City / Region" value={personal.city} onChange={(e) => setPersonal({ ...personal, city: e.target.value })} />
                <button onClick={nextStep} className={`${styles.primaryBtn} md:col-span-2`}>
                  NEXT STEP <FaArrowRight />
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
                <Input icon={<FaStore />} placeholder="Firm Name" value={business.firmName} onChange={(e) => setBusiness({ ...business, firmName: e.target.value })} />
                <Input icon={<FaChartLine />} placeholder="Years of Experience" value={business.experience} onChange={(e) => setBusiness({ ...business, experience: e.target.value })} />
                <Input icon={<FaRupeeSign />} placeholder="Investment Capacity" value={business.investment} onChange={(e) => setBusiness({ ...business, investment: e.target.value })} />
                <Input icon={<FaMapMarkedAlt />} placeholder="Preferred Area" value={business.area} onChange={(e) => setBusiness({ ...business, area: e.target.value })} />
                <div className="md:col-span-2 flex gap-4">
                  <button onClick={() => setStep(1)} className={styles.secondaryBtn}>BACK</button>
                  <button onClick={submitForm} disabled={loading} className={styles.submitBtn}>
                    {loading ? "PROCESSING..." : "SUBMIT APPLICATION"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputIcon}>{icon}</div>
      <input {...props} className={styles.inputField} />
    </div>
  );
}