import { motion } from 'framer-motion';
import { FaQuestionCircle, FaMagic, FaPlane } from 'react-icons/fa';

const steps = [
  {
    icon: <FaQuestionCircle className="text-4xl md:text-5xl" />,
    title: 'Answer a Few Questions',
    description: 'Tell us about your dream trip preferences',
  },
  {
    icon: <FaMagic className="text-4xl md:text-5xl" />,
    title: 'Let AI Curate Your Itinerary',
    description: 'Get instant, personalized travel plans',
  },
  {
    icon: <FaPlane className="text-4xl md:text-5xl" />,
    title: 'Download & Enjoy',
    description: 'Start your dream journey hassle-free',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
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

export default function HowItWorks() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <span className="gradient-text">How It Works</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="luxury-card text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="gradient-text">{step.icon}</div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
