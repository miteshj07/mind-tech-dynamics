
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';
import { Code, Laptop, Link2, FileSearch, ShieldCheck, Lightbulb, CheckCircle, Bot, Workflow } from 'lucide-react';

interface ServiceDetailProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
}

const ServiceDetail = ({ title, description, icon, features, benefits }: ServiceDetailProps) => {
  return (
    <div className="py-16 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="text-brand mb-4">{icon}</div>
            <h2 className="heading-md mb-6">{title}</h2>
            <p className="text-gray-600 text-lg mb-8">{description}</p>
            
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-brand mt-1 mr-3" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Business Benefits</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-brand text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Agentforce Implementation",
      description: "We design and deploy Salesforce Agentforce AI agents that qualify leads, resolve service cases 24/7, and automate CRM tasks — grounded in your real Salesforce data.",
      icon: <Bot size={48} />,
      features: [
        "Agent use-case scoping and guardrails",
        "Data and knowledge grounding in Salesforce",
        "Topic and action design with Flow and Apex",
        "Lead qualification and service agents",
        "Testing, escalation rules and launch",
        "Ongoing performance optimization"
      ],
      benefits: [
        "24/7 lead qualification and customer service",
        "Reps freed from repetitive CRM tasks",
        "Faster response and higher conversion",
        "AI actions grounded in your live data",
        "A scalable foundation for CRM automation"
      ]
    },
    {
      title: "B2B Lead-Generation Automation",
      description: "We build automated Apollo.io-to-Salesforce lead workflows — enrichment, deduplication, routing, and scoring — so your pipeline fills itself and no lead slips through the cracks.",
      icon: <Workflow size={48} />,
      features: [
        "Apollo.io to Salesforce integration",
        "Lead enrichment and field mapping",
        "Deduplication and data hygiene rules",
        "Logic-based lead routing and assignment",
        "Lead scoring and follow-up triggers",
        "Source-to-conversion reporting dashboards"
      ],
      benefits: [
        "A pipeline that fills itself automatically",
        "Clean, deduplicated, trustworthy CRM data",
        "Faster, fairer lead follow-up",
        "Higher conversion from prioritized leads",
        "Clear visibility into what drives pipeline"
      ]
    },
    {
      title: "CRM Implementation",
      description: "We deliver end-to-end Salesforce implementation services tailored to your unique business requirements, ensuring a smooth transition and rapid adoption across your organization.",
      icon: <Laptop size={48} />,
      features: [
        "Comprehensive needs assessment and solution design",
        "Custom configuration and development",
        "Data migration and cleansing",
        "User acceptance testing and quality assurance",
        "Deployment planning and execution",
        "Post-implementation support"
      ],
      benefits: [
        "Streamlined sales, service, and marketing processes",
        "Improved team collaboration and visibility",
        "Enhanced customer experience and engagement",
        "Data-driven decision making with accurate reporting",
        "Scalable solution to grow with your business"
      ]
    },
    {
      title: "Customization",
      description: "We extend Salesforce beyond its out-of-the-box capabilities with custom development tailored to your specific business processes and industry requirements.",
      icon: <Code size={48} />,
      features: [
        "Custom object and field creation",
        "Lightning component development",
        "Apex programming for complex business logic",
        "Process Builder and Flow customization",
        "Custom UI/UX design",
        "AppExchange app integration and customization"
      ],
      benefits: [
        "Perfectly aligned CRM solution to your business workflows",
        "Increased user adoption with intuitive interfaces",
        "Automated complex business processes",
        "Competitive advantage through unique functionality",
        "Enhanced productivity and reduced manual effort"
      ]
    },
    {
      title: "Integration",
      description: "We seamlessly connect Salesforce with your existing systems and third-party applications to create a unified business ecosystem with smooth data flow.",
      icon: <Link2 size={48} />,
      features: [
        "API development and implementation",
        "Middleware configuration",
        "ETL processes setup",
        "Real-time and batch integration",
        "MuleSoft implementation",
        "Custom integration solutions"
      ],
      benefits: [
        "360-degree view of your customers across all systems",
        "Elimination of data silos and duplicate entries",
        "Improved data accuracy and consistency",
        "Streamlined business processes across departments",
        "Enhanced reporting and analytics capabilities"
      ]
    },
    {
      title: "Migration",
      description: "We ensure a smooth transition from your legacy systems to Salesforce with comprehensive data migration strategies that preserve data integrity and business continuity.",
      icon: <FileSearch size={48} />,
      features: [
        "Data mapping and transformation",
        "Legacy system analysis",
        "Data cleansing and normalization",
        "Test migrations and validation",
        "Cutover planning",
        "Post-migration verification"
      ],
      benefits: [
        "Zero data loss during transition",
        "Minimized business disruption",
        "Improved data quality and structure",
        "Historical data preservation with complete context",
        "Phased approach to manage organizational change"
      ]
    },
    {
      title: "Support & Maintenance",
      description: "We provide ongoing Salesforce support and maintenance to ensure your system remains optimized, secure, and aligned with your evolving business needs.",
      icon: <ShieldCheck size={48} />,
      features: [
        "Proactive system health checks",
        "Bug fixes and troubleshooting",
        "Performance optimization",
        "Security updates and compliance",
        "User management and administration",
        "Regular system enhancements"
      ],
      benefits: [
        "Maximized system uptime and reliability",
        "Reduced internal IT burden",
        "Continuous improvement of your Salesforce instance",
        "Expert assistance available when you need it",
        "Cost-effective maintenance to protect your investment"
      ]
    }
  ];

  return (
    <>
      <Seo
        title="Salesforce, Agentforce & Lead-Gen Automation Services | Meet The Mind"
        description="Salesforce implementation, Agentforce AI agents, Apollo.io integration and B2B lead-generation automation. End-to-end CRM services for US, UK, UAE & Australian teams."
        canonical="/services"
      />
      <PageHeader
        title="Our Salesforce Services"
        subtitle="Explore our full suite of Salesforce services tailored to your unique business needs."
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-xl text-center max-w-4xl mx-auto mb-16">
            At Meet The Mind Technologies, we offer end-to-end Salesforce expertise to help you implement, customize, and optimize your CRM ecosystem. From initial planning to ongoing support, we're your partner throughout the entire journey.
          </p>
          
          {services.map((service, index) => (
            <ServiceDetail
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              benefits={service.benefits}
            />
          ))}
          
          <div className="bg-gray-50 rounded-xl p-8 mt-16">
            <h3 className="text-2xl font-semibold mb-4 text-center">Need a Custom Solution?</h3>
            <p className="text-center text-lg mb-6">
              Don't see what you're looking for? We specialize in creating custom Salesforce solutions for unique business challenges.
            </p>
            <div className="text-center">
              <a href="/contact-us" className="btn-primary inline-block">Let's Discuss</a>
            </div>
          </div>
        </div>
      </section>
      
      <ContactCTA
        heading="Ready to Transform Your Salesforce Experience?"
        subheading="Let our experts help you get the most out of your Salesforce investment."
        buttonText="Schedule a Consultation"
      />
    </>
  );
};

export default Services;
