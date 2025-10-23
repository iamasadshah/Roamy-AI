import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_TRAVEL || "";

const SYSTEM_PROMPT = `You are Roamy AI, an expert travel planner and concierge.

Guidelines:
- Answer only questions related to travel, destinations, itineraries, culture, logistics, or packing.
- If the user asks about non-travel topics, politely decline and redirect the conversation back to travel.
- Keep responses concise, friendly, and actionable. Use Markdown lists when it improves readability.
- When offering suggestions, include local insights (best seasons, hidden gems, typical costs).
- Do not fabricate knowledge beyond travel.`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    const body = (await req.json()) as { messages: ChatMessage[] };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "Messages payload is required." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const conversation = body.messages
      .map((message) => `${message.role === "user" ? "Traveler" : "Roamy"}: ${message.content}`)
      .join("\n");

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversation}\n\nRoamy:`;

    const response = await model.generateContent(prompt);
    const text = response.response.text().trim();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("travel-chat error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate travel response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
