
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import { Award, Laptop, Users, BookOpen, Rocket } from 'lucide-react';

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
  const jobs: JobPostingProps[] = [
    {
      title: "Salesforce Consultant",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Join our consulting team to help clients implement and optimize their Salesforce solutions. You'll work directly with clients to understand their business needs and translate them into effective CRM strategies.",
      requirements: [
        "3+ years of experience with Salesforce implementation projects",
        "At least one Salesforce certification (Admin, Developer, or Consultant)",
        "Strong problem-solving skills and attention to detail",
        "Excellent communication and client management abilities",
        "Experience in one or more industries: retail, healthcare, financial services, or technology"
      ]
    },
    {
      title: "Senior Salesforce Developer",
      location: "Remote / New York",
      type: "Full-time",
      description: "We're looking for an experienced Salesforce Developer to join our technical team. In this role, you'll design and build custom solutions, integrations, and extensions using Apex, Visualforce, Lightning Components, and APIs.",
      requirements: [
        "5+ years of experience in Salesforce development",
        "Strong proficiency in Apex, SOQL, Lightning Components, and API integrations",
        "Salesforce Platform Developer I & II certifications",
        "Experience with JavaScript frameworks and web development",
        "Ability to mentor junior developers and contribute to technical architecture"
      ]
    },
    {
      title: "Salesforce Administrator",
      location: "Remote / Chicago",
      type: "Full-time",
      description: "Support our clients' Salesforce environments with day-to-day administration, user management, and system optimization. You'll ensure Salesforce runs smoothly and efficiently to meet business needs.",
      requirements: [
        "2+ years as a Salesforce Administrator",
        "Salesforce Administrator certification",
        "Experience with Sales Cloud and Service Cloud",
        "Knowledge of data management, reports, and dashboards",
        "Strong troubleshooting and problem-solving skills"
      ]
    },
    {
      title: "Marketing Automation Specialist",
      location: "Remote / Austin",
      type: "Full-time",
      description: "Help our clients leverage Salesforce Marketing Cloud to create personalized, data-driven marketing campaigns. You'll implement and optimize marketing automation solutions to drive engagement and conversion.",
      requirements: [
        "3+ years of experience with Salesforce Marketing Cloud",
        "Marketing Cloud Email Specialist certification preferred",
        "Experience with Journey Builder, Automation Studio, and AMPscript",
        "Understanding of email marketing best practices and compliance",
        "Analytics skills to measure campaign performance and ROI"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Laptop size={24} />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and a focus on outcomes rather than hours logged."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Continuous Learning",
      description: "We cover certification costs and provide dedicated time for professional development."
    },
    {
      icon: <Rocket size={24} />,
      title: "Career Growth",
      description: "Clear advancement paths and mentorship from industry leaders in the Salesforce ecosystem."
    },
    {
      icon: <Award size={24} />,
      title: "Competitive Compensation",
      description: "Above-market salary, performance bonuses, and comprehensive healthcare benefits."
    },
    {
      icon: <Users size={24} />,
      title: "Collaborative Environment",
      description: "Work alongside passionate experts who are committed to client success and innovation."
    }
  ];

  return (
    <>
      <PageHeader 
        title="Join Our Team" 
        subtitle="Build a future in innovative tech solutions with a company that values growth, collaboration, and excellence."
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-md mb-6">Life at Meet The Mind</h2>
              <p className="text-gray-600 mb-4">
                At Meet The Mind Technologies, we're building a team of passionate Salesforce experts who are committed to delivering exceptional solutions for our clients. We believe in fostering an environment where innovation thrives, learning is continuous, and work-life balance is respected.
              </p>
              <p className="text-gray-600">
                Our culture is built on collaboration, technical excellence, and putting people first—both our team members and our clients. If you're looking to grow your career in the Salesforce ecosystem while working on impactful projects with a supportive team, we'd love to hear from you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Team collaboration" 
                className="rounded-xl h-full w-full object-cover"
              />
              <div className="grid grid-rows-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Office space" 
                  className="rounded-xl h-full w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Team working" 
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h2 className="heading-md text-center mb-6">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 bg-gray-50 rounded-xl p-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
          
          <h2 className="heading-md text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
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
            <h3 className="text-2xl font-semibold mb-4">Don't See a Perfect Match?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities.
            </p>
            <button className="btn-secondary">
              Submit Your Resume
            </button>
          </div>
        </div>
      </section>
      
      <ContactCTA
        heading="Have Questions About Working With Us?"
        subheading="We'd love to tell you more about our company culture and opportunities."
        buttonText="Contact Our Recruitment Team"
        buttonLink="/contact-us?dept=careers"
      />
    </>
  );
};

export default Careers;
