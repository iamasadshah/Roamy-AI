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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-4xl mx-auto mb-16 relative"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-5 py-2.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-5 shadow-sm"
          >
            How It Works
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Your Dream Vacation, <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Effortlessly Planned</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 mb-10"
          >
            Our AI-powered platform transforms how you plan travel. Get a personalized, 
            detailed itinerary in minutes, not hours. Here's how simple it is:
          </motion.p>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-blue-100 opacity-50"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />
          <motion.div 
            className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-indigo-100 opacity-50"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10"
        >
          {/* Animated connecting line */}
          <motion.div 
            className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 -z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:border-blue-200">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  {/* Step indicator */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-full ${step.color} opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>
                    <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                      <div className={`text-2xl text-${step.color.split(' ')[0].replace('from-', '')}-500`}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{step.description}</p>
                  
                  <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
              
              {/* Animated arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
                  >
                    <FaArrowRight className="text-blue-500 group-hover:text-white transition-colors" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits section */}
        <motion.div 
          className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Choose Roamy AI?</h3>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { icon: <FaRegClock className="h-5 w-5 text-blue-500" />, text: "Save 10+ hours of planning" },
                { icon: <FaRegStar className="h-5 w-5 text-yellow-500" />, text: "Personalized recommendations" },
                { icon: <FaRegCheckCircle className="h-5 w-5 text-green-500" />, text: "100% customizable plans" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                  <span className="mr-2">{benefit.icon}</span>
                  <span className="text-sm text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>
            <Link 
              href="/plan" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Start Planning Now
              <FaPlane className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
