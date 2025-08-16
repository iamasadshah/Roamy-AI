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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
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
            Customer Stories
          </motion.span>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Travelers Say
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Real experiences from travelers who discovered their perfect adventures with Roamy AI.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
                        {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="relative group"
              whileHover="hover"
            >
              <motion.div
                variants={cardHoverVariants}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                  {/* Enhanced Profile Section */}
                  <div className="mb-6 relative">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                          <Image
                            width={200}
                            height={200}
                            unoptimized={true}
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaStar className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Rating Badge */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="w-3 h-3 text-yellow-300" />
                        ))}
                        <span className="text-white text-xs font-semibold ml-1">{testimonial.rating}.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="text-center mb-6 flex-grow">
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 font-medium mb-4">
                      {testimonial.role}
                    </p>
                    <div className="relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl text-blue-200 opacity-50">
                        &ldquo;
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed italic relative z-10">
                        {testimonial.text}
                      </p>
                      <div className="absolute -bottom-4 right-0 text-4xl text-blue-200 opacity-50">
                        &rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Decorative Element */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-20 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">10K+</div>
              <div className="text-gray-600 font-medium">Happy Travelers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">4.9</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
