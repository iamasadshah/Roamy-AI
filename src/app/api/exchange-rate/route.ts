import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get('currency');

  if (!currency) {
    return NextResponse.json({ error: 'Currency code is required' }, { status: 400 });
  }

  try {
    const exchangeApiKey = process.env.EXCHANGERATE_API_KEY;
    if (!exchangeApiKey) {
      throw new Error('Exchange rate API key not configured');
    }

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeApiKey}/latest/USD`
    );

    if (!response.data || !response.data.conversion_rates || !response.data.conversion_rates[currency]) {
      return NextResponse.json(
        { error: `Exchange rate not available for ${currency}` },
        { status: 404 }
      );
    }

    const rate = response.data.conversion_rates[currency];
    return NextResponse.json({ rate });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    );
  }
}
