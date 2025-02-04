'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormData, FormStep } from '@/types/itinerary';

const steps: FormStep[] = [
  {
    id: 1,
    title: "Where are you traveling? 🌎",
    description: "Enter your dream destination"
  },
  {
    id: 2,
    title: "When are you traveling? 📅",
    description: "Select your travel dates"
  },
  {
    id: 3,
    title: "What's your budget? 💰",
    description: "Choose your preferred budget range"
  },
  {
    id: 4,
    title: "Where would you like to stay? 🏨",
    description: "Select your accommodation preference"
  },
  {
    id: 5,
    title: "Who's traveling? 👥",
    description: "Tell us about your travel group"
  },
  {
    id: 6,
    title: "Any dietary preferences? 🍽️",
    description: "Select your dietary requirements"
  }
];

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function MultiStepForm({ onSubmit, isLoading }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: null,
    endDate: null,
    budget: '',
    accommodation: '',
    travelers: '',
    dietaryPlan: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
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
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="Enter destination"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm border border-white/20"
          />
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Start Date</label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date })}
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
            {['Budget', 'Mid-range', 'Luxury'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, budget: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.budget === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white'
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
            {['Hotel', 'Airbnb', 'Hostel', 'Resort'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, accommodation: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.accommodation === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white'
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
            {['Solo', 'Couple', 'Family', 'Group'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, travelers: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.travelers === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white'
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
            {['No Preference', 'Vegetarian', 'Vegan', 'Halal'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, dietaryPlan: option })}
                className={`w-full p-3 rounded-lg ${
                  formData.dietaryPlan === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white'
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
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20'
          } text-white backdrop-blur-sm transition-colors`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid() || isLoading}
          className={`px-4 py-2 rounded-lg ${
            !isStepValid() || isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white backdrop-blur-sm transition-colors`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : currentStep === steps.length ? (
            'Generate Itinerary'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
}
