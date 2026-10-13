import "./globals.css";

export const metadata = {
  title: "Spryo Admin Portal",
  description: "Enterprise Store & Inventory Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}