"use client";

import { motion } from "framer-motion";
import { Globe, Compass, Users, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const About = () => {
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

  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Destinations", value: "100+" },
    { label: "Countries", value: "50+" },
    { label: "AI Models", value: "5+" },
  ];

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
              About Roamy AI
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              Revolutionizing Travel with AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              We&apos;re building the future of travel planning with
              cutting-edge AI technology and personalized experiences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative sm:-mt-32 md:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl border border-gray-100"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 sm:mb-3">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 sm:py-20 md:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10">
                To revolutionize travel planning with AI, ensuring hassle-free
                and personalized itineraries for every traveler. We believe in
                making travel accessible, enjoyable, and stress-free for
                everyone.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: Globe,
                    title: "Global Reach",
                    desc: "Catering to travelers worldwide with real-time insights",
                  },
                  {
                    icon: Compass,
                    title: "Personalized Journeys",
                    desc: "Tailored experiences based on your preferences",
                  },
                  {
                    icon: Users,
                    title: "Community Focus",
                    desc: "Building a global community of travelers",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative mt-8 md:mt-0"
            >
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                <Image
                  src="/images/enhanced-travel.avif"
                  alt="Travel Planning"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hidden sm:block">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-full bg-blue-400 "></div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      5+ Years
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Industry Experience
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Ready to Transform Your Travel Experience?
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

export default About;
