'use client';

import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import ItineraryShowcase from '@/components/ItineraryShowcase';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import MultiStepForm from '@/components/MultiStepForm';
import TripPlan from '@/components/TripPlan';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { generateTripPlan } from '@/utils/gemini';
import { FormData, TravelItinerary } from '@/types/itinerary';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TravelItinerary | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const plan = await generateTripPlan(formData);
      setTripPlan(plan);
      toast.success('Trip itinerary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
      console.error('Error generating trip plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 relative">
      <Toaster position="top-center" />
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      <HowItWorks />
      <Features />
      <ItineraryShowcase />
      <div id="plan-trip" className="section-padding">
        <div className="max-w-4xl mx-auto">
          <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} />
          <TripPlan plan={tripPlan} isLoading={isLoading} />
        </div>
      </div>
      <Testimonials />
      <CallToAction />
    </main>
  );
}
