import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Target, Headphones, Workflow, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const capabilities = [
  {
    icon: <Target size={40} />,
    title: 'Lead Qualification Agents',
    description:
      'Agentforce agents that engage inbound leads instantly, ask qualifying questions, and create or update Salesforce records so your reps only talk to sales-ready prospects.',
  },
  {
    icon: <Headphones size={40} />,
    title: '24/7 Service Agents',
    description:
      'Autonomous service agents grounded in your knowledge base that resolve common customer questions, deflect cases, and escalate to humans with full context.',
  },
  {
    icon: <Workflow size={40} />,
    title: 'Internal Ops Agents',
    description:
      'Agents that automate repetitive CRM tasks — data entry, follow-up creation, record updates, and routing — so your team spends time selling, not clicking.',
  },
];

const process = [
  ['Discovery & use-case scoping', 'We identify the highest-ROI agent use cases and define guardrails, tone, and success metrics.'],
  ['Data & knowledge grounding', 'We connect Agentforce to your Salesforce data, knowledge articles, and systems so answers are accurate and on-brand.'],
  ['Agent build & topic design', 'We configure topics, actions, and Flows/Apex so each agent can actually do the work, not just chat.'],
  ['Testing & guardrails', 'We test against real scenarios, tune responses, and set escalation rules before anything goes live.'],
  ['Launch & optimization', 'We deploy, monitor performance, and refine — improving deflection, qualification, and conversion over time.'],
];

const faqs = [
  {
    q: 'What is Salesforce Agentforce?',
    a: 'Agentforce is Salesforce’s platform for building autonomous AI agents that take action inside your CRM — qualifying leads, answering customers, and automating tasks — using your own Salesforce data and business rules.',
  },
  {
    q: 'What does an Agentforce specialist or consultant do?',
    a: 'An Agentforce specialist scopes the right use cases, grounds agents in your Salesforce data and knowledge base, builds the topics and actions (including Flow and Apex), sets guardrails and escalation rules, and optimizes performance after launch. Meet The Mind delivers all of this end to end.',
  },
  {
    q: 'How is Agentforce different from a chatbot?',
    a: 'Traditional chatbots follow scripted flows. Agentforce agents reason over your live Salesforce data and can take real actions — creating records, updating opportunities, routing leads, and resolving cases — not just returning canned replies.',
  },
  {
    q: 'Can Agentforce help with B2B lead generation?',
    a: 'Yes. Agentforce agents can qualify inbound leads 24/7, enrich and route them in Salesforce, and trigger follow-up — which pairs directly with our Apollo.io-to-Salesforce lead-generation automation.',
  },
  {
    q: 'Which countries does Meet The Mind serve for Agentforce?',
    a: 'Meet The Mind implements Agentforce for B2B teams in the United States, United Kingdom, United Arab Emirates, and Australia, with responsive, timezone-friendly delivery.',
  },
];

const Agentforce = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Agentforce Implementation',
    serviceType: 'Salesforce Agentforce implementation and AI agent development',
    provider: { '@type': 'Organization', name: 'Meet The Mind Technologies', url: 'https://www.meethemind.com/' },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'End-to-end Salesforce Agentforce implementation — lead qualification agents, 24/7 service agents, and automation agents grounded in your CRM data.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title="Agentforce Implementation | Salesforce AI Agents for B2B — Meet The Mind"
        description="Salesforce Agentforce implementation partner. We build AI agents that qualify leads, resolve service cases 24/7, and automate CRM tasks for B2B teams in the US, UK, UAE & Australia."
        canonical="/agentforce"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Agentforce Implementation"
        subtitle="We design and deploy Salesforce Agentforce AI agents that qualify leads, answer customers, and automate work — grounded in your real CRM data."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-brand mb-4"><Bot size={48} /></div>
          <h2 className="heading-md mb-6">AI agents that take action inside Salesforce</h2>
          <p className="text-gray-600 text-lg mb-4">
            Agentforce is Salesforce's platform for autonomous AI agents — and Meet The Mind is an early-adopter
            implementation partner. Unlike scripted chatbots, Agentforce agents reason over your live Salesforce
            data and take real actions: creating and updating records, routing and qualifying leads, and resolving
            customer cases around the clock.
          </p>
          <p className="text-gray-600 text-lg">
            We deliver Agentforce end to end — from use-case scoping and data grounding to topic and action design
            (including Flow and Apex), guardrails, launch, and ongoing optimization.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-12 text-center">What we build with Agentforce</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-brand mb-4">{c.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
                <p className="text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-12 text-center">Our Agentforce implementation process</h2>
          <ol className="space-y-6">
            {process.map(([title, desc], i) => (
              <li key={i} className="flex items-start">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-semibold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Agentforce FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start">
                  <CheckCircle className="text-brand mr-2 mt-1 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/b2b-lead-generation" className="text-brand font-semibold hover:underline">
              See how Agentforce pairs with our B2B lead-generation automation →
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to put AI agents to work in Salesforce?"
        subheading="Let's scope your first high-ROI Agentforce use case and map the path to launch."
        buttonText="Book a Free Agentforce Consultation"
      />
    </>
  );
};

export default Agentforce;
