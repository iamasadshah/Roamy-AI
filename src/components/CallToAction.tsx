import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/luxury-pattern.png')] opacity-5" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Ready to Plan Your Perfect Trip?</span>
          </h2>
          
          <p className="text-xl text-white/90">
            Let AI handle the details while you focus on the excitement of your upcoming journey.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="luxury-button text-lg px-8 py-4"
            onClick={() => document.getElementById('plan-trip')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get My Free AI Itinerary
          </motion.button>

          <p className="text-white/70">No credit card required • Instant itinerary generation</p>
        </motion.div>
      </div>
    </section>
  );
}
