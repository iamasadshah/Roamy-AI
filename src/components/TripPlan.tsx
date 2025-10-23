"use client";

import { cn } from "@/lib/utils";
import { TravelItinerary } from "@/types/itinerary";
import StructuredItinerary from "./StructuredItinerary";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Save, RefreshCw, Heart, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { useState } from "react";

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
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  // use html2pdf to download the itinerary as a PDF
  const handleDownloadPDF = async () => {
    if (!plan) return;

    setIsDownloadingPDF(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const content = document.getElementById("trip-plan-container");

      if (!content) {
        throw new Error("Trip plan container not found for PDF download.");
      }

      await html2pdf()
        .set({
          margin: 12,
          filename: `RoamyAI_${plan.trip_overview.destination.replace(/\s+/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 1.2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(content)
        .save();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="text-center space-y-6 rounded-3xl border border-white/30 bg-white/95 p-10 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            AI Processing Your Itinerary
          </h3>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-600">
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
        className="w-full space-y-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        id="trip-plan-container"
      >
        {/* Enhanced Header */}
        <motion.div
          className="mb-10 text-center"
          variants={itemVariants}
        >
          <h2 className="mb-4 text-3xl font-semibold leading-tight text-gray-800 lg:text-4xl">
            Your Perfect Travel Itinerary
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Crafted with AI precision for an unforgettable journey to{" "}
            {plan.trip_overview.destination}
          </p>
        </motion.div>

        {/* Trip Overview Cards */}
        <motion.div
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            {
              icon: <MapPin className="h-6 w-6" />,
              label: "Destination",
              value: plan.trip_overview.destination,
              bg: "from-blue-100 to-blue-200",
              text: "text-blue-600",
            },
            {
              icon: <Calendar className="h-6 w-6" />,
              label: "Dates",
              value: plan.trip_overview.dates,
              bg: "from-indigo-100 to-indigo-200",
              text: "text-indigo-600",
            },
            {
              icon: <Users className="h-6 w-6" />,
              label: "Travelers",
              value: plan.trip_overview.travelers,
              bg: "from-green-100 to-green-200",
              text: "text-green-600",
            },
            {
              icon: <DollarSign className="h-6 w-6" />,
              label: "Budget",
              value: plan.trip_overview.budget_level,
              bg: "from-purple-100 to-purple-200",
              text: "text-purple-600",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="transform rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div
                className={cn(
                  "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br",
                  item.bg,
                )}
              >
                <div className={cn(item.text)}>{item.icon}</div>
              </div>
              <h3 className="text-center text-lg font-semibold text-gray-800">{item.label}</h3>
              <p className="mt-2 text-center font-medium text-gray-600">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Itinerary Content */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-2xl backdrop-blur-sm"
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 text-center text-white">
            <h3 className="text-xl font-semibold sm:text-2xl">
              Your Detailed Itinerary
            </h3>
            <p className="mt-1 text-sm text-blue-100 sm:text-base">
              Day-by-day breakdown of your perfect trip
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <StructuredItinerary itinerary={plan} />
          </div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          data-html2canvas-ignore
        >
          <motion.button
            variants={itemVariants}
            onClick={handleDownloadPDF}
            disabled={isDownloadingPDF}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
          >
            {isDownloadingPDF ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Save className="h-5 w-5" />
            )}
            {isDownloadingPDF ? "Preparing PDF..." : "Download PDF"}
          </motion.button>
          
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerateNew}
            className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white/90 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-white hover:shadow-lg"
          >
            <RefreshCw className="h-5 w-5" />
            Generate New
          </motion.button>
        </motion.div>

        {/* Success Message */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-green-200/50 bg-gradient-to-r from-green-50 to-blue-50 p-6 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">
              Your Itinerary is Ready!
            </h3>
          </div>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
            Your personalized travel plan has been created with AI precision.
            Save it to your profile, download as PDF, or share with friends to start planning your adventure!
          </p>
        </motion.div>
      </motion.div>
    </LazyMotion>
  );
}
