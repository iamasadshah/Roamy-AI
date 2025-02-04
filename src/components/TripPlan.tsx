import { TravelItinerary } from '@/types/itinerary';
import StructuredItinerary from './StructuredItinerary';

interface TripPlanProps {
  plan: TravelItinerary | null;
  isLoading: boolean;
}

export default function TripPlan({ plan, isLoading }: TripPlanProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Travel Itinerary</h2>
      <StructuredItinerary itinerary={plan} />
    </div>
  );
}
