"use client";

import { motion } from "framer-motion";

export default function FullScreenWaves() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #0047AB, #000)`,
        }}
      />

      {/* Full-Screen Waves Without Gaps */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-full"
          style={{
            top: `${index * 30}vh`, // Spread waves evenly
            height: "50vh", // Overlapping height to remove lines
            opacity: 0.6 - index * 0.1, // Depth effect
            filter: "blur(1px)", // Soft blending effect
          }}
          animate={{
            y: ["0px", "10px", "0px"], // Floating motion
          }}
          transition={{
            duration: 6 + index * 1, // Each wave moves slightly differently
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={`waveGradient${index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(0, 123, 255, 0.4)"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(0, 123, 255, 0)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <motion.path
              fill={`url(#waveGradient${index})`}
              d="M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z"
              animate={{
                d: [
                  "M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z",
                  "M0,180 C240,240 480,80 720,140 C960,240 1200,80 1440,180 V320 H0 Z",
                  "M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z",
                ],
              }}
              transition={{
                duration: 6 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
