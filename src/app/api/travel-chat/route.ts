import { NextResponse } from "next/server";
import {
  generateTravelChatReply,
  type TravelChatMessage,
} from "@/server/services/ai/generateTravelChatReply";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages: TravelChatMessage[] };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "Messages payload is required." }, { status: 400 });
    }

    const reply = await generateTravelChatReply(body.messages);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("travel-chat error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate travel response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
