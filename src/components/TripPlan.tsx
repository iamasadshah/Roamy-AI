import { TravelItinerary } from "@/types/itinerary";
import StructuredItinerary from "./StructuredItinerary";

interface TripPlanProps {
  plan: TravelItinerary | null;
  isLoading: boolean;
}

export default function TripPlan({ plan, isLoading }: TripPlanProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-[spin_3s_linear_infinite]" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border-4 border-blue-400/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          
          {/* Inner spinning dots */}
          <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-blue-500 rounded-full transform"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-12px)`,
                  opacity: 1 - (i * 0.1),
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          
          {/* Center core */}
          <div className="absolute inset-1/4 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-300/30 animate-pulse">
            <div className="absolute inset-2 bg-blue-400/20 rounded-full animate-ping" />
          </div>
        </div>
        
        {/* Text animation */}
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400 animate-pulse">
            AI Processing
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
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
