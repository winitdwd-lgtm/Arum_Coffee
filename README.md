# ☕ Aurum Coffee — The Liquid Gold Experience

Aurum Coffee is a premium, state-of-the-art cafe website built to deliver a luxurious, immersive web experience. Combining next-generation visual design with smooth interactive mechanics, the project showcases the union of craft roastery and modern frontend engineering.

Rooted in the heart of Bengaluru (Indiranagar), Aurum Coffee offers a digital vault for coffee connoisseurs, complete with interactive 3D elements, micro-animations, and seamless state-managed ordering.

---

## 🌟 Key Features

### 1. 🎨 Premium Cinematic Aesthetics
- **Dark Roast Theme:** Beautiful deep HSL background colors (`#050505` to `#080604`) with curated gold accents (`#d4af37`).
- **Ambient Glows:** Soft, pulsating radial gold backdrops and floating canvas particles that follow scroll depth.
- **Tactile Textures:** A subtle SVG noise/grain overlay applied to the body to give the interface a organic, paper-like feel.

### 2. 🌀 Interactive 3D Canvas
- **React Three Fiber & Drei:** Integrates a WebGL canvas in the hero section displaying a floating, distorted golden sphere (`MeshDistortMaterial`) surrounded by roasted coffee beans.
- **Scroll-Linked Animations:** The 3D elements rotate, scale, and disperse outward dynamically based on the page's scroll position.

### 3. 🎯 Advanced UX Interactions
- **Dual-Ring Custom Cursor:** A spring-lagged custom cursor with dynamic trail particles (sparkles) that expands and displays interactive text prompts (e.g., "Explore") when hovering over links and cards.
- **Magnetic Navigation Links:** Top navbar links use magnetic force calculations to pull toward the cursor, creating a satisfying tactile interface.
- **Parallax Card Tilting:** Menu cards tilt in 3D perspective based on mouse coordinates using Framer Motion springs (`rotateX` / `rotateY`).

### 4. 🛒 The Vault (Shopping Cart)
- **Zustand State Store:** Global lightweight state management to handle cart item insertion, item size configuration (Short, Tall, Grande, Venti), quantity adjustments, and automated subtotal calculation.
- **Rewards System:** Earn progress loyalty points with a styled VIP "Gold Level" active status indicator.

### 5. 🗺️ Interactive Map & Dark Filter
- **Custom-Styled Embedded Map:** Integrated Google Map showcasing the flagship location in Indiranagar, Bengaluru, matching the dark aesthetic using custom CSS color-inversion/contrast filters.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React v19 | Single-page UI rendering & hooks |
| **Build Tool** | Vite v8 | High-speed hot module replacement (HMR) & bundling |
| **Styling** | Tailwind CSS v4 | Utility-first styling & layout utilities |
| **3D Graphics** | Three.js / @react-three/fiber | WebGL engine & React scene-graph wrapper |
| **3D Helpers** | @react-three/drei | Useful modifiers, scroll controls, and environment presets |
| **Animations** | Framer Motion v12 | Spring physics, custom cursor, page transitions, and card tilt |
| **State Management** | Zustand v5 | Lightweight, atomic global cart state |
| **Routing** | React Router Dom v7 | Client-side routing between Home, Vault, and Login |
| **Icons** | Lucide React | Clean, scalable vector outline SVG icons |
| **Language** | JS / TS (Hybrid) | Multi-typed development support |

---

## 📁 Repository Structure

```yaml
cafe-website/
├── .agent/                 # Agent workflows and slash configurations
├── .gsd/                   # GSD state machine documentation
├── public/                 # Static assets, logos, and favicons
└── src/
    ├── assets/             # Images and local binary files
    ├── components/
    │   ├── ui/
    │   │   ├── blur-fade.tsx                   # Aceternity-style blur reveal component
    │   │   ├── container-scroll-animation.tsx # 3D perspective scroll sheet wrapper
    │   │   ├── footer.jsx                      # Premium footer with newsletter band & social links
    │   │   ├── menu-section.jsx                # Interactive catalog, search, size selector & card tilt
    │   │   ├── parallax-cosmic-background.tsx # Interactive starfield & planet horizontal background
    │   │   └── travel-connect-signin.jsx       # Auth card with canvas dot-map route paths animation
    │   └── Navbar.jsx      # Magnetic link routing & dynamic backdrop blurring
    ├── lib/
    │   └── utils.ts        # Helper functions (clsx, tailwind-merge)
    ├── pages/
    │   ├── Cart.jsx        # "The Vault" with responsive checkout details & summary breakdown
    │   ├── Home.jsx        # Landing page incorporating the R3F Canvas and scroll overlay
    │   └── Login.jsx       # Authentication page with custom floating canvas particles
    ├── store/
    │   └── useCartStore.js # Zustand store managing cart logic and item prices
    ├── App.css             # Root styles, cursors, hamburger menus, and layout classes
    ├── App.jsx             # React Router routing configuration
    ├── CoffeeScene.jsx     # Three.js group components, materials, and scroll lerping
    ├── CustomCursor.jsx    # Framer-motion custom cursor element & sparkle trail emitter
    ├── index.css           # Global typography loading, scrollbar customizations, and background grain
    └── main.jsx            # Entry point rendering the React App inside strict mode
```

---

## 🚀 Setup & Local Execution

Follow these steps to run the project on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/winitdwd-lgtm/FUTURE_FS_03.git
cd FUTURE_FS_03/cafe-website
```

### 2. Install Dependencies
Install all required npm packages:
```bash
npm install
```

### 3. Run Development Server
Boot up Vite's local dev server:
```bash
npm run dev
```
Once started, open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

### 4. Build for Production
To build static files optimized for production deployment:
```bash
npm run build
```

---

## 💫 Advanced UI Elements Ready for Integration
The project comes equipped with premium ready-made components that can be used to extend the app's visual complexity:
- **`CosmicParallaxBg`:** A cosmic space starry background that generates randomized star vectors on shadow boxes and moves them using pure CSS keyframes.
- **`ContainerScroll`:** A container that tilts backward in 3D space as you scroll, revealing contents like a tablet or screen layout.
- **`BlurFade`:** A smooth entrance animation combining CSS blur scaling with framer motion visibility handlers.

---

## 💎 Design Tokens & Fonts
- **Fonts:**
  - Headings/Cursive: `Dancing Script` (via Google Fonts)
  - Interface/Sans: `Plus Jakarta Sans` & `Outfit` (via Google Fonts)
- **Primary Colors:**
  - Gold: `#d4af37` (`--gold`)
  - Deep Obsidian: `#050505` (`--dark-bg`)

---

## 👨‍💻 Credits
Created with ☕ and ❤️ by [Vineet D.](https://in.linkedin.com/in/vineet-dharwad-3a8a50389) as part of Future Interns.
