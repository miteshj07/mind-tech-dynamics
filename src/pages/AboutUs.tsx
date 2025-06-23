import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { Award, Rocket, CircleCheck, Users, Code } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}
const TeamMember = ({
  name,
  role,
  image,
  bio
}: TeamMemberProps) => {
  return <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <img src={image} alt={name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-6">
          <p className="text-white text-center">{bio}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>;
};
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ValueCard = ({
  icon,
  title,
  description
}: ValueCardProps) => {
  return <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-brand">
      <div className="text-brand mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};
const AboutUs = () => {
  const {
    data,
    isLoading
  } = useCms();
  const {
    aboutUsSection,
    seoMetadata,
    sharedComponents
  } = data;

  // Map icon strings to components
  const getIconComponent = (iconName: string, size: number = 40) => {
    switch (iconName) {
      case 'Award':
        return <Award size={size} />;
      case 'CircleCheck':
        return <CircleCheck size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'Rocket':
        return <Rocket size={size} />;
      case 'Code':
        return <Code size={size} />;
      default:
        return <Award size={size} />;
    }
  };
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  return <>
      <Helmet>
        <title>{seoMetadata.aboutUs.title}</title>
        <meta name="description" content={seoMetadata.aboutUs.description} />
      </Helmet>
      <PageHeader title="About Meet The Mind" subtitle="We're a team of Salesforce experts dedicated to transforming how businesses leverage technology." />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="heading-md mb-6">{aboutUsSection.story.title}</h2>
              {aboutUsSection.story.content.map((paragraph, index) => <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>)}
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand/30 to-blue-500/30 rounded-xl blur-xl opacity-50"></div>
              <img src={aboutUsSection.story.image} alt="Meet The Mind Team" className="relative rounded-xl shadow-lg w-full h-auto" />
            </div>
          </div>
          
          <h2 className="heading-md text-center mb-12">{aboutUsSection.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {aboutUsSection.values.values.map((value, index) => <ValueCard key={index} icon={getIconComponent(value.icon)} title={value.title} description={value.description} />)}
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutUsSection.team.members.map((member, index) => <TeamMember key={index} name={member.name} role={member.role} image={member.image} bio={member.bio} />)}
          </div>
        </div>
      </section>
      
      <ContactCTA heading={sharedComponents.contactCTA.aboutUs.heading} subheading={sharedComponents.contactCTA.aboutUs.subheading} buttonText={sharedComponents.contactCTA.aboutUs.buttonText} buttonLink={sharedComponents.contactCTA.aboutUs.buttonLink} />
    </>;
};
export default AboutUs;