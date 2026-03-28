"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { FormData } from "@/types/itinerary";

type PlanWizardProps = {
  initialValues: FormData;
  onSubmit: (values: FormData) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
};

const budgetOptions: FormData["budget"][] = ["budget", "moderate", "luxury", "ultra-luxury"];
const accommodationOptions: FormData["accommodation"][] = [
  "hotel",
  "hostel",
  "resort",
  "apartment",
  "guesthouse",
  "camping",
];
const travelerOptions: FormData["travelers"][] = ["solo", "couple", "family", "friends"];
const dietOptions: FormData["dietaryPlan"][] = [
  "none",
  "vegetarian",
  "vegan",
  "halal",
  "kosher",
  "gluten-free",
];

export default function PlanWizard({ initialValues, onSubmit, onCancel, isSubmitting }: PlanWizardProps) {
  const [form, setForm] = useState<FormData>(initialValues);

  const update = (patch: Partial<FormData>) => setForm((prev) => ({ ...prev, ...patch }));

  const canSubmit =
    form.destination.trim().length > 1 &&
    form.startDate &&
    form.endDate &&
    new Date(form.endDate) >= new Date(form.startDate);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900">Let&apos;s map your itinerary</h3>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the essentials and Roamy will craft the perfect journey.
      </p>

      <form
        className="mt-6 grid gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !isSubmitting) onSubmit(form);
        }}
      >
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Destination
          </label>
          <input
            value={form.destination}
            onChange={(e) => update({ destination: e.target.value })}
            placeholder="City, region, or country"
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Arrival
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => update({ startDate: e.target.value })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Departure
            </label>
            <input
              type="date"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={(e) => update({ endDate: e.target.value })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Budget
            </label>
            <select
              value={form.budget}
              onChange={(e) => update({ budget: e.target.value as FormData["budget"] })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            >
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Accommodation
            </label>
            <select
              value={form.accommodation}
              onChange={(e) => update({ accommodation: e.target.value as FormData["accommodation"] })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            >
              {accommodationOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Travelers
            </label>
            <select
              value={form.travelers}
              onChange={(e) => update({ travelers: e.target.value as FormData["travelers"] })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            >
              {travelerOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Dietary preferences
            </label>
            <select
              value={form.dietaryPlan}
              onChange={(e) => update({ dietaryPlan: e.target.value as FormData["dietaryPlan"] })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
            >
              {dietOptions.map((option) => (
                <option key={option} value={option}>
                  {option.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Preferences & must-haves
          </label>
          <textarea
            value={form.notes || ""}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Share interests, must-see spots, accessibility needs, budget notes, or the overall vibe."
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/40"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Need inspiration? Ask Roamy in the chat for destination ideas first.
          </div>
          <div className="flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate itinerary
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
