"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Heart,
  Clock,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const goals = [
  {
    icon: Globe,
    title: "Global Accessibility",
    desc: "Make travel planning accessible to everyone, everywhere, with our AI-powered platform.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Personalized Experiences",
    desc: "Create unique travel experiences tailored to individual preferences and needs.",
    color: "text-pink-500",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: Clock,
    title: "Time Efficiency",
    desc: "Save hours of research and planning with our instant itinerary generation.",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Users,
    title: "Community Building",
    desc: "Foster a community of travelers sharing experiences and recommendations.",
    color: "text-green-500",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    desc: "Build trust through accurate, up-to-date information and reliable recommendations.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Continuously innovate to provide cutting-edge travel planning solutions.",
    color: "text-orange-500",
    gradient: "from-orange-500 to-orange-600",
  },
];

const Goals = () => {
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
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-blue-600 to-purple-600">
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
              Our Vision
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              Shaping the Future of Travel
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              Our mission is to revolutionize travel planning through innovation
              and technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="relative  sm:-mt-32 md:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {goals.map(
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

      {/* Impact Section */}
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
                Making a Difference
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Our goals are not just aspirations - they&apos;re commitments to
                making travel planning better for everyone.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "Empowering travelers worldwide",
                  "Reducing planning time by 80%",
                  "Creating personalized experiences",
                  "Building a trusted community",
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
                src="/images/Travel-planing.png"
                alt="Roamy AI Impact"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Join Us in Revolutionizing Travel
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Be part of our journey to transform how people plan and experience
              travel.
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

export default Goals;
