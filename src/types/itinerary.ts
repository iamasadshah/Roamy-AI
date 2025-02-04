export interface TripOverview {
  destination: string;
  dates: string;
  duration: string;
  budget_level: 'Budget' | 'Mid-range' | 'Luxury';
  accommodation: string;
  travelers: string;
  dietary_plan: string;
}

export interface DayActivity {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface DayItinerary extends DayActivity {
  day: number;
}

export interface AdditionalInfo {
  weather_forecast: string;
  packing_tips: string[];
  local_currency: {
    code: string;
    exchangeRate: number;
  };
  transportation: string[];
  emergency: {
    police: string;
    ambulance: string;
    touristPolice?: string;
  };
}

export interface TravelItinerary {
  trip_overview: TripOverview;
  itinerary: DayItinerary[];
  additional_info: AdditionalInfo;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export type FormData = {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: string;
  accommodation: string;
  travelers: string;
  dietaryPlan: string;
}
