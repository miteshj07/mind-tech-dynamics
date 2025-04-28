
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  index: number;
}

const CaseStudyCard = ({ title, client, description, image, tags, link, index }: CaseStudyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('opacity-100', 'translate-y-0');
          }, 200 * index);
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
      className="case-study-card group opacity-0 translate-y-10 transition-all duration-700"
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 w-full">
            <p className="text-brand font-medium text-sm mb-1">{client}</p>
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link 
          to={link}
          className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
        >
          Read Case Study <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const CaseStudiesPreview = () => {
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

  const caseStudies = [
    {
      title: "40% Increase in Sales Efficiency",
      client: "Global Retail Corporation",
      description: "How a major retail chain optimized their sales process and improved team collaboration with a custom Salesforce solution.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Retail", "Sales Cloud", "Integration"],
      link: "/case-studies/global-retail"
    },
    {
      title: "Streamlined Customer Service Operations",
      client: "TechFirst Solutions",
      description: "A technology company reduced response times by 65% and increased customer satisfaction through Service Cloud implementation.",
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Technology", "Service Cloud", "Automation"],
      link: "/case-studies/techfirst"
    },
    {
      title: "Data Migration & CRM Transformation",
      client: "HealthPlus Medical Group",
      description: "Successful migration from legacy systems to Salesforce Health Cloud, improving patient management and operational efficiency.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Healthcare", "Health Cloud", "Migration"],
      link: "/case-studies/healthplus"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4">Featured <span className="text-brand">Case Studies</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped organizations transform their operations with tailored Salesforce solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title}
              client={study.client}
              description={study.description}
              image={study.image}
              tags={study.tags}
              link={study.link}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/case-studies"
            className="btn-secondary inline-flex items-center"
          >
            View All Case Studies <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
