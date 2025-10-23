"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { FaGlobe, FaSearch, FaHotel, FaBed, FaUmbrellaBeach, FaHome, FaUser, FaUserFriends, FaLeaf, FaHeart, FaUsers } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import type { FormData } from "@/types/itinerary";
import Image from "next/image";

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  resultContent?: React.ReactNode;
}

// Small helper types for chat rendering
interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: React.ReactNode;
  time: number;
}

// Destination picker with real-time suggestions (Nominatim OSM)
type PlaceSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
};

const DestinationInput = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [highlight, setHighlight] = useState<number>(-1);

  // Fetch suggestions as user types
  useEffect(() => {
    const q = (searchTerm || value).trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    let active = true;
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=1&limit=8`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const data: PlaceSuggestion[] = await res.json();
        if (active) setSuggestions(data || []);
      } catch {
        if (active) setSuggestions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => { active = false; clearTimeout(timeout); };
  }, [searchTerm, value]);

  const handleSelect = useCallback((label: string) => {
    onChange(label);
    setSearchTerm("");
    setIsOpen(false);
    setHighlight(-1);
  }, [onChange]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min((suggestions.length || 0) - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(-1, h - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlight >= 0 && suggestions[highlight]) {
        handleSelect(suggestions[highlight].display_name);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0].display_name);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full p-4 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-12 text-base font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          placeholder="Search for your destination (city, region, country)..."
          value={value || searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); setHighlight(-1); }}
          onFocus={() => { setIsOpen(true); }}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-[75vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Select your destination</h3>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all text-base font-medium shadow-lg"
                    placeholder="Type a city, region, or country..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setHighlight(-1); }}
                    autoFocus
                    onKeyDown={onKeyDown}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="p-10 text-center text-gray-500">Searching…</div>
                ) : suggestions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {suggestions.map((s, idx) => (
                      <button
                        key={s.place_id}
                        className={`flex items-center p-4 text-left text-gray-700 border-2 rounded-xl transition-all shadow-sm hover:shadow-lg ${highlight === idx ? 'border-blue-300 bg-blue-50' : 'border-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300'}`}
                        onClick={() => handleSelect(s.display_name)}
                        onMouseEnter={() => setHighlight(idx)}
                      >
                        <FaGlobe className="text-blue-500 mr-3 shrink-0" />
                        <span className="flex-1 truncate font-semibold">{s.display_name}</span>
                        <span className="text-blue-500 ml-2">→</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-gray-500">
                    <FaSearch className="mx-auto mb-4 text-4xl text-gray-300" />
                    Start typing to search places
                  </div>
                )}
                <div className="mt-6 text-xs text-gray-400 text-center">Data © OpenStreetMap contributors</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatPlanForm: React.FC<Props> = ({ onSubmit, isLoading, resultContent }) => {
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    accommodation: "",
    travelers: "",
    dietaryPlan: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "m0", role: "bot", time: Date.now(), content: (
      <div>
        <div className="font-semibold">Hi there, I&apos;m Roamy.</div>
        <div>Let&apos;s craft your perfect getaway. Where would you like to travel?</div>
      </div>
    ) }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persistent history (messages, formData, currentStep)
  const STORAGE_KEY = "chat_plan_state_v1";
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.messages && parsed?.formData && typeof parsed?.currentStep === "number") {
          setMessages(parsed.messages);
          setFormData(parsed.formData);
          setCurrentStep(parsed.currentStep);
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, formData, currentStep }));
    } catch {}
  }, [messages, formData, currentStep]);

  const todayStr = () => new Date().toISOString().split("T")[0];
  const getMaxEndDate = (start: string) => {
    if (!start) return "";
    const s = new Date(start);
    const e = new Date(s);
    e.setDate(s.getDate() + 10);
    return e.toISOString().split("T")[0];
  };

  const pushBot = (content: React.ReactNode) => setMessages((prev) => [...prev, { id: `b-${prev.length}`, role: "bot", content, time: Date.now() }]);
  const pushUser = (content: React.ReactNode) => setMessages((prev) => [...prev, { id: `u-${prev.length}`, role: "user", content, time: Date.now() }]);

  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, botTyping, resultContent]);

  const nextFromDestination = (val: string) => {
    setFormData((p) => ({ ...p, destination: val }));
    pushUser(<span>{val}</span>);
    setBotTyping(true);
    setTimeout(() => {
      pushBot(<span>Great! How many days are you planning? Please select your arrival and departure dates.</span>);
      setBotTyping(false);
      setCurrentStep(1);
    }, 350);
  };

  const nextFromDates = () => {
    pushUser(<span>{new Date(formData.startDate).toLocaleDateString()} → {new Date(formData.endDate).toLocaleDateString()}</span>);
    setBotTyping(true);
    setTimeout(() => {
      pushBot(<span>What budget range fits you best?</span>);
      setBotTyping(false);
      setCurrentStep(2);
    }, 350);
  };

  const nextFromBudget = (val: string, label: string) => {
    setFormData((p) => ({ ...p, budget: val }));
    pushUser(<span>Budget: {label}</span>);
    setBotTyping(true);
    setTimeout(() => {
      pushBot(<span>Where would you like to stay?</span>);
      setBotTyping(false);
      setCurrentStep(3);
    }, 350);
  };

  const nextFromAccommodation = (val: string, label: string) => {
    setFormData((p) => ({ ...p, accommodation: val }));
    pushUser(<span>Stay: {label}</span>);
    setBotTyping(true);
    setTimeout(() => {
      pushBot(<span>Who’s coming along?</span>);
      setBotTyping(false);
      setCurrentStep(4);
    }, 350);
  };

  const nextFromTravelers = (val: string, label: string) => {
    setFormData((p) => ({ ...p, travelers: val }));
    pushUser(<span>Travelers: {label}</span>);
    setBotTyping(true);
    setTimeout(() => {
      pushBot(<span>Any dietary preferences?</span>);
      setBotTyping(false);
      setCurrentStep(5);
    }, 350);
  };

  const finishWithDiet = (val: string, label: string) => {
    setFormData((p) => ({ ...p, dietaryPlan: val }));
    pushUser(<span>Diet: {label}</span>);
    setTimeout(() => {
      onSubmit({ ...formData, dietaryPlan: val });
    }, 100);
  };

  const dateValid = formData.startDate && formData.endDate && new Date(formData.endDate) > new Date(formData.startDate) && ((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000*60*60*24)) <= 10 && new Date(formData.startDate) >= new Date(todayStr());

  const timeline = useMemo(() => [
    "Destination",
    "Dates",
    "Budget",
    "Stay",
    "Travelers",
    "Dietary",
  ], []);

  const Bubble = ({ role, children, time }: { role: "bot" | "user"; children: React.ReactNode; time?: number }) => (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
      {role === "bot" && (
        <div className="w-8 h-8 shrink-0 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm">
          <Image src="/favicon.png" alt="Bot" width={32} height={32} />
        </div>
      )}
      <div className="relative">
        <div
          className={`
            ${role === "user" ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" : "bg-white/90 border border-white/40"} 
            max-w-[90vw] sm:max-w-[70vw] md:max-w-[55vw] rounded-2xl px-4 py-3 shadow-sm backdrop-blur
          `}
        >
          {children}
          {time && (
            <div className={`mt-1 text-[10px] ${role === "user" ? "text-blue-100" : "text-gray-400"}`}>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          )}
        </div>
        {/* Tail */}
        {role === "bot" ? (
          <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="absolute -left-2 bottom-2 h-3 w-3 rotate-45 border border-gray-200 bg-white" />
        ) : (
          <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} className="absolute -right-2 bottom-2 h-3 w-3 rotate-45 bg-indigo-600" />
        )}
      </div>
      {role === "user" && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm text-white">You</div>
      )}
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-full flex-col bg-gradient-to-br from-white/95 via-white to-blue-50/60">
        <div className="flex items-center justify-between border-b border-white/40 px-4 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Image src="/favicon.png" alt="Roamy AI" width={32} height={32} />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                Roamy AI Planner
              </p>
              <h2 className="mt-1 text-lg font-semibold text-gray-800">New Travel Session</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="hidden items-center gap-1 sm:flex">
              {timeline.map((label, idx) => (
                <span
                  key={label}
                  className={`h-1.5 w-6 rounded-full transition ${
                    idx <= currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="rounded-full border border-white/60 px-3 py-1 font-semibold text-gray-600 shadow-sm">
              Step {currentStep + 1} of 6
            </span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6 md:px-10"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (currentStep === 1 && dateValid && !isLoading) nextFromDates();
            }
          }}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col space-y-4">
            {messages.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <Bubble role={m.role} time={m.time}>{m.content}</Bubble>
              </motion.div>
            ))}
            {botTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl border border-white/40 bg-white px-4 py-2 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '120ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '240ms' }} />
                </div>
              </div>
            )}
            {resultContent && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <Bubble role="bot" time={Date.now()}>
                  {resultContent}
                </Bubble>
              </motion.div>
            )}
            <div className="h-2" />
          </div>
        </div>

        <div className="border-t border-white/60 bg-white/80 px-4 py-5 backdrop-blur">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white px-4 py-3 text-xs text-gray-500 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                Roamy is waiting for your reply
              </div>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  className="rounded-full border border-gray-200 px-3 py-1 font-semibold text-gray-600 transition hover:border-blue-300 hover:text-blue-600"
                >
                  Back a step
                </button>
              )}
            </div>

            {currentStep === 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="mt-2">
                    <DestinationInput value={formData.destination} onChange={nextFromDestination} />
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px w-full bg-gray-200" />
                    <div className="px-2 text-xs text-gray-400">Step 2 • Dates</div>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="arrival-date">Arrival Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/20"
                        min={todayStr()}
                        id="arrival-date"
                        aria-label="Arrival date"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="departure-date">Departure Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/20"
                        min={formData.startDate || todayStr()}
                        max={getMaxEndDate(formData.startDate)}
                        id="departure-date"
                        aria-label="Departure date"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button disabled={!dateValid || isLoading} onClick={nextFromDates} className={`rounded-xl px-5 py-2 font-semibold transition ${dateValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500"}`}>
                      Continue
                    </button>
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px w-full bg-gray-200" />
                    <div className="px-2 text-xs text-gray-400">Step 3 • Budget</div>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "budget", label: "Budget", icon: "💰" },
                      { value: "moderate", label: "Moderate", icon: "💳" },
                      { value: "luxury", label: "Luxury", icon: "👑" },
                      { value: "ultra-luxury", label: "Ultra Luxury", icon: "⭐" },
                    ].map((o) => (
                      <button key={o.value} className={`rounded-xl border-2 p-3 text-left transition ${formData.budget === o.value ? "border-blue-600 bg-blue-600/10 text-blue-700 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300"}`} onClick={() => nextFromBudget(o.value, o.label)}>
                        <div className="text-2xl">{o.icon}</div>
                        <div className="mt-1 font-semibold">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px w-full bg-gray-200" />
                    <div className="px-2 text-xs text-gray-400">Step 4 • Stay</div>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {[
                      { value: "hotel", label: "Hotel", icon: <FaHotel /> },
                      { value: "hostel", label: "Hostel", icon: <FaBed /> },
                      { value: "resort", label: "Resort", icon: <FaUmbrellaBeach /> },
                      { value: "apartment", label: "Apartment", icon: <FaHome /> },
                      { value: "guesthouse", label: "Guesthouse", icon: <FaUser /> },
                      { value: "camping", label: "Camping", icon: <FaLeaf /> },
                    ].map((o) => (
                      <button key={o.value} className={`flex flex-col items-center rounded-xl border-2 p-3 transition ${formData.accommodation === o.value ? "border-blue-600 bg-blue-600/10 text-blue-700 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300"}`} onClick={() => nextFromAccommodation(o.value, o.label)}>
                        <div className="text-2xl">{o.icon}</div>
                        <div className="mt-1 font-semibold">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px w-full bg-gray-200" />
                    <div className="px-2 text-xs text-gray-400">Step 5 • Travelers</div>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { value: "solo", label: "Solo", icon: <FaUser /> },
                      { value: "couple", label: "Couple", icon: <FaHeart /> },
                      { value: "family", label: "Family", icon: <FaUsers /> },
                      { value: "friends", label: "Friends", icon: <FaUserFriends /> },
                    ].map((o) => (
                      <button key={o.value} className={`flex flex-col items-center rounded-xl border-2 p-3 transition ${formData.travelers === o.value ? "border-blue-600 bg-blue-600/10 text-blue-700 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300"}`} onClick={() => nextFromTravelers(o.value, o.label)}>
                        <div className="text-2xl">{o.icon}</div>
                        <div className="mt-1 font-semibold">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px w-full bg-gray-200" />
                    <div className="px-2 text-xs text-gray-400">Step 6 • Dietary</div>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {[
                      { value: "none", label: "No Preference" },
                      { value: "vegetarian", label: "Vegetarian" },
                      { value: "vegan", label: "Vegan" },
                      { value: "halal", label: "Halal" },
                      { value: "kosher", label: "Kosher" },
                      { value: "gluten-free", label: "Gluten-free" },
                    ].map((o) => (
                      <button key={o.value} className={`rounded-xl border-2 p-3 transition ${formData.dietaryPlan === o.value ? "border-blue-600 bg-blue-600/10 text-blue-700 shadow-sm" : "border-gray-200 bg-white hover:border-blue-300"}`} onClick={() => finishWithDiet(o.value, o.label)}>
                        <div className="font-semibold">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </Bubble>
              </motion.div>
            )}

            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
              <span className="order-2 sm:order-1">Answer the prompts above to continue.</span>
              {isLoading && (
                <div className="order-1 flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-600 sm:order-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing your itinerary…
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default ChatPlanForm;
