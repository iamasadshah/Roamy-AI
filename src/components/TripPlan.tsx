import { TravelItinerary } from "@/types/itinerary";
import StructuredItinerary from "./StructuredItinerary";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface TripPlanProps {
  plan: TravelItinerary | null;
  isLoading: boolean;
  onGenerateNew: () => void;
}

export default function TripPlan({
  plan,
  isLoading,
  onGenerateNew,
}: TripPlanProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSaveTrip = async () => {
    if (!plan) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <svg
                      className="h-10 w-10 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Sign In Required
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please sign in to save your trip.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push("/auth");
                  }}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          ),
          {
            duration: 5000,
            position: "bottom-right",
          }
        );
        return;
      }

      // Parse dates properly
      const parseDate = (dateStr: string) => {
        try {
          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString().split("T")[0];
          }
        } catch {
          // If parsing fails, use today's date
          console.warn(
            `Could not parse date: ${dateStr}, using today's date instead`
          );
          return new Date().toISOString().split("T")[0];
        }
      };

      const [startDate, endDate] = plan.trip_overview.dates
        .split(" - ")
        .map(parseDate);

      const tripData = {
        user_id: user.id,
        destination: plan.trip_overview.destination,
        start_date: startDate,
        end_date: endDate,
        budget: plan.trip_overview.budget_level,
        accommodation: plan.trip_overview.accommodation,
        travelers: plan.trip_overview.travelers,
        itinerary: plan,
      };

      const { error } = await supabase.from("trips").insert([tripData]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      toast.success("Trip saved successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error(
        error instanceof Error
          ? `Failed to save trip: ${error.message}`
          : "Failed to save trip. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Your Travel Itinerary
      </h2>
      <StructuredItinerary itinerary={plan} />

      <div className="mt-8 flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveTrip}
          className="px-6 py-3 bg-blue-500 z-10 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Save Trip
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGenerateNew}
          className="px-6 py-3 z-10 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Generate New
        </motion.button>
      </div>
    </div>
  );
}
