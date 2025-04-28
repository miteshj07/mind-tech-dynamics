
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { Award, Rocket, CircleCheck, Users, Code } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember = ({ name, role, image, bio }: TeamMemberProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <img src={image} alt={name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-6">
          <p className="text-white text-center">{bio}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-brand">
      <div className="text-brand mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const AboutUs = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from solution design to implementation and support."
    },
    {
      icon: <CircleCheck size={40} />,
      title: "Client Success",
      description: "Your success is our success. We measure our achievement through the tangible results we deliver."
    },
    {
      icon: <Users size={40} />,
      title: "Collaboration",
      description: "We work as an extension of your team, with transparent communication every step of the way."
    },
    {
      icon: <Rocket size={40} />,
      title: "Innovation",
      description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions."
    },
    {
      icon: <Code size={40} />,
      title: "Expertise",
      description: "Our team of certified professionals brings deep technical knowledge and industry best practices."
    }
  ];

  const team = [
    {
      name: "David Chen",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Former Salesforce exec with 15+ years in CRM consulting and implementation."
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      bio: "Technical innovator with expertise in complex Salesforce integrations and custom development."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Consulting",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      bio: "Certified Salesforce architect with experience across multiple industries."
    },
    {
      name: "Priya Sharma",
      role: "Lead Solution Architect",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Expert in designing scalable Salesforce solutions for enterprise organizations."
    }
  ];

  return (
    <>
      <PageHeader 
        title="About Meet The Mind" 
        subtitle="We're a team of Salesforce experts dedicated to transforming how businesses leverage technology."
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="heading-md mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, Meet The Mind Technologies began with a simple mission: to help businesses harness the full potential of Salesforce through expert guidance and custom solutions.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small team of passionate Salesforce consultants has grown into a comprehensive solutions provider trusted by companies across industries and continents.
              </p>
              <p className="text-gray-700">
                Our journey has been defined by our commitment to client success, technical excellence, and continuous innovation. As Salesforce has evolved, so have we—constantly expanding our expertise to deliver cutting-edge solutions that drive measurable business outcomes.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand/30 to-blue-500/30 rounded-xl blur-xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Meet The Mind Team" 
                className="relative rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          <h2 className="heading-md text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
          
          <h2 className="heading-md text-center mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>
      
      <ContactCTA
        heading="Join Us on the Journey to Smarter Business Growth"
        subheading="Let's work together to unlock the full potential of your Salesforce investment."
      />
    </>
  );
};

export default AboutUs;
