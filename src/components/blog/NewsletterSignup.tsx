
import React from 'react';
import { Input } from '@/components/ui/input';

interface NewsletterSignupProps {
  title: string;
  description: string;
}

const NewsletterSignup = ({ title, description }: NewsletterSignupProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mt-16">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Your email address" 
            className="flex-grow"
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
