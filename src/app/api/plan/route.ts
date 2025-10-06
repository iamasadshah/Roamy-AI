import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateTripPlan } from '@/utils/gemini';
import type { FormData, TravelItinerary } from '@/types/itinerary';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<FormData>;

    // Basic validation
    const required: (keyof FormData)[] = [
      'destination',
      'startDate',
      'endDate',
      'budget',
      'accommodation',
      'travelers',
      'dietaryPlan',
    ];

    for (const key of required) {
      if (!body[key] || typeof body[key] !== 'string' || `${body[key]}`.trim() === '') {
        return NextResponse.json({ error: `Missing or invalid field: ${key}` }, { status: 400 });
      }
    }

    const itinerary: TravelItinerary = await generateTripPlan(body as FormData);
    return NextResponse.json({ itinerary });
  } catch (err) {
    console.error('Error in /api/plan:', err);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
