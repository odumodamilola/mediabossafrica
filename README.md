# MediaBoss Africa — Global Talent & Influencer Ecosystem (Frontend)

Welcome to the official frontend repository for **MediaBoss Africa**, a premier global talent management, influencer marketing, digital PR, and content production ecosystem.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme Management:** `next-themes` (Dark/Light mode synchronization)
- **Data Fetching:** Axios with Laravel Sanctum CSRF / Cookie authentication

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run typecheck` — Run TypeScript type checking
- `npm run lint` — Run Next.js linter
