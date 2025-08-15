"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import MultiStepForm from "@/components/MultiStepForm";
import TripPlan from "@/components/TripPlan";
import { generateTripPlan } from "@/utils/gemini";
import { FormData, TravelItinerary } from "@/types/itinerary";
import { Loader2, ArrowLeft, Sparkles, MapPin, Calendar, Users } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0A4D93',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 24px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontSize: '14px',
            fontWeight: '500'
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

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-100/40 to-indigo-100/40"
            style={{
              width: Math.random() * 400 + 150,
              height: Math.random() * 400 + 150,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 40 + 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 px-4 py-2 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Button>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>AI-Powered Planning</span>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Create Your Perfect Itinerary
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block">Plan Your Dream</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Travel Experience
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let our AI create a personalized itinerary tailored to your preferences, budget, and travel style. 
              Get ready for an unforgettable journey!
            </motion.p>

            {/* Feature Highlights */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-700">Smart Destinations</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <span className="font-medium text-gray-700">Perfect Timing</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                <Users className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-gray-700">Personalized Plans</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div id="plan-trip" className="py-8 md:py-16 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center p-16 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20"
                >
                  <div className="relative">
                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Crafting Your Perfect Itinerary</h3>
                  <p className="text-gray-600 text-lg max-w-md text-center">
                    Our AI is analyzing your preferences and creating a personalized travel plan just for you.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>This may take a moment...</span>
                  </div>
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
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                      Tell Us About Your Trip
                    </h2>
                    <p className="text-blue-100 text-center mt-2 text-lg">
                      Fill out the form below to get your personalized itinerary
                    </p>
                  </div>
                  <div className="p-8">
                    <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative z-10 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get instant access to AI-powered travel planning that adapts to your style, budget, and preferences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/">
                <Button 
                  variant="outline"
                  className="px-8 py-3 text-lg font-medium rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  Explore More Features
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  className="px-8 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Learn About Roamy AI
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
