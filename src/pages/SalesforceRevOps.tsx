
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, TrendingUp, RefreshCw, BarChart3, Workflow, Target, Zap, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const challenges = [
  'Leads fall through the cracks between marketing handoff and sales follow-up',
  'Forecasting is manual — reps update pipeline in spreadsheets alongside Salesforce',
  'No single view of the customer across marketing, sales, and post-sale',
  'Quota and territory management done outside the CRM, creating data mismatches',
  'Sales cycle length is unknown because stage dates are never tracked',
  'Reporting takes hours of manual extraction instead of a live dashboard',
];

const services = [
  {
    icon: <Workflow size={28} />,
    title: 'Lead-to-Close Process Automation',
    description: 'We map your entire revenue process — from first touch to closed-won — into Salesforce. Lead assignment rules, stage gates, approval workflows, and automated handoffs between SDRs, AEs, and CSMs.',
  },
  {
    icon: <Target size={28} />,
    title: 'Sales Velocity Optimisation',
    description: 'We configure Salesforce to track deal velocity: time in stage, average sales cycle, win rate by rep and segment. This data feeds coaching decisions and pipeline forecasting with real accuracy.',
  },
  {
    icon: <RefreshCw size={28} />,
    title: 'Apollo.io + Salesforce Outbound Automation',
    description: 'We connect Apollo.io outbound sequences directly to Salesforce pipeline — syncing contacts, logging sequence activity, and triggering Salesforce Flows based on prospect engagement signals.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Pipeline & Forecast Reporting',
    description: 'We build live Salesforce dashboards that replace weekly forecast spreadsheets — showing pipeline by stage, source, rep, and close date, with historical trend data leadership can act on.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Flow-Based Revenue Automation',
    description: 'We automate the manual work that kills RevOps efficiency: follow-up task creation, deal stage alerts, renewal reminders, quote approvals, and territory assignment — all inside Salesforce Flow.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Agentforce AI for RevOps',
    description: 'Layer Salesforce Agentforce AI agents on top of your RevOps stack — agents that qualify inbound leads, flag at-risk deals, summarise account history for AEs, and surface next-best-action recommendations.',
  },
];

const outcomes = [
  { metric: '45%', label: 'average productivity lift across sales teams we\'ve implemented' },
  { metric: '3.5×', label: 'ROI reported by clients within 12 months of implementation' },
  { metric: '98%', label: 'client satisfaction rating across all engagements' },
  { metric: '10+', label: 'years Salesforce implementation experience, founder-led delivery' },
];

const faqs = [
  {
    q: 'What is Salesforce RevOps automation?',
    a: 'Salesforce RevOps (Revenue Operations) automation means using Salesforce — combined with tools like Apollo.io and Agentforce — to eliminate manual handoffs between marketing, sales, and customer success, automate pipeline management and reporting, and create a single system of record for all revenue data.',
  },
  {
    q: 'How is this different from a standard Salesforce implementation?',
    a: 'A standard implementation configures Salesforce objects and users. A RevOps implementation goes further — designing the full lead-to-cash process, connecting outbound tools like Apollo.io, building Flow-based automation for every revenue handoff, and creating dashboards that actually drive decisions. We do both, but the RevOps layer is what changes behaviour.',
  },
  {
    q: 'Do you work with existing Salesforce orgs, or only greenfield implementations?',
    a: 'Both. We frequently inherit existing Salesforce orgs — auditing the current setup, cleaning data, redesigning broken processes, and building automation on top of what already works. A Salesforce health check audit is often the first step.',
  },
  {
    q: 'Can you integrate Apollo.io into our RevOps stack?',
    a: 'Yes — Apollo.io to Salesforce integration is one of our core specialisations. We sync leads bi-directionally, log sequence activity to Salesforce records, use Apollo.io firmographic data in lead scoring, and trigger Salesforce Flows based on outbound engagement signals.',
  },
  {
    q: 'Which industries do you serve for Salesforce RevOps?',
    a: 'We primarily serve B2B SaaS, FinTech, and Professional Services companies — typically 10–250 person revenue teams running Salesforce as their CRM with Apollo.io for outbound. We serve clients in the US, UK, UAE, and Australia.',
  },
  {
    q: 'How long does a RevOps automation project take?',
    a: 'Focused automation projects (e.g. lead routing, pipeline reporting, Apollo.io sync) take 3–6 weeks. Full end-to-end RevOps implementations — process redesign, automation, reporting, and training — run 8–14 weeks depending on org complexity.',
  },
];

const SalesforceRevOps = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Salesforce RevOps Automation',
    serviceType: 'Salesforce Revenue Operations consulting and automation',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'Salesforce RevOps automation for B2B revenue teams — lead-to-close process design, pipeline reporting, Apollo.io integration, Flow-based automation, and Agentforce AI agents. Meet The Mind Technologies.',
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
        title="Salesforce RevOps Automation — Revenue Operations Consulting | Meet The Mind"
        description="Salesforce Revenue Operations (RevOps) consulting for B2B teams. Lead-to-close automation, Apollo.io integration, pipeline reporting, and Agentforce AI. US, UK, UAE & Australia."
        canonical="/salesforce-revops"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Salesforce RevOps Automation"
        subtitle="We design and automate your entire revenue process inside Salesforce — from first Apollo.io touch to closed-won — so your sales, marketing, and CS teams operate from one system with zero manual handoffs."
      />

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Meet The Mind Technologies implements Salesforce Revenue Operations for B2B teams that have
            outgrown spreadsheet-based pipeline management, disconnected outbound tools, and manual
            handoffs between revenue functions.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We connect Salesforce with Apollo.io outbound workflows and Agentforce AI agents to build
            a fully automated revenue stack — one where leads enrich automatically, pipeline stays
            current without rep intervention, and leadership has live forecasting they can trust.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-900 font-semibold mb-3">Sound familiar?</p>
            <ul className="space-y-2">
              {challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-red-800 text-sm">
                  <span className="mt-1 flex-shrink-0 text-red-400">✕</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-red-700 font-semibold mt-4 text-sm">These are RevOps problems. Salesforce automation solves them.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">What we automate inside Salesforce</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            Every engagement is scoped around your specific revenue bottleneck — we don't deploy generic templates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                <div className="text-brand mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-12 text-center">Results our clients see</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {outcomes.map((o, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-brand mb-2">{o.metric}</div>
                <p className="text-gray-400 text-sm leading-snug">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MTM */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-8 text-center">Why B2B revenue teams choose Meet The Mind</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="text-brand" size={18} /> Salesforce-certified, Apollo.io-specialist
              </h3>
              <p className="text-gray-600 text-sm">10+ years of Salesforce implementation experience combined with deep Apollo.io workflow expertise. We sit at the intersection most agencies can't reach.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="text-brand" size={18} /> Founder-led, no handoffs
              </h3>
              <p className="text-gray-600 text-sm">Mitesh Jain works on every engagement directly. No account managers, no junior developers, no surprises in delivery quality.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <TrendingUp className="text-brand" size={18} /> ROI-first scoping
              </h3>
              <p className="text-gray-600 text-sm">We size the revenue impact of every automation before building it. If a Flow or integration won't meaningfully move a metric, we descope it.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="text-brand" size={18} /> Agentforce-ready
              </h3>
              <p className="text-gray-600 text-sm">We build RevOps stacks that are Agentforce-ready from day one — so you can layer AI agents on top without a rearchitecture when you're ready.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Salesforce RevOps FAQs</h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apollo-io-salesforce-integration" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Apollo.io–Salesforce integration <ArrowRight size={16} />
            </Link>
            <Link to="/agentforce-implementation" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Agentforce implementation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to automate your revenue operations?"
        subheading="Book a free 45-minute RevOps discovery call. We'll audit your current Salesforce setup and identify the highest-impact automations."
        buttonText="Book a Free RevOps Discovery Call"
      />
    </>
  );
};

export default SalesforceRevOps;
