"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCalendar, FaCode, FaBug } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Documentation = () => {
  const devLogs = [
    {
      date: "March 15, 2024",
      title: "Project Initialization",
      description: "Set up Next.js 14 project with TypeScript and Tailwind CSS",
      tasks: [
        "Created project structure",
        "Implemented basic routing",
        "Set up Tailwind CSS configuration",
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "completed",
    },
    {
      date: "March 16, 2024",
      title: "AI Integration",
      description:
        "Integrated Google Gemini API for travel planning functionality",
      tasks: [
        "Set up API authentication",
        "Created travel planning prompts",
        "Implemented response parsing",
      ],
      techStack: ["Google Gemini API", "Next.js API Routes"],
      status: "completed",
    },
    {
      date: "March 17, 2024",
      title: "PWA Implementation",
      description: "Added Progressive Web App capabilities",
      tasks: [
        "Created manifest.json",
        "Set up service worker",
        "Added PWA meta tags",
        "Configured offline functionality",
      ],
      techStack: ["next-pwa", "Service Workers"],
      status: "in-progress",
    },
    // Add more dev logs as your project progresses
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-slate-900 text-white p-6 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Development Journey
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Track the evolution of Roamy AI - from conception to deployment. This
          documentation chronicles our development process, challenges, and
          achievements.
        </p>
      </motion.div>

      {/* Project Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { icon: <FaGithub />, label: "Commits", value: "156" },
          { icon: <FaCalendar />, label: "Days", value: "45" },
          { icon: <FaCode />, label: "Files", value: "89" },
          { icon: <FaBug />, label: "Issues Resolved", value: "23" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-navy/50 backdrop-blur-sm p-4 rounded-lg text-center border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <div className="text-2xl mb-2 text-blue-400 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Development Logs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {devLogs.map((log, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-navy/30 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <IoMdCheckmarkCircleOutline
                  className={`text-2xl ${
                    log.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                />
                <h3 className="text-xl font-bold">{log.title}</h3>
              </div>
              <span className="text-sm text-gray-400 flex items-center">
                <FaCalendar className="mr-2" />
                {log.date}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{log.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Tasks:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {log.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {log.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-12 text-gray-400"
      >
        <p>Last updated: March 17, 2024</p>
      </motion.div>
    </div>
  );
};

export default Documentation;
