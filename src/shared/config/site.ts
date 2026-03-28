export const siteConfig = {
  name: "Roamy AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.roamy.ai",
  title: "Roamy AI | Intelligent Travel Planning Assistant",
  description:
    "Create lightning-fast, AI-powered travel itineraries tailored to your style, budget, and schedule with Roamy AI.",
  ogImage: "/images/Travel-planing.png",
  keywords: [
    "AI travel planner",
    "travel itinerary generator",
    "personalized trips",
    "vacation planning app",
    "Roamy AI",
  ],
  marketingRoutes: ["/", "/about", "/features", "/plan", "/goals"],
} as const;
