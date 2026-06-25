# Bhawuk Arora | Personal Site & Blog 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?style=for-the-badge&logo=clerk)](https://clerk.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![Vercel](https://img.shields.io/badge/Vercel-Hosted-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

Welcome to the source code repository of my personal home base and blog engine. Built on a modern tech stack utilizing Next.js 16, Clerk Authentication, and a custom edge subdomain proxy.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Styling**: Tailwind CSS v4
- **Authentication**: Clerk (Unified session management across main domain & subdomains)
- **Backend & Database**: Supabase (Database management, real-time blog comments, upvotes/ratings)
- **Deployment**: Vercel

### Subdomain Routing

This codebase handles both the main portfolio site and the blog on a single repository and single Vercel deployment. Incoming traffic is resolved at the Edge by `proxy.ts`:

```mermaid
graph TD
    A[Visitor] -->|Request| B{Vercel Gateway}
    B -->|bhawukarora.app| C[Main Site Routing]
    B -->|blog.bhawukarora.app| D[Subdomain Rewrite]
    D -->|proxy.ts| E[Internal /blog Path]
    C -->|Home, Projects, Contact| F[Main Pages]
    E -->|Blog Posts & Comments| G[Blog Engine]
```

---

## ⚡ Key Features

- 📝 **MDX Powered Blog**: Fully-fledged blog posts rendering seamlessly using markdown.
- 💬 **Secure Comments & Rating System**: Real-time engagement backed by Clerk authentication and Supabase database actions.
- ⚡ **Ultra-Minimal Loader**: Lightweight, beautiful three-dot bouncing loader design for streamlined transitions.
- 📧 **Direct Contact System**: A clean, distraction-free contact panel powered by EmailJS.
- 🧑‍💻 **CI/CD Git Flow**: Automated build validation and manual-approval release gating.

---

## 🔄 CI/CD Pipeline

The project utilizes a Git-flow pipeline inside GitHub Actions. Developers work in the `dev` branch. Pushes to `dev` trigger compile validation and manual promotion to `master`:

```mermaid
graph LR
    A[Push to dev] --> B[Job 1: Build & Verify]
    B -->|Success| C[Job 2: Manual Approval]
    C -->|Approve| D[Merge into master]
    D -->|Push| E[Vercel Production Deploy]
    B -->|Fail| F[Deployment Stopped]
```

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/bhawuk-arora/BhawukArora-Prod.git
cd BhawukArora-Prod
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root of the project:
```env
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Supabase Keys
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or [http://blog.localhost:3000](http://blog.localhost:3000) to test the subdomain layout) to view your local instance.

---

## 📬 Contact
- **Email**: [contact@bhawukarora.app](mailto:contact@bhawukarora.app)
- **GitHub**: [@bhawuk-arora](https://github.com/bhawuk-arora)
- **LinkedIn**: [Bhawuk Arora](https://linkedin.com/in/bhawuk-arora)
