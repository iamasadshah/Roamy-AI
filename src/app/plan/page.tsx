"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import MultiStepForm from "@/components/MultiStepForm";
import TripPlan from "@/components/TripPlan";
import { generateTripPlan } from "@/utils/gemini";
import { FormData, TravelItinerary } from "@/types/itinerary";
import { Loader2, ArrowLeft, Sparkles, Globe, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Performance optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TravelItinerary | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Performance optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    setIsVisible(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoized submit handler for better performance
  const handleSubmit = useCallback(async (formData: FormData) => {
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
  }, []);

  const handleGenerateNew = useCallback(() => {
    setTripPlan(null);
    // Smooth scroll to form section
    const formSection = document.getElementById("plan-trip");
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized background elements for better performance
  const backgroundElements = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 200,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 50 + 40,
      delay: Math.random() * 20
    })), []
  );

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1f2937',
              borderRadius: '16px',
              padding: '16px 24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              fontSize: '14px',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Optimized Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/30"
              style={{
                width: element.size,
                height: element.size,
                left: element.left,
                top: element.top,
                filter: 'blur(80px)',
              }}
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 300 - 150],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: element.delay,
              }}
            />
          ))}
        </div>

        {/* Enhanced Header with Smooth Animations */}
        <motion.div 
          className="relative z-10 pt-6 pb-8 md:pt-8 md:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-white/60 backdrop-blur-sm transition-all duration-300 px-6 py-3 rounded-xl border border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Back to Home</span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="hidden md:flex items-center gap-3 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="font-medium">AI-Powered Planning</span>
              </motion.div>
            </div>
            
            <div className="text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm"
              >
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                Create Your Perfect Itinerary
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block mb-2">Plan Your Dream</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Travel Experience
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let our advanced AI create a personalized itinerary tailored to your preferences, budget, and travel style. 
                Get ready for an unforgettable journey crafted just for you!
              </motion.p>

              {/* Enhanced Feature Highlights */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  { icon: Globe, title: "Smart Destinations", desc: "AI-curated locations", color: "blue" },
                  { icon: Clock, title: "Perfect Timing", desc: "Optimized schedules", color: "indigo" },
                  { icon: Star, title: "Personalized Plans", desc: "Tailored experiences", color: "purple" }
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    className="group relative p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className={`p-4 rounded-full bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Main Content */}
        <div className="relative z-10">
          <div id="plan-trip" className="py-8 md:py-16 lg:py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center p-16 lg:p-20 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30"
                  >
                    <div className="relative mb-8">
                      <Loader2 className="h-20 w-20 text-blue-600 animate-spin" />
                      <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">Crafting Your Perfect Itinerary</h3>
                    <p className="text-gray-600 text-xl max-w-2xl text-center leading-relaxed">
                      Our advanced AI is analyzing your preferences and creating a personalized travel plan just for you.
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-lg text-gray-500">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="font-medium">This may take a moment...</span>
                    </div>
                  </motion.div>
                ) : tripPlan ? (
                  <motion.div
                    key="trip-plan"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
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
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden max-w-5xl mx-auto"
                  >
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 lg:px-12 lg:py-10">
                      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                        Tell Us About Your Trip
                      </h2>
                      <p className="text-blue-100 text-center text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Fill out the form below to get your personalized AI-generated itinerary
                      </p>
                    </div>
                    <div className="p-8 lg:p-12">
                      <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Section */}
        <div className="relative z-10 py-16 lg:py-20 mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 lg:p-12 border border-white/30 shadow-2xl"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Get instant access to AI-powered travel planning that adapts to your style, budget, and preferences. 
                Create memories that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/">
                  <Button 
                    variant="outline"
                    className="px-10 py-4 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explore More Features
                  </Button>
                </Link>
                <Link href="/about">
                  <Button 
                    className="px-10 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Learn About Roamy AI
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Smooth Scroll to Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-50 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-white/30 hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700 rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </LazyMotion>
  );
}
