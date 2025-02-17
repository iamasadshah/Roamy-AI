"use client";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

export default function GoalsPage() {
  const goals = [
    {
      icon: <FaLightbulb className="text-4xl text-gold" />,
      title: "Revolutionize Travel Planning",
      description:
        "Transform the way people plan their travels with AI-powered personalization.",
      milestones: [
        "Launch smart itinerary generator",
        "Implement machine learning preferences",
        "Develop real-time optimization",
      ],
    },
    {
      title: "Enhance User Experience",
      description:
        "We strive to provide a seamless and delightful experience for every user, from inspiration to execution.",
      icon: "✨",
    },
    {
      title: "Promote Sustainable Tourism",
      description:
        "We're committed to promoting responsible and sustainable travel practices that benefit both travelers and destinations.",
      icon: "🌱",
    },
    {
      title: "Foster Cultural Understanding",
      description:
        "We aim to bridge cultural gaps and promote meaningful connections through travel.",
      icon: "🤝",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Global Launch",
      description:
        "Expanding our services worldwide with support for multiple languages.",
      status: "current",
    },
    // ... (add more timeline items)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-slate-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px]">
        {/* Similar hero section as Features page */}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {goals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
            >
              <div className="text-4xl mb-4">{goal.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {goal.title}
              </h3>
              <p className="text-white/80">{goal.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute left-1/2 -translate-x-px h-full w-[2px] bg-gradient-to-b from-gold via-gold/50 to-transparent" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative pl-8 pb-12 ml-[50%] ${
                index === timeline.length - 1 ? "pb-0" : ""
              }`}
            >
              {/* Timeline content */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
