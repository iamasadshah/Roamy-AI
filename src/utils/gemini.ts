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

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a travel planning assistant. Your task is to generate a detailed travel itinerary in valid JSON format.
Please follow these requirements exactly:

1. Return ONLY the JSON object, no additional text or explanations
2. The JSON must exactly match this structure:
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
      "morning": ["string"],
      "afternoon": ["string"],
      "evening": ["string"]
    }
  ],
  "additional_info": {
    "weather_forecast": "string",
    "packing_tips": ["string"],
    "local_currency": {
      "code": "string",
      "exchangeRate": "string"
    },
    "transportation": ["string"],
    "emergency": {
      "police": "string",
      "ambulance": "string",
      "touristPolice": "string"
    }
  }
}

Trip details to use:
- Destination: ${formData.destination}
- Dates: ${formData.startDate?.toLocaleDateString()} - ${formData.endDate?.toLocaleDateString()}
- Budget Level: ${formData.budget}
- Accommodation: ${formData.accommodation}
- Number of Travelers: ${formData.travelers}
- Dietary Preferences: ${formData.dietaryPlan}

Requirements:
- All activities should match the budget level and number of travelers
- Include emoji icons for better readability
- Dining recommendations should match dietary preferences
- Include a mix of activities
- Ensure all required fields are present and properly formatted`;

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
