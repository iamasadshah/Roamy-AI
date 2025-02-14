import { TravelItinerary } from "@/types/itinerary";
import StructuredItinerary from "./StructuredItinerary";

interface TripPlanProps {
  plan: TravelItinerary | null;
  isLoading: boolean;
}

export default function TripPlan({ plan, isLoading }: TripPlanProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-blue-500/20 rounded-full pulse-animation"></div>
          </div>
        </div>
        <p className="text-blue-400 animate-pulse">AI Processing...</p>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Your Travel Itinerary
      </h2>
      <StructuredItinerary itinerary={plan} />
    </div>
  );
}
