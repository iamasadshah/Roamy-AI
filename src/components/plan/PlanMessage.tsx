"use client";

import { useCallback, useRef, useState } from "react";
import type { TravelItinerary } from "@/types/itinerary";
import { Download, Check, Save } from "lucide-react";
import StructuredItinerary from "@/components/StructuredItinerary";
import html2pdf from "html2pdf.js";

type PlanMessageProps = {
  itinerary: TravelItinerary;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  saved?: boolean;
};

export default function PlanMessage({ itinerary, onSave, isSaving = false, saved = false }: PlanMessageProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      await html2pdf()
        .set({
          margin: 12,
          filename: `RoamyAI_${itinerary.trip_overview.destination.replace(/\s+/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 1.1, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(contentRef.current)
        .save();
    } finally {
      setDownloading(false);
    }
  }, [itinerary.trip_overview.destination]);

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Itinerary ready
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            {itinerary.trip_overview.destination}
          </h3>
          <p className="text-sm text-slate-500">
            {itinerary.trip_overview.dates} • {itinerary.trip_overview.duration} • Budget:{" "}
            {itinerary.trip_overview.budget_level}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onSave && (
            <button
              type="button"
              onClick={() => {
                if (!isSaving && !saved) void onSave();
              }}
              disabled={isSaving || saved}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:border-green-200 disabled:bg-green-50 disabled:text-green-600"
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? "Saved" : isSaving ? "Saving…" : "Save itinerary"}
            </button>
          )}
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Download className="h-4 w-4 animate-bounce" />
                Preparing…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div ref={contentRef} className="mt-6 space-y-6">
        <section className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Travelers
            </p>
            <p className="mt-1 text-sm text-slate-700">{itinerary.trip_overview.travelers}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Accommodation
            </p>
            <p className="mt-1 text-sm text-slate-700">{itinerary.trip_overview.accommodation}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Dietary
            </p>
            <p className="mt-1 text-sm text-slate-700">{itinerary.trip_overview.dietary_plan}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Weather
            </p>
            <p className="mt-1 text-sm text-slate-700">{itinerary.additional_info.weather_forecast}</p>
          </div>
        </section>

        <StructuredItinerary itinerary={itinerary} />
      </div>
    </div>
  );
}
