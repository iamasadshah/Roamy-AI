"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
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
  FaMosque,
  FaSearch,
  FaChevronDown,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { Loader2, Calendar } from "lucide-react";

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
          className="w-full p-6 rounded-3xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-16 text-xl font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
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
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaChevronDown
            className={`transform transition-transform text-2xl ${
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
                className="w-full h-[600px] max-w-4xl bg-white border border-gray-200 rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
              >
                {/* Enhanced Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Select Your Destination
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Choose from our curated list of amazing destinations worldwide
                  </p>
                  <div className="relative">
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="text"
                      className="w-full pl-14 pr-5 py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all text-lg font-medium shadow-lg"
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
                          className="flex items-center p-6 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 border-2 border-transparent rounded-2xl transition-all group shadow-sm hover:shadow-lg"
                          onClick={() => handleSelect(country)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaGlobe className="text-blue-500 mr-4 text-xl" />
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

// Enhanced Date Picker Component
const EnhancedDatePicker = ({ 
  selected, 
  onChange, 
  placeholder, 
  minDate, 
  maxDate,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  label
}: {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="space-y-4"
    >
      <label className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-sm">
          <Calendar className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-gray-800">{label}</span>
      </label>
      
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={(date) => {
            onChange(date);
            setIsOpen(false);
          }}
          selectsStart={selectsStart}
          selectsEnd={selectsEnd}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          open={isOpen}
          onInputClick={() => setIsOpen(true)}
          onClickOutside={() => setIsOpen(false)}
          className="w-full p-6 border-3 border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 text-xl font-semibold shadow-lg hover:shadow-xl bg-white cursor-pointer text-gray-800"
          placeholderText={placeholder}
          dateFormat="MMMM d, yyyy"
          calendarClassName="!rounded-3xl !shadow-2xl !border !border-gray-200 !bg-white !p-6"
          dayClassName={(date) => {
            if (startDate && endDate && date >= startDate && date <= endDate) {
              return "!bg-gradient-to-br !from-blue-500 !to-indigo-600 !text-white !rounded-full !border-blue-500 !shadow-lg";
            }
            if (date.getTime() === selected?.getTime()) {
              return "!bg-gradient-to-br !from-indigo-600 !to-purple-600 !text-white !rounded-full !border-indigo-600 !shadow-lg";
            }
            return "";
          }}
          popperClassName="!z-50"
          popperPlacement="bottom-start"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className="h-7 w-7 text-blue-500" />
        </div>
      </div>
    </motion.div>
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
        return formData.dietaryPlan !== "";
      default:
        return false;
    }
  }, [currentStep, formData]);

  const optionButtonClasses = useCallback((isSelected: boolean) => {
    return `relative p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 text-center group ${
      isSelected
        ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl scale-105"
        : "bg-white/90 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:shadow-lg"
    }`;
  }, []);

  const renderStepContent = useCallback((): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Where would you like to go?
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Tell us your dream destination and we&apos;ll create the perfect itinerary for you
              </p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={itemVariants}>
                <DestinationInput
                  value={formData.destination}
                  onChange={(value) => setFormData({ ...formData, destination: value })}
                />
              </motion.div>
            </motion.div>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  When are you planning to travel?
                </h3>
              </div>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Select your arrival and departure dates to create the perfect itinerary for your trip
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <EnhancedDatePicker
                selected={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date })}
                placeholder="📅 Click to select your arrival date"
                minDate={new Date()}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                label="Start Date"
              />
              
              <EnhancedDatePicker
                selected={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                placeholder="📅 Click to select your departure date"
                minDate={formData.startDate || new Date()}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                label="End Date"
              />
            </motion.div>

            {/* Date Range Display */}
            {formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border-2 border-blue-200 shadow-lg"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800">Your Travel Dates</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200">
                      <div className="text-sm font-semibold text-blue-600 mb-1">Arrival</div>
                      <div className="text-lg font-bold text-gray-800">
                        {formData.startDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200">
                      <div className="text-sm font-semibold text-blue-600 mb-1">Departure</div>
                      <div className="text-lg font-bold text-gray-800">
                        {formData.endDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-4 shadow-lg">
                    <div className="text-sm font-semibold mb-1">Total Trip Duration</div>
                    <div className="text-2xl font-bold">
                      {Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                What&apos;s your budget range?
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Choose your spending range to get the best recommendations tailored to your budget
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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
                    <span className="text-3xl sm:text-4xl mb-3 sm:mb-4">{option.icon}</span>
                    <h4 className="font-bold text-xl sm:text-2xl mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80 mb-2 sm:mb-3">{option.desc}</p>
                    <div className="text-xs sm:text-sm font-semibold opacity-90">{option.price}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      case 4:
        return (
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Where would you like to stay?
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Choose your preferred accommodation type for the perfect stay
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{option.icon}</div>
                    <h4 className="font-bold text-xl sm:text-2xl mb-2">{option.label}</h4>
                    <p className="text-xs sm:text-sm opacity-80">{option.desc}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Who&apos;s coming along?
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Select your travel group to personalize the experience for everyone
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
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <h4 className="font-bold text-2xl mb-2">{option.label}</h4>
                    <p className="text-sm opacity-80">{option.desc}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      case 6:
        return (
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Any dietary preferences?
              </h3>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                Help us recommend the best dining options that match your preferences
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
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <h4 className="font-bold text-2xl mb-2">{option.label}</h4>
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
  }, [currentStep, formData, optionButtonClasses]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full">
        {/* Enhanced Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-between max-w-6xl mx-auto px-4">
            {/* Desktop Progress Steps */}
            <div className="hidden md:flex items-center w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <FaCheck className="text-lg" />
                    ) : (
                      <div className="text-xl">{step.icon}</div>
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-6 transition-all duration-300 rounded-full ${
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
            <div className="md:hidden flex items-center justify-center w-full">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= 1
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > 1 ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <div className="text-lg">{steps[0].icon}</div>
                  )}
                </motion.div>
                <div className="text-sm font-semibold text-gray-600">
                  Step {currentStep} of {steps.length}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= steps.length
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep >= steps.length ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <div className="text-lg">{steps[steps.length - 1].icon}</div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 max-w-6xl mx-auto px-4">
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-3xl font-bold text-lg sm:text-xl transition-all duration-300 w-full sm:w-auto justify-center ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
          >
            <FaChevronLeft className="text-xl sm:text-2xl" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className={`flex items-center gap-3 px-10 py-4 sm:px-12 sm:py-5 rounded-3xl font-bold text-lg sm:text-xl transition-all duration-300 w-full sm:w-auto justify-center ${
              !isStepValid() || isLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl"
            }`}
            whileHover={isStepValid() && !isLoading ? { scale: 1.02 } : {}}
            whileTap={isStepValid() && !isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin text-xl sm:text-2xl" />
                Generating...
              </>
            ) : currentStep === steps.length ? (
              <>
                Generate Itinerary
                <FaChevronRight className="text-xl sm:text-2xl" />
              </>
            ) : (
              <>
                Next
                <FaChevronRight className="text-xl sm:text-2xl" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </LazyMotion>
  );
};

export default MultiStepForm;
