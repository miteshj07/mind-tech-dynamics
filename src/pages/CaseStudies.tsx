
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { ArrowRight } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
import { Link } from 'react-router-dom';

interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  logo?: string;
  tags: string[];
  fullCaseStudyLink?: string;
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  return (
    <div className="case-study-card overflow-hidden shadow-md rounded-lg">
      <div className="relative h-60">
        <img 
          src={study.image} 
          alt={study.title} 
          className="w-full h-full object-cover"
        />
        {study.logo && (
          <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md">
            <img 
              src={study.logo} 
              alt={`${study.client} logo`} 
              className="h-8" 
            />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-brand font-medium">{study.client}</p>
        <h3 className="text-xl font-bold mb-2">{study.title}</h3>
        <p className="text-gray-500 text-sm mb-4">Industry: {study.industry}</p>
        
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-medium mb-2">Challenge</h4>
          <p className="text-gray-600 text-sm mb-4">{study.challenge}</p>
          
          <h4 className="font-medium mb-2">Solution</h4>
          <p className="text-gray-600 text-sm mb-4">{study.solution}</p>
          
          <h4 className="font-medium mb-2">Results</h4>
          <ul className="text-gray-600 text-sm mb-4 list-disc pl-5">
            {study.results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
          
          {study.fullCaseStudyLink ? (
            <Link 
              to={study.fullCaseStudyLink} 
              className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
            >
              Full Case Study <ArrowRight size={16} className="ml-1" />
            </Link>
          ) : (
            <button className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors">
              Full Case Study <ArrowRight size={16} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const { data, isLoading } = useCms();
  const { caseStudiesSection, seoMetadata, sharedComponents } = data;
  
  const [filter, setFilter] = useState<string>("all");
  
  // Extract unique industries from case studies for filter options
  const industries = Array.from(new Set(caseStudiesSection.studies.map(study => study.industry)));
  
  const filters = [
    { value: "all", label: "All Industries" },
    ...industries.map(industry => ({ value: industry, label: industry }))
  ];

  const filteredStudies = filter === "all" 
    ? caseStudiesSection.studies 
    : caseStudiesSection.studies.filter(study => study.industry.includes(filter) || study.tags.includes(filter));

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{seoMetadata.caseStudies.title}</title>
        <meta name="description" content={seoMetadata.caseStudies.description} />
      </Helmet>
      <PageHeader 
        title={caseStudiesSection.title}
        subtitle={caseStudiesSection.subtitle}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {filters.map((filterOption) => (
              <button
                key={filterOption.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.value 
                    ? 'bg-brand text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilter(filterOption.value)}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study, index) => (
              <CaseStudyCard key={index} study={study} index={index} />
            ))}
          </div>
          
          {filteredStudies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No case studies matching your filter criteria.</p>
              <button
                className="mt-4 text-brand font-medium"
                onClick={() => setFilter("all")}
              >
                View All Case Studies
              </button>
            </div>
          )}
        </div>
      </section>
      
      <ContactCTA
        heading={sharedComponents.contactCTA.caseStudies.heading}
        subheading={sharedComponents.contactCTA.caseStudies.subheading}
        buttonText={sharedComponents.contactCTA.caseStudies.buttonText}
        buttonLink={sharedComponents.contactCTA.caseStudies.buttonLink}
      />
    </>
  );
};

export default CaseStudies;
