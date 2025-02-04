'use client';

import { motion } from 'framer-motion';
import { TravelItinerary } from '@/types/itinerary';

interface Props {
  itinerary: TravelItinerary;
}

export default function ItineraryDisplay({ itinerary }: Props) {
  if (!itinerary || !itinerary.trip_overview || !itinerary.itinerary || !itinerary.additional_info) {
    return (
      <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10">
        <p className="text-white text-center">No itinerary data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trip Overview Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Trip Overview ✈️</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">Destination:</span> {itinerary.trip_overview.destination}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Dates:</span> {itinerary.trip_overview.dates}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Duration:</span> {itinerary.trip_overview.duration}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Budget Level:</span> {itinerary.trip_overview.budget_level}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">Accommodation:</span> {itinerary.trip_overview.accommodation}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Travelers:</span> {itinerary.trip_overview.travelers}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Dietary Plan:</span> {itinerary.trip_overview.dietary_plan}
              </p>
            </div>
          </div>
        </div>

        {/* Day-by-Day Itinerary Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Day-by-Day Itinerary 📅</h2>
          <div className="space-y-6">
            {Array.isArray(itinerary.itinerary) && itinerary.itinerary.map((day) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: day.day * 0.1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Day {day.day}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Morning ☀️</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {Array.isArray(day.morning) && day.morning.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-medium mb-2">Afternoon 🌤️</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {Array.isArray(day.afternoon) && day.afternoon.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-medium mb-2">Evening 🌙</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {Array.isArray(day.evening) && day.evening.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Information Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Additional Information ℹ️</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Weather Forecast 🌤️</h3>
                <p className="text-gray-300">{itinerary.additional_info.weather_forecast}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Packing Tips 🎒</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {Array.isArray(itinerary.additional_info.packing_tips) && 
                    itinerary.additional_info.packing_tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Local Currency 💰</h3>
                <p className="text-gray-300">
                  {itinerary.additional_info.local_currency && (
                    <>
                      <div>Code: {itinerary.additional_info.local_currency.code}</div>
                      <div>Exchange Rate: {itinerary.additional_info.local_currency.exchangeRate}</div>
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Transportation 🚗</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {Array.isArray(itinerary.additional_info.transportation) && 
                    itinerary.additional_info.transportation.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Emergency Contacts 🚨</h3>
                {itinerary.additional_info.emergency && (
                  <div className="text-gray-300 space-y-1">
                    <p>Police: {itinerary.additional_info.emergency.police}</p>
                    <p>Ambulance: {itinerary.additional_info.emergency.ambulance}</p>
                    {itinerary.additional_info.emergency.touristPolice && (
                      <p>Tourist Police: {itinerary.additional_info.emergency.touristPolice}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
