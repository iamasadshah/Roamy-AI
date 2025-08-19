import { TravelItinerary } from "@/types/itinerary";
import StructuredItinerary from "./StructuredItinerary";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Save, RefreshCw, Heart, Calendar, MapPin, Users, DollarSign } from "lucide-react";


interface TripPlanProps {
  plan: TravelItinerary | null;
  isLoading: boolean;
  onGenerateNew: () => void;
}

// Performance optimized animation variants
const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function TripPlan({
  plan,
  isLoading,
  onGenerateNew,
}: TripPlanProps) {

  // use html2pdf to download the itinerary as a PDF
  const handleDownloadPDF  =  () => {
    const html2pdf = require("html2pdf.js");
    const content = document.querySelector("#trip-plan-container");
    html2pdf(content, {
      margin : 10,
      filename : `Trip to ${plan?.trip_overview.destination}`,
      jsPDF : {
        unit : "mm",
        format : "a4",
        orientation : "portrait",
      }
      
    })
  }

  if (isLoading) {
    return (
      <motion.div 
        className="w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center space-y-6 p-12 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            AI Processing Your Itinerary
          </h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Our advanced AI is crafting your personalized travel plan with the best recommendations.
          </p>
          <div className="flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="w-full max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        id = "trip-plan-container"
      >
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your Perfect Travel Itinerary
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafted with AI precision for an unforgettable journey to {plan.trip_overview.destination}
          </p>
        </motion.div>

        {/* Trip Overview Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            { 
              icon: <MapPin className="h-6 w-6" />, 
              label: "Destination", 
              value: plan.trip_overview.destination,
              color: "blue"
            },
            { 
              icon: <Calendar className="h-6 w-6" />, 
              label: "Dates", 
              value: plan.trip_overview.dates,
              color: "indigo"
            },
            { 
              icon: <Users className="h-6 w-6" />, 
              label: "Travelers", 
              value: plan.trip_overview.travelers,
              color: "green"
            },
            { 
              icon: <DollarSign className="h-6 w-6" />, 
              label: "Budget", 
              value: plan.trip_overview.budget_level,
              color: "purple"
            }
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className={`p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 mb-4 mx-auto`}>
                <div className={`text-${item.color}-600`}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {item.label}
              </h3>
              <p className="text-gray-600 text-center font-medium">
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Itinerary Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Your Detailed Itinerary
            </h3>
            <p className="text-blue-100 text-center mt-2">
              Day-by-day breakdown of your perfect trip
            </p>
          </div>
          <div className="p-8">
            <StructuredItinerary itinerary={plan} />
          </div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          data-html2canvas-ignore
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}

            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 cursor-pointer hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Save className="h-5 w-5" />
            Save to Acess Offline
          </motion.button>
          
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerateNew}
            className="flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
          >
            <RefreshCw className="h-5 w-5" />
            Generate New
          </motion.button>
        </motion.div>

        {/* Success Message */}
        <motion.div
          variants={itemVariants}
          className="text-center p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl border border-green-200/50"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              Your Itinerary is Ready!
            </h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Your personalized travel plan has been created with AI precision. 
            Save it to your profile, download as PDF, or share with friends to start planning your adventure!
          </p>
        </motion.div>
      </motion.div>
    </LazyMotion>
  );
}
