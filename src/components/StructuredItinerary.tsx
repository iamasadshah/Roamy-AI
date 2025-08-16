"use client";
import { TravelItinerary } from "@/types/itinerary";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Globe, Calendar, DollarSign, Hotel, Sun, Moon, Cloud, Car, Phone, AlertTriangle, MapPin, Clock, Users } from "lucide-react";

interface StructuredItineraryProps {
  itinerary: TravelItinerary;
}

// Performance optimized animation variants
const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
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
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
};

export default function StructuredItinerary({
  itinerary,
}: StructuredItineraryProps) {
  if (!itinerary || !itinerary.trip_overview) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 text-lg font-semibold">No itinerary data available</p>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Enhanced Trip Overview Section */}
        <motion.section
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/50 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Globe className="h-8 w-8 text-blue-600" />
            Trip Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Destination</p>
                <p className="text-lg font-semibold text-gray-800">{itinerary.trip_overview.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-gray-800">{itinerary.trip_overview.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Level</p>
                <p className="text-lg font-semibold text-gray-800">{itinerary.trip_overview.budget_level}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
              <Hotel className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Accommodation</p>
                <p className="text-lg font-semibold text-gray-800">{itinerary.trip_overview.accommodation}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Enhanced Daily Itinerary Section */}
        {itinerary.itinerary && itinerary.itinerary.length > 0 && (
          <motion.section
            variants={itemVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-indigo-600" />
              Daily Itinerary
            </h2>
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {itinerary.itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    Day {day.day}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {day.morning && day.morning.length > 0 && (
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Sun className="h-5 w-5 text-yellow-600" />
                          Morning
                        </h4>
                        <ul className="space-y-3">
                          {day.morning.map((activity, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-medium">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {day.afternoon && day.afternoon.length > 0 && (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Sun className="h-5 w-5 text-blue-600" />
                          Afternoon
                        </h4>
                        <ul className="space-y-3">
                          {day.afternoon.map((activity, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-medium">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {day.evening && day.evening.length > 0 && (
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200/50">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Moon className="h-5 w-5 text-purple-600" />
                          Evening
                        </h4>
                        <ul className="space-y-3">
                          {day.evening.map((activity, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-medium">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Enhanced Additional Information Section */}
        {itinerary.additional_info && (
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-green-600" />
              Additional Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-600" />
                    Weather Forecast
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {itinerary.additional_info.weather_forecast}
                  </p>
                </div>
                
                {itinerary.additional_info.packing_tips &&
                  itinerary.additional_info.packing_tips.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        Packing Tips
                      </h3>
                      <ul className="space-y-3">
                        {itinerary.additional_info.packing_tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="font-medium">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              
              <div className="space-y-6">
                {itinerary.additional_info.local_currency && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-yellow-600" />
                      Local Currency
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="font-medium">
                        <span className="font-semibold">Currency:</span> {itinerary.additional_info.local_currency.code}
                      </p>
                      <p className="font-medium">
                        <span className="font-semibold">Exchange Rate:</span> {itinerary.additional_info.local_currency.exchangeRate}
                      </p>
                    </div>
                  </div>
                )}
                
                {itinerary.additional_info.transportation &&
                  itinerary.additional_info.transportation.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Car className="h-5 w-5 text-blue-600" />
                        Transportation
                      </h3>
                      <ul className="space-y-3">
                        {itinerary.additional_info.transportation.map(
                          (transport, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="font-medium">{transport}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                
                {itinerary.additional_info.emergency && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-red-600" />
                      Emergency Contacts
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p className="font-medium">
                        <span className="font-semibold">Police:</span> {itinerary.additional_info.emergency.police}
                      </p>
                      <p className="font-medium">
                        <span className="font-semibold">Ambulance:</span> {itinerary.additional_info.emergency.ambulance}
                      </p>
                      {itinerary.additional_info.emergency.touristPolice && (
                        <p className="font-medium">
                          <span className="font-semibold">Tourist Police:</span> {itinerary.additional_info.emergency.touristPolice}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </LazyMotion>
  );
}
