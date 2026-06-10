
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Database, Zap, BarChart3, RefreshCw, Users, ShieldCheck, Target } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const whatIsDataCloud = [
  'Unifies customer data from every source — CRM, website, marketing, support, billing — into a single real-time profile',
  'Streams data directly into Salesforce so Sales Cloud, Service Cloud, and Agentforce always work from live, complete data',
  'Powers AI personalisation, lead scoring, and audience segmentation at scale — without a separate data warehouse',
  'Replaces fragmented CDPs and ETL pipelines with a native Salesforce platform that your team can actually use',
];

const useCases = [
  {
    icon: <Target size={28} />,
    title: 'Unified B2B Customer Profiles',
    description: 'Merge CRM contacts, website behaviour, marketing engagement, and support history into a single Data Cloud profile. Sales reps see the full picture — not just what\'s in Salesforce.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Real-Time Lead Scoring',
    description: 'Score leads in real time using Data Cloud calculated insights — combining Apollo.io firmographic data, website intent signals, email engagement, and CRM history into a single score that updates automatically.',
  },
  {
    icon: <RefreshCw size={28} />,
    title: 'Apollo.io + Data Cloud Integration',
    description: 'Stream Apollo.io prospect data into Data Cloud to build enriched segments for outbound sequences. Target the right companies at the right time using intent signals and engagement history.',
  },
  {
    icon: <Users size={28} />,
    title: 'Agentforce Grounding',
    description: 'Data Cloud is the memory layer for Agentforce AI agents. Agents grounded in Data Cloud have access to complete, real-time customer context — enabling more accurate lead qualification, case resolution, and next-best-action recommendations.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'B2B Audience Segmentation',
    description: 'Build dynamic segments based on firmographics, product usage, engagement recency, and deal stage. Sync segments to Marketing Cloud, LinkedIn Ads, or Salesforce Flows for targeted outreach.',
  },
  {
    icon: <Database size={28} />,
    title: 'Data Harmonisation & Governance',
    description: 'Map data from disparate systems (CRM, billing, support, product analytics) to a unified data model. Enforce data quality rules, consent management, and field-level governance across every source.',
  },
];

const implementation = [
  ['Data source audit', 'We identify every system that holds customer data — CRM, marketing tools, billing platforms, product analytics — and map what needs to flow into Data Cloud and why.'],
  ['Data model design', 'We design your Data Cloud data model: which objects map to which Data Cloud entities, how records are matched and merged, and which calculated fields you need.'],
  ['Connector & ingestion setup', 'We configure Salesforce-native connectors (Sales Cloud, Marketing Cloud) and build custom ingestion for external sources (Apollo.io, QuickBooks, third-party APIs) using Data Cloud ingestion APIs.'],
  ['Identity resolution', 'We configure Data Cloud\'s identity resolution rules — matching contacts and accounts across sources by email, domain, and custom identifiers to build accurate unified profiles.'],
  ['Calculated insights & segments', 'We build calculated insights (lead scores, engagement recency, revenue potential) and audience segments that feed directly into Salesforce Flows and Agentforce agents.'],
  ['Activation & testing', 'We activate unified profiles and segments into Sales Cloud, Agentforce, and Marketing Cloud — then test data freshness, match rates, and segment accuracy before go-live.'],
];

const faqs = [
  {
    q: 'What is Salesforce Data Cloud?',
    a: 'Salesforce Data Cloud (formerly Customer Data Platform / CDP) is Salesforce\'s real-time data platform that unifies customer data from every source into a single profile inside Salesforce. Unlike a traditional CDP, it runs natively inside Salesforce — so unified data is immediately available in Sales Cloud, Service Cloud, Marketing Cloud, and Agentforce without ETL pipelines or data exports.',
  },
  {
    q: 'How is Data Cloud different from a standard Salesforce CRM?',
    a: 'Standard Salesforce CRM stores the data your team manually enters. Data Cloud continuously ingests data from every system — website, marketing, billing, support, product — and unifies it into a real-time profile. The result: Sales Cloud records are automatically enriched with context that previously lived in 5 different tools.',
  },
  {
    q: 'Do we need Marketing Cloud to use Data Cloud?',
    a: 'No. Data Cloud has its own licence and works with Sales Cloud, Service Cloud, and Agentforce independently. Marketing Cloud is one of many activation targets — not a prerequisite.',
  },
  {
    q: 'Can Data Cloud integrate with Apollo.io?',
    a: 'Yes. We use the Data Cloud ingestion API to stream Apollo.io prospect data — firmographics, intent signals, sequence engagement — into Data Cloud profiles. This enriches your Salesforce contacts automatically and powers more accurate lead scoring and Agentforce grounding.',
  },
  {
    q: 'What licences are needed for Salesforce Data Cloud?',
    a: 'Data Cloud has its own licence, priced on data volumes and activation targets. We assess your data sources, expected record volumes, and use cases during discovery to recommend the right licence configuration before you commit.',
  },
  {
    q: 'How long does a Data Cloud implementation take?',
    a: 'A focused implementation (2–3 data sources, unified profiles, lead scoring, and Agentforce grounding) typically takes 6–10 weeks. Larger implementations with more sources and activation targets run 12–16 weeks.',
  },
  {
    q: 'Does Meet The Mind implement Data Cloud for B2B companies specifically?',
    a: 'Yes — our Data Cloud implementations are designed entirely for B2B revenue teams. We focus on use cases that drive pipeline: lead scoring from behavioural and firmographic data, Apollo.io enrichment, Agentforce agent grounding, and outbound audience segmentation.',
  },
];

const SalesforceDataCloud = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Salesforce Data Cloud Consulting',
    serviceType: 'Salesforce Data Cloud implementation and B2B customer data platform consulting',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'Salesforce Data Cloud implementation for B2B revenue teams — unified customer profiles, real-time lead scoring, Apollo.io integration, Agentforce grounding, and audience segmentation. Meet The Mind Technologies.',
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
        title="Salesforce Data Cloud Consulting — B2B Implementation | Meet The Mind"
        description="Salesforce Data Cloud implementation for B2B teams. Unified customer profiles, real-time lead scoring, Apollo.io integration, and Agentforce AI grounding. US, UK, UAE & Australia."
        canonical="/salesforce-data-cloud"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Salesforce Data Cloud Consulting"
        subtitle="We implement Salesforce Data Cloud for B2B revenue teams — unifying customer data from every source into a real-time profile that powers Agentforce AI agents, lead scoring, and outbound segmentation."
      />

      {/* What is Data Cloud */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
              <Database className="text-brand" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">What is Salesforce Data Cloud?</h2>
              <p className="text-gray-500">Salesforce's fastest-growing product — and the foundation every modern Salesforce stack is moving toward.</p>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            {whatIsDataCloud.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5">
                <CheckCircle className="text-brand flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
          <div className="bg-brand/5 border border-brand/20 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>Meet The Mind's position:</strong> We implement Data Cloud specifically for B2B revenue teams
              — connecting Apollo.io outbound data, Salesforce CRM records, and external sources into unified
              profiles that feed Agentforce agents and Salesforce Flow automation. The result is a revenue stack
              where every agent, every rep, and every automation works from the same complete, real-time data.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">Data Cloud use cases we implement</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            Each implementation is scoped around a specific revenue outcome — not generic data unification for its own sake.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((u, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                <div className="text-brand mb-4">{u.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{u.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation process */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-4 text-center">Our Data Cloud implementation process</h2>
          <p className="text-gray-500 text-center mb-12">A structured 6-phase approach — from data source audit to live unified profiles.</p>
          <ol className="space-y-6">
            {implementation.map(([title, desc], i) => (
              <li key={i} className="flex items-start">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-semibold text-sm">
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

      {/* Why MTM */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-10 text-center">Why choose Meet The Mind for Data Cloud</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Apollo.io + Data Cloud specialist',
                desc: 'We\'re the only Salesforce consultancy that builds Apollo.io outbound data natively into Data Cloud profiles — giving you enriched, intent-aware prospect records without manual exports.',
              },
              {
                title: 'Agentforce-first architecture',
                desc: 'Every Data Cloud implementation we build is designed to ground Agentforce AI agents. Data Cloud without Agentforce is half the value — we connect both from day one.',
              },
              {
                title: 'B2B revenue team focus',
                desc: 'We don\'t implement generic CDPs. Every Data Cloud engagement is scoped around pipeline impact: lead scoring, outbound segmentation, rep productivity, and forecast accuracy.',
              },
              {
                title: 'Salesforce-certified, founder-led',
                desc: 'Mitesh Jain leads every engagement with 10+ years of Salesforce experience across Sales Cloud, Apex, Flow, and now Data Cloud and Agentforce.',
              },
            ].map((w, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="text-brand" size={18} />
                  <h3 className="font-semibold text-brand">{w.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Salesforce Data Cloud FAQs</h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agentforce-implementation" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Agentforce implementation <ArrowRight size={16} />
            </Link>
            <Link to="/apollo-io-salesforce-integration" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Apollo.io–Salesforce integration <ArrowRight size={16} />
            </Link>
            <Link to="/salesforce-health-check" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Free Salesforce audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to unify your B2B customer data in Salesforce?"
        subheading="Book a free 45-minute discovery call. We'll assess your current data sources and outline a Data Cloud implementation plan with clear ROI targets."
        buttonText="Book a Free Data Cloud Discovery Call"
      />
    </>
  );
};

export default SalesforceDataCloud;
