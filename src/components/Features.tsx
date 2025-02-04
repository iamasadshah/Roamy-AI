import { motion } from 'framer-motion';
import { FaRobot, FaBolt, FaWallet, FaShare } from 'react-icons/fa';

const features = [
  {
    icon: <FaRobot />,
    title: 'AI-Powered Customization',
    description: 'Get personalized travel plans based on your unique preferences and interests',
  },
  {
    icon: <FaBolt />,
    title: 'Instant & Hassle-Free',
    description: 'Skip hours of research with ready-made, AI-generated travel plans',
  },
  {
    icon: <FaWallet />,
    title: 'Luxury & Budget Options',
    description: 'Find the perfect balance of experiences for your travel style and budget',
  },
  {
    icon: <FaShare />,
    title: 'Editable & Shareable',
    description: 'Easily customize your itinerary and share it with travel companions',
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section className="section-padding bg-white/5 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="gradient-text">Why Choose Travel Tactician</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="luxury-card group hover:bg-navy-light/30"
            >
              <div className="text-3xl mb-4 text-gold group-hover:scale-110 transform transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
