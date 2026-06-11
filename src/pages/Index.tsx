
import React, { useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServiceOverview from '@/components/home/ServiceOverview';
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

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Meet The Mind Technologies',
  url: 'https://www.meethemind.com',
  logo: 'https://www.meethemind.com/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png',
  foundingDate: '2022',
  description: 'Salesforce consulting firm specialising in Agentforce AI implementation, Apollo.io integration, RevOps automation and Salesforce Data Cloud for B2B revenue teams.',
  founder: {
    '@type': 'Person',
    name: 'Mitesh Jain',
    jobTitle: 'Founder & CEO',
    url: 'https://www.linkedin.com/in/miteshj07/',
    sameAs: [
      'https://www.linkedin.com/in/miteshj07/',
      'https://www.salesforce.com/trailblazer/mjain31',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S4, Solitaire Tower, Choolai',
    addressLocality: 'Chennai',
    postalCode: '600010',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7358576420',
    email: 'mitesh@meethemind.com',
    contactType: 'customer service',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Australia' },
  ],
  sameAs: [
    'https://www.linkedin.com/company/meetthemind',
    'https://x.com/MeetTheMind',
    'https://www.salesforce.com/trailblazer/mjain31',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Meet The Mind Technologies',
  url: 'https://www.meethemind.com',
};

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
        jsonLd={[orgSchema, websiteSchema]}
      />
      <HeroSection />
      <TechStackStrip />
      <WhyChooseUs />
      <ServiceOverview />
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
