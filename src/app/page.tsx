import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ItineraryShowcase from "@/components/ItineraryShowcase";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Simple static background - removed heavy animations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      {/* Smooth Scrolling Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative">
          <Hero />
        </section>

        {/* Main Content */}
        <div className="relative z-10">
          <HowItWorks />

          <Features />

          <ItineraryShowcase />

          <Testimonials />

          <CallToAction />
        </div>
      </div>
    </main>
  );
}
