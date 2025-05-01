
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCms } from '@/cms/context/CmsContext';

interface ContactCTAProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ContactCTA = ({
  heading,
  subheading,
  buttonText,
  buttonLink = "/contact-us"
}: ContactCTAProps) => {
  const location = useLocation();
  const { data } = useCms();
  const { sharedComponents } = data;
  
  // Determine which page we're on to get the appropriate CTA content
  const currentPath = location.pathname;
  let pageName = 'home';
  
  if (currentPath.includes('/services')) pageName = 'services';
  else if (currentPath.includes('/about-us')) pageName = 'aboutUs';
  else if (currentPath.includes('/case-studies')) pageName = 'caseStudies';
  else if (currentPath.includes('/blog')) pageName = 'blog';
  else if (currentPath.includes('/careers')) pageName = 'careers';
  
  // Get the dynamic content for this page, or use props if provided
  const ctaContent = sharedComponents?.contactCTA?.[pageName] || {};
  
  const displayHeading = heading || ctaContent.heading || "Let's Transform Your Salesforce Journey";
  const displaySubheading = subheading || ctaContent.subheading || "Ready to unlock the full potential of Salesforce? Our experts are here to guide you every step of the way.";
  const displayButtonText = buttonText || ctaContent.buttonText || "Talk to Us Today";
  const displayButtonLink = buttonLink || ctaContent.buttonLink || "/contact-us";

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="heading-lg mb-6 max-w-3xl mx-auto">{displayHeading}</h2>
        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">{displaySubheading}</p>
        <Button asChild className="btn-primary text-lg px-8 py-6">
          <Link to={displayButtonLink}>
            {displayButtonText} <ArrowRight className="ml-2" size={20} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;
