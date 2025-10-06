"use client";

import React, { useCallback, useMemo, useState } from "react";
import ChatPlanForm from "@/components/ChatPlanForm";
import StructuredItinerary from "@/components/StructuredItinerary";
import type { FormData, TravelItinerary } from "@/types/itinerary";
import { motion } from "framer-motion";

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelItinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitPlan = useCallback(async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to generate plan");
      }
      setPlan(json.itinerary as TravelItinerary);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadAsText = useCallback(() => {
    if (!plan) return;

    const lines: string[] = [];
    lines.push(`Destination: ${plan.trip_overview.destination}`);
    lines.push(`Dates: ${plan.trip_overview.dates}`);
    lines.push(`Duration: ${plan.trip_overview.duration}`);
    lines.push(`Budget: ${plan.trip_overview.budget_level}`);
    lines.push(`Accommodation: ${plan.trip_overview.accommodation}`);
    lines.push(`Travelers: ${plan.trip_overview.travelers}`);
    lines.push(`Dietary Plan: ${plan.trip_overview.dietary_plan}`);
    lines.push("");
    lines.push("Itinerary:");
    for (const day of plan.itinerary) {
      lines.push("");
      lines.push(`Day ${day.day}: ${day.day_title}`);
      lines.push(day.day_description);
      lines.push(`Highlights: ${(day.highlights || []).join(", ")}`);
      lines.push(`Estimated Cost: ${day.total_estimated_cost}`);
      const section = (title: string, acts: any[]) => {
        if (!Array.isArray(acts) || acts.length === 0) return;
        lines.push("");
        lines.push(`${title}`);
        for (const a of acts) {
          lines.push(`- ${a.time} • ${a.title} • ${a.location} • ${a.duration}${a.cost ? ` • ${a.cost}` : ""}`);
          if (a.description) lines.push(`  ${a.description}`);
        }
      };
      section("Morning", day.morning);
      section("Afternoon", day.afternoon);
      section("Evening", day.evening);
      if (Array.isArray(day.meals) && day.meals.length > 0) {
        lines.push("");
        lines.push("Meals");
        for (const m of day.meals) {
          lines.push(`- ${m.time} • ${m.restaurant_name} • ${m.cuisine_type} • ${m.location} • ${m.cost_range}`);
          if (Array.isArray(m.must_try_dishes) && m.must_try_dishes.length) {
            lines.push(`  Must-try: ${m.must_try_dishes.join(", ")}`);
          }
        }
      }
    }
    lines.push("");
    lines.push("Additional Info:");
    lines.push(`Weather: ${plan.additional_info.weather_forecast}`);
    if (Array.isArray(plan.additional_info.packing_tips))
      lines.push(`Packing Tips: ${plan.additional_info.packing_tips.join("; ")}`);
    if (plan.additional_info.local_currency)
      lines.push(`Currency: ${plan.additional_info.local_currency.code} • 1 USD = ${plan.additional_info.local_currency.exchangeRate} ${plan.additional_info.local_currency.code}`);
    if (Array.isArray(plan.additional_info.transportation))
      lines.push(`Transportation: ${plan.additional_info.transportation.join("; ")}`);
    if (plan.additional_info.emergency)
      lines.push(`Emergency: Police ${plan.additional_info.emergency.police}, Ambulance ${plan.additional_info.emergency.ambulance}${plan.additional_info.emergency.touristPolice ? ", Tourist Police " + plan.additional_info.emergency.touristPolice : ""}`);

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RoamyAI_${plan.trip_overview.destination.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [plan]);

  const resultContent = useMemo(() => {
    if (!plan) return null;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">Your Personalized Itinerary</h3>
          <button
            onClick={downloadAsText}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Download as .txt
          </button>
        </div>
        <StructuredItinerary itinerary={plan} />
      </div>
    );
  }, [plan, downloadAsText]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6"
        >
          RoamyAI Planner
        </motion.h1>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <ChatPlanForm onSubmit={submitPlan} isLoading={isLoading} resultContent={resultContent} />
      </div>
    </main>
  );
}
