import { GoogleGenerativeAI } from '@google/generative-ai';
import { TravelItinerary, FormData, TripOverview } from '@/types/itinerary';
import { getDestinationData } from './externalData';

// Make sure to use the correct environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_TRAVEL || '';

if (!apiKey) {
  console.error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_TRAVEL in your .env.local file.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateTripPlan(formData: FormData): Promise<TravelItinerary> {
  try {
    if (!apiKey) {
      throw new Error('API key is not configured. Please contact the administrator.');
    }

    // Fetch real-time destination data
    const destinationData = await getDestinationData(formData.destination);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert travel planning assistant with deep knowledge of destinations worldwide. Your task is to generate a comprehensive, detailed travel itinerary in valid JSON format that provides travelers with everything they need for an unforgettable experience.

Please follow these requirements exactly:

1. Return ONLY the JSON object, no additional text or explanations
2. The JSON must exactly match this enhanced structure:
{
  "trip_overview": {
    "destination": "string",
    "dates": "string",
    "duration": "string",
    "budget_level": "string",
    "accommodation": "string",
    "travelers": "string",
    "dietary_plan": "string"
  },
  "itinerary": [
    {
      "day": number,
      "day_title": "string (e.g., 'Arrival & City Introduction')",
      "day_description": "string (brief overview of the day)",
      "highlights": ["string array of day's key highlights"],
      "total_estimated_cost": "string (e.g., '$150-200')",
      "morning": [
        {
          "time": "string (e.g., '09:00 AM')",
          "title": "string (activity name)",
          "description": "string (detailed description with what to expect)",
          "location": "string (specific address or area)",
          "cost": "string (e.g., '$25 per person')",
          "duration": "string (e.g., '2 hours')",
          "special_features": ["string array of unique features"],
          "tips": "string (practical tips for this activity)",
          "booking_info": "string (if advance booking needed)"
        }
      ],
      "afternoon": [
        {
          "time": "string",
          "title": "string",
          "description": "string",
          "location": "string",
          "cost": "string",
          "duration": "string",
          "special_features": ["string array"],
          "tips": "string",
          "booking_info": "string"
        }
      ],
      "evening": [
        {
          "time": "string",
          "title": "string",
          "description": "string",
          "location": "string",
          "cost": "string",
          "duration": "string",
          "special_features": ["string array"],
          "tips": "string",
          "booking_info": "string"
        }
      ],
      "meals": [
        {
          "time": "string (e.g., '12:30 PM')",
          "restaurant_name": "string",
          "cuisine_type": "string (e.g., 'Local Italian')",
          "location": "string (restaurant address)",
          "cost_range": "string (e.g., '$15-25 per person')",
          "must_try_dishes": ["string array of signature dishes"],
          "reservation_required": boolean,
          "special_features": ["string array of restaurant highlights"],
          "tips": "string (dining tips)"
        }
      ]
    }
  ],
  "additional_info": {
    "weather_forecast": "string",
    "packing_tips": ["string array"],
    "local_currency": {
      "code": "string",
      "exchangeRate": "string"
    },
    "transportation": ["string array"],
    "emergency": {
      "police": "string",
      "ambulance": "string",
      "touristPolice": "string"
    },
    "local_customs": ["string array of cultural customs"],
    "best_times_to_visit": ["string array of optimal times"],
    "money_saving_tips": ["string array of budget tips"],
    "cultural_etiquette": ["string array of etiquette tips"],
    "local_phrases": ["string array of useful phrases"],
    "must_know_facts": ["string array of important facts"]
  }
}

Trip details to use:
- Destination: ${formData.destination}
- Dates: ${formData.startDate?.toLocaleDateString()} - ${formData.endDate?.toLocaleDateString()}
- Budget Level: ${formData.budget}
- Accommodation: ${formData.accommodation}
- Number of Travelers: ${formData.travelers}
- Dietary Preferences: ${formData.dietaryPlan}

CRITICAL REQUIREMENTS:
1. Create a detailed, day-by-day itinerary with specific times, locations, and activities
2. Include 2-3 activities per time slot (morning, afternoon, evening) with realistic timing
3. Add 2-3 meal recommendations per day with specific restaurants and must-try dishes
4. Provide detailed descriptions for each activity including what to expect, costs, and duration
5. Include special features and unique aspects of each location/activity
6. Add practical tips for each activity and meal
7. Ensure all dining recommendations match the dietary preferences (${formData.dietaryPlan})
8. Include booking information where advance reservations are recommended
9. Provide realistic cost estimates that match the budget level (${formData.budget})
10. Include cultural insights, local customs, and etiquette tips
11. Add money-saving tips and local phrases
12. Make activities suitable for the number of travelers (${formData.travelers})
13. Include a mix of popular attractions, hidden gems, and local experiences
14. Provide specific addresses or clear location descriptions
15. Include seasonal considerations and weather-appropriate activities

IMPORTANT: Make the itinerary comprehensive, practical, and engaging with real-world details that travelers can actually use.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();



      // Function to extract and validate JSON
      function extractJSON(str: string): string {
        // Remove any leading/trailing whitespace and common text markers
        str = str.trim().replace(/```json\s*|\s*```/g, '');

        try {
          // First attempt: Try to parse the entire string
          JSON.parse(str);
          return str;
        } catch {

          try {
            // Second attempt: Find the largest JSON-like substring
            const matches = str.match(/\{(?:[^{}]|(\{[^{}]*\}))*\}/g);
            if (!matches) {
              console.error('No JSON-like structure found in:', str);
              throw new Error('No valid JSON object found in the response');
            }

            // Find the largest matching substring
            const jsonStr = matches.reduce((a, b) => a.length > b.length ? a : b);

            // Validate that it can be parsed
            JSON.parse(jsonStr);
            return jsonStr;
          } catch (error) {
            console.error('Second parse attempt failed:', error);
            console.error('Failed text:', str);
            throw new Error('Failed to extract valid JSON from the response');
          }
        }
      }

      // Extract and validate JSON
      const jsonStr = extractJSON(text);


      let itinerary: TravelItinerary;
      try {
        itinerary = JSON.parse(jsonStr);

        // Detailed validation of the structure

        if (!itinerary.trip_overview) throw new Error('Missing trip_overview');
        if (!Array.isArray(itinerary.itinerary)) throw new Error('Missing or invalid itinerary array');
        if (!itinerary.additional_info) throw new Error('Missing additional_info');

        // Validate trip_overview fields
        const requiredOverviewFields = ['destination', 'dates', 'duration', 'budget_level', 'accommodation', 'travelers', 'dietary_plan'] as const;
        for (const field of requiredOverviewFields) {
          if (!itinerary.trip_overview[field as keyof TripOverview]) {
            throw new Error(`Missing required field in trip_overview: ${field}`);
          }
        }

      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Attempted to parse:', jsonStr);
        throw new Error(`Failed to parse the itinerary JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }

      // Override the real-time data to ensure accuracy
      itinerary.additional_info.weather_forecast = destinationData.weather.forecast;
      itinerary.additional_info.local_currency = {
        code: destinationData.currency.code,
        exchangeRate: parseFloat(destinationData.currency.exchangeRate)
      };
      itinerary.additional_info.emergency = {
        police: destinationData.emergency.police,
        ambulance: destinationData.emergency.ambulance,
        touristPolice: destinationData.emergency.touristPolice || undefined
      };

      return itinerary;
    } catch (error) {
      console.error('Error generating trip plan:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw new Error('Failed to generate trip plan');
    }
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw new Error('Failed to generate trip plan');
  }
}
