import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Workflow, Database, Filter, Send, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const steps = [
  ['Source & enrich in Apollo.io', 'We define your ideal customer profile and build targeted lists in Apollo.io, enriched with verified contact and firmographic data.'],
  ['Sync to Salesforce', 'Leads flow into Salesforce automatically with field mapping, so no record is ever re-keyed by hand.'],
  ['Deduplicate & clean', 'Matching rules prevent duplicates and keep your database clean as new leads arrive.'],
  ['Route & assign', 'Logic-based assignment rules route each lead to the right rep or queue instantly — by territory, segment, or round-robin.'],
  ['Score & prioritize', 'Lead scoring surfaces the hottest prospects first, and tasks/alerts trigger timely follow-up.'],
  ['Measure & optimize', 'Dashboards track source, conversion, and pipeline so you can double down on what works.'],
];

const outcomes = [
  {
    icon: <Database size={40} />,
    title: 'A pipeline that fills itself',
    description: 'Automated Apollo.io-to-Salesforce flows keep qualified leads landing in your CRM without manual list imports.',
  },
  {
    icon: <Filter size={40} />,
    title: 'Clean, deduplicated data',
    description: 'Enrichment and matching rules keep records accurate so reps trust the CRM and reporting stays reliable.',
  },
  {
    icon: <Send size={40} />,
    title: 'Faster, fairer follow-up',
    description: 'Instant routing and scoring mean every lead reaches the right rep quickly — no leads slipping through the cracks.',
  },
];

const faqs = [
  {
    q: 'What is automated B2B lead-generation in Salesforce?',
    a: 'It is a workflow that captures, enriches, deduplicates, routes, and scores B2B leads automatically inside Salesforce — so your pipeline fills and follow-up happens without manual data entry. Meet The Mind builds these workflows using Apollo.io and Salesforce.',
  },
  {
    q: 'How do you connect Apollo.io to Salesforce?',
    a: 'We integrate Apollo.io with Salesforce so enriched leads sync automatically with mapped fields, deduplication, assignment rules, and scoring. The result is a hands-off flow from prospect list to assigned, prioritized lead.',
  },
  {
    q: 'Do I need Sales Cloud for this?',
    a: 'Salesforce Sales Cloud is the typical foundation, but we adapt the lead-generation automation to your existing Salesforce setup, including custom objects, Flows, and Apex where needed.',
  },
  {
    q: 'Can this work with Agentforce AI agents?',
    a: 'Yes. Agentforce agents can qualify and respond to inbound leads 24/7, then hand them into the same automated routing and scoring workflow — combining AI agents with reliable pipeline automation.',
  },
  {
    q: 'Which markets does Meet The Mind serve?',
    a: 'We build B2B lead-generation automation for revenue teams in the United States, United Kingdom, United Arab Emirates, and Australia.',
  },
];

const LeadGeneration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'B2B Lead-Generation Automation',
    serviceType: 'Apollo.io to Salesforce lead-generation automation',
    provider: { '@type': 'Organization', name: 'Meet The Mind Technologies', url: 'https://www.meethemind.com/' },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'Automated B2B lead-generation workflows connecting Apollo.io to Salesforce — enrichment, deduplication, routing, and scoring to keep your pipeline full.',
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
        title="B2B Lead-Generation Automation (Apollo.io → Salesforce) | Meet The Mind"
        description="We build automated B2B lead-generation workflows connecting Apollo.io to Salesforce — enrichment, deduplication, routing and scoring. Serving the US, UK, UAE & Australia."
        canonical="/b2b-lead-generation"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="B2B Lead-Generation Automation"
        subtitle="Automated Apollo.io-to-Salesforce workflows — enrichment, deduplication, routing, and scoring that keep your pipeline full."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-brand mb-4"><Workflow size={48} /></div>
          <h2 className="heading-md mb-6">Turn Salesforce into a pipeline engine</h2>
          <p className="text-gray-600 text-lg mb-4">
            Most B2B teams lose pipeline to manual list imports, duplicate records, and slow lead routing. We fix
            that by connecting <strong>Apollo.io</strong> to <strong>Salesforce</strong> and automating the entire
            path from prospect to assigned, prioritized lead.
          </p>
          <p className="text-gray-600 text-lg">
            The result is a repeatable, measurable lead-generation workflow — so your reps spend time selling
            instead of cleaning data.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-12 text-center">What you get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((o, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-brand mb-4">{o.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{o.title}</h3>
                <p className="text-gray-600">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-12 text-center">The Apollo.io → Salesforce workflow</h2>
          <ol className="space-y-6">
            {steps.map(([title, desc], i) => (
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
          <h2 className="heading-md mb-10 text-center">Lead-Generation FAQs</h2>
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
            <Link to="/agentforce" className="text-brand font-semibold hover:underline">
              Pair this with Agentforce AI agents for 24/7 lead qualification →
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to automate your B2B pipeline?"
        subheading="Let's map your Apollo.io-to-Salesforce lead workflow and find the quickest wins."
        buttonText="Book a Free Lead-Gen Consultation"
      />
    </>
  );
};

export default LeadGeneration;
