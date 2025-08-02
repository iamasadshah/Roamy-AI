"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendar,
  FaPlane,
  FaUsers,
  FaHotel,
  FaUtensils,
  FaEnvelope,
  FaMoneyBillWave,
  FaChevronDown,
  FaGlobeAmericas,
  FaRoute,
  FaStar,
  FaUserTie,
  FaHeart,
  FaUtensilSpoon,
  FaMapMarkerAlt
} from "react-icons/fa";

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
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
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
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
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
  "Syria",
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

const DestinationInput = ({
  value,
  onChange,
  inputClasses,
  labelClasses,
  iconClasses,
}: {
  value: string;
  onChange: (value: string) => void;
  inputClasses: string;
  labelClasses: string;
  iconClasses: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    const search = (searchTerm || value).toLowerCase();
    return countries
      .filter((country) => country.toLowerCase().includes(search))
      .slice(0, 10); // Limit to 10 results for better performance
  }, [searchTerm, value]);

  return (
    <div className="relative">
      <label className={labelClasses}>
        <FaPlane className={iconClasses} />
        Destination
      </label>
      <div className="relative">
        <input
          type="text"
          className={`${inputClasses} pr-12`}
          placeholder="Select a country"
          value={value || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          required
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border border-white/20 bg-black/90 backdrop-blur-xl shadow-xl"
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                    onClick={() => {
                      onChange(country);
                      setSearchTerm("");
                      setIsOpen(false);
                    }}
                  >
                    {country}
                  </button>
                ))
              ) : (
                <div className="p-4 text-white/60 text-center">
                  No countries found
                </div>
              )}
            </motion.div>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TravelForm({
  onSubmit,
}: {
  onSubmit: (data: TravelFormData) => void;
}) {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: "",
    duration: "",
    budget: 1000,
    interests: [],
    travelStyle: "",
    accommodation: "",
    email: "",
    numberOfTravelers: 1,
    dietaryPreferences: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

    // Form input styles
  const inputClasses = `
    w-full px-5 py-3.5 rounded-xl
    border border-gray-200
    bg-white/95 text-gray-800 placeholder-gray-400
    focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:ring-opacity-50
    transition-all duration-200
    hover:border-blue-200
    outline-none
    shadow-sm
    font-medium
  `;

  const pickerClasses = `
    ${inputClasses}
    appearance-none
    bg-white/95
    bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234b5563%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]
    bg-[length:12px_12px]
    bg-[right_1.25rem_center]
    bg-no-repeat
    pr-12
    cursor-pointer
  `;

  const labelClasses = "flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm tracking-wide z-10";
  const iconClasses = "text-blue-500 text-base";
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const dietaryOptions = [
    "No Preference",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Pescatarian",
    "Keto",
    "Paleo",
  ];
  
  // Add missing icon imports
  const FaUmbrellaBeach = FaMapMarkerAlt;
  const FaHome = FaHotel;

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const style = document.createElement("style");
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
    const style = document.createElement("style");
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      onSubmit={handleSubmit}
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Plan Your Perfect Trip</h2>
        <p className="text-gray-500">Fill in the details below to get a personalized travel itinerary</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants}
          className="col-span-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-200"></div>
          <div className="relative bg-white rounded-xl p-1">
            <DestinationInput
              value={formData.destination}
              onChange={(value) =>
                setFormData({ ...formData, destination: value })
              }
              inputClasses={inputClasses}
              labelClasses={labelClasses}
              iconClasses={iconClasses}
            />
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaCalendar className={iconClasses} />
            Trip Duration
          </label>
          <div className="relative">
            <input
              type="text"
              className={inputClasses}
              placeholder="e.g., 7 days"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <FaCalendar className="text-gray-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group col-span-full"
        >
          <label className={labelClasses}>
            <FaMoneyBillWave className={iconClasses} />
            Budget Range: {formatBudget(formData.budget)}
          </label>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                className="flex-1 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full appearance-none cursor-pointer 
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Budget</span>
              <span>Luxury</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaHeart className={iconClasses} />
            Interests
          </label>
          <div className="relative">
            <input
              type="text"
              className={inputClasses}
              placeholder="e.g., Hiking, Museums, Food"
              value={formData.interests.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interests: e.target.value.split(", ").map(i => i.trim()).filter(Boolean),
                })
              }
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <FaHeart className="text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Separate interests with commas</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaRoute className={iconClasses} />
            Travel Style
          </label>
          <div className="relative">
            <select
              className={pickerClasses}
              value={formData.travelStyle}
              onChange={(e) =>
                setFormData({ ...formData, travelStyle: e.target.value })
              }
              required
            >
              <option value="">Select travel style</option>
              <option value="relaxing" className="flex items-center gap-2">
                <FaStar className="inline mr-2 text-yellow-400" /> Relaxing
              </option>
              <option value="adventurous" className="flex items-center gap-2">
                <FaRoute className="inline mr-2 text-green-500" /> Adventurous
              </option>
              <option value="cultural" className="flex items-center gap-2">
                <FaGlobeAmericas className="inline mr-2 text-blue-500" /> Cultural
              </option>
              <option value="foodie" className="flex items-center gap-2">
                <FaUtensilSpoon className="inline mr-2 text-red-400" /> Foodie
              </option>
              <option value="luxury" className="flex items-center gap-2">
                <FaUserTie className="inline mr-2 text-purple-500" /> Luxury
              </option>
            </select>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaHotel className={iconClasses} />
            Accommodation
          </label>
          <div className="relative">
            <select
              className={pickerClasses}
              value={formData.accommodation}
              onChange={(e) =>
                setFormData({ ...formData, accommodation: e.target.value })
              }
              required
            >
              <option value="">Select accommodation type</option>
              <option value="hotel" className="flex items-center gap-2">
                <FaHotel className="inline mr-2 text-blue-400" /> Hotel
              </option>
              <option value="hostel" className="flex items-center gap-2">
                <FaUsers className="inline mr-2 text-green-400" /> Hostel
              </option>
              <option value="apartment" className="flex items-center gap-2">
                <FaMapMarkerAlt className="inline mr-2 text-orange-400" /> Apartment
              </option>
              <option value="resort" className="flex items-center gap-2">
                <FaUmbrellaBeach className="inline mr-2 text-teal-400" /> Resort
              </option>
              <option value="villa" className="flex items-center gap-2">
                <FaHome className="inline mr-2 text-purple-400" /> Villa
              </option>
            </select>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaUsers className={iconClasses} />
            Travelers
          </label>
          <div className="relative">
            <select
              className={pickerClasses}
              value={formData.numberOfTravelers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfTravelers: parseInt(e.target.value),
                })
              }
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative group"
        >
          <label className={labelClasses}>
            <FaUtensils className={iconClasses} />
            Dietary Preferences
          </label>
          <div className="relative">
            <select
              className={pickerClasses}
              value={formData.dietaryPreferences}
              onChange={(e) =>
                setFormData({ ...formData, dietaryPreferences: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select your dietary preference
              </option>
              {dietaryOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="text-gray-700"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="col-span-full relative group"
        >
          <label className={labelClasses}>
            <FaEnvelope className={iconClasses} />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              className={inputClasses}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">We'll send your itinerary to this email</p>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-8"
      >
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-lg shadow-lg group"
          type="submit"
        >
          <span className="flex items-center justify-center gap-2">
            Plan My Dream Trip
            <FaPlane className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.button>
        <p className="text-center text-sm text-gray-500 mt-3">
          Get your personalized itinerary in seconds
        </p>
      </motion.div>
    </motion.form>
  );
}
