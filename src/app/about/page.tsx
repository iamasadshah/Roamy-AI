"use client";

import { motion } from "framer-motion";
import { Globe, Compass, Users, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden py-0">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <Image
          src="/images/world-map.png"
          alt="World Map"
          fill
          priority
          className="object-cover z-0 opacity-10"
          sizes="100vw"
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="relative z-10 text-white max-w-3xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4 tracking-wide">
            OUR STORY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Innovating <span className="text-blue-700">Travel</span> with AI
          </h1>
          <p className="text-lg md:text-xl text-blue-700 mb-8 leading-relaxed">
            At Roamy AI, we are dedicated to transforming your travel experiences
            through intelligent planning and personalized itineraries.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-white text-blue-700 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1">
            <Link href={"/plan"}>
            Let's Explore with Roamy AI</Link>
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 md:-mt-24 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-3xl shadow-xl overflow-hidden divide-x divide-gray-100 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statItemVariants}
                className="p-6 sm:p-8 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 tracking-wide">
                OUR VALUES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Empowering Your Wanderlust
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                Our core mission is to empower every traveler with the tools and
                insights needed for unforgettable journeys. We believe in:
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Globe,
                    title: "Seamless Global Exploration",
                    desc: "Providing effortless access to destinations worldwide with real-time, accurate information.",
                  },
                  {
                    icon: Compass,
                    title: "Hyper-Personalized Journeys",
                    desc: "Crafting unique itineraries that truly reflect individual preferences and desires.",
                  },
                  {
                    icon: Users,
                    title: "Community-Driven Innovation",
                    desc: "Fostering a vibrant community of travelers, continuously improving through shared experiences and feedback.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start p-5 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 mr-4 flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-base">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-96 md:h-auto min-h-[300px]"
            >
              <Image
                src="/images/enhanced-travel.avif"
                alt="AI Travel Planning"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold mb-4"
            >
              Ready to Explore the World?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto"
            >
              Let Roamy AI craft your perfect adventure with precision and creativity.
            </motion.p>
            <motion.button
              variants={itemVariants}
              className="inline-flex items-center px-10 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:bg-blue-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={"/plan"}>
              Plan Your Journey Now</Link>
              <ArrowRight className="ml-3 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
