"use client";

import { motion, Variants } from "framer-motion";
import { FaRobot, FaBolt, FaWallet, FaShare, FaGlobe, FaMapMarkedAlt, FaStar, FaSync, FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const features = [
  {
    icon: <FaRobot className="h-6 w-6 text-blue-600" />,
    title: "AI-Powered Personalization",
    description:
      "Get travel plans tailored to your unique preferences, interests, and travel style with our advanced AI technology.",
    color: "from-blue-50 to-blue-100"
  },
  {
    icon: <FaBolt className="h-6 w-6 text-indigo-600" />,
    title: "Lightning Fast Planning",
    description:
      "Generate complete travel itineraries in seconds, saving you hours of research and planning time.",
    color: "from-indigo-50 to-indigo-100"
  },
  {
    icon: <FaWallet className="h-6 w-6 text-green-600" />,
    title: "Budget Optimization",
    description:
      "Find the perfect balance between luxury and budget with smart recommendations that match your spending preferences.",
    color: "from-green-50 to-green-100"
  },
  {
    icon: <FaShare className="h-6 w-6 text-purple-600" />,
    title: "Seamless Sharing",
    description:
      "Easily share your travel plans with companions and collaborate on the perfect trip together.",
    color: "from-purple-50 to-purple-100"
  },
  {
    icon: <FaGlobe className="h-6 w-6 text-amber-600" />,
    title: "Global Coverage",
    description:
      "Access comprehensive travel information for destinations worldwide, from popular hotspots to hidden gems.",
    color: "from-amber-50 to-amber-100"
  },
  {
    icon: <FaMapMarkedAlt className="h-6 w-6 text-cyan-600" />,
    title: "Interactive Maps",
    description:
      "Visualize your trip with interactive maps and get turn-by-turn navigation for all your activities.",
    color: "from-cyan-50 to-cyan-100"
  },
  {
    icon: <FaStar className="h-6 w-6 text-yellow-600" />,
    title: "Local Insights",
    description:
      "Discover authentic local experiences and hidden gems recommended by travel experts and locals.",
    color: "from-yellow-50 to-yellow-100"
  },
  {
    icon: <FaSync className="h-6 w-6 text-emerald-600" />,
    title: "Real-time Updates",
    description:
      "Get instant updates on flight status, weather conditions, and local events that may affect your trip.",
    color: "from-emerald-50 to-emerald-100"
  }
];

// Simplified animation variants for better performance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Simple static background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold mb-6 shadow-sm border border-blue-200/50"
          >
            Powerful Features
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Travel
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Discover the advanced features that make Roamy AI the ultimate travel planning companion.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full p-6 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center mt-16"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/plan">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Start Planning Now
                <FaArrowRight className="inline-block ml-2" />
              </button>
            </Link>
            <Link href="#how-it-works">
              <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                Learn More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
