"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Info, 
  Star, 
  Calendar, 
  Users, 
  Bed, 
  Utensils,
  Sun,
  Moon,
  Coffee,
  Heart,
  BookOpen,
  Globe,
  Phone,
  AlertTriangle,
  Lightbulb,
  Languages,
  TrendingUp,
  Shield,
  Car
} from "lucide-react";
import { TravelItinerary, Activity, Meal, DayItinerary } from "@/types/itinerary";

// Performance optimized animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
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
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}



interface Props {
  itinerary: TravelItinerary;
}

const StructuredItinerary: React.FC<Props> = ({ itinerary }) => {
  if (!itinerary || !itinerary.itinerary || itinerary.itinerary.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="flex flex-col items-center gap-4">
          <BookOpen className="h-16 w-16 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-600">No itinerary data available</h3>
          <p className="text-gray-500">Please generate a new itinerary to see detailed information.</p>
      </div>
      </motion.div>
    );
  }

  const renderActivity = (activity: Activity, index: number) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold text-gray-800">{activity.title}</h4>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              {activity.time}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3 leading-relaxed">{activity.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-medium">{activity.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="font-medium">{activity.duration}</span>
            </div>
            {activity.cost && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{activity.cost}</span>
              </div>
            )}
          </div>

          {activity.special_features && activity.special_features.length > 0 && (
            <div className="mb-3">
              <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Special Features
              </h5>
              <div className="flex flex-wrap gap-2">
                {activity.special_features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
          </div>
          )}

          {activity.tips && (
            <div className="mb-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-400">
              <h5 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Pro Tip
              </h5>
              <p className="text-sm text-blue-700">{activity.tips}</p>
          </div>
          )}

          {activity.booking_info && (
            <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
              <h5 className="text-sm font-semibold text-orange-800 mb-1 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Booking Information
              </h5>
              <p className="text-sm text-orange-700">{activity.booking_info}</p>
          </div>
          )}
          </div>
        </div>
    </motion.div>
  );

  const renderMeal = (meal: Meal, index: number) => (
              <motion.div
                key={index}
      variants={itemVariants}
      className="bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/30 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-red-200 rounded-xl flex items-center justify-center">
          <Utensils className="h-6 w-6 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold text-gray-800">{meal.restaurant_name}</h4>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
              {meal.time}
            </span>
            {meal.reservation_required && (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                Reservation Required
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-medium">{meal.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{meal.cost_range}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4 text-green-500" />
              <span className="font-medium">{meal.cuisine_type}</span>
            </div>
          </div>

          <div className="mb-3">
            <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Must-Try Dishes
            </h5>
            <div className="flex flex-wrap gap-2">
              {meal.must_try_dishes.map((dish, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  {dish}
                </span>
              ))}
            </div>
          </div>

          {meal.special_features && meal.special_features.length > 0 && (
            <div className="mb-3">
              <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Restaurant Highlights
              </h5>
              <div className="flex flex-wrap gap-2">
                {meal.special_features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {meal.tips && (
            <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
              <h5 className="text-sm font-semibold text-orange-800 mb-1 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Dining Tip
              </h5>
              <p className="text-sm text-orange-700">{meal.tips}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderDayItinerary = (day: DayItinerary, dayIndex: number) => (
    <motion.div
      key={dayIndex}
      variants={itemVariants}
      className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 overflow-hidden"
    >
      {/* Day Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Day {day.day}</h2>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <span className="font-semibold">{day.total_estimated_cost}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{day.day_title}</h3>
        <p className="text-blue-100 leading-relaxed">{day.day_description}</p>
        
        {day.highlights && day.highlights.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Day Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {day.highlights.map((highlight: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Day Content */}
      <div className="p-6 space-y-8">
        {/* Morning Activities */}
                  {day.morning && day.morning.length > 0 && (
                    <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg flex items-center justify-center">
                <Sun className="h-5 w-5 text-yellow-600" />
              </div>
              Morning Activities
                      </h4>
            <div className="space-y-4">
              {day.morning.map((activity: Activity, index: number) => renderActivity(activity, index))}
            </div>
                    </div>
                  )}

        {/* Afternoon Activities */}
                  {day.afternoon && day.afternoon.length > 0 && (
                    <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-200 rounded-lg flex items-center justify-center">
                <Sun className="h-5 w-5 text-orange-600" />
              </div>
              Afternoon Activities
                      </h4>
            <div className="space-y-4">
              {day.afternoon.map((activity: Activity, index: number) => renderActivity(activity, index))}
            </div>
                    </div>
                  )}

        {/* Evening Activities */}
                  {day.evening && day.evening.length > 0 && (
                    <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <Moon className="h-5 w-5 text-purple-600" />
              </div>
              Evening Activities
            </h4>
            <div className="space-y-4">
              {day.evening.map((activity: Activity, index: number) => renderActivity(activity, index))}
            </div>
          </div>
        )}

        {/* Meals */}
        {day.meals && day.meals.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center">
                <Coffee className="h-5 w-5 text-green-600" />
              </div>
              Dining Experiences
                      </h4>
            <div className="space-y-4">
              {day.meals.map((meal: Meal, index: number) => renderMeal(meal, index))}
            </div>
                    </div>
                  )}
                </div>
              </motion.div>
  );

  const renderInfoSection = (title: string, items: string[], icon: React.ReactNode, color: string) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
        <div className={`w-8 h-8 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-lg flex items-center justify-center`}>
          {icon}
              </div>
        {title}
                    </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-600">
            <div className={`w-2 h-2 bg-${color}-500 rounded-full mt-2 flex-shrink-0`}></div>
            <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
    </motion.div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-8"
      >
        {/* Trip Overview */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Globe className="h-8 w-8 text-blue-600" />
            Trip Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold text-gray-700">Destination</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.destination}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-700">Dates</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.dates}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-gray-700">Duration</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.duration}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-gray-700">Travelers</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.travelers}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-700">Budget</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.budget_level}</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Bed className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-700">Accommodation</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{itinerary.trip_overview.accommodation}</p>
            </div>
                  </div>
        </motion.div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 text-center mb-8 flex items-center justify-center gap-3"
          >
            <Calendar className="h-8 w-8 text-blue-600" />
            Daily Itinerary
          </motion.h2>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {itinerary.itinerary.map((day, index) => renderDayItinerary(day, index))}
          </motion.div>
            </div>

        {/* Additional Information */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 flex items-center justify-center gap-3">
            <Info className="h-8 w-8 text-blue-600" />
            Additional Information
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weather & Packing */}
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <Sun className="h-5 w-5 text-blue-600" />
                </div>
                  Weather Forecast
                    </h3>
                <p className="text-gray-600 leading-relaxed">{itinerary.additional_info.weather_forecast}</p>
              </motion.div>

              {itinerary.additional_info.packing_tips && (
                renderInfoSection("Packing Tips", itinerary.additional_info.packing_tips, <Shield className="h-5 w-5 text-blue-600" />, "blue")
              )}
                  </div>

            {/* Transportation & Emergency */}
            <div className="space-y-6">
              {itinerary.additional_info.transportation && (
                renderInfoSection("Transportation", itinerary.additional_info.transportation, <Car className="h-5 w-5 text-green-600" />, "green")
              )}

              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  Emergency Contacts
                  </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600"><strong>Police:</strong> {itinerary.additional_info.emergency.police}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600"><strong>Ambulance:</strong> {itinerary.additional_info.emergency.ambulance}</span>
                  </div>
                    {itinerary.additional_info.emergency.touristPolice && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-red-500" />
                      <span className="text-gray-600"><strong>Tourist Police:</strong> {itinerary.additional_info.emergency.touristPolice}</span>
                </div>
              )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Cultural Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {itinerary.additional_info.local_customs && (
              renderInfoSection("Local Customs", itinerary.additional_info.local_customs, <Globe className="h-5 w-5 text-purple-600" />, "purple")
            )}
            
            {itinerary.additional_info.cultural_etiquette && (
              renderInfoSection("Cultural Etiquette", itinerary.additional_info.cultural_etiquette, <Heart className="h-5 w-5 text-pink-600" />, "pink")
            )}
            
            {itinerary.additional_info.local_phrases && (
              renderInfoSection("Useful Phrases", itinerary.additional_info.local_phrases, <Languages className="h-5 w-5 text-indigo-600" />, "indigo")
            )}
            
            {itinerary.additional_info.money_saving_tips && (
              renderInfoSection("Money Saving Tips", itinerary.additional_info.money_saving_tips, <TrendingUp className="h-5 w-5 text-green-600" />, "green")
            )}
            
            {itinerary.additional_info.must_know_facts && (
              renderInfoSection("Must-Know Facts", itinerary.additional_info.must_know_facts, <BookOpen className="h-5 w-5 text-orange-600" />, "orange")
            )}
            
            {itinerary.additional_info.best_times_to_visit && (
              renderInfoSection("Best Times to Visit", itinerary.additional_info.best_times_to_visit, <Calendar className="h-5 w-5 text-blue-600" />, "blue")
      )}
    </div>
        </motion.div>
      </motion.div>
    </LazyMotion>
  );
};

export default StructuredItinerary;
