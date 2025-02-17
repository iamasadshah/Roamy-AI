"use client";
import { TravelItinerary } from "@/types/itinerary";
import { motion } from "framer-motion";

interface StructuredItineraryProps {
  itinerary: TravelItinerary;
}

export default function StructuredItinerary({
  itinerary,
}: StructuredItineraryProps) {
  if (!itinerary || !itinerary.trip_overview) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">No itinerary data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
      {/* Trip Overview Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🌍 Trip Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🎯 Destination:</span>
            <span>{itinerary.trip_overview.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">⏱️ Duration:</span>
            <span>{itinerary.trip_overview.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">💰 Budget Level:</span>
            <span>{itinerary.trip_overview.budget_level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">🏨 Accommodation:</span>
            <span>{itinerary.trip_overview.accommodation}</span>
          </div>
        </div>
      </section>

      {/* Daily Itinerary Section */}
      {itinerary.itinerary && itinerary.itinerary.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📅 Daily Itinerary
          </h2>
          <div className="space-y-6">
            {itinerary.itinerary.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold mb-3">Day {day.day}</h3>
                <div className="space-y-4">
                  {day.morning && day.morning.length > 0 && (
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">
                        🌅 Morning
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {day.morning.map((activity, i) => (
                          <li key={i} className="text-gray-300">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {day.afternoon && day.afternoon.length > 0 && (
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">
                        ☀️ Afternoon
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {day.afternoon.map((activity, i) => (
                          <li key={i} className="text-gray-300">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {day.evening && day.evening.length > 0 && (
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">
                        🌙 Evening
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {day.evening.map((activity, i) => (
                          <li key={i} className="text-gray-300">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Information Section */}
      {itinerary.additional_info && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            ℹ️ Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">
                  🌤️ Weather Forecast
                </h3>
                <p className="text-gray-300">
                  {itinerary.additional_info.weather_forecast}
                </p>
              </div>
              {itinerary.additional_info.packing_tips &&
                itinerary.additional_info.packing_tips.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-blue-400 mb-2">
                      🎒 Packing Tips
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {itinerary.additional_info.packing_tips.map((tip, i) => (
                        <li key={i} className="text-gray-300">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            <div className="space-y-4">
              {itinerary.additional_info.local_currency && (
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">
                    💱 Local Currency
                  </h3>
                  <p className="text-gray-300">
                    Currency: {itinerary.additional_info.local_currency.code}
                    <br />
                    Exchange Rate:{" "}
                    {itinerary.additional_info.local_currency.exchangeRate}
                  </p>
                </div>
              )}
              {itinerary.additional_info.transportation &&
                itinerary.additional_info.transportation.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-blue-400 mb-2">
                      🚗 Transportation
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {itinerary.additional_info.transportation.map(
                        (transport, i) => (
                          <li key={i} className="text-gray-300">
                            {transport}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              {itinerary.additional_info.emergency && (
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">
                    🚨 Emergency Contacts
                  </h3>
                  <div className="text-gray-300 space-y-1">
                    <p>Police: {itinerary.additional_info.emergency.police}</p>
                    <p>
                      Ambulance: {itinerary.additional_info.emergency.ambulance}
                    </p>
                    {itinerary.additional_info.emergency.touristPolice && (
                      <p>
                        Tourist Police:{" "}
                        {itinerary.additional_info.emergency.touristPolice}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
