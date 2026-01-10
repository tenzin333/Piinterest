# Piinterest

Piinterest is a Pinterest‑inspired web application that allows users to
authenticate, browse visual posts ("pins"), upload new images, and
curate a personal feed --- powered by **React** and **Supabase**.

------------------------------------------------------------------------

## 🎯 Project Goals

-   Build a visually rich grid-style gallery
-   Enable user login with secure authentication
-   Upload, store, and fetch images from a backend
-   Provide a polished, modern UI that feels fast and responsive

------------------------------------------------------------------------

## 🚀 Features

### 🔐 Authentication

-   Email/password sign‑up and login
-   Session persistence
-   Supabase Auth backend

### 🖼️ Pin Board

-   Masonry-style grid inspired by Pinterest
-   Pagination-friendly fetch pattern
-   Lazy-loading compatible image display

### ⬆️ Uploading

-   Upload via file picker
-   Automatic Supabase storage handling
-   Real-time UI update after upload

### 📱 Responsive UI

-   Mobile-first layout
-   Smooth resize transitions
-   Optimized grid on all screen sizes

------------------------------------------------------------------------

## 🧱 Tech Stack

  Layer              Technology
  ------------------ ------------------------------------------------
  Frontend           React + Vite
  Auth & Database    Supabase
  State & Fetching   React Hooks / JS Fetch
  Styling            Plain CSS / utility classes
  Deployment         (Suggested: Vercel, Netlify, Supabase Hosting)

------------------------------------------------------------------------

## 🧩 Project Structure

    .
    ├── public/
    ├── src/
    │   ├── assets/            # Icons / static resources
    │   ├── components/        # Reusable UI units
    │   ├── pages/             # Routed screens
    │   ├── hooks/             # Custom hooks (optional)
    │   ├── utils/             # Helper modules (optional)
    │   ├── App.jsx            # Main app shell
    │   └── index.js           # Entry root
    ├── package.json
    ├── vite.config.js
    └── README.md

------------------------------------------------------------------------

## 🛠️ Installation & Setup

### 1️⃣ Clone the project

``` bash
git clone https://github.com/tenzin333/Piinterest.git
cd Piinterest
```

### 2️⃣ Install dependencies

``` bash
npm install
```

### 3️⃣ Add environment variables

Create `.env` in the project root:

``` env
VITE_APP_SUPABASE_URL=https://your-project.supabase.co
VITE_APP_SUPABASE_KEY=public-anon-key-from-dashboard
```

You get these values in: Supabase Dashboard → Project Settings → API

### 4️⃣ Run locally

``` bash
npm run dev
```

Open the URL logged in your terminal --- usually:

    http://localhost:5173

------------------------------------------------------------------------

## 🌐 Deployment Options

### 🚀 One‑click Deploy Targets

-   **Vercel**
-   **Netlify**
-   **Supabase Edge**
-   Static hosting + Supabase backend

Set environment variables in your hosting dashboard --- do NOT commit
the `.env` file.

------------------------------------------------------------------------

## 🤝 Contributing

We welcome improvements!\
To contribute:

``` bash
# Create a new branch
git checkout -b feature/my-change
# Make edits
git commit -am "Implement my change"
# Push branch
git push origin feature/my-change
```

Then open a pull request 🎉

------------------------------------------------------------------------

## 🤔 Roadmap Ideas

-   User comments on pins
-   Save pins to boards
-   Dark mode toggle
-   Drag‑and‑drop uploads
-   Infinite scroll feed
-   User profile + favorites

------------------------------------------------------------------------

## 📄 License

This project is currently unlicensed. If you want others to reuse your
code: - Add a `LICENSE` file (MIT recommended)

------------------------------------------------------------------------

## ❤️ Credits

Created by **tenzin333**\
Inspired by the creativity and simple beauty of Pinterest

------------------------------------------------------------------------
