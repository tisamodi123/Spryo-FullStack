# SPRYO — Craft Sparkling Beverage E-Commerce

A full-stack direct-to-consumer (D2C) web application built from scratch for a modern craft sparkling beverage brand. 

I built this project to explore building a production-ready shopping experience with **Next.js 16 (App Router)** on the front end, backed by a **Node.js/Express API** and **MongoDB**, featuring real-time cart state, secure JWT authentication, and responsive design across all devices.

🔗 **Live Website:**(https://spryo-full-stack-rl8o.vercel.app/)
📂 **GitHub Repo:** [github.com/tisamodi123/Spryo](https://github.com/tisamodi123/Spryo)

---

## Why I Built This

Most tutorial eCommerce projects stop at a static product list with a fake cart. I wanted to build something that feels like a real, living consumer brand website you'd actually use to order drinks:

- **End-to-end shopping flow:** From browsing flavor notes and reading real reviews to applying coupon codes, calculating taxes/delivery fees, and placing orders.
- **Device-specific polish:** Custom layout optimizations for tricky tablet viewports (iPad Mini, Surface Pro 10, iPad Pro) where standard responsive grids often look awkward.
- **Zero-breakdown architecture:** A client-side fallback mechanism so recruiters and visitors can test the site smoothly even if the free-tier backend is sleeping or spinning up.

---

## What It Does

### 1. Storefront & Drinks Catalog
- **Interactive Flavor Visualizer:** Switch between signature drinks (*Classic Cola, Cloudy Lemon, Zesty Orange, Mountain Up*) on the homepage with custom lighting and live fizz animations.
- **Search & Filtering:** Real-time search by drink name, filter by category tabs, and sort by price or popularity without full page reloads.
- **Product Details (`/product/[id]`):** Dedicated pages showing ingredients breakdown, taste profile, stock status, and customer reviews.

### 2. Cart, Checkout & Orders
- **Live Cart State:** Real-time quantity updates, delivery threshold progress bar (unlocking free shipping on 4+ bottles), and subtotal calculation.
- **Coupon System:** Real coupon codes (`SPRYO20` for 20% off, `COLA3FOR2`, `FIZZUP`, `WELCOME10`) with quick copy-to-clipboard functionality.
- **Checkout Flow:** Form validation for shipping info, generating a unique order ID (`SPRYO-XXXXXX`), and storing it to the database.
- **Order Tracking (`/orders`):** View past orders, check delivery status pills (*Placed, Processing, Delivered*), and a **1-click Reorder** button that repopulates the cart instantly.

### 3. Authentication & Account
- **JWT Auth:** Real signup and login flow with encrypted passwords.
- **Cross-Tab Session Sync:** Uses custom event listeners so logging in or out updates the navigation bar immediately across all open tabs.
- **Profile Dashboard (`/profile`):** Bento-grid style account overview showing user details, past order counts, delivery address editor, and password management.

### 4. Design & Themes
- **Dark & Light Mode:** Toggle between sleek dark mode with neon accents and high-contrast light mode with deep slate typography (no washed-out gray text).
- **Tablet & Mobile Optimization:** Built an accordion footer specifically for iPad Mini and Surface Pro screens so 4 columns don't squish together, and balanced bento cards to eliminate empty vertical space on tall portrait screens.

---

## Tech Stack

| Layer | Tools | Why I Chose Them |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16, React 19 | App router for fast server-rendered pages and instant client navigation |
| **Styling** | Vanilla CSS Modules + Tailwind CSS v4 | CSS Modules for scoped, pixel-perfect layouts; Tailwind for fast utilities |
| **Icons** | React Icons (FontAwesome) | Clean SVG icons without heavy external font bundles |
| **Backend** | Node.js, Express.js | Lightweight REST API handling products, orders, auth, and reviews |
| **Database** | MongoDB Atlas, Mongoose | Flexible document schema for products, variant pricing, and nested order items |
| **Auth** | JWT, bcryptjs | Standard stateless token-based authentication |
| **Hosting** | Vercel (Client), Render (Backend) | Edge caching for frontend with automated Git deploys |

---

## Project Structure

```plaintext
VeggieWave/ (SPRYO)
├── client/                     # Customer Storefront (Next.js 16)
│   ├── src/
│   │   ├── app/                # Next.js App Router (23 pages)
│   │   │   ├── products/       # Drink catalog & filters
│   │   │   ├── product/[id]/   # Dynamic product detail & review submit
│   │   │   ├── cart/           # Cart manager & free delivery bar
│   │   │   ├── checkout/       # Address form & order placement
│   │   │   ├── orders/         # Order history & reorder action
│   │   │   ├── profile/        # Bento-grid user dashboard
│   │   │   ├── recipes/        # Mocktail & cocktail serving guides
│   │   │   └── offers/         # Discount codes with 1-click copy
│   │   ├── components/         # Header, Footer, CartContext, ThemeContext, Toast
│   │   ├── styles/             # Modular CSS for pages and components
│   │   └── lib/                # API fetch helpers & auth state handlers
│   └── public/                 # Optimized brand assets (cola, lemon, orange, up bottles)
│
├── backend/                    # REST API Server (Express + MongoDB)
│   ├── config/                 # MongoDB Mongoose connection
│   ├── controllers/            # Logic for auth, products, orders, and reviews
│   ├── middleware/             # Token verification & error handlers
│   ├── models/                 # Schemas (User, Product, Order)
│   ├── routes/                 # Express route definitions
│   └── server.mjs              # Entry point
│
└── package.json                # Monorepo root scripts
```

---

## Running Locally

If you'd like to run this project on your machine:

### 1. Clone the repo
```bash
git clone https://github.com/tisamodi123/Spryo.git
cd Spryo
```

### 2. Set up environment variables

**Backend (`backend/.env`):**
```env
PORT=2002
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:2002/api
```

### 3. Install and run

```bash
# Start backend (runs on http://localhost:2002)
cd backend
npm install
npm run dev

# Start client in a second terminal (runs on http://localhost:3000)
cd ../client
npm install
npm run dev
```

---

## Engineering Challenges & What I Learned

1. **Handling Tricky Tablet Breakpoints:**
   Standard grids break easily around 768px–1024px (iPad Mini portrait, Surface Pro 10). A 4-column footer squishes text, and a 2-column profile leaves giant empty vertical space on a 1440px tall screen. I built custom media queries with collapsible accordions and a balanced Bento grid so the layout feels natural regardless of screen ratio.

2. **Light vs Dark Mode Contrast:**
   A common mistake in dark-themed sites is that toggling to light mode produces invisible white text or washed-out gray elements. I audited every component and used explicit `[data-theme="light"]` selectors with deep slate text (`#0f172a`) so every label, button, and card maintains high legibility.

3. **Graceful Fallbacks for Cloud Deployments:**
   Free cloud database instances often sleep when idle. To make sure interviewers and visitors reviewing my portfolio don't get hit with a 30-second cold-start freeze or an error page, every API call has a clean client-side fallback that loads structured data and saves placed orders to local cache.

---

## Author

Built by **Tisa Modi**  
- **GitHub:** [@tisamodi123](https://github.com/tisamodi123)  
- **Email:** Spryoindia@gmail.com  

Feedback, suggestions, and pull requests are always welcome!
