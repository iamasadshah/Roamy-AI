"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const sampleItineraries = [
  {
    id: 1,
    destination: "Paris, France",
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    price: "$3,499",
    season: "Spring",
    highlights: [
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Morning visit to the Eiffel Tower" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Private tour of the Louvre Museum" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Luxury dinner cruise on the Seine" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Day trip to Versailles Palace" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Wine tasting in Montmartre" },
    ],
    image: "/images/paris.webp",
    tags: ["Romantic", "Cultural", "Gourmet"]
  },
  {
    id: 2,
    destination: "Santorini, Greece",
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    price: "$4,199",
    season: "Summer",
    highlights: [
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Sunset yacht cruise around the caldera" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Private wine tasting tour" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Luxury spa day in Oia" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Traditional cooking class" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Beach hopping by private boat" },
    ],
    image: "/images/santorni.webp",
    tags: ["Luxury", "Beach", "Romantic"]
  },
  {
    id: 3,
    destination: "Dubai, UAE",
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    price: "$3,899",
    season: "Winter",
    highlights: [
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Desert safari with luxury camping" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "VIP tour of Burj Khalifa" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Private yacht tour of Dubai Marina" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Gold Souk shopping experience" },
      { icon: <FaMapMarkerAlt className="text-blue-500" />, text: "Helicopter tour of Palm Jumeirah" },
    ],
    image: "/images/dubai.webp",
    tags: ["Adventure", "Luxury", "Modern"]
  },
];

// Simplified animation variants for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Simple fade transition for carousel
const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export default function ItineraryShowcase() {
  const [[currentIndex], setCurrentIndex] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const currentItinerary = sampleItineraries[currentIndex];

  const navigate = (newDirection: number) => {
    setCurrentIndex(([prevIndex]) => {
      const newIndex = (prevIndex + newDirection + sampleItineraries.length) % sampleItineraries.length;
      return [newIndex, newDirection];
    });
  };

  const nextItinerary = () => navigate(1);
  const prevItinerary = () => navigate(-1);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Simple static background - removed heavy animations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Subtle World Map Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/world-map.png')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold mb-6 shadow-sm border border-blue-200/50"
          >
            Travel Inspiration
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Discover Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Getaway
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Explore our handpicked collection of AI-generated itineraries for your next adventure.
          </motion.p>
        </motion.div>

        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Simplified Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItinerary.id}
                {...fadeTransition}
                className="w-full"
              >
                <div className="w-full">
                  <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-80 lg:h-auto min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                        <Image
                          src={currentItinerary.image}
                          alt={currentItinerary.destination}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                          <div className="flex items-center gap-2 mb-3">
                            <FaMapMarkerAlt className="text-blue-300 h-5 w-5" />
                            <span className="text-sm md:text-base font-medium">{currentItinerary.destination.split(',')[0]}</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                            {currentItinerary.destination}
                          </h3>
                          <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base opacity-90">
                            <span className="flex items-center gap-2">
                              <FaCalendarAlt className="text-blue-300 h-4 w-4" />
                              {currentItinerary.duration}
                            </span>
                            <span className="flex items-center gap-2">
                              <FaStar className="text-yellow-400 h-4 w-4" />
                              {currentItinerary.rating}
                            </span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs md:text-sm backdrop-blur-sm">
                              {currentItinerary.season}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 lg:p-10">
                        <div className="flex justify-between items-start mb-6 md:mb-8">
                          <div>
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Highlights</h4>
                            <p className="text-sm md:text-base text-gray-500">Your personalized adventure includes:</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-4 py-2 rounded-full text-sm md:text-base font-semibold border border-blue-200/50">
                            {currentItinerary.price}
                          </div>
                        </div>
                        
                        <motion.ul 
                          className="space-y-4 mb-8"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {currentItinerary.highlights.map((highlight, i) => (
                            <motion.li 
                              key={i} 
                              variants={fadeInUp}
                              className="flex items-start gap-4 group"
                            >
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-full mt-1 group-hover:scale-110 transition-transform duration-300">
                                {highlight.icon}
                              </div>
                              <span className="text-gray-700 text-sm md:text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                                {highlight.text}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {currentItinerary.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="bg-gray-100 text-gray-600 text-xs md:text-sm px-3 py-2 rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button 
                          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95"
                        >
                          Customize This Itinerary
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Simplified Navigation Buttons */}
          <button
            onClick={prevItinerary}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-110 border border-gray-200/50 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-100 lg:-translate-x-4'}`}
            aria-label="Previous itinerary"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextItinerary}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-110 border border-gray-200/50 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-100 lg:translate-x-4'}`}
            aria-label="Next itinerary"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
          
          {/* Simplified Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {sampleItineraries.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex([i, i > currentIndex ? 1 : -1])}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gradient-to-r from-blue-600 to-indigo-600 w-8 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
