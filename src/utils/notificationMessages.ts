interface NotificationMessage {
  title: string;
  body: string;
  url: string;
}

const notificationMessages: NotificationMessage[] = [
  {
    title: "Ready for Adventure? 🌍",
    body: "Your dream destination is just a few clicks away. Let's plan your perfect trip!",
    url: "/"
  },
  {
    title: "Time to Travel! ✈️",
    body: "Don't let your vacation days go to waste. Start planning your next adventure with Roamy AI!",
    url: "/"
  },
  {
    title: "Travel Smarter 🧠",
    body: "Save hours of research. Let AI craft your perfect itinerary in seconds!",
    url: "/"
  },
  {
    title: "New Destinations Await 🌟",
    body: "Discover hidden gems and create unforgettable memories. Plan your trip today!",
    url: "/"
  },
  {
    title: "Travel Planning Made Easy 🎯",
    body: "No more spreadsheets or endless tabs. Get your personalized travel plan instantly!",
    url: "/"
  },
  {
    title: "Your Next Adventure Awaits 🗺️",
    body: "From beaches to mountains, let's find your perfect destination!",
    url: "/"
  },
  {
    title: "Smart Travel Planning 🚀",
    body: "Why spend hours planning when AI can do it in minutes? Try Roamy AI now!",
    url: "/"
  },
  {
    title: "Travel Like a Pro 🎒",
    body: "Get expert-level travel planning with just a few clicks. Start your journey!",
    url: "/"
  },
  {
    title: "Unlock Your Next Journey 🔑",
    body: "The world is waiting. Let's plan your perfect escape!",
    url: "/"
  },
  {
    title: "Travel Planning Revolution 💡",
    body: "Experience the future of travel planning with AI-powered itineraries!",
    url: "/"
  }
];

export function getRandomNotification(): NotificationMessage {
  const randomIndex = Math.floor(Math.random() * notificationMessages.length);
  return notificationMessages[randomIndex];
} 