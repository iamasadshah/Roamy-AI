"use client";
import { motion } from "framer-motion";

import {
  FaRobot,
  FaGlobe,
  FaHotel,
  FaRoute,
  FaLanguage,
  FaCloud,
  FaUserFriends,
  FaCompass,
} from "react-icons/fa";
import Image from "next/image";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaRobot className="text-4xl text-gold" />,
      title: "AI-Powered Planning",
      description:
        "Advanced artificial intelligence that understands your travel preferences and creates personalized itineraries.",
      details: [
        "Natural language processing for better understanding",
        "Learning from user preferences",
        "Real-time optimization",
        "Smart recommendations",
      ],
    },
    {
      icon: <FaGlobe className="text-4xl text-gold" />,
      title: "Global Destinations",
      description:
        "Access to worldwide destinations with local insights and cultural recommendations.",
      details: [
        "200+ countries covered",
        "Local cultural insights",
        "Hidden gems discovery",
        "Seasonal recommendations",
      ],
    },
    {
      icon: <FaHotel className="text-4xl text-gold" />,
      title: "Accommodation Matching",
      description:
        "Smart hotel and accommodation recommendations based on your style and budget.",
      details: [
        "Personalized hotel matching",
        "Price comparison",
        "Real guest reviews",
        "Special deals and offers",
      ],
    },
    {
      icon: <FaRoute className="text-4xl text-gold" />,
      title: "Dynamic Routing",
      description:
        "Optimal route planning for efficient and enjoyable travel experiences.",
      details: [
        "Smart route optimization",
        "Multi-city planning",
        "Local transportation info",
        "Walking-friendly routes",
      ],
    },
    {
      icon: <FaLanguage className="text-4xl text-gold" />,
      title: "Language Support",
      description:
        "Break through language barriers with our comprehensive language tools.",
      details: [
        "Real-time translation",
        "Cultural phrases",
        "Audio pronunciation",
        "Offline language packs",
      ],
    },
    {
      icon: <FaCloud className="text-4xl text-gold" />,
      title: "Weather Integration",
      description:
        "Stay prepared with accurate weather forecasts and seasonal recommendations.",
      details: [
        "14-day forecasts",
        "Seasonal planning",
        "Weather-based activities",
        "Packing suggestions",
      ],
    },
    {
      icon: <FaCompass className="text-4xl text-gold" />,
      title: "Smart Navigation",
      description:
        "Never get lost with our intelligent navigation and offline maps.",
      details: [
        "Offline maps",
        "Turn-by-turn navigation",
        "Public transport routes",
        "Walking directions",
      ],
    },
    {
      icon: <FaUserFriends className="text-4xl text-gold" />,
      title: "Group Planning",
      description:
        "Coordinate travel plans with friends and family effortlessly.",
      details: [
        "Shared itineraries",
        "Group voting on activities",
        "Expense splitting",
        "Real-time updates",
      ],
    },
  ];

  const demoScenes = [
    {
      title: "Smart Itinerary Creation",
      description:
        "Watch how our AI creates personalized travel plans in seconds",
      image: "/images/demo-itinerary.jpg",
    },
    {
      title: "Real-time Optimization",
      description: "See how we adapt plans based on your preferences",
      image: "/images/demo-optimization.jpg",
    },
    {
      title: "Local Insights",
      description: "Discover hidden gems and local recommendations",
      image: "/images/demo-local.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-slate-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] min-h-[400px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/features-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" />
        <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="gradient-text">Powerful Features</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg"
            >
              Experience the next generation of travel planning with our
              cutting-edge features designed to make your journey extraordinary.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-white/60">
                    <span className="text-gold mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              See It in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoScenes.map((scene, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mt-4">
                    {scene.title}
                  </h3>
                  <p className="text-white/60 text-sm">{scene.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
