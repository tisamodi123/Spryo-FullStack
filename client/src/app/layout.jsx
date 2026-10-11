import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { ToastProvider } from "@/components/ToastContext";
import ScrollToTop from "@/components/ScrollToTop";

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
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <ScrollToTop />
              <Footer />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
