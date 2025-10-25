"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TripsRow } from "@/types/supabase";
import type { FormData, TravelItinerary } from "@/types/itinerary";
import { supabase } from "@/utils/supabaseClient";
import PlanWizard from "@/components/plan/PlanWizard";
import PlanMessage from "@/components/plan/PlanMessage";
import { nanoid } from "nanoid";
import { Sparkles, Plus, Send, Loader2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

type PlannerProps = {
  initialTrips: TripsRow[];
  userId: string | null;
};

type TextMessage = {
  id: string;
  type: "text";
  role: "assistant" | "user";
  content: string;
};

type WizardMessage = {
  id: string;
  type: "wizard";
  role: "assistant";
};

type PlanPreviewMessage = {
  id: string;
  type: "plan";
  role: "assistant";
  itinerary: TravelItinerary;
  savedTripId?: string;
};

type ChatMessage = TextMessage | WizardMessage | PlanPreviewMessage;

export default function PlanChatShell({ initialTrips, userId }: PlannerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: nanoid(),
      type: "text",
      role: "assistant",
      content:
        "Hello, I’m Roamy—your AI travel concierge. Ask me anything travel-related: destination ideas, packing tips, seasonal insights, or hidden gems.",
    },
    {
      id: nanoid(),
      type: "text",
      role: "assistant",
      content:
        "When you’re ready, tap Plan a trip to build a full itinerary together. I only handle travel topics—so every answer keeps your adventure in focus.",
    },
  ]);
  const [history, setHistory] = useState<TripsRow[]>(initialTrips);
  const [, setActiveWizardId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const supabaseClient = supabase;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shouldStickToBottom = useRef(true);

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const startWizard = useCallback(() => {
    const wizardId = nanoid();
    appendMessage({ id: wizardId, type: "wizard", role: "assistant" });
    setActiveWizardId(wizardId);
  }, [appendMessage]);

  const textHistoryForLLM = useMemo(() => {
    return messages
      .filter((msg): msg is TextMessage => msg.type === "text")
      .map((msg) => ({ role: msg.role, content: msg.content }));
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isResponding || isGeneratingPlan) return;

    const userMessage: TextMessage = {
      id: nanoid(),
      type: "text",
      role: "user",
      content: trimmed,
    };
    appendMessage(userMessage);
    setInput("");
    setIsResponding(true);

    try {
      const response = await fetch("/api/travel-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...textHistoryForLLM, { role: "user", content: trimmed }],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to get a response from Roamy");
      }
      appendMessage({
        id: nanoid(),
        type: "text",
        role: "assistant",
        content: data.reply,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
      appendMessage({
        id: nanoid(),
        type: "text",
        role: "assistant",
        content: "I’m having trouble responding right now. Please try again shortly.",
      });
    } finally {
      setIsResponding(false);
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    if (shouldStickToBottom.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isResponding, isGeneratingPlan]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
    shouldStickToBottom.current = scrollTop + clientHeight >= scrollHeight - 32;
  };

  const handleGeneratePlan = async (payload: FormData) => {
    setIsGeneratingPlan(true);
    setActiveWizardId(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate itinerary");
      }

      const itinerary = data.itinerary as TravelItinerary;
      appendMessage({
        id: nanoid(),
        type: "plan",
        role: "assistant",
        itinerary,
      });
      toast.success("Here is your itinerary!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      toast.error(message);
      appendMessage({
        id: nanoid(),
        type: "text",
        role: "assistant",
        content:
          "I couldn’t generate the itinerary just now, but let’s keep exploring destinations or try planning again later.",
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleSaveItinerary = useCallback(
    async (messageId: string, itinerary: TravelItinerary) => {
      if (!supabaseClient || !userId) {
        toast.error("You need to sign in to save itineraries.");
        return;
      }
      try {
        const { data, error } = await supabaseClient
          .from("trips")
          .insert({
            user_id: userId,
            destination: itinerary.trip_overview.destination,
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            budget: itinerary.trip_overview.budget_level,
            accommodation: itinerary.trip_overview.accommodation,
            travelers: itinerary.trip_overview.travelers,
            itinerary: JSON.parse(JSON.stringify(itinerary)),
          })
          .select("*")
          .single();

        if (error) {
          throw error;
        }

        toast.success("Itinerary saved to your library.");
        setHistory((prev) => [data, ...prev].slice(0, 12));
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId && msg.type === "plan" ? { ...msg, savedTripId: data.id } : msg)),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save itinerary.";
        toast.error(message);
      }
    },
    [supabaseClient, userId],
  );

  const handleSelectHistory = useCallback((trip: TripsRow) => {
    const itinerary = trip.itinerary as unknown as TravelItinerary | null;
    if (!itinerary) {
      toast.error("This saved entry is missing itinerary details.");
      return;
    }
    appendMessage({
      id: nanoid(),
      type: "plan",
      role: "assistant",
      itinerary,
      savedTripId: trip.id,
    });
  }, [appendMessage]);

  const resetConversation = () => {
    setMessages((prev) => prev.slice(0, 2));
    setActiveWizardId(null);
    setInput("");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-slate-100">
      <aside className="hidden w-[260px] flex-col border-r border-slate-200 bg-white p-4 xl:w-[300px] lg:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Roamy AI</h2>
          <button
            type="button"
            onClick={resetConversation}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
          >
            <Plus className="h-3 w-3" />
            New chat
          </button>
        </div>
        <div className="mt-6 space-y-2 text-xs">
          <p className="text-slate-500 uppercase tracking-[0.25em]">Saved itineraries</p>
          <div className="space-y-2 overflow-y-auto">
            {history.length ? (
              history.map((trip) => (
                <button
                  key={trip.id}
                  type="button"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-xs text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => handleSelectHistory(trip)}
                >
                  <p className="font-semibold text-slate-900">{trip.destination}</p>
                  <p className="mt-0.5">{friendlyDate(trip.start_date)}</p>
                </button>
              ))
            ) : (
              <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500">
                Saved plans will appear here once you generate and save them.
              </p>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-white via-slate-50 to-blue-100">
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-3 pb-32 pt-8 sm:px-6"
          >
            <div className="flex flex-col gap-6">
            {messages.map((message) => {
              if (message.type === "text") {
                const isAssistant = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"} px-1`}
                  >
                    <div className={`flex max-w-[90%] items-start gap-3 sm:max-w-[85%]`}>
                      {isAssistant && (
                        <div className="relative mt-0.5 h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-blue-200 bg-blue-50">
                          <Image src="/favicon.png" alt="Roamy AI" fill sizes="36px" className="object-contain p-1" />
                        </div>
                      )}
                      <div
                        className={`flex-1 rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isAssistant
                            ? "border-slate-200 bg-white text-slate-700"
                            : "border-blue-500/50 bg-blue-600 text-white shadow-lg"
                        }`}
                      >
                        {parseContent(message.content).map((block) =>
                          block.type === "list" ? (
                            <ul key={block.id} className="ml-4 list-disc space-y-1 text-sm">
                              {block.items.map((item, idx) => (
                                <li key={idx} className="whitespace-pre-wrap">
                                  {renderInlineMarkdown(item)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p key={block.id} className="whitespace-pre-wrap">
                              {renderInlineMarkdown(block.content)}
                            </p>
                          ),
                        )}
                        {isAssistant && message.content.includes("Plan a trip") && (
                          <button
                            type="button"
                            onClick={startWizard}
                            className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-100"
                          >
                            <Sparkles className="h-4 w-4" />
                            Plan a trip
                          </button>
                        )}
                      </div>
                      {!isAssistant && (
                        <div className="hidden h-9 w-9 flex-shrink-0 rounded-full bg-blue-600 text-center text-white sm:flex sm:items-center sm:justify-center">
                          You
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              if (message.type === "wizard") {
                return (
                  <div key={message.id} className="flex justify-start px-1">
                    <PlanWizard
                      initialValues={{
                        destination: "",
                        startDate: "",
                        endDate: "",
                        budget: "moderate",
                        accommodation: "hotel",
                        travelers: "couple",
                        dietaryPlan: "none",
                        notes: "",
                      }}
                      onSubmit={handleGeneratePlan}
                      onCancel={() => setMessages((prev) => prev.filter((msg) => msg.id !== message.id))}
                      isSubmitting={isGeneratingPlan}
                    />
                  </div>
                );
              }

              if (message.type === "plan") {
                return (
                  <div key={message.id} className="flex justify-start px-1">
                    <PlanMessage
                      itinerary={message.itinerary}
                      onSave={
                        message.savedTripId
                          ? undefined
                          : () => handleSaveItinerary(message.id, message.itinerary)
                      }
                      isSaving={false}
                      saved={Boolean(message.savedTripId)}
                    />
                  </div>
                );
              }

              return null;
            })}
            </div>
          </div>

          <div className="sticky bottom-0 w-full border-t border-slate-200 bg-white/95 px-3 py-4 backdrop-blur sm:px-6">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow sm:px-4">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Ask Roamy anything about travel…"
                className="flex-1 border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || isResponding || isGeneratingPlan}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isResponding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Roamy answers travel-related questions only. Ask for inspiration, logistics, or start planning when you&apos;re ready.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function friendlyDate(value: string) {
  try {
    return formatDate(new Date(value));
  } catch {
    return value;
  }
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

type ContentBlock =
  | { id: string; type: "paragraph"; content: string }
  | { id: string; type: "list"; items: string[] };

function parseContent(content: string): ContentBlock[] {
  const rows = content.split(/\n{2,}/).map((chunk) => chunk.trim()).filter(Boolean);
  const blocks: ContentBlock[] = [];

  rows.forEach((row) => {
    const lines = row.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    if (!lines.length) return;

    const isList = lines.every((line) => /^[-*]\s+/.test(line));
    if (isList) {
      blocks.push({
        id: nanoid(),
        type: "list",
        items: lines.map((line) => line.replace(/^[-*]\s+/, "")),
      });
    } else {
      blocks.push({ id: nanoid(), type: "paragraph", content: lines.join("\n") });
    }
  });

  if (!blocks.length) {
    blocks.push({ id: nanoid(), type: "paragraph", content });
  }

  return blocks;
}

function renderInlineMarkdown(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}
