import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Trip - Roamy AI",
  description: "Create your personalized AI-powered travel itinerary with Roamy AI. Get custom recommendations for destinations, activities, and accommodations.",
};

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
