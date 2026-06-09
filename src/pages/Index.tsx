
import React, { useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServiceOverview from '@/components/home/ServiceOverview';
import SuccessMetrics from '@/components/home/SuccessMetrics';
import Testimonials from '@/components/home/Testimonials';
import CaseStudiesPreview from '@/components/home/CaseStudiesPreview';
import ContactCTA from '@/components/layout/ContactCTA';
import { useCms } from '@/cms/context/CmsContext';

const Index = () => {
  const { data, isLoading } = useCms();
  const { seoMetadata, sharedComponents } = data;

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"></div>;
  }

  return (
    <div className="min-h-screen">
      <Seo title={seoMetadata.home.title} description={seoMetadata.home.description} canonical="/" />
      <HeroSection />
      <WhyChooseUs />
      <ServiceOverview />
      <SuccessMetrics />
      <Testimonials />
      <CaseStudiesPreview />
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
