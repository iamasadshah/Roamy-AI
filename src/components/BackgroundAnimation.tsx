"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FullScreenWaves() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #0047AB, #000)`,
        }}
      />

      {/* Responsive Waves */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-full"
          style={{
            top: `calc(${index * 20}vh + 5vh)`, // Spread evenly
            height: isMobile ? "30vh" : "40vh", // Adjust height for mobile
            opacity: 0.7 - index * 0.1,
            filter: "blur(3px)",
          }}
          animate={{
            y: ["0px", "15px", "0px"], // Floating motion
          }}
          transition={{
            duration: 7 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{
              transform: isMobile ? "scaleY(0.5)" : "scaleY(1)", // Bigger waves on mobile
            }}
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
              d={
                isMobile
                  ? "M0,220 C320,300 640,100 960,200 C1280,300 1440,100 1440,220 V320 H0 Z"
                  : "M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z"
              }
              animate={{
                d: [
                  isMobile
                    ? "M0,230 C320,280 640,120 960,200 C1280,280 1440,120 1440,230 V320 H0 Z"
                    : "M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z",
                  isMobile
                    ? "M0,220 C320,300 640,100 960,200 C1280,300 1440,100 1440,220 V320 H0 Z"
                    : "M0,180 C240,240 480,80 720,140 C960,240 1200,80 1440,180 V320 H0 Z",
                  isMobile
                    ? "M0,230 C320,280 640,120 960,200 C1280,280 1440,120 1440,230 V320 H0 Z"
                    : "M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 V320 H0 Z",
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
