"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DeepFusionWaves() {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, #0047AB, transparent),
                       radial-gradient(circle at 80% 70%, #000, transparent)`,
          filter: "blur(80px)", // Reduced for performance
          willChange: "transform, opacity", // Helps browser optimize
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Wave Layers - Reduced to 3 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.3), transparent)`,
            filter: "blur(120px)", // Lowered blur
            willChange: "transform, opacity",
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0],
            translateY: ["0%", "5%", "-5%", "0%"], // More efficient than x/y
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
