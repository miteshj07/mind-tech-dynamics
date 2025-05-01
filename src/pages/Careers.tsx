import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { Award, Laptop, Users, BookOpen, Rocket } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

interface JobPostingProps {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const JobPosting = ({ title, location, type, description, requirements }: JobPostingProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-3">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {location}
          </span>
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm">
            {type}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <h4 className="font-medium mb-2">Requirements:</h4>
      <ul className="list-disc pl-5 mb-4">
        {requirements.map((req, index) => (
          <li key={index} className="text-gray-600 mb-1">{req}</li>
        ))}
      </ul>
      <button className="btn-primary mt-2">
        Apply Now
      </button>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="flex items-start p-4">
      <div className="text-brand mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Careers = () => {
  const { data } = useCms();
  const { careersSection } = data;
  
  const getIconComponent = (iconName: string) => {
    const icons: {[key: string]: React.ReactNode} = {
      "Award": <Award size={24} />,
      "Laptop": <Laptop size={24} />,
      "Users": <Users size={24} />,
      "BookOpen": <BookOpen size={24} />,
      "Rocket": <Rocket size={24} />
    };
    
    return icons[iconName] || <Award size={24} />;
  };

  return (
    <>
      <PageHeader 
        title={careersSection.title}
        subtitle={careersSection.subtitle}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-md mb-6">{careersSection.intro.title}</h2>
              {careersSection.intro.description.map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img 
                src={careersSection.intro.images[0]} 
                alt="Team collaboration" 
                className="rounded-xl h-full w-full object-cover"
              />
              <div className="grid grid-rows-2 gap-4">
                <img 
                  src={careersSection.intro.images[1]} 
                  alt="Office space" 
                  className="rounded-xl h-full w-full object-cover"
                />
                <img 
                  src={careersSection.intro.images[2]} 
                  alt="Team working" 
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h2 className="heading-md text-center mb-6">{careersSection.benefits.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 bg-gray-50 rounded-xl p-6">
            {careersSection.benefits.items.map((benefit: any, index: number) => (
              <BenefitCard
                key={index}
                icon={getIconComponent(benefit.icon)}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
          
          <h2 className="heading-md text-center mb-12">{careersSection.openings.title}</h2>
          <div className="space-y-6">
            {careersSection.openings.jobs.map((job: any, index: number) => (
              <JobPosting
                key={index}
                title={job.title}
                location={job.location}
                type={job.type}
                description={job.description}
                requirements={job.requirements}
              />
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">{careersSection.openings.fallback.title}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {careersSection.openings.fallback.description}
            </p>
            <button className="btn-secondary">
              Submit Your Resume
            </button>
          </div>
        </div>
      </section>
      
      <ContactCTA
        heading={data.sharedComponents.contactCTA.careers.heading}
        subheading={data.sharedComponents.contactCTA.careers.subheading}
        buttonText={data.sharedComponents.contactCTA.careers.buttonText}
        buttonLink={data.sharedComponents.contactCTA.careers.buttonLink}
      />
    </>
  );
};

export default Careers;
