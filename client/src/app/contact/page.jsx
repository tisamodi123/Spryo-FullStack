import styles from "@/styles/contact.module.css";

export const metadata = {
  title: "Contact Spryo - Get in Touch",
};

export default function ContactPage() {
  const contactInfo = [
    {
      label: "Email Us",
      value: "Spryoindia@gmail.com",
      link: "mailto:Spryoindia@gmail.com",
      icon: "📧",
      color: "bg-blue-500/20"
    },
    {
      label: "Call Us",
      value: "+91 8140065550",
      link: "tel:+918140065550",
      icon: "📞",
      color: "bg-emerald-500/20"
    },
    {
      label: "Visit Us",
      value: "Spryo HQ, Surat, Gujarat",
      link: "#",
      icon: "🏢",
      color: "bg-purple-500/20"
    }
  ];

  return (
    <div className={styles.contactWrapper}>
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">TOUCH</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Have a question about our sparkling recipes or want to become a distributor? Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((info, idx) => (
              <a 
                href={info.link} 
                key={idx}
                className="block group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-x-2"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{info.label}</p>
                    <p className="text-white text-lg font-medium">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Visual CTA Section */}
          <div className="lg:col-span-7 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl min-h-[450px] flex flex-col justify-center">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Send us a direct <br /> message today.
              </h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-md">
                Looking for careers or partnerships? Click the button below to open your mail and our team will get back to you within 24 hours.
              </p>
              
              <a 
                href="mailto:Spryoindia@gmail.com?subject=Inquiry from Website" 
                className="inline-flex items-center gap-3 bg-white text-blue-900 font-black px-10 py-5 rounded-2xl hover:bg-cyan-50 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                <span>SEND MESSAGE</span>
                <span className="text-xl">🚀</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}