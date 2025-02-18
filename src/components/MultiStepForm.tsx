"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormData, FormStep } from "@/types/itinerary";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const steps: FormStep[] = [
  {
    id: 1,
    title: "Where are you traveling? 🌎",
    description: "Enter your dream destination",
  },
  {
    id: 2,
    title: "When are you traveling? 📅",
    description: "Select your travel dates",
  },
  {
    id: 3,
    title: "What's your budget? 💰",
    description: "Choose your preferred budget range",
  },
  {
    id: 4,
    title: "Where would you like to stay? 🏨",
    description: "Select your accommodation preference",
  },
  {
    id: 5,
    title: "Who's traveling? 👥",
    description: "Tell us about your travel group",
  },
  {
    id: 6,
    title: "Any dietary preferences? 🍽️",
    description: "Select your dietary requirements",
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit(formData);
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
              <label className="block text-sm mb-2">Start Date</label>
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
              <label className="block text-sm mb-2">End Date</label>
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

  return (
    <div className="max-w-md w-full mx-auto bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-white">
            {steps[currentStep - 1].title}
          </h2>
          <span className="text-sm text-gray-400">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <p className="text-gray-400">{steps[currentStep - 1].description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          } text-white backdrop-blur-sm transition-colors`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid() || isLoading}
          className={`px-4 py-2 rounded-lg ${
            !isStepValid() || isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white backdrop-blur-sm transition-colors`}
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
            "Generate Itinerary"
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
}
