"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DeepFusionWaves() {
  useEffect(() => {
    const handleResize = () => {
      // This will trigger re-render if needed (currently it's not doing anything)
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Gradient */}
      <video
        className="absolute inset-0 w-full h-full object-cover bg-center"
        src="/images/bg-video.webm" // Ensure correct path
        autoPlay
        loop
        muted
        playsInline
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 30%, #0047AB, transparent),
                       radial-gradient(circle at 80% 70%, #000, transparent)`,
          filter: "blur(80px)",
          willChange: "transform, opacity",
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
            filter: "blur(120px)",
            willChange: "transform, opacity",
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0],
            translateY: ["0%", "5%", "-5%", "0%"],
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
