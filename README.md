# 🍹 SPRYO - The Evolution of Sparkling Refreshment

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **SPRYO** is an ultra-modern, production-ready Full-Stack eCommerce & brand platform for handcrafted sparkling beverages and botanical coolers. Built with Next.js 16, React 19, Turbopack, Express.js, and MongoDB.

---

## 🌐 Live Demos

- 🚀 **Storefront (Client Web App):** [https://spryo-client-git-vercel-react-server-com-bc3387-spryos-projects.vercel.app](https://spryo-client-git-vercel-react-server-com-bc3387-spryos-projects.vercel.app/)
- ⚙️ **Admin Dashboard:** Deployable via Vercel (Root: `/admin`)
- 🔌 **Backend REST API:** Deployable via Render / Vercel Serverless (Root: `/backend`)

---

## ✨ Key Features & Highlights

### 🎨 State-of-the-Art UI & UX
- 🌓 **Dynamic Dark & Light Mode:** Seamless theme switching with smooth transitions and persistent state in `localStorage`.
- 🍹 **Interactive Hero Flavor Visualizer:** Real-time interactive tabs to toggle between signature flavors (*Classic Cola*, *Cloudy Lemon*, *Zesty Orange*, *Mountain Up*) with ambient lighting auras, fizzy bottle animations, and flavor notes.
- ⚡ **Floating Micro-Animations:** Dynamic bubble effects, fizzy background animations, and floating bottles.
- 🛒 **Real-Time Crate & Cart Management:**
  - Live dynamic cart badge counter in the header.
  - Interactive Promo Code engine (`SPRYO20` for 20% instant off).
  - Free express delivery progress bar.
  - Floating toast notification system on quick add-to-cart.
- 🔍 **Real-Time Live Search & Filtering:** Debounced search, flavor category pills, price low-to-high sorting, and grid/list view toggles.
- 📱 **100% Mobile Responsive:** Optimized navigation, touch-friendly drawers, and adaptive typography.

### 🛡️ Admin & Analytics Dashboard (`/admin`)
- 📊 Real-time revenue metrics, total orders, active customer counts, and product catalog counters.
- 📦 Order status tracker and management table.
- 🏷️ Product inventory manager with dynamic stock controls.

### 🚀 Backend & API (`/backend`)
- 🔒 JWT Token authentication with secure cookies and role-based access control.
- 📦 Full CRUD for Products, Categories, Reviews, and Orders.
- ⚡ Serverless-ready MongoDB connection pooling with Mongoose.

---

## 📁 Repository Structure

```plaintext
VeggieWave/ (SPRYO Monorepo)
├── client/                     # Customer Storefront (Next.js 16 + React 19 + Tailwind v4)
│   ├── public/                 # Optimized brand assets (cola, orange, lemon, up bottles)
│   ├── src/
│   │   ├── app/                # Next.js App Router (home, products, cart, checkout, etc.)
│   │   ├── components/         # Reusable UI components (Header, ProductCard, Toast, Theme)
│   │   ├── styles/             # Modular CSS styling & theme token definitions
│   │   └── lib/                # API client fetch wrappers & endpoint helpers
│   ├── .env.example            # Environment variables template
│   └── package.json
│
├── admin/                      # Operations & Store Manager Dashboard (Next.js 16)
│   ├── src/
│   │   ├── app/admin/          # Dashboard metrics, orders, products, users
│   │   └── lib/                # Admin fetch helpers
│   ├── .env.example
│   └── package.json
│
├── backend/                    # Express REST API & Serverless Handler
│   ├── config/                 # Database configuration (MongoDB Mongoose connection)
│   ├── controllers/            # Controller business logic (Auth, Product, Order, Admin)
│   ├── middleware/             # Auth, Admin validation, error handling
│   ├── models/                 # Mongoose schemas (User, Product, Order)
│   ├── routes/                 # Express route definitions
│   ├── server.mjs              # Main server & serverless handler
│   ├── vercel.json             # Vercel serverless configuration
│   └── .env.example            # Backend environment template
│
├── .gitignore                  # Master gitignore for root and sub-packages
├── package.json                # Monorepo root scripts
└── README.md                   # Project documentation
```

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (Turbopack) | React framework with Server & Client components |
| **UI Library** | [React 19](https://react.dev/) | Core UI library |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules | Glassmorphism, animations & themed design tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + CSS Keyframes | Fluid micro-interactions & floating bottles |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | Feather, FontAwesome & Lucide SVG icons |
| **Backend** | [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) | RESTful API server & microservices |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/) + Mongoose | Cloud NoSQL document storage |
| **Deployment** | [Vercel](https://vercel.com/) | Serverless frontend & edge caching |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (Local instance or free MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/tisamodi123/Spryo.git
cd Spryo
```

### 2. Configure Environment Variables
Copy `.env.example` in each folder:

#### For Backend (`backend/.env`):
```env
PORT=2002
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/veggiewave
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

#### For Client (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:2002/api
```

#### For Admin (`admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:2002/api
```

---

### 3. Run Applications

You can run individual services using root commands or directly within their directories:

```bash
# Run Client Storefront (http://localhost:3000)
npm run dev:client

# Run Admin Dashboard (http://localhost:3001)
npm run dev:admin

# Run Backend API Server (http://localhost:2002)
npm run dev:backend
```

---

## 🌐 Deployment Guide (Vercel & Render)

### Deploying the Client Storefront on Vercel:
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your repository `Spryo`.
3. Set **Root Directory** to `client`.
4. Framework Preset: **Next.js**.
5. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g. `https://your-backend.onrender.com/api`).
6. Click **Deploy**.

### Deploying the Admin Dashboard on Vercel:
1. In Vercel, click **Add New Project** with the same repository.
2. Set **Root Directory** to `admin`.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL.
4. Click **Deploy**.

### Deploying the Backend on Render or Railway:
1. Connect the repository on [Render](https://render.com/).
2. Select **Web Service**.
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`.
5. Start Command: `node server.mjs`.
6. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Secret key for token encryption.
   - `PORT`: 10000 (or Render default).
7. Deploy!

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with ❤️ for India’s Sparkling Beverage Revolution • <b>SPRYO</b>
</p>
