import React from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { Award, Rocket, CircleCheck, Users, Code, CheckCircle, Globe } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-brand">
    <div className="text-brand mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const certifications = [
  'Salesforce Certified Administrator',
  'Salesforce Certified Platform App Builder',
  'Salesforce Certified Platform Developer I',
  'Salesforce Certified Sales Cloud Consultant',
  'Salesforce Certified CRM Analytics & Einstein Discovery Consultant',
];

const trailheadStats = [
  { value: '230+', label: 'Badges' },
  { value: '164K+', label: 'Trailhead Points' },
  { value: '5', label: 'Certifications' },
  { value: 'Innovator', label: 'Agentblazer 2025' },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mitesh Jain',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'Meet The Mind Technologies',
    url: 'https://www.meethemind.com',
  },
  url: 'https://www.meethemind.com/about-us',
  image: 'https://www.meethemind.com/lovable-uploads/mitesh-jain-founder.png',
  sameAs: [
    'https://www.linkedin.com/in/miteshj07/',
    'https://www.salesforce.com/trailblazer/mjain31',
  ],
  knowsAbout: [
    'Salesforce CRM',
    'Agentforce AI',
    'Apollo.io integration',
    'RevOps automation',
    'Salesforce Data Cloud',
    'B2B lead generation',
    'Sales Cloud',
    'Salesforce Flow',
    'Apex development',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Certified Administrator' },
    { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Certified Platform Developer I' },
    { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Certified Platform App Builder' },
    { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Certified Sales Cloud Consultant' },
    { '@type': 'EducationalOccupationalCredential', name: 'Salesforce Certified CRM Analytics & Einstein Discovery Consultant' },
  ],
};

const AboutUs = () => {
  const { data } = useCms();
  const { aboutUsSection, seoMetadata, sharedComponents } = data;

  const getIconComponent = (iconName: string, size: number = 40) => {
    switch (iconName) {
      case 'Award': return <Award size={size} />;
      case 'CircleCheck': return <CircleCheck size={size} />;
      case 'Users': return <Users size={size} />;
      case 'Rocket': return <Rocket size={size} />;
      case 'Code': return <Code size={size} />;
      default: return <Award size={size} />;
    }
  };

  return (
    <>
      <Seo
        title={seoMetadata.aboutUs.title}
        description={seoMetadata.aboutUs.description}
        canonical="/about-us"
        jsonLd={personSchema}
      />
      <PageHeader
        title="About Meet The Mind"
        subtitle="Salesforce consulting built on 10+ years of hands-on CRM expertise — delivered globally."
      />

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="heading-md mb-6">{aboutUsSection.story.title}</h2>
            {aboutUsSection.story.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 text-lg leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* Values */}
          <h2 className="heading-md text-center mb-12">{aboutUsSection.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {aboutUsSection.values.values.map((value, index) => (
              <ValueCard
                key={index}
                icon={getIconComponent(value.icon)}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet the Founder</h2>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Photo column */}
                <div className="bg-gradient-to-br from-brand/10 to-blue-500/10 flex items-center justify-center p-10">
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    <img
                      src="/lovable-uploads/mitesh-jain-founder.png"
                      alt="Mitesh Jain, Founder & CEO of Meet The Mind Technologies"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Bio column */}
                <div className="md:col-span-2 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Mitesh Jain</h3>
                  <p className="text-brand font-semibold mb-4">Founder &amp; Lead Salesforce Consultant</p>

                  <p className="text-gray-700 mb-4">
                    Mitesh Jain is a 5x Salesforce Certified consultant and Agentblazer Innovator who has spent over a decade building CRM and automation systems for B2B revenue teams. Holding certifications across the Salesforce Platform, Sales Cloud, and CRM Analytics, he founded Meet The Mind Technologies to give ambitious businesses direct access to senior Salesforce expertise — without the overhead of a large consultancy.
                  </p>

                  <p className="text-gray-700 mb-5">
                    With clients across the US, UK, UAE, and Australia, Mitesh brings a global perspective to every engagement — from Agentforce AI agent rollouts to Apollo.io lead-gen automation wired directly into Salesforce. As a Salesforce Partner and Double Star Ranger with 230+ Trailhead badges, he stays at the cutting edge of the platform.
                  </p>

                  {/* Trailhead stats */}
                  <div className="grid grid-cols-4 gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
                    {trailheadStats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-lg font-bold text-brand">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Award size={14} />
                      Salesforce Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {certifications.map((cert) => (
                        <a
                          key={cert}
                          href="https://www.salesforce.com/trailblazer/mjain31"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-brand/10 text-brand font-semibold px-3 py-1.5 rounded-full border border-brand/20 hover:bg-brand/20 transition-colors"
                        >
                          <CheckCircle size={11} />
                          {cert}
                          <span className="text-gray-400 font-normal">· Mitesh Jain</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global reach */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Globe size={40} className="text-brand mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">A Global Practice</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Meet The Mind operates fully remote, partnering with clients across the United States, United Kingdom, United Arab Emirates, and Australia. No timezone is too far; no challenge is too complex.
          </p>
          <div className="inline-flex flex-wrap gap-6 justify-center text-2xl">
            <span title="United States">🇺🇸 United States</span>
            <span title="United Kingdom">🇬🇧 United Kingdom</span>
            <span title="United Arab Emirates">🇦🇪 UAE</span>
            <span title="Australia">🇦🇺 Australia</span>
          </div>
        </div>
      </section>

      <ContactCTA
        heading={sharedComponents.contactCTA.aboutUs.heading}
        subheading={sharedComponents.contactCTA.aboutUs.subheading}
        buttonText={sharedComponents.contactCTA.aboutUs.buttonText}
        buttonLink={sharedComponents.contactCTA.aboutUs.buttonLink}
      />
    </>
  );
};

export default AboutUs;
