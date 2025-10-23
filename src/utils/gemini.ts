import { GoogleGenerativeAI } from '@google/generative-ai';
import { TravelItinerary, FormData, TripOverview } from '@/types/itinerary';
import { getDestinationData } from './externalData';
import { format } from 'date-fns';

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

    // Validate and format dates
    if (!formData.startDate || !formData.endDate) {
      throw new Error('Start date and end date are required');
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format provided');
    }

    // Fetch real-time destination data
    const destinationData = await getDestinationData(formData.destination);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const personalNotes = formData.notes?.trim();

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
- Dates: ${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}
- Budget Level: ${formData.budget}
- Accommodation: ${formData.accommodation}
- Number of Travelers: ${formData.travelers}
- Dietary Preferences: ${formData.dietaryPlan}
${personalNotes ? `- Traveler Preferences: ${personalNotes}` : ""}

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
        exchangeRate: destinationData.currency.exchangeRate
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
      throw new Error(error instanceof Error ? error.message : 'Failed to generate trip plan');
    }
  } catch (error) {
    console.error('Error generating trip plan:', error);
    // Fallback to a basic itinerary so the UI still works
    const destinationData = await getDestinationData(formData.destination);
    return buildFallbackItinerary(formData, destinationData);
  }
}

function buildFallbackItinerary(
  formData: FormData,
  destinationData: Awaited<ReturnType<typeof getDestinationData>>,
): TravelItinerary {
  const { destination, startDate, endDate, budget, accommodation, travelers, dietaryPlan } =
    formData;
  const parsedStart = new Date(startDate);
  const parsedEnd = new Date(endDate);
  const dayCount = Math.max(
    1,
    Math.min(7, Math.round((parsedEnd.getTime() - parsedStart.getTime()) / (1000 * 60 * 60 * 24)) + 1),
  );

  const sampleActivities = [
    {
      morning: [
        {
          time: '09:00 AM',
          title: 'Neighborhood orientation walk',
          description:
            'Stroll through the historic quarter with a curated route that highlights must-see architecture, photo stops, and cafe breaks.',
          location: 'City center',
          duration: '2 hours',
          special_features: ['Self-guided', 'Photo hotspots'],
          tips: 'Start early to beat the crowds and grab a pastry en route.',
        },
      ],
      afternoon: [
        {
          time: '01:00 PM',
          title: 'Cultural immersion experience',
          description:
            'Visit a landmark museum or local gallery to understand the cultural heartbeat of the destination.',
          location: 'Cultural district',
          duration: '3 hours',
          special_features: ['Skip-the-line recommended', 'Audio guide available'],
          tips: 'Purchase tickets online in advance for best availability.',
        },
      ],
      evening: [
        {
          time: '07:30 PM',
          title: 'Sunset vantage point',
          description:
            'End your day with sweeping views as the city lights come alive. Perfect moment for travel journaling.',
          location: 'Panoramic overlook',
          duration: '1.5 hours',
          special_features: ['Golden hour views'],
          tips: 'Arrive 20 minutes before sunset for the best spot.',
        },
      ],
    },
    {
      morning: [
        {
          time: '08:30 AM',
          title: 'Local flavors breakfast tour',
          description:
            'Sample signature bites at beloved cafes and bakeries while learning the stories behind each dish.',
          location: 'Foodie lane',
          duration: '2 hours',
          special_features: ['Guided tasting', 'Meet local vendors'],
          tips: 'Bring cash for small purchases and ask for seasonal specialties.',
        },
      ],
      afternoon: [
        {
          time: '02:00 PM',
          title: 'Hands-on workshop',
          description:
            'Join a local expert for a creative workshop—think pottery, cooking, or craft that reflects the destination.',
          location: 'Creative studio',
          duration: '2 hours',
          special_features: ['Small group', 'Take-home creation'],
          tips: 'Reserve 48 hours ahead to secure a spot.',
        },
      ],
      evening: [
        {
          time: '08:00 PM',
          title: 'Nightlife sampler',
          description:
            'Experience the destination after dark with a cozy lounge or live music tucked away from the tourist path.',
          location: 'Night district',
          duration: '2 hours',
          special_features: ['Local favorite', 'Live entertainment'],
          tips: 'Dress smart-casual and confirm if reservations are required.',
        },
      ],
    },
  ];

  const mealsTemplate = [
    {
      time: '12:30 PM',
      restaurant_name: 'Local Bistro',
      cuisine_type: 'Regional cuisine',
      location: 'City center',
      cost_range: '$$',
      must_try_dishes: ['Chef special', 'Seasonal dessert'],
      reservation_required: false,
      tips: 'Mention dietary needs; staff is accommodating.',
    },
    {
      time: '07:00 PM',
      restaurant_name: 'Evening Dining Room',
      cuisine_type: 'Modern gastronomy',
      location: 'Riverside quarter',
      cost_range: '$$$',
      must_try_dishes: ['Signature tasting menu'],
      reservation_required: true,
      tips: 'Book a terrace table for the best ambiance.',
    },
  ];

  const itineraryDays: TravelItinerary["itinerary"] = Array.from({ length: dayCount }).map(
    (_, idx) => {
      const template = sampleActivities[idx % sampleActivities.length];
      return {
        day: idx + 1,
        day_title: idx === 0 ? 'Arrival & Orientation' : `Discover ${destination}`,
        day_description:
          idx === 0
            ? `Ease into ${destination} with light exploration, great coffee, and a memorable sunset viewpoint.`
            : `Curated experiences that mix culture, flavors, and meaningful local connections.`,
        highlights: [
          `${destination} essentials`,
          budget === "budget" ? "Wallet-friendly hidden gems" : "Curated premium moments",
          travelers === "family" ? "Family-friendly stops" : "Photogenic vantage points",
        ],
        total_estimated_cost:
          budget === "budget" ? "$80 - $120" : budget === "moderate" ? "$150 - $220" : "$260+",
        morning: template.morning,
        afternoon: template.afternoon,
        evening: template.evening,
        meals: mealsTemplate,
      };
    },
  );

  return {
    trip_overview: {
      destination,
      dates: `${friendlyDateString(startDate)} - ${friendlyDateString(endDate)}`,
      duration: `${dayCount} day${dayCount > 1 ? "s" : ""}`,
      budget_level: budget,
      accommodation,
      travelers,
      dietary_plan: dietaryPlan,
    },
    itinerary: itineraryDays,
    additional_info: {
      weather_forecast: destinationData.weather.forecast,
      packing_tips: [
        "Comfortable walking shoes",
        "Reusable water bottle",
        "Layered clothing for changing weather",
      ],
      local_currency: {
        code: destinationData.currency.code,
        exchangeRate: destinationData.currency.exchangeRate,
      },
      transportation: [
        "Use the official transit app for real-time updates.",
        "Rideshare services are reliable late-night options.",
      ],
      emergency: destinationData.emergency,
      local_customs: ["Greet locals with a smile", "Tipping is appreciated but discretionary"],
      best_times_to_visit: ["Early mornings for major landmarks", "Golden hour for skyline views"],
      money_saving_tips: [
        "Purchase attraction bundles when available",
        "Explore weekday deals on guided tours",
      ],
      cultural_etiquette: ["Dress respectfully in sacred spaces", "Learn basic greetings"],
      local_phrases: ["Hello", "Thank you", "Where is...?"],
      must_know_facts: [
        `${destination} has a thriving ${budget === "budget" ? "street food" : "culinary"} scene.`,
        "Public transit is efficient during peak hours.",
      ],
    },
  };
}

function friendlyDateString(value: string) {
  try {
    return format(new Date(value), "PPP");
  } catch {
    return value;
  }
}
