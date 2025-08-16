export interface TripOverview {
  destination: string;
  dates: string;
  duration: string;
  budget_level: 'Budget' | 'Mid-range' | 'Luxury';
  accommodation: string;
  travelers: string;
  dietary_plan: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  cost?: string;
  duration: string;
  special_features?: string[];
  tips?: string;
  booking_info?: string;
}

export interface Meal {
  time: string;
  restaurant_name: string;
  cuisine_type: string;
  location: string;
  cost_range: string;
  must_try_dishes: string[];
  reservation_required: boolean;
  special_features?: string[];
  tips?: string;
}

export interface DayActivity {
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  meals: Meal[];
}

export interface DayItinerary extends DayActivity {
  day: number;
  day_title: string;
  day_description: string;
  highlights: string[];
  total_estimated_cost: string;
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
      local_customs?: string[];
    best_times_to_visit?: string[];
    money_saving_tips?: string[];
    cultural_etiquette?: string[];
    local_phrases?: string[];
    must_know_facts?: string[];
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

export interface Trip {
  id: string;
  user_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  accommodation: string;
  travelers: string;
  created_at: string;
  itinerary: TravelItinerary;
}
