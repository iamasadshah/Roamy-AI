
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency');

    if (!currency) {
      return NextResponse.json({ error: 'Currency code is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API;
    if (!apiKey) {
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=USD&currencies=${currency}`
    );

    const rate = response.data?.data?.[currency];
    if (!rate) {
      return NextResponse.json(
        { error: `Exchange rate not available for ${currency}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ rate });
  } catch (error) {
    console.error('Exchange rate error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate' },
      { status: 500 }
    );
  }
}
