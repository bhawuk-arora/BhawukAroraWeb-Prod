import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import { Heart } from "lucide-react";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: {
    default: "Bhawuk Arora (^__^)",
    template: "%s | Bhawuk Arora",
  },
  description:
    "Corporate Kid in Tech ;)",
  keywords: [
    "Bhawuk Arora",
    "MLOps Engineer",
    "Distributed Systems",
    "Infrastructure Automation",
    "Site Reliability Engineering",
    "Next.js Blog",
    "Cloud Native"
  ],
  authors: [{ name: "Bhawuk Arora" }],
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

import LoadingScreen from "@/components/LoadingScreen";
import NewsletterModal from "@/components/NewsletterModal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="flex flex-col min-h-screen" suppressHydrationWarning>
          <LoadingScreen />
          <NewsletterModal />
          <Providers>
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <SiteFooter />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

/* Server-safe footer — NO event handlers, NO client hooks */
function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-1.5">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Bhawuk Arora (^__^)
        </p>

        <div className="flex gap-6">
          {[
            { label: "GitHub", href: "https://github.com/bhawuk-arora" },
            { label: "LinkedIn", href: "https://linkedin.com/in/bhawuk-arora" },
            { label: "Email", href: "mailto:contact@bhawukarora.app" }
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
