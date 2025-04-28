
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServiceOverview from '@/components/home/ServiceOverview';
import SuccessMetrics from '@/components/home/SuccessMetrics';
import Testimonials from '@/components/home/Testimonials';
import CaseStudiesPreview from '@/components/home/CaseStudiesPreview';
import ContactCTA from '@/components/layout/ContactCTA';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyChooseUs />
      <ServiceOverview />
      <SuccessMetrics />
      <Testimonials />
      <CaseStudiesPreview />
      <ContactCTA />
    </div>
  );
};

export default Index;
