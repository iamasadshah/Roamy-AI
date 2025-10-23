import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database, TripsRow } from "@/types/supabase";
import PlanChatShell from "@/components/PlanChatShell";

export const metadata: Metadata = {
  title: "Plan a Trip",
  description:
    "Chat with Roamy AI to generate, save, and download bespoke travel itineraries tailored to your preferences.",
  alternates: {
    canonical: "/plan",
  },
};

export default async function PlanPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: tripsData } = session
    ? await supabase
        .from("trips")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(12)
    : { data: [] as TripsRow[] };

  return (
    <PlanChatShell
      initialTrips={tripsData ?? []}
      userId={session?.user.id ?? null}
    />
  );
}
