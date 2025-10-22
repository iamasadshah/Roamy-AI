import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the Roamy AI mission and the team redefining how travelers plan personalized journeys with artificial intelligence.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
