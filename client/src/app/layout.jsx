import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { ToastProvider } from "@/components/ToastContext";
import ScrollToTop from "@/components/ScrollToTop";
import FizzBackground from "@/components/FizzBackground";

export const metadata = {
  title: "SPRYO | Taste The Evolution - Premium Sparkling Refreshment",
  description: "Handcrafted sparkling sodas and botanical coolers made for the modern palate. Taste the bold fizz of Cola, Lemon, Orange & Mountain Up.",
  keywords: "SPRYO, sparkling drink, craft soda, soda india, refreshment, lemon soda, cola, fizz drinks",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="min-h-screen scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700;1,800&display=swap" 
          rel="stylesheet" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  localStorage.removeItem('spryo_theme');
                  sessionStorage.removeItem('spryo_theme');
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <FizzBackground />
              <Header />
              <main className="min-h-screen relative z-[2]">{children}</main>
              <ScrollToTop />
              <Footer />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
