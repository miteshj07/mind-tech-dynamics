
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Code, Link2, FileSearch, ShieldCheck, Lightbulb } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, link, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('opacity-100', 'translate-y-0');
          }, 100 * index);
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
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="service-card group opacity-0 translate-y-10 transition-all duration-700"
    >
      <div className="text-brand mb-5 transition-all duration-300 transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
      >
        Learn More <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const ServiceOverview = () => {
  const { data } = useCms();
  const { servicesSection } = data;
  
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
  
  // Map icon strings to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database size={48} />;
      case 'Code': return <Code size={48} />;
      case 'Link': return <Link2 size={48} />;
      case 'FileSearch': return <FileSearch size={48} />;
      case 'ShieldCheck': return <ShieldCheck size={48} />;
      case 'Lightbulb': return <Lightbulb size={48} />;
      default: return <Database size={48} />;
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4">Our <span className="text-brand">Services</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesSection.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesSection.services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={getIconComponent(service.icon)}
              title={service.title}
              description={service.description}
              link={(service as any).link || '/services'}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/services"
            className="btn-secondary inline-flex items-center"
          >
            View All Services <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
