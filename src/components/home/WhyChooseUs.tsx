
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Users, Award, Rocket, Code, Database } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('opacity-100', 'translate-y-0');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-brand opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      <div className="text-brand mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Award size={40} />,
      title: "10+ Years of Experience",
      description: "A decade of delivering exceptional Salesforce solutions to businesses worldwide.",
      delay: 100
    },
    {
      icon: <Users size={40} />,
      title: "Expert Team",
      description: "Certified Salesforce consultants with deep domain expertise across industries.",
      delay: 200
    },
    {
      icon: <Rocket size={40} />,
      title: "Innovation-Driven",
      description: "Constantly evolving our approach with the latest Salesforce technologies and best practices.",
      delay: 300
    },
    {
      icon: <CheckCircle size={40} />,
      title: "Guaranteed Results",
      description: "We're committed to your success with measurable outcomes and ROI.",
      delay: 400
    },
    {
      icon: <Code size={40} />,
      title: "Custom Solutions",
      description: "Tailored implementations that address your unique business challenges.",
      delay: 500
    },
    {
      icon: <Database size={40} />,
      title: "Data-Driven Approach",
      description: "Strategic insights backed by analytics to optimize your Salesforce ecosystem.",
      delay: 600
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4">Why Choose <span className="text-brand">Meet The Mind</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver customized Salesforce solutions that drive tangible business outcomes and elevate your CRM experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
