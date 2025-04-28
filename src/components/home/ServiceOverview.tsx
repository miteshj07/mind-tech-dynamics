
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Code, Link2, FileSearch, ShieldCheck, Lightbulb } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
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
        to="/services" 
        className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
      >
        Learn More <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const ServiceOverview = () => {
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

  const services = [
    {
      icon: <Database size={48} />,
      title: "Salesforce Implementation",
      description: "End-to-end deployment of Salesforce CRM tailored to your specific business requirements."
    },
    {
      icon: <Code size={48} />,
      title: "Customization",
      description: "Custom development to extend Salesforce functionality beyond out-of-the-box capabilities."
    },
    {
      icon: <Link2 size={48} />,
      title: "Integration",
      description: "Seamless connectivity between Salesforce and your existing business systems."
    },
    {
      icon: <FileSearch size={48} />,
      title: "Migration",
      description: "Risk-free data migration from legacy systems to Salesforce with zero data loss."
    },
    {
      icon: <ShieldCheck size={48} />,
      title: "Support & Maintenance",
      description: "Ongoing assistance to ensure your Salesforce instance runs optimally and securely."
    },
    {
      icon: <Lightbulb size={48} />,
      title: "Training",
      description: "Comprehensive training programs to empower your team to leverage Salesforce effectively."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4">Our <span className="text-brand">Services</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive Salesforce solutions to power your business growth and digital transformation journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
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
