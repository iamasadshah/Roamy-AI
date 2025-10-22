import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.roamy.ai";
const sharedTitle = "Roamy AI | Intelligent Travel Planning Assistant";
const sharedDescription =
  "Create lightning-fast, AI-powered travel itineraries tailored to your style, budget, and schedule with Roamy AI.";
const ogImage = "/images/Travel-planing.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Roamy AI",
  title: {
    default: sharedTitle,
    template: "%s | Roamy AI",
  },
  description: sharedDescription,
  keywords: [
    "AI travel planner",
    "travel itinerary generator",
    "personalized trips",
    "vacation planning app",
    "Roamy AI",
  ],
  manifest: "/manifest.json",
  category: "travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: sharedTitle,
    description: sharedDescription,
    url: siteUrl,
    siteName: "Roamy AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1280,
        height: 720,
        alt: "Roamy AI travel planning dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: sharedTitle,
    description: sharedDescription,
    images: [ogImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Roamy AI",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a4d93",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Roamy AI",
  url: siteUrl,
  description: sharedDescription,
  logo: `${siteUrl}/favicon.png`,
  sameAs: [
    "https://www.linkedin.com/company/roamy-ai",
    "https://x.com/RoamyAI",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@roamy.ai",
    availableLanguage: ["English"],
  },
  offers: {
    "@type": "Offer",
    url: `${siteUrl}/plan`,
    price: "0",
    priceCurrency: "USD",
    category: "travel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <Script
          id="roamy-ai-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Toaster position="top-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
