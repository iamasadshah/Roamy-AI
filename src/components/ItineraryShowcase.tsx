import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const sampleItineraries = [
  {
    destination: 'Paris, France',
    duration: '5 Days',
    highlights: [
      'Morning visit to the Eiffel Tower',
      'Private tour of the Louvre Museum',
      'Luxury dinner cruise on the Seine',
      'Day trip to Versailles Palace',
      'Wine tasting in Montmartre',
    ],
    image: '/images/paris.jpg',
  },
  {
    destination: 'Santorini, Greece',
    duration: '7 Days',
    highlights: [
      'Sunset yacht cruise around the caldera',
      'Private wine tasting tour',
      'Luxury spa day in Oia',
      'Traditional cooking class',
      'Beach hopping by private boat',
    ],
    image: '/images/santorni.jpg',
  },
  {
    destination: 'Dubai, UAE',
    duration: '6 Days',
    highlights: [
      'Desert safari with luxury camping',
      'VIP tour of Burj Khalifa',
      'Private yacht tour of Dubai Marina',
      'Gold Souk shopping experience',
      'Helicopter tour of Palm Jumeirah',
    ],
    image: '/images/dubai.jpg',
  },
];

export default function ItineraryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItinerary = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleItineraries.length);
  };

  const prevItinerary = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleItineraries.length) % sampleItineraries.length);
  };

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/world-map.png')] opacity-5" />
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="gradient-text">Sample AI-Generated Itineraries</span>
        </motion.h2>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="luxury-card max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                <img
                  src={sampleItineraries[currentIndex].image}
                  alt={sampleItineraries[currentIndex].destination}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 gradient-text">
                  {sampleItineraries[currentIndex].destination}
                </h3>
                <p className="text-gold mb-4">{sampleItineraries[currentIndex].duration}</p>
                <ul className="space-y-3">
                  {sampleItineraries[currentIndex].highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center text-white/90">
                      <span className="text-gold mr-2">✦</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <button
            onClick={prevItinerary}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-navy/80 p-4 rounded-full text-gold hover:scale-110 transition-transform"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextItinerary}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-navy/80 p-4 rounded-full text-gold hover:scale-110 transition-transform"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
