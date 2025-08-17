"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPlane, FaSearch, FaArrowRight, FaCompass, FaRoute, FaClock } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";
import { Button } from "./ui/button";

// Simplified animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease: "easeOut",
    },
  }),
};

export default function Hero() {
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    controls.start("visible");
  }, [controls]);

  const features = [
    {
      icon: <FaCompass className="w-5 h-5 text-blue-600" />,
      text: "AI-Powered Itineraries",
      description: "Smart planning tailored to your preferences",
    },
    {
      icon: <FaSearch className="w-5 h-5 text-indigo-600" />,
      text: "Personalized Recommendations",
      description: "Discover hidden gems and local favorites",
    },
    {
      icon: <FaRoute className="w-5 h-5 text-purple-600" />,
      text: "Optimized Routes",
      description: "Save time with efficient travel planning",
    },
    {
      icon: <FaClock className="w-5 h-5 text-cyan-600" />,
      text: "Real-time Updates",
      description: "Stay informed with live travel information",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      {/* Simple static background shapes - removed heavy animations */}
      <div className="absolute top-10 left-5 w-32 h-32 bg-blue-100 rounded-full opacity-20 -z-10"></div>
      <div className="absolute top-20 right-8 w-40 h-40 bg-purple-100 rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-32 left-12 w-36 h-36 bg-indigo-100 rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-12 w-28 h-28 bg-green-100 rounded-full opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="text-center">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate={controls}
            variants={container}
          >
            {/* Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 shadow-sm"
              custom={0}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              The Future of Travel Planning is Here
              <FaArrowRight className="ml-2 text-xs" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={item}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="block">Plan Your Perfect</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  {mounted && (
                    <TypeAnimation
                      sequence={[
                        'Adventure',
                        2000,
                        'Vacation',
                        2000,
                        'Getaway',
                        2000,
                        'Journey',
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  )}
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-100 -z-10 opacity-70 rounded-full"></span>
              </span>
              <span className="block mt-2">with Roamy AI</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              custom={2}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Create personalized travel itineraries in seconds with the power of
              AI. Discover hidden gems, save time, and travel smarter than ever before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              custom={3}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link href="/plan" className="group">
                <Button 
                  size="lg"
                  className="group relative overflow-hidden px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span className="relative z-10 flex items-center">
                    Start Planning Free
                    <FaPlane className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
              <Link href="#how-it-works" className="group">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex items-center">
                    How It Works
                    <FaArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={item}
              custom={4}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                  whileHover={{ 
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    borderColor: 'rgba(99, 102, 241, 0.2)'
                  }}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.2 + (i * 0.05),
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl inline-flex text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.text}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simple decorative element - removed heavy animations */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
