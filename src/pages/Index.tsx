
import React, { useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServiceOverview from '@/components/home/ServiceOverview';
import DealPulseTeaser from '@/components/home/DealPulseTeaser';
import SuccessMetrics from '@/components/home/SuccessMetrics';
import FounderBio from '@/components/home/FounderBio';
import TechStackStrip from '@/components/home/TechStackStrip';
import HowWeWork from '@/components/home/HowWeWork';
import HealthCheckBanner from '@/components/home/HealthCheckBanner';
import Testimonials from '@/components/home/Testimonials';
import CaseStudiesPreview from '@/components/home/CaseStudiesPreview';
import MarketsWeServe from '@/components/home/MarketsWeServe';
import HomeFaq from '@/components/home/HomeFaq';
import ContactCTA from '@/components/layout/ContactCTA';
import { useCms } from '@/cms/context/CmsContext';

const Index = () => {
  const { data } = useCms();
  const { seoMetadata, sharedComponents } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title={seoMetadata.home.title}
        description={seoMetadata.home.description}
        canonical="/"
      />
      <HeroSection />
      <TechStackStrip />
      <WhyChooseUs />
      <ServiceOverview />
      <DealPulseTeaser />
      <SuccessMetrics />
      <FounderBio />
      <Testimonials />
      <CaseStudiesPreview />
      <HowWeWork />
      <HealthCheckBanner />
      <MarketsWeServe />
      <HomeFaq />
      <ContactCTA
        heading={sharedComponents.contactCTA.home.heading}
        subheading={sharedComponents.contactCTA.home.subheading}
        buttonText={sharedComponents.contactCTA.home.buttonText}
        buttonLink={sharedComponents.contactCTA.home.buttonLink}
      />
    </div>
  );
};

export default Index;
