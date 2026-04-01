# 🍔 Patel Food

> A stylish, self-contained food ordering web app with a cart system, order history, and animated backgrounds — built with pure HTML, CSS & JavaScript.

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ Features

- 🛒 **Full Cart System** — Add items, adjust quantities, remove items, with real-time totals
- 📋 **Order History** — All past orders saved in localStorage; view anytime from the sidebar
- 🔄 **Reorder** — Instantly re-add items from any previous order back to your cart
- 🎨 **Animated Background Slider** — Rotating hero wallpapers with smooth fade + zoom effects
- 🏷️ **Category Filters** — Filter menu by Mains, Snacks, Healthy, and Desserts
- 📦 **Checkout Flow** — Delivery address form → order confirmation modal
- 🔔 **Toast Notifications** — Non-intrusive feedback for every cart action
- 📱 **Fully Responsive** — Works great on mobile, tablet, and desktop
- 🌙 **Dark Mode** — Sleek glassmorphic UI with an orange accent theme

---

## 📁 Project Structure

```
krisha/
├── index.html          # Landing / Home page (animated BG slider)
├── menu.html           # Food menu with cart + order history sidebars
├── login.html          # Login page
├── booking.html        # Table booking page
├── contact.html        # Contact page
├── confirmation.html   # Order confirmation
├── success.html        # Success screen
├── styles.css          # Global styles (shared)
├── script.js           # Global scripts (shared)
├── vercel.json         # Vercel deployment config
├── backgrounds/        # Background images used on homepage
│   ├── image.png
│   ├── image2.png
│   ├── image3.png
│   ├── image4.png
│   ├── image5.png
│   └── image6.png
└── items/
    └── image.png       # Food item images
```

---

## 🚀 Getting Started

### Running Locally

No build step needed — just open any HTML file in your browser:

```bash
# Clone the repo
git clone https://github.com/shubhamos-ai/krisha_bwd.git
cd krisha_bwd

# Open in browser (or use Live Server in VS Code)
open index.html
```

### Deploying to Vercel

1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the `krisha_bwd` repository
4. Vercel auto-detects static files — click **Deploy** 🎉

The included `vercel.json` handles everything automatically.

---

## 🛒 How the Cart Works

- **localStorage key `patelCart`** — stores the active cart between page refreshes
- **localStorage key `orderHistory`** — stores an array of all completed orders
- The cart sidebar slides in from the **right** automatically when you add an item
- The My Orders sidebar slides in from the **left**
- Adding an item shifts the page content smoothly to make room (no dark overlay!)

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Accent | `#ff5733` |
| Background | `#0d0d0d` |
| Card Surface | `rgba(255,255,255,0.05)` |
| Font | `Segoe UI`, system-ui, sans-serif |
| Border Radius | `18px` (cards), `30px` (buttons) |

---

## 📸 Screenshots

| Home | Menu | Cart |
|---|---|---|
| Animated BG slider with glassmorphic welcome card | 3-column food grid with category filters | Slide-in cart with live price totals |

---

## 🔧 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Glassmorphism, CSS Grid, Flexbox, custom animations
- **Vanilla JavaScript** — Zero dependencies, zero frameworks
- **localStorage** — Client-side state persistence

---

## 📬 Contact

- 📧 Email: foodie@email.com
- 📞 Phone: +91 9512206922

---

*Built with ❤️ for Patel Food*
