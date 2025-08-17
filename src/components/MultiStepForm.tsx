"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import {
  FaGlobe, 
  FaClock, 
  FaWallet,
  FaHotel,
  FaUsers,
  FaUtensils,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaBed,
  FaUmbrellaBeach,
  FaHome,
  FaUser,
  FaUserFriends,
  FaLeaf,
  FaHeart,
  FaMosque,
  FaCheck
} from "react-icons/fa";
import { Loader2 } from "lucide-react";
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
  startDate: string;
  endDate: string;
  budget: string;
  accommodation: string;
  travelers: string;
  dietaryPlan: string;
}

// Enhanced animation variants for smoother transitions
const stepVariants = {
  initial: { opacity: 0, x: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -30, 
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
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
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
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
    icon: <FaUsers className="text-pink-600 text-xl" />,
  },
  {
    id: 6,
    title: "Dietary Preferences",
    description: "Any food restrictions?",
    icon: <FaUtensils className="text-orange-600 text-xl" />,
  },
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
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
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
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

// Enhanced Destination Input with better UX
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
          className="w-full p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-12 sm:pr-16 text-base sm:text-lg lg:text-xl font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          placeholder="Search for your dream destination..."
          value={value || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button
          type="button"
          className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaChevronDown
            className={`transform transition-transform text-lg sm:text-xl lg:text-2xl ${
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
                className="w-full h-[500px] sm:h-[600px] max-w-4xl bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
              >
                {/* Enhanced Header */}
                <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl sm:rounded-t-3xl">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
                    Select Your Destination
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg">
                    Choose from our curated list of amazing destinations worldwide
                  </p>
                  <div className="relative">
                    <FaSearch className="absolute left-3 sm:left-4 lg:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                    <input
                      type="text"
                      className="w-full pl-10 sm:pl-12 lg:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 lg:py-5 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all text-sm sm:text-base lg:text-lg font-medium shadow-lg"
                      placeholder="Type to search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Enhanced Countries List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country: string) => (
                        <motion.button
                          key={country}
                          className="flex items-center p-3 sm:p-4 lg:p-6 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 border-2 border-transparent rounded-xl sm:rounded-2xl transition-all group shadow-sm hover:shadow-lg"
                          onClick={() => handleSelect(country)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaGlobe className="text-blue-500 mr-3 sm:mr-4 text-lg sm:text-xl" />
                          <span className="flex-1 truncate font-semibold text-sm sm:text-base lg:text-lg">{country}</span>
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-lg sm:text-xl"
                          >
                            →
                          </motion.span>
                        </motion.button>
                      ))
                    ) : (
                      <div className="col-span-2 p-8 sm:p-12 text-center text-gray-500 text-base sm:text-lg">
                        <FaSearch className="mx-auto mb-3 sm:mb-4 text-3xl sm:text-4xl text-gray-300" />
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

// Remove the entire EnhancedDatePicker component
const MultiStepForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    accommodation: "",
    travelers: "",
    dietaryPlan: "",
  });
  const [dateErrors, setDateErrors] = useState<{ startDate?: string; endDate?: string }>({});
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Date validation functions
  const validateStartDate = (date: string): string | undefined => {
    if (!date) return undefined;
    
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return "Please select a start date from today or in the future";
    }
    return undefined;
  };

  const validateEndDate = (startDate: string, endDate: string): string | undefined => {
    if (!startDate || !endDate) return undefined;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (end < today) {
      return "Please select an end date from today or in the future";
    }
    
    if (end <= start) {
      return "End date must be after start date";
    }
    
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 10) {
      return "Travel planning is limited to 10 days maximum";
    }
    
    return undefined;
  };

  const handleStartDateChange = (date: string) => {
    const error = validateStartDate(date);
    setDateErrors(prev => ({ ...prev, startDate: error }));
    
    // Clear end date if start date becomes invalid
    if (error && formData.endDate) {
      setFormData(prev => ({ ...prev, endDate: "" }));
      setDateErrors(prev => ({ ...prev, endDate: undefined }));
    }
    
    setFormData(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date: string) => {
    const error = validateEndDate(formData.startDate, date);
    setDateErrors(prev => ({ ...prev, endDate: error }));
    setFormData(prev => ({ ...prev, endDate: date }));
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayString = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum allowed end date (start date + 10 days)
  const getMaxEndDate = (): string => {
    if (!formData.startDate) return "";
    const start = new Date(formData.startDate);
    const maxEnd = new Date(start);
    maxEnd.setDate(start.getDate() + 10);
    return maxEnd.toISOString().split('T')[0];
  };

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
                      Please sign in to save your trip.
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
          }
        );
        return;
      }

      onSubmit(formData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData, onSubmit, router, supabase.auth]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const canProceedToNextStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return formData.destination.trim() !== "";
      case 2:
        return formData.startDate !== "" && 
               formData.endDate !== "" && 
               !dateErrors.startDate && 
               !dateErrors.endDate;
      case 3:
        return formData.budget !== "";
      case 4:
        return formData.accommodation !== "";
      case 5:
        return formData.travelers !== "";
      case 6:
        return formData.dietaryPlan !== "";
      default:
        return false;
    }
  }, [formData, dateErrors]);

  const optionButtonClasses = useCallback((isSelected: boolean) => {
    return `relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 text-center group ${
        isSelected
        ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl scale-105"
        : "bg-white/90 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:shadow-lg"
    }`;
  }, []);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Where do you want to go?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
                Tell us your dream destination and we&apos;ll create the perfect itinerary for you.
              </p>
            <DestinationInput
              value={formData.destination}
                onChange={(value) => setFormData({ ...formData, destination: value })}
            />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                When are you planning to travel?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
                Select your travel dates to help us plan the perfect trip timing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                    Arrival Date
              </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full p-4 sm:p-5 lg:p-6 border-2 border-gray-300 rounded-2xl text-base sm:text-lg lg:text-xl font-medium text-gray-900 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-500"
                    placeholder="Select arrival date"
                    min={getTodayString()}
                  />
                  {dateErrors.startDate && (
                    <p className="text-red-500 text-sm mt-2">{dateErrors.startDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                    Departure Date
              </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-full p-4 sm:p-5 lg:p-6 border-2 border-gray-300 rounded-2xl text-base sm:text-lg lg:text-xl font-medium text-gray-900 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-500"
                    placeholder="Select departure date"
                    min={formData.startDate || getTodayString()}
                    max={getMaxEndDate()}
                  />
                  {dateErrors.endDate && (
                    <p className="text-red-500 text-sm mt-2">{dateErrors.endDate}</p>
                  )}
                </div>
              </div>

              {/* Helpful hint about travel duration */}
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-2 text-blue-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">
                    Travel planning is limited to 10 days maximum for optimal itinerary quality.
                  </span>
                </div>
              </div>

              {formData.startDate && formData.endDate && (
                <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-blue-900">
                        {new Date(formData.startDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-900">
                        {new Date(formData.endDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm sm:text-base text-gray-600">
                        {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                      <span className="text-xs text-gray-500">
                        (max 10 days)
                      </span>
                    </div>
                    {/* Progress bar showing days used vs limit */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min(100, (Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) / 10) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 sm:mb-8 lg:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                What&apos;s your budget range?
              </h3>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Choose your spending range to get the best recommendations tailored to your budget
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { value: "budget", label: "Budget", icon: "💰", desc: "Affordable options", price: "$50-150/day" },
                { value: "moderate", label: "Moderate", icon: "💳", desc: "Balanced comfort", price: "$150-300/day" },
                { value: "luxury", label: "Luxury", icon: "👑", desc: "Premium experience", price: "$300-600/day" },
                { value: "ultra-luxury", label: "Ultra Luxury", icon: "⭐", desc: "Exclusive & lavish", price: "$600+/day" }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  variants={itemVariants}
                  className={optionButtonClasses(formData.budget === option.value)}
                  onClick={() => setFormData({ ...formData, budget: option.value })}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{option.icon}</span>
                    <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80 mb-1 sm:mb-2 lg:mb-3">{option.desc}</p>
                    <div className="text-xs sm:text-sm font-semibold opacity-90">{option.price}</div>
                </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 sm:mb-8 lg:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                Where would you like to stay?
              </h3>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Choose your preferred accommodation type for the perfect stay
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
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
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{option.icon}</div>
                    <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80">{option.desc}</p>
                  </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 sm:mb-8 lg:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                Who&apos;s coming along?
              </h3>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Select your travel group to personalize the experience for everyone
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{option.icon}</div>
                    <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80">{option.desc}</p>
                  </div>
              </motion.button>
            ))}
            </motion.div>
          </div>
        );
      case 6:
        return (
          <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 sm:mb-8 lg:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
                Any dietary preferences?
              </h3>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Help us recommend the best dining options that match your preferences
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{option.icon}</div>
                    <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80">{option.desc}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full min-h-screen flex flex-col">
        {/* Enhanced Progress Steps - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 lg:mb-16 px-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Desktop Progress Steps */}
            <div className="hidden lg:flex items-center w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
      <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <FaCheck className="text-sm lg:text-lg" />
                    ) : (
                      <div className="text-lg lg:text-xl">{step.icon}</div>
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-3 lg:mx-6 transition-all duration-300 rounded-full ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
        </div>

            {/* Mobile Progress Steps */}
            <div className="lg:hidden flex items-center justify-center w-full">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= 1
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > 1 ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <div className="text-base sm:text-lg">{steps[0].icon}</div>
                  )}
                </motion.div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">
                  Step {currentStep} of {steps.length}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= steps.length
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep >= steps.length ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <div className="text-base sm:text-lg">{steps[steps.length - 1].icon}</div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content - Full Height Container */}
        <div className="flex-1 flex items-center justify-center px-4 pb-6 sm:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-6xl mx-auto"
            >
              {renderStepContent(currentStep)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Buttons - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 lg:mt-16 max-w-6xl mx-auto px-4">
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto justify-center ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
          >
            <FaChevronLeft className="text-lg sm:text-xl lg:text-2xl" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!canProceedToNextStep(currentStep) || isLoading}
            className={`flex items-center gap-2 sm:gap-3 px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 w-full sm:w-auto justify-center ${
              !canProceedToNextStep(currentStep) || isLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl"
            }`}
            whileHover={canProceedToNextStep(currentStep) && !isLoading ? { scale: 1.02 } : {}}
            whileTap={canProceedToNextStep(currentStep) && !isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin text-lg sm:text-xl lg:text-2xl" />
                Generating...
              </>
            ) : currentStep === steps.length ? (
              <>
                Generate Itinerary
                <FaChevronRight className="text-lg sm:text-xl lg:text-2xl" />
              </>
            ) : (
              <>
                Next
                <FaChevronRight className="text-lg sm:text-xl lg:text-2xl" />
              </>
            )}
          </motion.button>
    </div>
      </div>
    </LazyMotion>
  );
};

export default MultiStepForm;
