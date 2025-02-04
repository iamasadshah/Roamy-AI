import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import BackgroundAnimation from './BackgroundAnimation';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy to-navy/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-playfair"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text block">
              Effortless Travel Planning with AI
            </span>
            <span className="text-2xl md:text-3xl mt-4 block">
              Plan Your Next Trip to{' '}
              <span className="text-gold">
                <Typewriter
                  options={{
                    strings: ['Paris', 'Tokyo', 'Bali', 'New York', 'Santorini', 'Dubai'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 30,
                    delay: 50,
                  }}
                />
              </span>
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get a personalized, AI-generated itinerary for your dream vacation in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="luxury-button text-lg animate-float"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('plan-trip')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Plan My Trip Now
            </motion.button>

            <motion.p 
              className="text-sm mt-4 text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              No credit card required
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/70 animate-glow"
          >
            <FaArrowDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
