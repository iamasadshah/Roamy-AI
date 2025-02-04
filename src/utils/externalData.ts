import axios from 'axios';

interface WeatherResponse {
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
    };
  };
}

interface DestinationData {
  weather: {
    forecast: string;
    temperature: string;
  };
  currency: {
    code: string;
    exchangeRate: string;
  };
  emergency: {
    police: string;
    ambulance: string;
    touristPolice?: string;
  };
}

// Map of country/city to emergency numbers and currency codes
const emergencyContacts: Record<string, { police: string; ambulance: string; touristPolice?: string }> = {
  "United States": { police: "911", ambulance: "911" },
  "United Kingdom": { police: "999", ambulance: "999" },
  "France": { police: "17", ambulance: "15", touristPolice: "+33 1 4705 3510" },
  "Japan": { police: "110", ambulance: "119" },
  "Australia": { police: "000", ambulance: "000" },
  "Germany": { police: "110", ambulance: "112" },
  "Italy": { police: "113", ambulance: "118", touristPolice: "06 4686 3841" },
  "Spain": { police: "112", ambulance: "112" },
  "Canada": { police: "911", ambulance: "911" },
  "Switzerland": { police: "117", ambulance: "144" },
  "Netherlands": { police: "112", ambulance: "112" },
  "Greece": { police: "100", ambulance: "166", touristPolice: "171" },
  "Thailand": { police: "191", ambulance: "1669", touristPolice: "1155" },
  "Singapore": { police: "999", ambulance: "995" },
  "Malaysia": { police: "999", ambulance: "999" },
  "UAE": { police: "999", ambulance: "998" },
  "Turkey": { police: "155", ambulance: "112", touristPolice: "(0212) 527 4503" },
  "Pakistan": { police: "15", ambulance: "115" }
};

const currencyCodes: Record<string, string> = {
  "United States": "USD",
  "United Kingdom": "GBP",
  "France": "EUR",
  "Japan": "JPY",
  "Australia": "AUD",
  "Germany": "EUR",
  "Italy": "EUR",
  "Spain": "EUR",
  "Canada": "CAD",
  "Switzerland": "CHF",
  "Netherlands": "EUR",
  "Greece": "EUR",
  "Thailand": "THB",
  "Singapore": "SGD",
  "Malaysia": "MYR",
  "UAE": "AED",
  "Turkey": "TRY",
  "Pakistan": "PKR"
};

function extractCountry(destination: string): string {
  // First try to get the country from a "City, Country" format
  const parts = destination.split(',').map(part => part.trim());
  if (parts.length > 1) {
    // Check if the last part matches any of our known countries
    const lastPart = parts[parts.length - 1];
    if (Object.keys(currencyCodes).includes(lastPart)) {
      return lastPart;
    }
  }

  // If no match found, try to match any part against our known countries
  for (const part of parts) {
    if (Object.keys(currencyCodes).includes(part)) {
      return part;
    }
  }

  // If still no match, try to match the full destination string
  if (Object.keys(currencyCodes).includes(destination.trim())) {
    return destination.trim();
  }

  // Default to USD if no match found
  console.warn(`No currency mapping found for destination: ${destination}. Using USD as default.`);
  return "United States";
}

export async function getDestinationData(destination: string): Promise<DestinationData> {
  try {
    // Get weather data
    const weatherApiKey = process.env.NEXT_PUBLIC_WEATHERAPI;
    if (!weatherApiKey) {
      throw new Error('Weather API key not configured');
    }
    const weatherResponse = await axios.get<WeatherResponse>(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(destination)}`
    );

    // Extract country and get currency code
    const country = extractCountry(destination);
    const currencyCode = currencyCodes[country];
    
    // Get currency data
    let formattedRate: string;
    if (currencyCode === 'USD') {
      formattedRate = 'Same currency (USD)';
    } else {
      try {
        const exchangeResponse = await axios.get(`/api/exchange-rate?currency=${currencyCode}`);
        
        if (!exchangeResponse.data || !exchangeResponse.data.rate) {
          console.error('Failed to get exchange rate:', exchangeResponse.data);
          formattedRate = `Exchange rate unavailable for ${currencyCode}`;
        } else {
          const rate = exchangeResponse.data.rate;
          formattedRate = `1 USD = ${rate.toFixed(2)} ${currencyCode}`;
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        formattedRate = `Exchange rate unavailable for ${currencyCode}`;
      }
    }

    // Get emergency contacts
    const emergency = emergencyContacts[country] || {
      police: "Check local emergency numbers",
      ambulance: "Check local emergency numbers"
    };

    return {
      weather: {
        forecast: weatherResponse.data.current.condition.text,
        temperature: `${weatherResponse.data.current.temp_c}°C (${weatherResponse.data.current.temp_f}°F)`
      },
      currency: {
        code: currencyCode,
        exchangeRate: formattedRate
      },
      emergency
    };
  } catch (error) {
    console.error('Error fetching destination data:', error);
    throw new Error('Failed to fetch real-time destination data');
  }
}
