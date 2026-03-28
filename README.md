<div align="center">
  <img src="/public/favicon.png" alt="Roamy AI Logo" width="120" height="120" style="border-radius: 20px;">
  <h1>🌍 Roamy AI</h1>
  <p><strong>Your Smart Travel Planning Assistant</strong></p>
  
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
  [![Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black?logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
</div>

---

## ✨ Features

- 🤖 **AI-Powered Customization** - Get personalized travel plans based on your preferences
- ⚡ **Instant Generation** - Create comprehensive itineraries in seconds
- 💰 **Budget Flexibility** - Options for every budget level
- 📱 **PWA Support** - Install as a native app on any device
- 🌙 **Dark Mode** - Elegant dark theme for comfortable planning
- 🔄 **Real-time Updates** - Live currency rates and weather data
- 📍 **Local Insights** - Emergency contacts and transportation tips
- 🍽️ **Dietary Preferences** - Customized dining recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key
- Weather API key
- Exchange Rate API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iamasadshah/Roamy-AI.git
cd roamy-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_GEMINI_API_TRAVEL=your_gemini_api_key
NEXT_PUBLIC_WEATHERAPI=your_weather_api_key
NEXT_PUBLIC_EXCHANGERATE_API=your_exchange_rate_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running!

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Google Gemini](https://deepmind.google/technologies/gemini/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **PWA**: [next-pwa](https://www.npmjs.com/package/next-pwa)

## 🗂️ Project Structure

```text
src/
├── app/                    # Next.js routes, metadata, and API handlers
├── features/               # Product features and route-level UI
│   ├── about/
│   ├── auth/
│   ├── home/
│   ├── marketing/
│   ├── planner/
│   └── profile/
├── server/                 # Server-only services and AI/data integrations
├── services/               # Shared platform clients (for example Supabase)
├── shared/                 # Reusable UI, config, constants, and helpers
└── types/                  # Shared TypeScript contracts
```

## 🧭 Architecture Notes

- `src/app` is intentionally thin and focuses on routing, metadata, and API boundaries.
- `src/features` owns screen implementations and feature-specific components.
- `src/shared` contains reusable building blocks such as layout, UI primitives, config, and retry helpers.
- `src/server` isolates server-only AI and destination-data logic from client code.
- `src/services` keeps external platform clients easy to discover and reuse.

## 📱 PWA Features

Roamy AI is a Progressive Web App (PWA) that offers:

- 📲 Installable on any device
- 📱 Native app-like experience
- 🚀 Fast loading times
- 🔔 Push notifications (coming soon)

## 🎯 Core Experience

- `HomeChat`: Conversational home experience with saved local chat threads
- `PlanChatShell`: Guided trip-planning workspace with saved itineraries
- `PlanWizard`: Structured trip brief intake for itinerary generation
- `StructuredItinerary`: Rich itinerary renderer for generated travel plans
- `Navbar`: Shared navigation with auth-aware actions and profile access

## 🔒 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_GEMINI_API_TRAVEL=
NEXT_PUBLIC_WEATHERAPI=
NEXT_PUBLIC_EXCHANGERATE_API=
```

## 📦 API Integrations

- **Google Gemini**: AI-powered itinerary generation
- **Weather API**: Real-time weather forecasts
- **Exchange Rate API**: Current currency conversion rates

## 🎨 Design Features

- Responsive design for all devices
- Elegant animations and transitions
- Glass-morphism UI elements
- Custom scrollbar styling
- Luxury-themed components
- Interactive hover effects

## 🛣️ Roadmap

- [ ] Multi-language support
- [ ] Offline itinerary access
- [ ] Social sharing features
- [ ] Push notifications
- [ ] User accounts and saved trips
- [ ] Interactive maps integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://www.supabase.com)
---

<div align="center">
  <p>Built with ❤️ by Asad Shah</p>
</div>

