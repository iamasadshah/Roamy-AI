"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaRegClock } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const slideIn = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: { duration: 0.3 }
  })
};

export default function ItineraryShowcase() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const currentItinerary = sampleItineraries[currentIndex];

  const navigate = (newDirection: number) => {
    setCurrentIndex(([prevIndex, _]) => {
      const newIndex = (prevIndex + newDirection + sampleItineraries.length) % sampleItineraries.length;
      return [newIndex, newDirection];
    });
  };

  const nextItinerary = () => navigate(1);
  const prevItinerary = () => navigate(-1);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/world-map.png')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Travel Inspiration
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Discover Your Perfect Getaway
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600"
          >
            Explore our handpicked collection of AI-generated itineraries for your next adventure.
          </motion.p>
        </motion.div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentItinerary.id}
              custom={direction}
              variants={slideIn}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
            >
              <Card className="overflow-hidden shadow-xl border-0 bg-white">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <Image
                      src={currentItinerary.image}
                      alt={currentItinerary.destination}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-blue-300" />
                        <span className="text-sm font-medium">{currentItinerary.destination.split(',')[0]}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {currentItinerary.destination}
                      </h3>
                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-blue-300" />
                          {currentItinerary.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {currentItinerary.rating}
                        </span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                          {currentItinerary.season}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">Highlights</h4>
                        <p className="text-sm text-gray-500">Your personalized adventure includes:</p>
                      </div>
                      <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {currentItinerary.price}
                      </div>
                    </div>
                    
                    <motion.ul 
                      className="space-y-3 mb-8"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {currentItinerary.highlights.map((highlight, i) => (
                        <motion.li 
                          key={i} 
                          variants={fadeInUp}
                          className="flex items-start gap-3"
                        >
                          <div className="bg-blue-50 p-1.5 rounded-full mt-0.5">
                            {highlight.icon}
                          </div>
                          <span className="text-gray-700">{highlight.text}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentItinerary.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                      Customize This Itinerary
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevItinerary}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100 md:-translate-x-4'}`}
            aria-label="Previous itinerary"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={nextItinerary}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100 md:translate-x-4'}`}
            aria-label="Next itinerary"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {sampleItineraries.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex([i, i > currentIndex ? 1 : -1])}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
