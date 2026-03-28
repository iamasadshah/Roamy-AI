import "server-only";

import { GoogleGenerativeAI } from "@google/generative-ai";

export type TravelChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_TRAVEL ?? "";

const SYSTEM_PROMPT = `You are Roamy AI, an expert travel planner and concierge.

Guidelines:
- Answer only questions related to travel, destinations, itineraries, culture, logistics, or packing.
- If the user asks about non-travel topics, politely decline and redirect the conversation back to travel.
- Keep responses concise, friendly, and actionable. Use Markdown lists when it improves readability.
- When offering suggestions, include local insights (best seasons, hidden gems, typical costs).
- Do not fabricate knowledge beyond travel.`;

export async function generateTravelChatReply(messages: TravelChatMessage[]) {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const conversation = messages
    .map((message) => `${message.role === "user" ? "Traveler" : "Roamy"}: ${message.content}`)
    .join("\n");

  const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversation}\n\nRoamy:`;
  const response = await model.generateContent(prompt);

  return response.response.text().trim();
}
