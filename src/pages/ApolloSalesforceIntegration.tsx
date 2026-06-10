
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Database, RefreshCw, Filter, BarChart3, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const problems = [
  'Apollo.io sequences run but leads never appear in Salesforce — reps work blind',
  'Duplicate records created every time a rep manually exports Apollo.io contacts',
  'No way to track Apollo.io sequence performance alongside Salesforce pipeline',
  'Inbound leads from Salesforce Web-to-Lead bypass Apollo.io enrichment entirely',
  'SDR activity in Apollo.io is invisible to Sales Cloud reporting and forecasting',
];

const capabilities = [
  {
    icon: <RefreshCw size={28} />,
    title: 'Bi-Directional Lead Sync',
    description: 'New Apollo.io contacts sync to Salesforce Leads automatically. Salesforce Web-to-Lead submissions enrich via Apollo.io before routing. Both systems stay in sync — no manual exports, no duplicates.',
  },
  {
    icon: <Filter size={28} />,
    title: 'Lead Scoring & Routing',
    description: 'Apollo.io firmographic and intent data (company size, industry, tech stack, intent signals) flows into Salesforce custom fields. Salesforce Flow routes leads to the right rep based on score, territory, or product fit.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Sequence Activity Logging',
    description: 'Every Apollo.io email open, reply, and sequence step logs as a Salesforce Activity or Task. Your pipeline and outbound activity data live in one place — Sales Cloud becomes your single source of truth.',
  },
  {
    icon: <Database size={28} />,
    title: 'CRM Enrichment on Demand',
    description: 'Trigger Apollo.io enrichment on existing Salesforce records via Flow — fill missing fields like phone, LinkedIn, tech stack, and company revenue without leaving the CRM.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Unified Pipeline Reporting',
    description: 'Build Salesforce reports that combine Apollo.io sequence performance with Opportunity conversion rates. See which outbound sequences drive the most pipeline, and which industries convert best.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Agentforce AI Layer (Optional)',
    description: 'Layer Agentforce AI agents on top of the integration — agents that qualify inbound enriched leads, prioritise high-intent contacts, and trigger personalised follow-up sequences automatically.',
  },
];

const steps = [
  ['Discovery & field mapping', 'We audit your Apollo.io sequences, Salesforce data model, and lead routing logic to define the integration blueprint — which fields sync, which direction, and under what conditions.'],
  ['API connection & authentication', 'We connect Apollo.io to Salesforce using the Apollo.io API and Salesforce REST API, with OAuth2 authentication and error-logging middleware.'],
  ['Lead sync & deduplication rules', 'We configure bi-directional sync with deduplication logic — matching on email and domain — so records merge cleanly rather than multiply.'],
  ['Flow-based routing & scoring', 'We build Salesforce Flows that use Apollo.io enrichment data to score leads and route them automatically to the right rep or queue.'],
  ['Activity logging & reporting', 'We map Apollo.io sequence events to Salesforce Activities and build reporting dashboards that unify outbound and pipeline data.'],
  ['Testing & go-live', 'We run end-to-end integration tests across real sequences and leads, then deploy to production with rollback safeguards.'],
];

const faqs = [
  {
    q: 'Does Apollo.io have a native Salesforce integration?',
    a: 'Apollo.io has a basic native integration, but it is limited — it pushes contacts one-way, lacks field-level mapping control, and does not support bi-directional sync, deduplication logic, or Flow-based routing. A custom integration built by Meet The Mind gives you full control over how data moves between both systems.',
  },
  {
    q: 'What data syncs between Apollo.io and Salesforce?',
    a: 'Contact and company firmographics (name, title, email, phone, company, industry, size, revenue, tech stack), sequence activity (emails sent, opened, replied), intent signals, and enrichment fields. We define exactly which fields sync and which stay separate during discovery.',
  },
  {
    q: 'Will this create duplicate records in Salesforce?',
    a: 'No — deduplication is a core part of the integration design. We match records on email address and company domain, merging or linking existing records rather than creating new ones.',
  },
  {
    q: 'Can you integrate Apollo.io with Agentforce AI agents?',
    a: 'Yes — and this is one of our strongest differentiators. We build integrations where Apollo.io enriches inbound Salesforce leads, and Agentforce agents qualify and route them automatically. It creates a fully automated top-of-funnel pipeline engine.',
  },
  {
    q: 'How long does the Apollo.io–Salesforce integration take?',
    a: 'A standard bi-directional integration with routing and activity logging typically takes 2–3 weeks from discovery to go-live. More complex setups with Agentforce layering run 4–6 weeks.',
  },
  {
    q: 'Which companies is this integration best suited for?',
    a: 'B2B SaaS, FinTech, and Professional Services companies running outbound sequences in Apollo.io and managing pipeline in Salesforce — typically 10–200 person revenue teams who have outgrown manual CSV exports.',
  },
];

const ApolloSalesforceIntegration = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Apollo.io Salesforce Integration',
    serviceType: 'Apollo.io to Salesforce CRM integration and lead automation',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'Custom Apollo.io to Salesforce integration — bi-directional lead sync, enrichment, sequence activity logging, Flow-based routing, and unified pipeline reporting. Built by Meet The Mind Technologies.',
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
        title="Apollo.io Salesforce Integration — Custom Bi-Directional Sync | Meet The Mind"
        description="Custom Apollo.io to Salesforce integration: bi-directional lead sync, enrichment, sequence activity logging, and Flow-based routing. Built for B2B revenue teams. US, UK, UAE & Australia."
        canonical="/apollo-io-salesforce-integration"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Apollo.io–Salesforce Integration"
        subtitle="We build custom bi-directional integrations between Apollo.io and Salesforce — syncing leads, enriching records, logging sequence activity, and routing prospects automatically using Salesforce Flow."
      />

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Meet The Mind Technologies specialises in Apollo.io–Salesforce integration for B2B revenue teams.
            We design and build custom integrations that go far beyond Apollo.io's native connector —
            giving you full control over field mapping, deduplication, enrichment triggers, and
            Salesforce Flow-based lead routing.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The result: every lead Apollo.io touches appears enriched in Salesforce, every outbound
            activity logs against the right record, and your pipeline reporting finally reflects your
            actual outbound effort.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 font-semibold mb-2">The problem we solve most often:</p>
            <ul className="space-y-2">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="mt-1 text-amber-500 flex-shrink-0">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">What we build into the integration</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            Each capability is scoped to your specific lead flow — we don't use a generic template.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                <div className="text-brand mb-4">{c.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-12 text-center">How we build the integration</h2>
          <ol className="space-y-6">
            {steps.map(([title, desc], i) => (
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

      {/* Trust strip */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-brand font-semibold uppercase tracking-widest text-sm mb-4">Why Meet The Mind</p>
          <h2 className="text-2xl font-bold mb-4">The only Salesforce consultancy that specialises in Apollo.io + Agentforce automation</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Most Salesforce partners don't use Apollo.io. Most Apollo.io agencies don't know Salesforce Apex.
            Meet The Mind sits at the intersection — 10+ years of Salesforce implementation experience,
            combined with deep Apollo.io workflow expertise and Agentforce AI agent capability.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
              <ShieldCheck size={15} /> Salesforce Certified
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
              <CheckCircle size={15} /> Apollo.io Specialist
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
              <CheckCircle size={15} /> Agentforce Partner
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Apollo.io–Salesforce integration FAQs</h2>
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
              Explore Agentforce implementation <ArrowRight size={16} />
            </Link>
            <Link to="/salesforce-revops" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              See RevOps automation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to connect Apollo.io and Salesforce properly?"
        subheading="Book a free 45-minute discovery call. We'll map your current lead flow and show you exactly what the integration would look like."
        buttonText="Book a Free Integration Discovery Call"
      />
    </>
  );
};

export default ApolloSalesforceIntegration;
