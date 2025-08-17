import { motion } from "framer-motion";
import Link from "next/link";
import { FaPaperPlane, FaGithub, FaArrowRight } from "react-icons/fa";

export default function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Simple static background - removed heavy animations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Ready to Plan Your Perfect Trip?
              </span>
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Let our AI handle all the details while you focus on the excitement of your upcoming journey. Get personalized recommendations tailored just for you.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link href="/plan">
                <button
                  className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-8 py-4 text-lg transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center">
                    Get My Free AI Itinerary
                    <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>

              <Link
                href="https://github.com/iamasadshah/RoamyAi-documentation.git"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div
                  className="flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold rounded-xl px-8 py-4 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <FaGithub className="text-lg" />
                  <span>View Documentation</span>
                  <FaArrowRight className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>

            <motion.p 
              className="text-sm text-gray-500 font-medium flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Currently in Beta - Your feedback helps us improve!</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
