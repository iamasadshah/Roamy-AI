"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Loader2, MapPin, Users, Sparkles, Plane, Clock3 } from "lucide-react";

import { supabase } from "@/utils/supabaseClient";
import type { TripsRow } from "@/types/supabase";
import type { FormData, TravelItinerary } from "@/types/itinerary";
import TripPlan from "@/components/TripPlan";

type PlannerShellProps = {
  initialTrips: TripsRow[];
  userId: string | null;
};

type FormState = FormData & {
  notes: string;
};

const initialForm: FormState = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: "moderate",
  accommodation: "hotel",
  travelers: "couple",
  dietaryPlan: "none",
  notes: "",
};

const spotlightDestinations = [
  { name: "Kyoto, Japan", caption: "Historic temples & serene gardens" },
  { name: "Lisbon, Portugal", caption: "Sun-drenched coasts & tiled lanes" },
  { name: "Queenstown, New Zealand", caption: "Adventure capital in the Alps" },
  { name: "Marrakesh, Morocco", caption: "Vibrant souks & desert escapes" },
];

const quickDurationPresets = [
  { label: "2-day sprint", nights: 1 },
  { label: "5-day explorer", nights: 4 },
  { label: "7-day unwind", nights: 6 },
  { label: "10-day discovery", nights: 9 },
];

const friendlyDate = (value: string) => {
  if (!value) return "";
  try {
    return format(new Date(value), "PPP");
  } catch {
    return value;
  }
};

const PlannerShell = ({ initialTrips, userId }: PlannerShellProps) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [history, setHistory] = useState<TripsRow[]>(initialTrips);
  const [plan, setPlan] = useState<TravelItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseClient = supabase;

  const updateForm = useCallback(
    (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch })),
    [],
  );

  const canSubmit = useMemo(() => {
    if (!form.destination.trim()) return false;
    if (!form.startDate || !form.endDate) return false;
    return new Date(form.endDate) >= new Date(form.startDate);
  }, [form.destination, form.startDate, form.endDate]);

  const handleQuickDuration = (nights: number) => {
    const start = new Date();
    const end = new Date(start);
    end.setDate(start.getDate() + nights);
    updateForm({
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setPlan(null);

    const payload: FormData = {
      destination: form.destination.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      budget: form.budget,
      accommodation: form.accommodation,
      travelers: form.travelers,
      dietaryPlan: form.dietaryPlan,
      notes: form.notes.trim() || undefined,
    };

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body?.error || "Failed to generate itinerary");
      }

      const itinerary = body.itinerary as TravelItinerary;
      setPlan(itinerary);
      toast.success("Your itinerary is ready!");

      if (userId && supabaseClient) {
        const { data: inserted, error: insertError } = await supabaseClient
          .from("trips")
          .insert({
            user_id: userId,
            destination: payload.destination,
            start_date: `${payload.startDate}T00:00:00Z`,
            end_date: `${payload.endDate}T00:00:00Z`,
            budget: payload.budget,
            accommodation: payload.accommodation,
            travelers: payload.travelers,
            itinerary,
          })
          .select("*")
          .single();

        if (!insertError && inserted) {
          setHistory((prev) => [inserted, ...prev].slice(0, 12));
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetPlanner = () => {
    setForm(initialForm);
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-white via-slate-50 to-blue-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <header className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
              <Sparkles className="h-3 w-3" />
              Plan smarter
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Craft unforgettable journeys with <span className="text-blue-700">Roamy AI</span>
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Share your travel dates and preferences—Roamy assembles an end-to-end itinerary with
              curated experiences, dining, city intel, and a downloadable PDF. Perfect for Product
              Hunt launch day explorers.
            </p>
            <div className="flex flex-wrap gap-4">
              {spotlightDestinations.map((spot) => (
                <button
                  key={spot.name}
                  type="button"
                  className="group overflow-hidden rounded-2xl border border-blue-100 bg-white px-4 py-3 text-left text-sm transition hover:border-blue-300 hover:shadow-lg"
                  onClick={() => updateForm({ destination: spot.name })}
                >
                  <span className="block font-semibold text-slate-900">{spot.name}</span>
                  <span className="text-xs text-blue-600/80">{spot.caption}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative hidden h-full min-h-[240px] rounded-3xl border border-blue-100 bg-white p-6 shadow-xl md:flex md:flex-col md:justify-between">
            <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-25">
              <Image
                src="/images/world-map.png"
                alt="World map"
                fill
                className="object-cover object-center mix-blend-multiply"
                priority
              />
            </div>
            <div className="relative grid gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Average response time
                  </p>
                  <p className="font-semibold text-slate-900">7 seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Itineraries created
                  </p>
                  <p className="font-semibold text-slate-900">12,400+</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Returning travelers
                  </p>
                  <p className="font-semibold text-slate-900">92%</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <section className="flex flex-col gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-slate-900">Trip blueprint</h2>
                <p className="text-sm text-slate-500">
                  Fill in the essentials, then let Roamy do the heavy lifting.
                </p>
              </div>
              <button
                type="button"
                onClick={resetPlanner}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
              >
                <Plane className="h-3.5 w-3.5 rotate-45" />
                Reset form
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Destination
                </label>
                <input
                  value={form.destination}
                  onChange={(e) => updateForm({ destination: e.target.value })}
                  placeholder="City, region, or country"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Arrival
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateForm({ startDate: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                    required
                  />
                  <p className="text-xs text-slate-500">{friendlyDate(form.startDate)}</p>
                </div>
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Departure
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={(e) => updateForm({ endDate: e.target.value })}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                    required
                  />
                  <p className="text-xs text-slate-500">{friendlyDate(form.endDate)}</p>
                </div>
              </div>

              <div className="grid gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Quick durations
                </label>
                <div className="flex flex-wrap gap-3">
                  {quickDurationPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleQuickDuration(preset.nights)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Budget
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => updateForm({ budget: e.target.value as FormState["budget"] })}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                  >
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                    <option value="ultra-luxury">Ultra Luxury</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Accommodation
                  </label>
                  <select
                    value={form.accommodation}
                    onChange={(e) =>
                      updateForm({ accommodation: e.target.value as FormState["accommodation"] })
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                  >
                    <option value="hotel">Hotel</option>
                    <option value="hostel">Hostel</option>
                    <option value="resort">Resort</option>
                    <option value="apartment">Apartment</option>
                    <option value="guesthouse">Guesthouse</option>
                    <option value="camping">Camping</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Travelers
                  </label>
                  <select
                    value={form.travelers}
                    onChange={(e) =>
                      updateForm({ travelers: e.target.value as FormState["travelers"] })
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                  >
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family</option>
                    <option value="friends">Friends</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Dietary
                  </label>
                  <select
                    value={form.dietaryPlan}
                    onChange={(e) =>
                      updateForm({ dietaryPlan: e.target.value as FormState["dietaryPlan"] })
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                  >
                    <option value="none">No preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                    <option value="kosher">Kosher</option>
                    <option value="gluten-free">Gluten-free</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Must-haves or vibe
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateForm({ notes: e.target.value })}
                  placeholder="Share must-see spots, preferred pace, interests, accessibility needs, or the vibe you're chasing."
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/30"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Signed-in travelers can revisit up to 12 itineraries in their history.
                </p>
                <button
                  type="submit"
                  disabled={!canSubmit || isGenerating}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate my plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
              <TripPlan plan={plan} isLoading={isGenerating} onGenerateNew={resetPlanner} />
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                <span className="font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Recent itineraries
                </span>
                <span>{history.length ? `${history.length} saved` : "No saved trips yet"}</span>
              </div>
              <div className="space-y-3">
                {history.length ? (
                  history.map((trip) => (
                    <article
                      key={trip.id}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">{trip.destination}</p>
                      <p className="text-xs text-slate-500">
                        {friendlyDate(trip.start_date)} → {friendlyDate(trip.end_date)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {trip.travelers?.toUpperCase() || "N/A"} • {trip.budget?.toUpperCase() || "N/A"}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                    Sign in and generate a plan to build your personal travel library.
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PlannerShell;
