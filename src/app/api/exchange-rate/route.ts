
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency');

    if (!currency) {
      return NextResponse.json({ error: 'Currency code is required' }, { status: 400 });
    }

    const exchangeApiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API;
    if (!exchangeApiKey) {
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`,
      {
        headers: {
          'Authorization': `Bearer ${exchangeApiKey}`
        },
        timeout: 5000
      }
    );

    if (!response.data?.rates?.[currency]) {
      return NextResponse.json(
        { error: `Exchange rate not available for ${currency}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ rate: response.data.rates[currency] });
  } catch (error) {
    console.error('Exchange rate error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    );
  }
}
