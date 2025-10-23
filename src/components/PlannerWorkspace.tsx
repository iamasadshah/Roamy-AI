"use client";

import { useCallback, useMemo, useState } from "react";
import ChatPlanForm from "@/components/ChatPlanForm";
import TripPlan from "@/components/TripPlan";
import type { TripsRow } from "@/types/supabase";
import type { FormData, TravelItinerary } from "@/types/itinerary";
import { supabase } from "@/utils/supabaseClient";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  Plus,
  MapPin,
  Calendar,
  Clock,
  Layers,
  Download,
} from "lucide-react";

type PlannerWorkspaceProps = {
  initialTrips: TripsRow[];
  userId: string | null;
};

type PlannerTrip = Omit<TripsRow, "itinerary"> & {
  itinerary: TravelItinerary | null;
};

const parseTrip = (row: TripsRow): PlannerTrip => ({
  ...row,
  itinerary:
    row.itinerary && typeof row.itinerary === "object"
      ? (row.itinerary as TravelItinerary)
      : null,
});

const parseTrips = (rows: TripsRow[]) => rows.map(parseTrip);

const formatDateRange = (start: string, end: string) => {
  try {
    const formatter = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const startDate = formatter.format(new Date(start));
    const endDate = formatter.format(new Date(end));
    return `${startDate} – ${endDate}`;
  } catch {
    return `${start} – ${end}`;
  }
};

const formatRelative = (date: string) => {
  try {
    const now = Date.now();
    const diff = new Date(date).getTime() - now;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const minutes = Math.round(diff / (1000 * 60));
    if (Math.abs(minutes) < 60) {
      return rtf.format(Math.round(minutes), "minute");
    }
    const hours = Math.round(diff / (1000 * 60 * 60));
    if (Math.abs(hours) < 24) {
      return rtf.format(hours, "hour");
    }
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return rtf.format(days, "day");
  } catch {
    return "";
  }
};

const toIsoDate = (value: string) => (value ? `${value}T00:00:00.000Z` : new Date().toISOString());

const PlannerWorkspace = ({ initialTrips, userId }: PlannerWorkspaceProps) => {
  const [trips, setTrips] = useState<PlannerTrip[]>(() => parseTrips(initialTrips));
  const [activeTripId, setActiveTripId] = useState<string>(
    initialTrips.length > 0 ? initialTrips[0].id : "new",
  );
  const [activePlan, setActivePlan] = useState<TravelItinerary | null>(() => {
    const first = initialTrips[0];
    if (!first?.itinerary || typeof first.itinerary !== "object") return null;
    return first.itinerary as TravelItinerary;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationKey, setConversationKey] = useState(0);
  const [showPlanInChat, setShowPlanInChat] = useState(false);

  const supabaseClient = supabase;

  const handleSelectTrip = useCallback((trip: PlannerTrip) => {
    setActiveTripId(trip.id);
    setActivePlan(trip.itinerary);
    setShowPlanInChat(false);
    setError(null);
  }, []);

  const handleStartNew = useCallback(() => {
    setActiveTripId("new");
    setActivePlan(null);
    setShowPlanInChat(false);
    setError(null);
    setConversationKey((prev) => prev + 1);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("chat_plan_state_v1");
    }
  }, []);

  const handleGenerate = useCallback(
    async (formData: FormData) => {
      setIsGenerating(true);
      setError(null);
      setShowPlanInChat(false);
      setActivePlan(null);

      try {
        const response = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? "Failed to generate itinerary");
        }

        const generatedPlan = payload.itinerary as TravelItinerary;
        setActivePlan(generatedPlan);
        setShowPlanInChat(true);

        if (!userId) {
          toast.error("Unable to save trip history without an authenticated user.");
          return;
        }

        if (!supabaseClient) {
          toast.error("Supabase client is not configured.");
          return;
        }

        const insertPayload = {
          user_id: userId,
          destination: formData.destination,
          start_date: toIsoDate(formData.startDate),
          end_date: toIsoDate(formData.endDate),
          budget: formData.budget || null,
          accommodation: formData.accommodation || null,
          travelers: formData.travelers || null,
          itinerary: generatedPlan,
        };

        const { data, error: insertError } = await supabaseClient
          .from("trips")
          .insert(insertPayload)
          .select("*")
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        const newTrip = parseTrip(data);
        setTrips((prev) => [newTrip, ...prev.filter((trip) => trip.id !== newTrip.id)]);
        setActiveTripId(newTrip.id);
        toast.success("Itinerary saved to your trips");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong while generating the plan.";
        setError(message);
        toast.error(message);
      } finally {
        setIsGenerating(false);
      }
    },
    [supabaseClient, userId],
  );

  const planSummary = useMemo(() => {
    if (!activePlan || !showPlanInChat) return null;
    const overview = activePlan.trip_overview;
    const highlights = activePlan.itinerary[0]?.highlights ?? [];

    const scrollToPlan = () => {
      const el = document.getElementById("trip-plan-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Your itinerary for {overview.destination} is ready!
          </h3>
          <p className="text-sm text-gray-600">
            {overview.dates} • {overview.duration} • Budget: {overview.budget_level}
          </p>
        </div>
        {highlights.length > 0 && (
          <ul className="grid gap-2 text-sm text-gray-600">
            {highlights.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Layers className="h-3 w-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={scrollToPlan}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            View &amp; download full plan
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Tip: You can revisit this itinerary anytime from the sidebar on the left.
        </p>
      </div>
    );
  }, [activePlan, showPlanInChat]);

  const renderTripButton = (trip: PlannerTrip) => (
    <button
      key={trip.id}
      type="button"
      onClick={() => handleSelectTrip(trip)}
      className={cn(
        "w-full rounded-2xl border px-3 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50/60",
        activeTripId === trip.id
          ? "border-blue-500 bg-blue-100/60 text-blue-900 shadow-sm"
          : "border-transparent bg-white/80",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span className="truncate text-sm font-semibold">{trip.destination}</span>
        </div>
        <span className="text-[11px] text-gray-400">{formatRelative(trip.created_at)}</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
        <Calendar className="h-3.5 w-3.5" />
        <span className="truncate">{formatDateRange(trip.start_date, trip.end_date)}</span>
      </div>
      {trip.budget && (
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span className="truncate capitalize">{trip.budget}</span>
        </div>
      )}
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex min-h-[calc(100vh-5rem)] overflow-hidden">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-white/40 bg-white/60 backdrop-blur md:flex">
          <div className="border-b border-white/60 bg-white/70 p-4">
            <button
              type="button"
              onClick={handleStartNew}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New itinerary
            </button>
          </div>
          <nav className="flex-1 space-y-3 overflow-y-auto p-4">
            {trips.length ? trips.map(renderTripButton) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-white/80 p-6 text-sm text-gray-500">
                Your future itineraries will appear here once you generate them.
              </div>
            )}
          </nav>
        </aside>

        <main className="flex-1 overflow-hidden">
          <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 px-4 py-4 backdrop-blur md:px-8 lg:px-12">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                  Plan Workspace
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-gray-900">Roamy Trip Studio</h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                Saved automatically
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {userId ? (
                  <span className="rounded-full bg-blue-100/70 px-2 py-1 font-semibold text-blue-700">
                    {userId.slice(0, 6)}…
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-200 px-2 py-1 font-semibold text-gray-600">
                    Guest
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="flex h-full flex-col overflow-hidden">
            <div className="w-full flex-1 overflow-y-auto px-4 pb-8 pt-4 md:px-8 lg:px-12">
              <div className="mb-4 flex flex-col gap-3 md:hidden">
                <div className="flex w-full items-center gap-2">
                  <button
                    type="button"
                    onClick={handleStartNew}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    New
                  </button>
                  <span className="text-sm font-semibold text-gray-700">Saved trips</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {trips.length ? (
                    trips.map((trip) => (
                      <div key={trip.id} className="min-w-[220px]">
                        {renderTripButton(trip)}
                      </div>
                    ))
                  ) : (
                    <div className="min-w-[220px] rounded-2xl border border-dashed border-blue-200 bg-white/70 p-4 text-xs text-gray-500">
                      Generate your first itinerary to populate this list.
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                <section className="flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/30 bg-white/90 shadow-xl lg:h-[70vh]">
                  <ChatPlanForm
                    key={conversationKey}
                    onSubmit={handleGenerate}
                    isLoading={isGenerating}
                    resultContent={planSummary}
                  />
                </section>

                <section className="flex min-h-[520px] flex-col space-y-4 overflow-hidden rounded-[28px] border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur lg:h-[70vh]">
                  {isGenerating || activePlan ? (
                    <TripPlan
                      plan={activePlan}
                      isLoading={isGenerating}
                      onGenerateNew={handleStartNew}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center text-gray-500">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Download className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Generate an itinerary to view details
                        </h3>
                        <p className="text-sm text-gray-600">
                          Chat with Roamy AI to craft a custom trip plan. Once ready, you can view,
                          refine, and download the full PDF here.
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlannerWorkspace;
