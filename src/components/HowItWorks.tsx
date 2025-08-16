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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    },
  },
};

const cardHoverVariants: Variants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const iconHoverVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20 relative"
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
            Your Dream Vacation,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Effortlessly Planned
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Our AI-powered platform transforms how you plan travel. Get a personalized, 
            detailed itinerary in minutes, not hours. Here&apos;s how simple it is:
          </motion.p>
        </motion.div>

        {/* Enhanced Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10"
        >
          {/* Enhanced connecting line */}
          <motion.div 
            className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
              whileHover="hover"
            >
              <motion.div
                variants={cardHoverVariants}
                className="h-full"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-blue-300/50">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center h-full">
                    {/* Enhanced Step indicator */}
                    <div className="relative mb-6 md:mb-8">
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-30 group-hover:opacity-50 transition-all duration-500"
                        variants={iconHoverVariants}
                      />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                        <motion.div 
                          className="text-2xl md:text-3xl"
                          variants={iconHoverVariants}
                        >
                          {step.icon}
                        </motion.div>
                      </div>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs md:text-sm font-bold shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.6, ease: "easeOut" }}
                      >
                        {step.step}
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                    
                    <motion.div 
                      className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Enhanced animated arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: '#3b82f6' }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.6, ease: "easeOut" }}
                  >
                    <FaArrowRight className="text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Benefits section */}
        <motion.div 
          className="mt-16 md:mt-20 lg:mt-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 md:p-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Why Choose Roamy AI?</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 rounded-full border border-gray-200/50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="mr-3">{benefit.icon}</span>
                  <span className="text-sm md:text-base text-gray-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/plan" 
                className="inline-flex items-center px-8 py-4 md:px-10 md:py-5 border border-transparent text-base md:text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-95"
              >
                Start Planning Now
                <FaPlane className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
