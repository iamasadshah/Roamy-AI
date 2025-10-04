"use client";

import { useState, useEffect, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import ChatPlanForm from "@/components/ChatPlanForm";
import TripPlan from "@/components/TripPlan";
import { generateTripPlan } from "@/utils/gemini";
import { FormData, TravelItinerary } from "@/types/itinerary";
import { Loader2, Sparkles, Plus, Save, Trash2, ArrowLeft, Globe, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase, type SavedPlan } from "@/utils/supabaseClient";

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
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [saving, setSaving] = useState(false);

  // Load saved plans from Supabase
  const loadSavedPlans = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('saved_plans')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      return;
    }
    setSavedPlans(data as SavedPlan[]);
  }, []);

  useEffect(() => {
    loadSavedPlans();
  }, [loadSavedPlans]);

  // Memoized submit handler for better performance
  const handleSubmit = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setTripPlan(null);

    try {
      // Validate form data before sending to API
      if (!formData.destination || !formData.startDate || !formData.endDate) {
        throw new Error("Please fill in all required fields");
      }

      // Validate dates
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Invalid date format");
      }

      if (startDate < new Date()) {
        throw new Error("Start date cannot be in the past");
      }

      if (endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 10) {
        throw new Error("Travel planning is limited to 10 days maximum");
      }

      const plan = await generateTripPlan(formData);
      if (!plan || !plan.trip_overview) {
        throw new Error("Itinerary generation failed: Missing trip overview data.");
      }
      setTripPlan(plan);
      toast.success("Trip itinerary generated successfully!");
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = `Error generating itinerary: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = `Error generating itinerary: ${error}`;
      } else {
        errorMessage = "An unexpected error occurred during itinerary generation.";
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateNew = useCallback(() => {
    setTripPlan(null);
  }, []);

  const handleSavePlan = useCallback(async () => {
    if (!supabase) {
      toast.error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    if (!tripPlan) return;
    setSaving(true);
    try {
      const name = tripPlan.trip_overview?.destination || `Trip to ${(tripPlan as any).destination || 'Destination'}`;
      const payload = {
        name,
        destination: (tripPlan as any).destination || null,
        start_date: (tripPlan as any).start_date || null,
        end_date: (tripPlan as any).end_date || null,
        plan: tripPlan,
      };
      const { error } = await supabase.from('saved_plans').insert(payload);
      if (error) throw error;
      toast.success('Plan saved');
      await loadSavedPlans();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to save plan');
    } finally {
      setSaving(false);
    }
  }, [tripPlan, loadSavedPlans]);

  const handleLoadSaved = useCallback((sp: SavedPlan) => {
    try {
      const parsed = sp.plan as TravelItinerary;
      setTripPlan(parsed);
      toast.success('Loaded saved plan');
    } catch {
      toast.error('Invalid saved plan payload');
    }
  }, []);

  // No page scroll management; ChatPlanForm handles UX internally.

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-white">
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

        {/* Simple static background elements - removed heavy animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
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
              <motion.div
                key="chat-card"
                variants={scaleIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 lg:px-12 lg:py-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                    Plan with Chat
                  </h2>
                  <p className="text-blue-100 text-center text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                    Answer a few quick questions in a chat-style flow to generate your itinerary
                  </p>
                </div>
                <div className="p-4 lg:p-8">
                  <ChatPlanForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    resultContent={tripPlan ? (
                      <TripPlan
                        plan={tripPlan}
                        isLoading={isLoading}
                        onGenerateNew={handleGenerateNew}
                      />
                    ) : undefined}
                  />
                </div>
              </motion.div>
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
