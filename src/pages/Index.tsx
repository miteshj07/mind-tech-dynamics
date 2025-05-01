
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { seoMetadata = {}, sharedComponents = {} } = data || {};

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{seoMetadata.home?.title || "Meet The Mind Technologies"}</title>
        <meta name="description" content={seoMetadata.home?.description || "Salesforce Consulting & Integration Services"} />
      </Helmet>
      <HeroSection />
      <WhyChooseUs />
      <ServiceOverview />
      <SuccessMetrics />
      <Testimonials />
      <CaseStudiesPreview />
      <ContactCTA 
        heading={sharedComponents.contactCTA?.home?.heading}
        subheading={sharedComponents.contactCTA?.home?.subheading}
        buttonText={sharedComponents.contactCTA?.home?.buttonText}
        buttonLink={sharedComponents.contactCTA?.home?.buttonLink}
      />
    </div>
  );
};

export default Index;
