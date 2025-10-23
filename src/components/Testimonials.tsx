"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Solo Traveler",
    image: "/images/sara-profile.webp",
    text: "Roamy AI made planning my solo trip to Japan effortless. The AI understood exactly what I was looking for and created the perfect balance of culture and adventure.",
    rating: 5,
  },
  {
    name: "Michael & Emma",
    role: "Couple",
    image: "/images/couple.webp",
    text: "We used Roamy AI for our honeymoon in Greece, and it exceeded our expectations. The romantic dinner recommendations were spot-on!",
    rating: 5,
  },
  {
    name: "The Anderson Family",
    role: "Family of Four",
    image: "/images/family-profile.webp",
    text: "Planning a family trip can be overwhelming, but Roamy AI made it simple. The kid-friendly activities and convenient logistics made our vacation stress-free.",
    rating: 5,
  },
];

// Simplified animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden" id="testimonials">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50 to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-4xl mx-auto mb-16 relative"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-5 py-2.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-5 shadow-sm"
          >
            CUSTOMER STORIES
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            What Our Travelers <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Say About Us</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600 mb-10"
          >
            Join thousands of satisfied travelers who&apos;ve discovered the perfect way to plan their adventures.
          </motion.p>

          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-blue-100 opacity-50"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />
          <motion.div 
            className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-indigo-100 opacity-50"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20 relative z-10"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:border-blue-200">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-5xl text-blue-100 opacity-40">
                  &ldquo;
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 h-5 w-5" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 text-base group-hover:text-gray-800 transition-colors duration-300">
                  {testimonial.text}
                </p>
                
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-blue-200 shadow-sm"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-0.5">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-5xl mx-auto"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8"
          >
            Trusted by Travelers Worldwide
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { number: "10K+", label: "Happy Travelers" },
              { number: "50+", label: "Countries Covered" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
