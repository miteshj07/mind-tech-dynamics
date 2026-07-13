
import React, { useEffect, useRef } from 'react';
import { sanitizeInlineHtml } from '@/lib/sanitize';
import { CheckCircle, Users, Award, Rocket, Code, Database } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

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
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-brand opacity-0 translate-y-8 transition-all duration-700 ease-out
                hover:shadow-xl hover:-translate-y-2 hover:bg-gradient-to-tr hover:from-white hover:to-green-50 
                group cursor-pointer"
    >
      <div className="text-brand mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-dark">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 transition-colors group-hover:text-brand">{title}</h3>
      <p className="text-gray-600 transition-colors group-hover:text-gray-700">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data } = useCms();
  const { whyChooseUsSection } = data;
  
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

  const getIconComponent = (iconName: string, size: number = 40) => {
    const icons: {[key: string]: React.ReactNode} = {
      "Award": <Award size={size} />,
      "Users": <Users size={size} />,
      "Rocket": <Rocket size={size} />,
      "CheckCircle": <CheckCircle size={size} />,
      "Code": <Code size={size} />,
      "Database": <Database size={size} />
    };
    
    return icons[iconName] || <Award size={size} />;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4" dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(whyChooseUsSection.title) }} />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {whyChooseUsSection.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsSection.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={getIconComponent(feature.icon)}
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
