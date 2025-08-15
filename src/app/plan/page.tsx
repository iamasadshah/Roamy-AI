"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import MultiStepForm from "@/components/MultiStepForm";
import TripPlan from "@/components/TripPlan";
import { generateTripPlan } from "@/utils/gemini";
import { FormData, TravelItinerary } from "@/types/itinerary";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlanPage() {
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

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0A4D93',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-30"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Plan Your Perfect Trip
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Let our AI create a personalized itinerary tailored to your preferences, budget, and travel style.
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div id="plan-trip" className="py-8 md:py-12 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
                >
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Crafting Your Perfect Itinerary</h3>
                  <p className="text-gray-600 mt-2">This may take a moment...</p>
                </motion.div>
              ) : tripPlan ? (
                <motion.div
                  key="trip-plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TripPlan
                    plan={tripPlan}
                    isLoading={isLoading}
                    onGenerateNew={handleGenerateNew}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
