"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormData } from "@/types/itinerary";
import { 
  FaChevronDown, 
  FaSearch, 
  FaChevronRight, 
  FaChevronLeft, 
  FaCalendarAlt, 
  FaWallet, 
  FaHotel, 
  FaUsers, 
  FaUtensils,
  FaPlane,
  FaCheck
} from "react-icons/fa";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const steps: FormStep[] = [
  {
    id: 1,
    title: "Destination",
    description: "Where would you like to go?",
    icon: <FaPlane className="text-blue-500" />
  },
  {
    id: 2,
    title: "Travel Dates",
    description: "When are you planning to travel?",
    icon: <FaCalendarAlt className="text-blue-500" />
  },
  {
    id: 3,
    title: "Budget",
    description: "What's your spending range?",
    icon: <FaWallet className="text-blue-500" />
  },
  {
    id: 4,
    title: "Accommodation",
    description: "Where would you like to stay?",
    icon: <FaHotel className="text-blue-500" />
  },
  {
    id: 5,
    title: "Travelers",
    description: "Who's coming along?",
    icon: <FaUsers className="text-blue-500" />
  },
  {
    id: 6,
    title: "Dietary Preferences",
    description: "Any food restrictions?",
    icon: <FaUtensils className="text-blue-500" />
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

interface FormStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

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
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm border border-white/20 pr-10"
          placeholder="Search country..."
          value={value || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaChevronDown
            className={`transform transition-transform ${
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
                className="w-full h-[300px] max-w-lg bg-gradient-to-b from-navy/95 to-slate-900/95 border border-white/10 rounded-2xl shadow-2xl max-h-[80vh] flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Select Destination
                  </h3>
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all"
                      placeholder="Type to search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Countries List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <motion.button
                          key={country}
                          className="flex items-center p-4 text-left text-white hover:bg-white/10 rounded-xl transition-all group"
                          onClick={() => {
                            onChange(country);
                            setSearchTerm("");
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex-1 truncate">{country}</span>
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

export default function MultiStepForm({ onSubmit, isLoading }: Props) {
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

  const handleNext = async () => {
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.destination.length > 0;
      case 2:
        return formData.startDate && formData.endDate;
      case 3:
        return formData.budget.length > 0;
      case 4:
        return formData.accommodation.length > 0;
      case 5:
        return formData.travelers.length > 0;
      case 6:
        return formData.dietaryPlan.length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DestinationInput
            value={formData.destination}
            onChange={(value) =>
              setFormData({ ...formData, destination: value })
            }
          />
        );
      case 2:
        return (
          <div className=" py-16">
            <div>
              <label className="block text-sm mb-2 text-white">
                Start Date
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm border border-white/20"
                placeholderText="Select start date"
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-white">End Date</label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm border border-white/20"
                placeholderText="Select end date"
                minDate={formData.startDate || new Date()}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            {["Budget", "Mid-range", "Luxury"].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, budget: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.budget === option
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white"
                } backdrop-blur-sm border border-white/20 transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            {["Hotel", "Airbnb", "Hostel", "Resort"].map((option) => (
              <button
                key={option}
                onClick={() =>
                  setFormData({ ...formData, accommodation: option })
                }
                className={`w-full p-3 rounded-lg ${
                  formData.accommodation === option
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white"
                } backdrop-blur-sm border border-white/20 transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="space-y-3">
            {["Solo", "Couple", "Family", "Group"].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, travelers: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.travelers === option
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white"
                } backdrop-blur-sm border border-white/20 transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="space-y-3">
            {["No Preference", "Vegetarian", "Vegan", "Halal"].map((option) => (
              <button
                key={option}
                onClick={() =>
                  setFormData({ ...formData, dietaryPlan: option })
                }
                className={`w-full p-3 rounded-lg ${
                  formData.dietaryPlan === option
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white"
                } backdrop-blur-sm border border-white/20 transition-colors`}
              >
                {option}
              </button>
            ))}
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
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 w-full">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="p-6 md:p-8">
        {/* Step indicator */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.id
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.id
                    ? 'border-blue-500 bg-white text-blue-500'
                    : 'border-gray-200 bg-white text-gray-400'
                } font-medium text-sm relative z-10 transition-colors`}
                variants={itemVariants}
              >
                {currentStep > step.id ? <FaCheck className="h-4 w-4" /> : step.id}
              </motion.div>
              <span 
                className={`text-xs mt-2 font-medium ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-full w-16 h-0.5 bg-gray-200 -ml-8">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: currentStep > step.id ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Step content */}
        <div className="mb-8">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-50 rounded-2xl text-blue-500">
              {steps[currentStep - 1].icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-500">
              {steps[currentStep - 1].description}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, position: 'absolute' }}
              animate={{ opacity: 1, x: 0, position: 'relative' }}
              exit={{ opacity: 0, x: -20, position: 'absolute' }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3 
              }}
              className="w-full"
            >
              <div className="min-h-[300px] flex items-center justify-center">
                {renderStepContent()}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
        
        <motion.div 
          className="mt-8 flex justify-between border-t border-gray-100 pt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-5 py-2.5 rounded-xl font-medium ${
              currentStep === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-50"
            } transition-colors`}
            variants={itemVariants}
            whileHover={{ scale: currentStep === 1 ? 1 : 1.03 }}
            whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
          >
            <FaChevronLeft className="mr-2" />
            Back
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className={`flex items-center px-6 py-2.5 rounded-xl font-medium text-white ${
              !isStepValid() || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/20"
            } transition-all`}
            variants={itemVariants}
            whileHover={!isStepValid() || isLoading ? {} : { scale: 1.03, boxShadow: '0 5px 15px -3px rgba(59, 130, 246, 0.3)' }}
            whileTap={!isStepValid() || isLoading ? {} : { scale: 0.98 }}
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
                Generating...
              </span>
            ) : currentStep === steps.length ? (
              <span className="flex items-center">
                Generate Itinerary
                <FaPlane className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </span>
            ) : (
              <span className="flex items-center">
                Next
                <FaChevronRight className="ml-2" />
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
