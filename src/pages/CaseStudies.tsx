
import React, { useState } from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { ArrowRight } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  onViewDetails: (study: CaseStudy) => void;
}

const CaseStudyCard = ({ study, index, onViewDetails }: CaseStudyCardProps) => {
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
          
          <button 
            onClick={() => onViewDetails(study)}
            className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Full Case Study <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CaseStudyDialog = ({ study, open, onOpenChange }: { 
  study: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  if (!study) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{study.title}</DialogTitle>
          <DialogDescription className="text-brand font-medium">{study.client} | {study.industry}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="mb-6">
            <img src={study.image} alt={study.title} className="w-full h-64 object-cover rounded-md" />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">Challenge</h3>
              <p className="text-gray-700">{study.challenge}</p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Solution</h3>
              <p className="text-gray-700">{study.solution}</p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <ul className="list-disc pl-5 space-y-2">
                {study.results.map((result, i) => (
                  <li key={i} className="text-gray-700">{result}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CaseStudies = () => {
  const { data, isLoading } = useCms();
  const { caseStudiesSection, seoMetadata, sharedComponents } = data;

  const [filter, setFilter] = useState<string>("all");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Build JSON-LD dynamically from live CMS data so it stays in sync
  const caseStudiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Salesforce & Agentforce Case Studies — Meet The Mind',
    description: caseStudiesSection.subtitle,
    url: 'https://www.meethemind.com/case-studies',
    itemListElement: caseStudiesSection.studies.map((study: CaseStudy, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: study.title,
        description: study.challenge,
        articleBody: `Challenge: ${study.challenge} Solution: ${study.solution} Results: ${study.results.join(' ')}`,
        author: {
          '@type': 'Organization',
          name: 'Meet The Mind Technologies',
          url: 'https://www.meethemind.com/',
        },
        about: {
          '@type': 'Organization',
          name: study.client,
          industry: study.industry,
        },
        keywords: study.tags.join(', '),
        publisher: {
          '@type': 'Organization',
          name: 'Meet The Mind Technologies',
          url: 'https://www.meethemind.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.meethemind.com/og-image.png',
          },
        },
        url: 'https://www.meethemind.com/case-studies',
        image: study.image,
      },
    })),
  };
  
  // Extract unique industries from case studies for filter options
  const industries = Array.from(new Set(caseStudiesSection.studies.map(study => study.industry)));
  
  const filters = [
    { value: "all", label: "All Industries" },
    ...industries.map(industry => ({ value: industry, label: industry }))
  ];

  const filteredStudies = filter === "all" 
    ? caseStudiesSection.studies 
    : caseStudiesSection.studies.filter(study => study.industry.includes(filter) || study.tags.includes(filter));

  const handleViewDetails = (study: CaseStudy) => {
    setSelectedStudy(study);
    setDialogOpen(true);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Seo title={seoMetadata.caseStudies.title} description={seoMetadata.caseStudies.description} canonical="/case-studies" jsonLd={caseStudiesSchema} />
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
              <CaseStudyCard 
                key={index} 
                study={study} 
                index={index} 
                onViewDetails={handleViewDetails}
              />
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
          
          <CaseStudyDialog 
            study={selectedStudy}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
          />
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
