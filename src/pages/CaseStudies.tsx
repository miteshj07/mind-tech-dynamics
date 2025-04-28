
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { ArrowRight } from 'lucide-react';

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
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  return (
    <div className="case-study-card overflow-hidden">
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
          
          <button className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors">
            Full Case Study <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const caseStudies: CaseStudy[] = [
    {
      title: "40% Increase in Sales Efficiency",
      client: "Global Retail Corporation",
      industry: "Retail",
      challenge: "Managing a complex sales pipeline across 200+ locations with inconsistent processes and limited visibility into sales activities.",
      solution: "Implemented Sales Cloud with custom territory management and mobile-optimized dashboards for real-time insights.",
      results: [
        "40% increase in sales rep efficiency",
        "25% improvement in lead conversion rates",
        "Reduced sales cycle by 15 days on average",
        "Real-time visibility across all territories"
      ],
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Retail", "Sales Cloud", "Territory Management", "Analytics"]
    },
    {
      title: "Streamlined Customer Service Operations",
      client: "TechFirst Solutions",
      industry: "Technology",
      challenge: "Fragmented customer support processes across multiple channels leading to delayed response times and customer frustration.",
      solution: "Deployed Service Cloud with omnichannel routing, knowledge base integration, and automated case management workflows.",
      results: [
        "65% reduction in average response time",
        "89% improvement in first-call resolution",
        "32% decrease in operational costs",
        "Customer satisfaction score increased from 7.2 to 9.1"
      ],
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Technology", "Service Cloud", "Automation", "Knowledge Base"]
    },
    {
      title: "Data Migration & CRM Transformation",
      client: "HealthPlus Medical Group",
      industry: "Healthcare",
      challenge: "Legacy systems with siloed patient data preventing coordinated care and efficient administrative operations.",
      solution: "Comprehensive migration to Health Cloud with custom patient journey mapping and integration with EHR systems.",
      results: [
        "Zero data loss during migration of 1M+ patient records",
        "45% improvement in appointment scheduling efficiency",
        "Reduced administrative workload by 30%",
        "Enhanced HIPAA compliance and data security"
      ],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Healthcare", "Health Cloud", "Migration", "Integration"]
    },
    {
      title: "Marketing Automation Revolution",
      client: "Horizon Financial Services",
      industry: "Financial Services",
      challenge: "Manual marketing processes with limited personalization capabilities and inability to track campaign performance effectively.",
      solution: "Implemented Marketing Cloud with journey builder, predictive intelligence, and integrated analytics dashboards.",
      results: [
        "3x increase in qualified leads generated",
        "42% improvement in campaign ROI",
        "Personalized communication across 12 customer segments",
        "Real-time campaign performance tracking"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Financial Services", "Marketing Cloud", "Personalization", "Analytics"]
    },
    {
      title: "Field Service Transformation",
      client: "EnergySmart Utilities",
      industry: "Energy & Utilities",
      challenge: "Inefficient field service operations with paper-based processes and limited visibility into technician activities.",
      solution: "Deployed Field Service Lightning with mobile optimization, real-time scheduling, and inventory management.",
      results: [
        "28% increase in jobs completed per day",
        "60% reduction in paperwork and administrative tasks",
        "First-time fix rate improved from 65% to 92%",
        "Real-time visibility into field operations"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Energy", "Field Service", "Mobile", "Scheduling"]
    },
    {
      title: "Non-Profit Donor Management",
      client: "Global Hope Foundation",
      industry: "Non-Profit",
      challenge: "Fragmented donor data and inability to track relationship history, leading to missed fundraising opportunities.",
      solution: "Implemented Nonprofit Cloud with donor journey mapping, engagement tracking, and integrated fundraising analytics.",
      results: [
        "35% increase in donor retention",
        "22% growth in average donation size",
        "Streamlined grant management process",
        "Comprehensive donor relationship tracking"
      ],
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Non-Profit", "Donor Management", "Fundraising", "Analytics"]
    }
  ];

  const filters = [
    { value: "all", label: "All Industries" },
    { value: "Retail", label: "Retail" },
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Financial Services", label: "Financial Services" },
    { value: "Energy", label: "Energy & Utilities" },
    { value: "Non-Profit", label: "Non-Profit" },
  ];

  const filteredStudies = filter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry.includes(filter) || study.tags.includes(filter));

  return (
    <>
      <PageHeader 
        title="Case Studies" 
        subtitle="Discover how Meet The Mind helped businesses unlock new growth with tailored Salesforce solutions."
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
        heading="Ready for Your Success Story?"
        subheading="Let's work together to create your own Salesforce success story."
        buttonText="Let's Begin"
      />
    </>
  );
};

export default CaseStudies;
