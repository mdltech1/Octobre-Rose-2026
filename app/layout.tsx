import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { OfflineBanner } from "@/components/OfflineBanner";
import { ServiceWorker } from "@/components/ServiceWorker";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Polices auto-hébergées (aucun appel à un service externe au chargement)
const display = localFont({
  src: "./fonts/BricolageGrotesque.woff2",
  variable: "--font-display-face",
  weight: "200 800",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/InstrumentSans.woff2", style: "normal", weight: "400 700" },
    { path: "./fonts/InstrumentSans-Italic.woff2", style: "italic", weight: "400 700" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.studio.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.studio.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f7" },
    { media: "(prefers-color-scheme: dark)", color: "#151417" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="min-h-[100dvh] antialiased">
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        {/* Mesure d'audience sans cookie ni donnée personnelle (Vercel Web Analytics) */}
        <Analytics />
        <ServiceWorker />
        <OfflineBanner />
      </body>
    </html>
  );
}
