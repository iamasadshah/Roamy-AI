"use client";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane, FaGlobe, FaShieldAlt, FaRocket } from "react-icons/fa";
import Link from "next/link";

export default function AuthPage() {
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get the current site URL dynamically
    const siteUrl = window.location.origin;
    setRedirectUrl(`${siteUrl}/auth/callback`);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <FaPlane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      title: "AI-Powered Planning",
      description: "Get personalized itineraries crafted by advanced AI"
    },
    {
      icon: <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />,
      title: "Global Destinations",
      description: "Explore thousands of destinations worldwide"
    },
    {
      icon: <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      title: "Secure & Private",
      description: "Your travel data is protected and secure"
    },
    {
      icon: <FaRocket className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />,
      title: "Instant Results",
      description: "Generate complete travel plans in seconds"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-80 lg:h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Mobile Header - Only visible on small screens */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:hidden text-center mb-8 sm:mb-10 md:mb-12"
          >
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Welcome to the Future of Travel
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Travel Planner
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
              Experience the next generation of travel planning with AI-powered itineraries, personalized recommendations, and seamless trip management.
            </p>
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Features & Branding (Hidden on mobile, visible on larger screens) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden xl:block"
            >
              <motion.div variants={itemVariants} className="text-center xl:text-left mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-sm">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Welcome to the Future of Travel
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Personal
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    AI Travel Planner
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                  Experience the next generation of travel planning with AI-powered itineraries, personalized recommendations, and seamless trip management.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center xl:justify-end"
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
                {/* Auth Container */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/30 shadow-xl sm:shadow-2xl p-6 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                      <FaPlane className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {view === "sign_in" ? "Welcome Back" : "Join Roamy AI"}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      {view === "sign_in" 
                        ? "Sign in to continue planning your next adventure" 
                        : "Create your account and start planning amazing trips"
                      }
                    </p>
                  </div>

                  {/* Toggle Buttons */}
                  <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 mb-6 sm:mb-8">
                    <button
                      onClick={() => setView("sign_in")}
                      className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                        view === "sign_in"
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setView("sign_up")}
                      className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                        view === "sign_up"
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Auth Form */}
                  <div className="space-y-4 sm:space-y-6">
                    <Auth
                      supabaseClient={supabase}
                      view={view}
                      appearance={{
                        theme: ThemeSupa,
                        variables: {
                          default: {
                            colors: {
                              brand: "#2563eb",
                              brandAccent: "#1d4ed8",
                              inputBackground: "transparent",
                              inputBorder: "#e5e7eb",
                              inputText: "#374151",
                              inputLabelText: "#6b7280",
                              anchorTextColor: "#2563eb",
                              anchorTextHoverColor: "#1d4ed8",
                            },
                          },
                        },
                        className: {
                          container: "!bg-transparent !p-0",
                          button: "!w-full !py-2.5 sm:!py-3 !px-4 !bg-gradient-to-r !from-blue-600 !to-indigo-600 !text-white !font-semibold !text-sm sm:!text-base !rounded-lg sm:!rounded-xl !shadow-lg hover:!from-blue-700 hover:!to-indigo-700 !transition-all !duration-300",
                          input: "!w-full !py-2.5 sm:!py-3 !px-3 sm:!px-4 !bg-gray-50 !border-2 !border-gray-200 !rounded-lg sm:!rounded-xl !text-sm sm:!text-base !text-gray-900 !placeholder-gray-500 focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100 !transition-all !duration-300",
                          label: "!text-gray-700 !font-medium !text-sm !mb-2 !block",
                          anchor: "!text-blue-600 hover:!text-blue-700 !font-medium !text-sm sm:!text-base !transition-colors !duration-200",
                          message: "!text-red-600 !text-xs sm:!text-sm !mt-2",
                          loader: "!text-blue-600",
                        },
                      }}
                      theme="light"
                      providers={["google", "github"]}
                      redirectTo={redirectUrl}
                    />
                  </div>

                  {/* Footer */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-center text-xs sm:text-sm text-gray-500">
                      By continuing, you agree to our{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Back to Home */}
                <div className="mt-4 sm:mt-6 text-center">
                  <Link 
                    href="/"
                    className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
