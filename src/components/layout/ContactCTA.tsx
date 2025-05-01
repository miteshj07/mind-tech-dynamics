
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactCTAProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ContactCTA = ({
  heading = "Let's Transform Your Salesforce Journey",
  subheading = "Ready to unlock the full potential of Salesforce? Our experts are here to guide you every step of the way.",
  buttonText = "Talk to Us Today",
  buttonLink = "/contact-us"
}: ContactCTAProps) => {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="heading-lg mb-6 max-w-3xl mx-auto">{heading}</h2>
        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">{subheading}</p>
        <Button asChild className="btn-primary text-lg px-8 py-6">
          <Link to={buttonLink || "/contact-us"}>
            {buttonText} <ArrowRight className="ml-2" size={20} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;
