import { TravelItinerary } from '@/types/itinerary';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StructuredItineraryProps {
  itinerary: TravelItinerary;
}

export default function StructuredItinerary({ itinerary }: StructuredItineraryProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!itinerary) return null;
  if (!isClient) {
    // Server-side or initial render
    return (
      <div className="space-y-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
        {/* Static version without animations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
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
              <span className="text-blue-400">📅 Dates:</span>
              <span>{itinerary.trip_overview.dates}</span>
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
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📅 Day-by-Day Itinerary
          </h2>
          {itinerary.itinerary.map((dayItinerary) => (
            <div key={dayItinerary.day} className="space-y-4 border-l-2 border-blue-400 pl-4">
              <h3 className="text-xl font-semibold text-blue-400">Day {dayItinerary.day}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    🌅 Morning
                  </h4>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {dayItinerary.morning.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    ☀️ Afternoon
                  </h4>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {dayItinerary.afternoon.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    🌙 Evening
                  </h4>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {dayItinerary.evening.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            ℹ️ Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                🌤️ Weather
              </h3>
              <p>{itinerary.additional_info.weather_forecast}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                🎒 Packing Tips
              </h3>
              <ul className="list-disc list-inside pl-4">
                {itinerary.additional_info.packing_tips.map((tip, i) => (
                  <li key={i} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                💱 Local Currency
              </h3>
              <p>Currency: {itinerary.additional_info.local_currency.code}</p>
              <p>Exchange Rate: {itinerary.additional_info.local_currency.exchangeRate}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                🚗 Transportation
              </h3>
              <ul className="list-disc list-inside pl-4">
                {itinerary.additional_info.transportation.map((transport, i) => (
                  <li key={i}>{transport}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                🚨 Emergency Contacts
              </h3>
              <p>Police: {itinerary.additional_info.emergency.police}</p>
              <p>Ambulance: {itinerary.additional_info.emergency.ambulance}</p>
              {itinerary.additional_info.emergency.touristPolice && (
                <p>Tourist Police: {itinerary.additional_info.emergency.touristPolice}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Client-side render with animations
  return (
    <div className="space-y-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
      {/* Trip Overview Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
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
            <span className="text-blue-400">📅 Dates:</span>
            <span>{itinerary.trip_overview.dates}</span>
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
      </motion.section>

      {/* Day-by-Day Itinerary Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          📅 Day-by-Day Itinerary
        </h2>
        {itinerary.itinerary.map((dayItinerary) => (
          <div key={dayItinerary.day} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-400">Day {dayItinerary.day}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  🌅 Morning
                </h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  {dayItinerary.morning.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  ☀️ Afternoon
                </h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  {dayItinerary.afternoon.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  🌙 Evening
                </h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  {dayItinerary.evening.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Additional Information Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          ℹ️ Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              🌤️ Weather
            </h3>
            <p>{itinerary.additional_info.weather_forecast}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              🎒 Packing Tips
            </h3>
            <ul className="list-disc list-inside pl-4">
              {itinerary.additional_info.packing_tips.map((tip, i) => (
                <li key={i} className="text-gray-300">{tip}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              💱 Local Currency
            </h3>
            <p>Currency: {itinerary.additional_info.local_currency.code}</p>
            <p>Exchange Rate: {itinerary.additional_info.local_currency.exchangeRate}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              🚗 Transportation
            </h3>
            <ul className="list-disc list-inside pl-4">
              {itinerary.additional_info.transportation.map((transport, i) => (
                <li key={i}>{transport}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              🚨 Emergency Contacts
            </h3>
            <p>Police: {itinerary.additional_info.emergency.police}</p>
            <p>Ambulance: {itinerary.additional_info.emergency.ambulance}</p>
            {itinerary.additional_info.emergency.touristPolice && (
              <p>Tourist Police: {itinerary.additional_info.emergency.touristPolice}</p>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
