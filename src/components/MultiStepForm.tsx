"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlane,
  FaCalendarAlt,
  FaWallet,
  FaHotel,
  FaUsers,
  FaUtensils,
  FaCheck,
  FaHome,
  FaBed,
  FaUmbrellaBeach,
  FaUser,
  FaHeart,
  FaUserFriends,
  FaLeaf,
  FaSeedling,
  FaMosque,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

interface FormStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FormData {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: string;
  accommodation: string;
  travelers: string;
  dietaryPlan: string;
}

const steps: FormStep[] = [
  {
    id: 1,
    title: "Destination",
    description: "Where would you like to go?",
    icon: <FaPlane className="text-blue-600 text-xl" />,
  },
  {
    id: 2,
    title: "Travel Dates",
    description: "When are you planning to travel?",
    icon: <FaCalendarAlt className="text-indigo-600 text-xl" />,
  },
  {
    id: 3,
    title: "Budget",
    description: "What's your spending range?",
    icon: <FaWallet className="text-green-600 text-xl" />,
  },
  {
    id: 4,
    title: "Accommodation",
    description: "Where would you like to stay?",
    icon: <FaHotel className="text-purple-600 text-xl" />,
  },
  {
    id: 5,
    title: "Travelers",
    description: "Who's coming along?",
    icon: <FaUsers className="text-orange-600 text-xl" />,
  },
  {
    id: 6,
    title: "Dietary Preferences",
    description: "Any food restrictions?",
    icon: <FaUtensils className="text-red-600 text-xl" />,
  },
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Bhutan",
  "Bolivia",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Maldives",
  "Malta",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
  "Yemen",
];

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const DestinationInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    const search = (searchTerm || value).toLowerCase();
    return countries.filter((country) =>
      country.toLowerCase().includes(search)
    );
  }, [searchTerm, value]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full p-4 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-12 text-lg font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300"
          placeholder="Search for your destination..."
          value={value || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaChevronDown
            className={`transform transition-transform text-xl ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-[400px] max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl max-h-[80vh] flex flex-col"
              >
                {/* Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Select Your Destination
                  </h3>
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all text-lg font-medium"
                      placeholder="Type to search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Countries List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <motion.button
                          key={country}
                          className="flex items-center p-4 text-left text-gray-700 hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent rounded-2xl transition-all group"
                          onClick={() => {
                            onChange(country);
                            setSearchTerm("");
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex-1 truncate font-medium text-lg">{country}</span>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                          >
                            →
                          </motion.span>
                        </motion.button>
                      ))
                    ) : (
                      <div className="col-span-2 p-8 text-center text-white/60">
                        No countries found matching your search
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MultiStepForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: null,
    endDate: null,
    budget: "",
    accommodation: "",
    travelers: "",
    dietaryPlan: "",
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleNext = async (): Promise<void> => {
    if (currentStep === steps.length) {
      // Check if user is authenticated before generating itinerary
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg
                      className="h-10 w-10 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Sign In Required
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please sign in to generate your personalized travel
                      itinerary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push("/auth");
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          ),
          {
            duration: 5000,
            position: "bottom-right",
          }
        );
        return;
      }

      onSubmit(formData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.destination.trim() !== "";
      case 2:
        return formData.startDate !== null && formData.endDate !== null;
      case 3:
        return formData.budget !== "";
      case 4:
        return formData.accommodation !== "";
      case 5:
        return formData.travelers !== "";
      case 6:
        return true; // Dietary preferences are optional
      default:
        return false;
    }
  };

  const renderStepContent = (): React.ReactNode => {
    const optionButtonClasses = (isSelected: boolean) => `
      w-full p-6 rounded-2xl text-left transition-all duration-300 font-medium
      ${
        isSelected
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25 border-2 border-blue-400"
          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/50"
      }
      hover:scale-[1.02] active:scale-[0.98]
    `;

    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Where would you like to go?
              </h3>
              <p className="text-gray-600 text-lg">
                Choose your dream destination and we'll create the perfect itinerary
              </p>
            </motion.div>
            <DestinationInput
              value={formData.destination}
              onChange={(value) =>
                setFormData({ ...formData, destination: value })
              }
            />
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-md space-y-5">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={new Date()}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium"
                placeholderText="Select start date"
                dateFormat="MMMM d, yyyy"
                calendarClassName="rounded-2xl shadow-2xl border border-gray-100"
              />
            </motion.div>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-base font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate || new Date()}
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholderText="Select end date"
                dateFormat="MMMM d, yyyy"
                calendarClassName="rounded-xl shadow-xl border border-gray-100"
              />
            </motion.div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-md space-y-3">
            {["Budget", "Mid-range", "Luxury"].map((option, index) => (
              <motion.button
                key={option}
                onClick={() => setFormData({ ...formData, budget: option })}
                className={optionButtonClasses(formData.budget === option)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <span className="font-medium">{option}</span>
                  {formData.budget === option && (
                    <FaCheck className="ml-auto h-4 w-4 text-white/90" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            {["Hotel", "Airbnb", "Hostel", "Resort"].map((option, index) => (
              <motion.button
                key={option}
                onClick={() =>
                  setFormData({ ...formData, accommodation: option })
                }
                className={`h-24 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                  formData.accommodation === option
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md"
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {option === "Hotel" && <FaHotel className="h-6 w-6 mb-2" />}
                {option === "Airbnb" && <FaHome className="h-6 w-6 mb-2" />}
                {option === "Hostel" && <FaBed className="h-6 w-6 mb-2" />}
                {option === "Resort" && (
                  <FaUmbrellaBeach className="h-6 w-6 mb-2" />
                )}
                <span className="text-sm font-medium">{option}</span>
              </motion.button>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            {["Solo", "Couple", "Family", "Group"].map((option, index) => (
              <motion.button
                key={option}
                onClick={() => setFormData({ ...formData, travelers: option })}
                className={`h-24 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                  formData.travelers === option
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {option === "Solo" && <FaUser className="h-6 w-6 mb-2" />}
                {option === "Couple" && <FaHeart className="h-6 w-6 mb-2" />}
                {option === "Family" && <FaUsers className="h-6 w-6 mb-2" />}
                {option === "Group" && (
                  <FaUserFriends className="h-6 w-6 mb-2" />
                )}
                <span className="text-sm font-medium">{option}</span>
              </motion.button>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            {["No Preference", "Vegetarian", "Vegan", "Halal"].map(
              (option, index) => (
                <motion.button
                  key={option}
                  onClick={() =>
                    setFormData({ ...formData, dietaryPlan: option })
                  }
                  className={`h-24 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 ${
                    formData.dietaryPlan === option
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 300,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {option === "No Preference" && (
                    <FaUtensils className="h-6 w-6 mb-2" />
                  )}
                  {option === "Vegetarian" && (
                    <FaLeaf className="h-6 w-6 mb-2" />
                  )}
                  {option === "Vegan" && (
                    <FaSeedling className="h-6 w-6 mb-2" />
                  )}
                  {option === "Halal" && <FaMosque className="h-6 w-6 mb-2" />}
                  <span className="text-sm font-medium text-center">
                    {option}
                  </span>
                </motion.button>
              )
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  } as const;

  // Add a subtle background animation
  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 50%",
      opacity: 0.9,
    },
    animate: {
      backgroundPosition: "100% 50%",
      opacity: 1,
      transition: {
        backgroundPosition: {
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
        },
      },
    },
  } as const;

  return (
    <div className="relative">
      <motion.div
        className="relative w-full max-w-5xl mx-auto p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm border border-white/20"
        initial="initial"
        animate="animate"
        variants={backgroundVariants}
        style={
          {
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%)",
            backgroundSize: "200% 200%",
            border: "1px solid rgba(255,255,255,0.5)",
          } as React.CSSProperties
        }
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-10 left-1/4 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-600 rounded-full shadow-md shadow-blue-200"
            initial={{ width: 0 }}
            animate={{
              width: `${(currentStep / steps.length) * 100}%`,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              width: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              },
            }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-12 relative px-2">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center flex-1 max-w-[140px]"
              >
                <motion.div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold relative shadow-lg ${
                    isActive
                      ? "text-white shadow-blue-500/30"
                      : isCompleted
                      ? "text-white shadow-green-500/30"
                      : "text-gray-500 bg-white border-2 border-gray-200 shadow-gray-200/50"
                  }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    background: isActive
                      ? ["#3B82F6", "#2563EB", "#3B82F6"]
                      : isCompleted
                      ? ["#10B981", "#059669", "#10B981"]
                      : "#FFFFFF",
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 500, damping: 30 },
                    background: {
                      duration: 3,
                      repeat: isActive || isCompleted ? Infinity : 0,
                      repeatType: "reverse",
                      ease: "linear",
                    },
                  }}
                >
                  {isCompleted ? (
                    <FaCheck className="h-6 w-6" />
                  ) : (
                    <span className="relative z-10 text-lg">{step.id}</span>
                  )}

                  {/* Animated ring for active step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-3 border-blue-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${
                    isActive
                      ? "text-blue-500"
                      : isCompleted
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}>
                    {step.description}
                  </div>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-12 h-1 bg-gray-200 -ml-6">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width: currentStep > step.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 pb-4 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                staggerChildren: 0.1,
                damping: 30,
              }}
              className="w-full"
            >
              <motion.div
                className="min-h-[320px] flex items-center justify-center px-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.1 },
                }}
              >
                {renderStepContent()}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 flex justify-between border-t border-gray-100 pt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-8 py-4 rounded-2xl font-semibold text-base ${
              currentStep === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
            } transition-all duration-300`}
            whileHover={{
              x: currentStep === 1 ? 0 : -3,
              backgroundColor:
                currentStep === 1 ? "transparent" : "rgba(243, 244, 246, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <FaChevronLeft className="mr-3 text-lg" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className={`flex items-center px-8 py-4 rounded-2xl font-semibold text-base ${
              !isStepValid() || isLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-xl shadow-blue-500/25 border-2 border-blue-400"
            } transition-all duration-300`}
            whileHover={
              !isStepValid() || isLoading
                ? {}
                : {
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  }
            }
            whileTap={!isStepValid() || isLoading ? {} : { scale: 0.97 }}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="hidden sm:inline">Generating Your Itinerary...</span>
                <span className="sm:hidden">Generating...</span>
              </span>
            ) : currentStep === steps.length ? (
              <span className="flex items-center">
                <span className="hidden sm:inline">Generate My Itinerary</span>
                <span className="sm:hidden">Generate</span>
                <FaPlane className="ml-3 text-lg transform transition-transform group-hover:translate-x-1" />
              </span>
            ) : (
              <span className="flex items-center">
                <span className="hidden sm:inline">Continue</span>
                <span className="sm:hidden">Next</span>
                <FaChevronRight className="ml-3 text-lg" />
              </span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MultiStepForm;
