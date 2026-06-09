import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';
import { Award, Laptop, Users, BookOpen, Rocket } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
interface JobPostingProps {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}
const JobPosting = ({
  title,
  location,
  type,
  description,
  requirements
}: JobPostingProps) => {
  return;
};
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const BenefitCard = ({
  icon,
  title,
  description
}: BenefitCardProps) => {
  return <div className="flex items-start p-4">
      <div className="text-brand mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>;
};
const Careers = () => {
  const {
    data
  } = useCms();
  const {
    careersSection
  } = data;
  const getIconComponent = (iconName: string) => {
    const icons: {
      [key: string]: React.ReactNode;
    } = {
      "Award": <Award size={24} />,
      "Laptop": <Laptop size={24} />,
      "Users": <Users size={24} />,
      "BookOpen": <BookOpen size={24} />,
      "Rocket": <Rocket size={24} />
    };
    return icons[iconName] || <Award size={24} />;
  };
  return <>
      <Seo
        title="Careers | Meet The Mind — Salesforce & Agentforce Consultants"
        description="Join Meet The Mind and build Salesforce & Agentforce solutions for B2B clients across the US, UK, UAE and Australia."
        canonical="/careers"
      />
      <PageHeader title={careersSection.title} subtitle={careersSection.subtitle} />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-md mb-6">{careersSection.intro.title}</h2>
              {careersSection.intro.description.map((paragraph: string, index: number) => <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img src={careersSection.intro.images[0]} alt="Team collaboration" className="rounded-xl h-full w-full object-cover" />
              <div className="grid grid-rows-2 gap-4">
                <img src={careersSection.intro.images[1]} alt="Office space" className="rounded-xl h-full w-full object-cover" />
                <img src={careersSection.intro.images[2]} alt="Team working" className="rounded-xl h-full w-full object-cover" />
              </div>
            </div>
          </div>
          
          <h2 className="heading-md text-center mb-6">{careersSection.benefits.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 bg-gray-50 rounded-xl p-6">
            {careersSection.benefits.items.map((benefit: any, index: number) => <BenefitCard key={index} icon={getIconComponent(benefit.icon)} title={benefit.title} description={benefit.description} />)}
          </div>
          
          
          <div className="space-y-6">
            {careersSection.openings.jobs.map((job: any, index: number) => <JobPosting key={index} title={job.title} location={job.location} type={job.type} description={job.description} requirements={job.requirements} />)}
          </div>
          
          
        </div>
      </section>
      
      <ContactCTA heading={data.sharedComponents.contactCTA.careers.heading} subheading={data.sharedComponents.contactCTA.careers.subheading} buttonText={data.sharedComponents.contactCTA.careers.buttonText} buttonLink={data.sharedComponents.contactCTA.careers.buttonLink} />
    </>;
};
export default Careers;