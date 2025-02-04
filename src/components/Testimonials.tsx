import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Solo Traveler',
    image: '/images/sara-profile.jpg',
    text: 'Travel Tactician made planning my solo trip to Japan effortless. The AI understood exactly what I was looking for and created the perfect balance of culture and adventure.',
    rating: 5,
  },
  {
    name: 'Michael & Emma',
    role: 'Couple',
    image: '/images/couple.jpg',
    text: 'We used Travel Tactician for our honeymoon in Greece, and it exceeded our expectations. The romantic dinner recommendations were spot-on!',
    rating: 5,
  },
  {
    name: 'The Anderson Family',
    role: 'Family of Four',
    image: '/images/family-profile.jpg',
    text: 'Planning a family trip can be overwhelming, but Travel Tactician made it simple. The kid-friendly activities and convenient logistics made our vacation stress-free.',
    rating: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="section-padding bg-white/5 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="gradient-text">What Our Users Say</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="luxury-card flex flex-col"
            >
              <div className="mb-4 relative">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-navy px-3 py-1 rounded-full">
                  <div className="flex text-gold">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-gold">{testimonial.name}</h3>
                <p className="text-white/70 text-sm">{testimonial.role}</p>
              </div>
              <p className="text-white/90 text-center italic flex-grow">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
