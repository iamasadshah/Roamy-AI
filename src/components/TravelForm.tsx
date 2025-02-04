import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaPlane, FaUsers, FaHotel, FaUtensils, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';

interface TravelFormData {
  destination: string;
  duration: string;
  budget: number;
  interests: string[];
  travelStyle: string;
  accommodation: string;
  email: string;
  numberOfTravelers: number;
  dietaryPreferences: string;
}

export default function TravelForm({ onSubmit }: { onSubmit: (data: TravelFormData) => void }) {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    duration: '',
    budget: 1000,
    interests: [],
    travelStyle: '',
    accommodation: '',
    email: '',
    numberOfTravelers: 1,
    dietaryPreferences: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg
    border border-white/20
    bg-white/10 backdrop-blur-md
    text-white placeholder-white/60
    focus:ring-2 focus:ring-blue-400 focus:border-transparent
    transition-all duration-300
    hover:border-white/30
    outline-none rounded-lg
  `;
  
  const pickerClasses = `
    w-full px-4 py-3 rounded-lg
    border border-white/20
    bg-black/40 backdrop-blur-xl
    text-white placeholder-white/60
    focus:ring-2 focus:ring-blue-400 focus:border-transparent
    transition-all duration-300
    hover:border-white/30 hover:bg-black/50
    outline-none
    shadow-lg
    appearance-none
    bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]
    bg-[length:12px_12px]
    bg-[right_1rem_center]
    bg-no-repeat
    pr-12
  `;
  
  const labelClasses = "flex items-center gap-2 text-white/90 font-semibold mb-2 text-sm uppercase tracking-wide z-10";
  const iconClasses = "text-blue-400 text-lg";

  // const datePickerWrapperClasses = "relative z-50";  
  // const datePickerCustomClasses = `
  //   ${inputClasses}
  //   !bg-transparent
  //   cursor-pointer
  // `;

  const dietaryOptions = [
    'No Preference',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Kosher',
    'Pescatarian',
    'Dairy-Free'
  ];

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-datepicker-wrapper {
        width: 100%;
      }
      .react-datepicker-popper {
        z-index: 60 !important;  
      }
      .react-datepicker {
        font-family: inherit;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(16px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }
      .react-datepicker__header {
        background-color: rgba(0, 0, 0, 0.7);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 0.5rem;
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name,
      .react-datepicker__day {
        color: white;
      }
      .react-datepicker__day:hover {
        background-color: rgba(59, 130, 246, 0.5);
        border-radius: 0.3rem;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background-color: rgb(59, 130, 246);
        border-radius: 0.3rem;
      }
      .react-datepicker__day--disabled {
        color: rgba(255, 255, 255, 0.3);
      }
      .react-datepicker__triangle {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-datepicker {
        font-family: inherit;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
      }
      .react-datepicker__header {
        background-color: rgba(0, 0, 0, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name,
      .react-datepicker__day {
        color: white;
      }
      .react-datepicker__day:hover {
        background-color: rgba(59, 130, 246, 0.5);
      }
      .react-datepicker__day--selected {
        background-color: rgb(59, 130, 246);
      }
      .react-datepicker__day--disabled {
        color: rgba(255, 255, 255, 0.3);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-8 bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-full"
        >
          <label className={labelClasses}>
            <FaPlane className={iconClasses} />
            Destination
          </label>
          <input
            type="text"
            className={inputClasses}
            placeholder="Where would you like to go?"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            <FaCalendar className={iconClasses} />
            Trip Duration
          </label>
          <input
            type="text"
            className={inputClasses}
            placeholder="e.g., 7 days"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            <FaMoneyBillWave className={iconClasses} />
            Budget Range
          </label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg appearance-none cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:h-5 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white 
                  [&::-webkit-slider-thumb]:shadow-lg 
                  [&::-webkit-slider-thumb]:shadow-blue-500/30
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-blue-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:scale-110"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                required
              />
              <input
                type="number"
                min="500"
                max="10000"
                step="100"
                className="w-32 px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={formData.budget}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 500 && value <= 10000) {
                    setFormData({ ...formData, budget: value });
                  }
                }}
                required
              />
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>{formatBudget(500)}</span>
              <span>{formatBudget(10000)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            Interests
          </label>
          <input
            type="text"
            className={inputClasses}
            placeholder="Enter your interests"
            value={formData.interests.join(', ')}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })}
            required
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            Travel Style
          </label>
          <select
            className={pickerClasses}
            value={formData.travelStyle}
            onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
            required
          >
            <option value="">Select style</option>
            <option value="relaxing">Relaxing</option>
            <option value="adventurous">Adventurous</option>
            <option value="cultural">Cultural</option>
            <option value="foodie">Foodie</option>
          </select>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            <FaHotel className={iconClasses} />
            Accommodation Preference
          </label>
          <select
            className={pickerClasses}
            value={formData.accommodation}
            onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
            required
          >
            <option value="">Select preference</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
            <option value="resort">Resort</option>
          </select>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            <FaUsers className={iconClasses} />
            Number of Travelers
          </label>
          <input
            type="number"
            className={inputClasses}
            placeholder="e.g., 2"
            value={formData.numberOfTravelers}
            onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) })}
            required
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className={labelClasses}>
            <FaUtensils className={iconClasses} />
            Dietary Preferences
          </label>
          <select
            className={`${inputClasses} appearance-none bg-black/40`}
            value={formData.dietaryPreferences}
            onChange={(e) => setFormData({ ...formData, dietaryPreferences: e.target.value })}
            required
          >
            <option value="" disabled>Select your dietary preference</option>
            {dietaryOptions.map((option) => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="col-span-full">
          <label className={labelClasses}>
            <FaEnvelope className={iconClasses} />
            Email Address
          </label>
          <input
            type="email"
            className={inputClasses}
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold mt-8 hover:bg-blue-600 transition-colors duration-300 text-lg shadow-lg shadow-blue-500/30"
        type="submit"
      >
        Plan My Dream Trip
      </motion.button>
    </motion.form>
  );
}
