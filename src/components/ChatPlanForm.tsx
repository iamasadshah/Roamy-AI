"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { FaGlobe, FaSearch, FaHotel, FaBed, FaUmbrellaBeach, FaHome, FaUser, FaUserFriends, FaLeaf, FaHeart, FaUsers } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import type { FormData } from "@/types/itinerary";

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

// Small helper types for chat rendering
interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: React.ReactNode;
  time: number;
}

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan","Thailand","Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Venezuela","Vietnam","Yemen",
];

// Destination picker (duplicated from MultiStepForm, adjusted to standalone)
const DestinationInput = ({ value, onChange }: { value: string; onChange: (value: string) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    const search = (searchTerm || value).toLowerCase();
    return countries.filter((country) => country.toLowerCase().includes(search));
  }, [searchTerm, value]);

  const handleSelect = useCallback((country: string) => {
    onChange(country);
    setSearchTerm("");
    setIsOpen(false);
  }, [onChange]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          className="w-full p-4 rounded-2xl bg-white/95 text-gray-800 placeholder-gray-500 backdrop-blur-sm border-2 border-gray-200 pr-12 text-base font-medium focus:ring-4 focus:ring-blue-400/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          placeholder="Search for your destination..."
          value={value || searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); }}
          onFocus={() => { setIsOpen(true); }}
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
                    placeholder="Type to search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country}
                        className="flex items-center p-4 text-left text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 border-2 border-transparent rounded-xl transition-all shadow-sm hover:shadow-lg"
                        onClick={() => handleSelect(country)}
                      >
                        <FaGlobe className="text-blue-500 mr-3" />
                        <span className="flex-1 truncate font-semibold">{country}</span>
                        <span className="text-blue-500 ml-2">→</span>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 p-10 text-center text-gray-500">
                      <FaSearch className="mx-auto mb-4 text-4xl text-gray-300" />
                      No countries found matching your search
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatPlanForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m0", role: "bot", time: Date.now(), content: (
      <div>
        <div className="font-semibold">Hi! I can craft your perfect trip.</div>
        <div>First, where would you like to go?</div>
      </div>
    ) }
  ]);

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

  const Bubble = ({ role, children, time }: { role: "bot" | "user"; children: React.ReactNode; time?: number }) => (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
      {role === "bot" && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm shrink-0">AI</div>
      )}
      <div className={`${role === "user" ? "bg-blue-600 text-white" : "bg-white border"} max-w-[90%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm`}>{children}
        {time && (
          <div className={`mt-1 text-[10px] ${role === "user" ? "text-blue-100" : "text-gray-400"}`}>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        )}
      </div>
      {role === "user" && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shrink-0">You</div>
      )}
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/30 shadow-2xl flex flex-col">
          {/* Top bar with Back navigation */}
          <div className="flex items-center justify-between p-2 sm:p-3 border-b border-white/40 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${currentStep > 0 ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-gray-50 text-gray-400 cursor-not-allowed"}`}
              disabled={currentStep === 0}
              onClick={() => { setCurrentStep((s) => Math.max(0, s - 1)); }}
              aria-label="Go back to previous step"
            >
              Back
            </button>
            <div className="text-xs text-gray-500">Step {currentStep + 1} of 6</div>
          </div>
          <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-6">
            <div>
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Bubble role={m.role} time={m.time}>{m.content}</Bubble>
                </motion.div>
              ))}
              {botTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 bg-white border rounded-2xl px-4 py-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>
              )}
            </div>
            <div />

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
                    <div className="h-px bg-gray-200 w-full" />
                    <div className="px-2 text-xs text-gray-400">Step 2 • Dates</div>
                    <div className="h-px bg-gray-200 w-full" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="arrival-date">Arrival Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl text-sm sm:text-base"
                        min={todayStr()}
                        id="arrival-date"
                        aria-label="Arrival date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="departure-date">Departure Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl text-sm sm:text-base"
                        min={formData.startDate || todayStr()}
                        max={getMaxEndDate(formData.startDate)}
                        id="departure-date"
                        aria-label="Departure date"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button disabled={!dateValid || isLoading} onClick={nextFromDates} className={`px-5 py-2 rounded-xl font-semibold ${dateValid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                      Next
                    </button>
                  </div>
                </Bubble>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Bubble role="bot">
                  <div className="my-2 flex items-center justify-center">
                    <div className="h-px bg-gray-200 w-full" />
                    <div className="px-2 text-xs text-gray-400">Step 3 • Budget</div>
                    <div className="h-px bg-gray-200 w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "budget", label: "Budget", icon: "💰" },
                      { value: "moderate", label: "Moderate", icon: "💳" },
                      { value: "luxury", label: "Luxury", icon: "👑" },
                      { value: "ultra-luxury", label: "Ultra Luxury", icon: "⭐" },
                    ].map((o) => (
                      <button key={o.value} className={`p-3 sm:p-4 rounded-xl border-2 ${formData.budget === o.value ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200"}`} onClick={() => nextFromBudget(o.value, o.label)}>
                        <div className="text-2xl mb-1">{o.icon}</div>
                        <div className="font-semibold">{o.label}</div>
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
                    <div className="h-px bg-gray-200 w-full" />
                    <div className="px-2 text-xs text-gray-400">Step 4 • Stay</div>
                    <div className="h-px bg-gray-200 w-full" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: "hotel", label: "Hotel", icon: <FaHotel /> },
                      { value: "hostel", label: "Hostel", icon: <FaBed /> },
                      { value: "resort", label: "Resort", icon: <FaUmbrellaBeach /> },
                      { value: "apartment", label: "Apartment", icon: <FaHome /> },
                      { value: "guesthouse", label: "Guesthouse", icon: <FaUser /> },
                      { value: "camping", label: "Camping", icon: <FaLeaf /> },
                    ].map((o) => (
                      <button key={o.value} className={`p-3 sm:p-4 rounded-xl border-2 flex flex-col items-center ${formData.accommodation === o.value ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200"}`} onClick={() => nextFromAccommodation(o.value, o.label)}>
                        <div className="text-2xl mb-1">{o.icon}</div>
                        <div className="font-semibold">{o.label}</div>
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
                    <div className="h-px bg-gray-200 w-full" />
                    <div className="px-2 text-xs text-gray-400">Step 5 • Travelers</div>
                    <div className="h-px bg-gray-200 w-full" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: "solo", label: "Solo", icon: <FaUser /> },
                      { value: "couple", label: "Couple", icon: <FaHeart /> },
                      { value: "family", label: "Family", icon: <FaUsers /> },
                      { value: "friends", label: "Friends", icon: <FaUserFriends /> },
                    ].map((o) => (
                      <button key={o.value} className={`p-3 sm:p-4 rounded-xl border-2 flex flex-col items-center ${formData.travelers === o.value ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200"}`} onClick={() => nextFromTravelers(o.value, o.label)}>
                        <div className="text-2xl mb-1">{o.icon}</div>
                        <div className="font-semibold">{o.label}</div>
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
                    <div className="h-px bg-gray-200 w-full" />
                    <div className="px-2 text-xs text-gray-400">Step 6 • Dietary</div>
                    <div className="h-px bg-gray-200 w-full" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: "none", label: "No Preference" },
                      { value: "vegetarian", label: "Vegetarian" },
                      { value: "vegan", label: "Vegan" },
                      { value: "halal", label: "Halal" },
                      { value: "kosher", label: "Kosher" },
                      { value: "gluten-free", label: "Gluten-free" },
                    ].map((o) => (
                      <button key={o.value} className={`p-3 sm:p-4 rounded-xl border-2 ${formData.dietaryPlan === o.value ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200"}`} onClick={() => finishWithDiet(o.value, o.label)}>
                        <div className="font-semibold">{o.label}</div>
                      </button>
                    ))}
                  </div>
                </Bubble>
              </motion.div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t bg-white/70 flex items-center justify-between sticky bottom-0" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)" }}>
            <div className="text-sm text-gray-500">Fill the steps in chat to generate your itinerary.</div>
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </div>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default ChatPlanForm;
