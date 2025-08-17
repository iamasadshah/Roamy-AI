"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaQuestionCircle, FaMagic, FaPlane, FaArrowRight, FaRegClock, FaRegStar, FaRegCheckCircle } from "react-icons/fa";
import { Card, CardContent } from "./ui/card";

const steps = [
  {
    icon: <FaQuestionCircle className="h-6 w-6 text-blue-500" />,
    title: "Share Your Travel Style",
    description: "Answer a few quick questions about your preferences, interests, and budget.",
    color: "from-blue-50 to-blue-100",
    step: "01"
  },
  {
    icon: <FaMagic className="h-6 w-6 text-indigo-500" />,
    title: "AI Creates Your Plan",
    description: "Our advanced AI crafts a personalized itinerary based on your unique preferences.",
    color: "from-indigo-50 to-indigo-100",
    step: "02"
  },
  {
    icon: <FaPlane className="h-6 w-6 text-purple-500" />,
    title: "Start Your Adventure",
    description: "Receive and customize your perfect travel plan, then embark on your journey!",
    color: "from-purple-50 to-purple-100",
    step: "03"
  },
];

const benefits = [
  { icon: <FaRegClock className="h-5 w-5 text-blue-500" />, text: "Save 10+ hours of planning" },
  { icon: <FaRegStar className="h-5 w-5 text-yellow-500" />, text: "Personalized recommendations" },
  { icon: <FaRegCheckCircle className="h-5 w-5 text-green-500" />, text: "100% customizable plans" },
];

// Simplified animation variants for better performance
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Simple static background - removed heavy animations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
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
            How It Works
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Plan Your Trip in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Our AI-powered platform makes travel planning effortless and personalized.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute z-20 -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.step}
              </div>

              {/* Step Card */}
              <Card className="h-full p-8 bg-white/80 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 transform -translate-y-1/2 z-10"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
          >
            Why Choose Roamy AI?
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30"
              >
                <div className="p-2 bg-blue-50 rounded-lg">
                  {benefit.icon}
                </div>
                <span className="text-gray-700 font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

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
            <Link href="#features">
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
