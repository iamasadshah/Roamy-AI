"use client";

import { motion, Variants } from "framer-motion";
import { FaRobot, FaBolt, FaWallet, FaShare, FaGlobe, FaMapMarkedAlt, FaStar, FaSync, FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    },
  },
};

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Powerful Features
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Everything You Need for Perfect Travel
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600"
          >
            Discover how Roamy AI transforms your travel planning experience with cutting-edge features
            designed to make every trip unforgettable.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="h-full"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            <span>And many more features to discover</span>
            <FaArrowRight className="ml-2 h-3 w-3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
