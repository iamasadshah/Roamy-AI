"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Timer,
  DollarSign,
  MapPin,
  Layers,
  Users,
  ArrowRight,
} from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    desc: "Your itinerary is crafted based on your interests, ensuring a unique and tailored experience.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Timer,
    title: "Instant Plan Generation",
    desc: "No more endless research! Get fully planned itineraries within seconds.",
    color: "text-green-500",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: DollarSign,
    title: "Smart Budgeting",
    desc: "Choose between luxury or budget-friendly recommendations based on your spending preference.",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    icon: MapPin,
    title: "Real-Time Location Insights",
    desc: "Receive live updates on destinations, weather, and local events.",
    color: "text-red-500",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: Layers,
    title: "Customizable Plans",
    desc: "Easily edit and fine-tune your itinerary to match your evolving needs.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    desc: "Plan trips together with friends and family, sharing and modifying itineraries in real time.",
    color: "text-orange-500",
    gradient: "from-orange-500 to-orange-600",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-8">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-2xl"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              Features
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              Powerful Features for Smart Travel
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              Discover how Roamy AI transforms your travel planning experience
              with cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative  sm:-mt-32 md:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {features.map(
              ({ icon: Icon, title, desc, color, gradient }, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg sm:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 sm:space-x-5 mb-6 sm:mb-8">
                      <div
                        className={`${color} p-3 sm:p-4 rounded-lg sm:rounded-xl bg-opacity-10 bg-current group-hover:bg-opacity-20 transition-all duration-300`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                        {title}
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                      {desc}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-base sm:text-lg">
                      Learn more
                      <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, ${color.replace(
                        "text-",
                        ""
                      )}, ${gradient.split(" ")[1]})`,
                    }}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-16 sm:py-20 md:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                See It in Action
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Watch how Roamy AI transforms your travel planning experience
                with a few simple clicks.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "AI-powered itinerary generation",
                  "Real-time destination insights",
                  "Smart budget optimization",
                  "Collaborative planning tools",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm sm:text-base text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl mt-8 md:mt-0">
              <Image
                src="/images/budget-planing.avif"
                alt="Roamy AI Demo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Ready to Experience the Future of Travel?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who are already experiencing the
              future of travel planning.
            </p>
            <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
