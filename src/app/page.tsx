"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ItineraryShowcase from "@/components/ItineraryShowcase";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import MultiStepForm from "@/components/MultiStepForm";
import TripPlan from "@/components/TripPlan";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { generateTripPlan } from "@/utils/gemini";
import { FormData, TravelItinerary } from "@/types/itinerary";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TravelItinerary | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setTripPlan(null);

    try {
      const plan = await generateTripPlan(formData);
      if (!plan || !plan.trip_overview) {
        throw new Error("Invalid plan data received");
      }
      setTripPlan(plan);
      toast.success("Trip itinerary generated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate itinerary";
      toast.error(errorMessage);
      console.error("Error generating trip plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNew = () => {
    setTripPlan(null);
    // Scroll to the form section
    const formSection = document.getElementById("plan-trip");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 relative">
      <Toaster position="top-center" />
      <BackgroundAnimation />

      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      <HowItWorks />
      <Features />
      <ItineraryShowcase />
      <div id="plan-trip" className="section-padding">
        <div className="max-w-4xl mx-auto">
          {!tripPlan && !isLoading && (
            <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
          <TripPlan
            plan={tripPlan}
            isLoading={isLoading}
            onGenerateNew={handleGenerateNew}
          />
        </div>
      </div>
      <Testimonials />
      <CallToAction />
    </main>
  );
}
