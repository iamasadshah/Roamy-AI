"use client";

import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
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
  FaGlobe,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";
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

// Performance optimized animation variants
const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
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

const steps: FormStep[] = [
  {
    id: 1,
    title: "Destination",
    description: "Where would you like to go?",
    icon: <FaGlobe className="text-blue-600 text-xl" />,
  },
  {
    id: 2,
    title: "Travel Dates",
    description: "When are you planning to travel?",
    icon: <FaClock className="text-indigo-600 text-xl" />,
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

  const handleSelect = useCallback((country: string) => {
    onChange(country);
    setSearchTerm("");
    setIsOpen(false);
  }, [onChange]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full p-5 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-12 text-lg font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-[500px] max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-2xl max-h-[80vh] flex flex-col"
              >
                {/* Enhanced Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Select Your Destination
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Choose from our curated list of amazing destinations
                  </p>
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all text-lg font-medium shadow-lg"
                      placeholder="Type to search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Enhanced Countries List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <motion.button
                          key={country}
                          className="flex items-center p-5 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 border-2 border-transparent rounded-2xl transition-all group shadow-sm hover:shadow-lg"
                          onClick={() => handleSelect(country)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaGlobe className="text-blue-500 mr-4 text-lg" />
                          <span className="flex-1 truncate font-semibold text-lg">{country}</span>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xl"
                          >
                            →
                          </motion.span>
                        </motion.button>
                      ))
                    ) : (
                      <div className="col-span-2 p-12 text-center text-gray-500 text-lg">
                        <FaSearch className="mx-auto mb-4 text-4xl text-gray-300" />
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

  const handleNext = useCallback(async (): Promise<void> => {
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
  }, [currentStep, formData, onSubmit, router, supabase.auth]);

  const handleBack = useCallback((): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const isStepValid = useCallback((): boolean => {
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
  }, [currentStep, formData]);

  const renderStepContent = useCallback((): React.ReactNode => {
    const optionButtonClasses = (isSelected: boolean) => `
      w-full p-6 rounded-2xl text-left transition-all duration-300 font-semibold text-lg
      ${
        isSelected
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25 border-2 border-blue-400 transform scale-105"
          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/50"
      }
      hover:scale-[1.02] active:scale-[0.98]
    `;

    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Where would you like to go?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Choose your dream destination and we'll create the perfect itinerary for you
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
          <div className="w-full max-w-lg space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                When are you planning to travel?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Select your travel dates to optimize your itinerary
              </p>
            </motion.div>
            
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="space-y-3"
                variants={itemVariants}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-3">
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
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl"
                placeholderText="Select start date"
                dateFormat="MMMM d, yyyy"
                  calendarClassName="rounded-2xl shadow-2xl border border-gray-100"
              />
            </motion.div>
              
            <motion.div
                className="space-y-3"
                variants={itemVariants}
              >
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                End Date
              </label>
              <DatePicker
                selected={formData.endDate}
                  onChange={(date) =>
                    setFormData({ ...formData, endDate: date })
                  }
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate || new Date()}
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl"
                placeholderText="Select end date"
                dateFormat="MMMM d, yyyy"
                  calendarClassName="rounded-2xl shadow-2xl border border-gray-100"
              />
              </motion.div>
            </motion.div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                What's your budget range?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Choose your spending range to get the best recommendations
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { value: "budget", label: "Budget", icon: "💰", desc: "Affordable options" },
                { value: "moderate", label: "Moderate", icon: "💳", desc: "Balanced comfort" },
                { value: "luxury", label: "Luxury", icon: "👑", desc: "Premium experience" },
                { value: "ultra-luxury", label: "Ultra Luxury", icon: "⭐", desc: "Exclusive & lavish" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  variants={itemVariants}
                  className={optionButtonClasses(formData.budget === option.value)}
                  onClick={() => setFormData({ ...formData, budget: option.value })}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl mb-3">{option.icon}</span>
                    <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                    <p className="text-sm opacity-80">{option.desc}</p>
                </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Where would you like to stay?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Choose your preferred accommodation type
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { value: "hotel", label: "Hotel", icon: <FaHotel />, desc: "Traditional comfort" },
                { value: "hostel", label: "Hostel", icon: <FaBed />, desc: "Budget-friendly" },
                { value: "resort", label: "Resort", icon: <FaUmbrellaBeach />, desc: "All-inclusive luxury" },
                { value: "apartment", label: "Apartment", icon: <FaHome />, desc: "Home-like experience" },
                { value: "guesthouse", label: "Guesthouse", icon: <FaUser />, desc: "Local charm" },
                { value: "camping", label: "Camping", icon: <FaLeaf />, desc: "Nature adventure" }
              ].map((option) => (
              <motion.button
                  key={option.value}
                  variants={itemVariants}
                  className={optionButtonClasses(formData.accommodation === option.value)}
                  onClick={() => setFormData({ ...formData, accommodation: option.value })}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                    <p className="text-sm opacity-80">{option.desc}</p>
                  </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Who's coming along?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Select your travel group to personalize the experience
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { value: "solo", label: "Solo Travel", icon: <FaUser />, desc: "Just me" },
                { value: "couple", label: "Couple", icon: <FaHeart />, desc: "Romantic getaway" },
                { value: "family", label: "Family", icon: <FaUsers />, desc: "Family fun" },
                { value: "friends", label: "Friends", icon: <FaUserFriends />, desc: "Group adventure" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  variants={itemVariants}
                  className={optionButtonClasses(formData.travelers === option.value)}
                  onClick={() => setFormData({ ...formData, travelers: option.value })}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                    <p className="text-sm opacity-80">{option.desc}</p>
                  </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 6:
        return (
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-10"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Any dietary preferences?
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                Help us recommend the best dining options for you
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { value: "none", label: "No Restrictions", icon: "🍽️", desc: "I eat everything" },
                { value: "vegetarian", label: "Vegetarian", icon: "🥬", desc: "Plant-based diet" },
                { value: "vegan", label: "Vegan", icon: "🌱", desc: "Strictly plant-based" },
                { value: "halal", label: "Halal", icon: <FaMosque />, desc: "Halal certified" },
                { value: "gluten-free", label: "Gluten-Free", icon: "🌾", desc: "No gluten" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  variants={itemVariants}
                  className={optionButtonClasses(formData.dietaryPlan === option.value)}
                  onClick={() => setFormData({ ...formData, dietaryPlan: option.value })}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                    <p className="text-sm opacity-80">{option.desc}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  }, [currentStep, formData]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full">
        {/* Enhanced Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
      <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    step.icon
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
              >
                {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border-2 border-gray-200 hover:border-gray-300"
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
          >
            <FaChevronLeft className="text-xl" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              !isStepValid() || isLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            }`}
            whileHover={isStepValid() && !isLoading ? { scale: 1.02 } : {}}
            whileTap={isStepValid() && !isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin text-xl" />
                Generating...
              </>
            ) : currentStep === steps.length ? (
              <>
                Generate Itinerary
                <FaChevronRight className="text-xl" />
              </>
            ) : (
              <>
                Next
                <FaChevronRight className="text-xl" />
              </>
            )}
          </motion.button>
    </div>
      </div>
    </LazyMotion>
  );
};

export default MultiStepForm;
