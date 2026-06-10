
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Clock, ShieldCheck, BarChart3, Workflow, Database, Zap, ArrowRight } from 'lucide-react';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const auditAreas = [
  {
    icon: <Database size={24} />,
    title: 'Data Quality & Hygiene',
    points: ['Duplicate records audit', 'Missing required fields analysis', 'Data validation rule gaps', 'Stale records and inactive users'],
  },
  {
    icon: <Workflow size={24} />,
    title: 'Automation & Flows',
    points: ['Inactive or conflicting Flows', 'Process Builder migrations needed', 'Workflow rule deprecation risk', 'Governor limit exposure'],
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Security & Permissions',
    points: ['Profile and permission set review', 'Field-level security gaps', 'Sharing rule conflicts', 'Login policy assessment'],
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Reporting & Dashboards',
    points: ['Unused or broken reports', 'Missing pipeline visibility metrics', 'Forecast accuracy gaps', 'Dashboard ownership and staleness'],
  },
  {
    icon: <Zap size={24} />,
    title: 'Integrations & APIs',
    points: ['Third-party integration health', 'Apollo.io sync status', 'API usage vs limits', 'Connected app permissions'],
  },
  {
    icon: <CheckCircle size={24} />,
    title: 'Adoption & Usage',
    points: ['Login frequency by user', 'Feature adoption gaps', 'Training opportunities identified', 'Quick wins for rep productivity'],
  },
];

const whatYouGet = [
  { title: 'Written audit report', desc: 'A clear, prioritised document covering every area reviewed — with specific findings, not generic recommendations.' },
  { title: 'Priority matrix', desc: 'Issues ranked by impact and effort: what to fix today, this quarter, and what to plan for next year.' },
  { title: 'Quick wins list', desc: 'A shortlist of changes you or your admin can make immediately — no paid engagement required.' },
  { title: '45-min debrief call', desc: 'Mitesh walks you through the findings, answers questions, and recommends next steps. No sales pressure.' },
];

const whoIsItFor = [
  'You\'ve had Salesforce for 12+ months but suspect it\'s underused',
  'Your team has grown and the original setup no longer fits',
  'You\'re seeing data quality issues but don\'t know the root cause',
  'You want to implement Agentforce or Apollo.io but aren\'t sure the foundation is solid',
  'A previous implementation left you with technical debt',
  'You\'re paying for Salesforce features your team doesn\'t use',
];

const faqs = [
  {
    q: 'Is the Salesforce health check really free?',
    a: 'Yes — completely free, no strings attached. We review your org, deliver a written report, and hold a debrief call at no cost. Some clients then choose to engage us for remediation work; many don\'t. Either way, you get a clear picture of where your Salesforce org stands.',
  },
  {
    q: 'What access do you need to my Salesforce org?',
    a: 'We request read-only System Administrator access for the duration of the audit. We do not make any changes to your org during the health check. Access can be revoked immediately after the debrief call.',
  },
  {
    q: 'How long does the health check take?',
    a: 'We complete the audit within 5 business days of receiving org access. The debrief call is typically scheduled within 2 days of the report delivery.',
  },
  {
    q: 'What size org is the health check suited for?',
    a: 'The health check is best suited for orgs with 5–250 Salesforce users. Larger enterprise orgs are welcome — contact us to discuss scope and timeline.',
  },
  {
    q: 'Can you audit a Salesforce org that uses Apollo.io or Agentforce?',
    a: 'Yes — and we specifically look at Apollo.io integration health, data sync gaps, and Agentforce readiness as part of our audit scope. These are areas most generic Salesforce audits miss entirely.',
  },
];

const SalesforceHealthCheck = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Free Salesforce Health Check Audit',
    serviceType: 'Salesforce org audit and health check',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Salesforce health check audit covering data quality, automation, security, reporting, integrations, and adoption.',
    },
    description:
      'Free Salesforce health check audit for B2B revenue teams. Covers data quality, Flow automation, security, reporting, integrations, and user adoption. Written report + 45-minute debrief. Meet The Mind Technologies.',
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
        title="Free Salesforce Health Check Audit — Meet The Mind Technologies"
        description="Free Salesforce org health check for B2B teams. We audit data quality, automation, security, integrations, and adoption — then deliver a written report and 45-min debrief. No cost, no obligation."
        canonical="/salesforce-health-check"
        jsonLd={[serviceSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/20 border border-brand/30 text-brand text-sm font-semibold mb-6">
            <Zap size={14} /> Free — No Cost, No Obligation
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Free Salesforce<br />
            <span className="text-brand">Health Check Audit</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We audit your Salesforce org across 6 areas, deliver a prioritised written report,
            and walk you through the findings on a 45-minute call — completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-bold rounded-lg hover:bg-brand/90 transition-colors text-lg"
            >
              Book Your Free Audit <ArrowRight size={20} />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand" /> Read-only org access</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand" /> 5 business day turnaround</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand" /> Written report + debrief call</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand" /> No sales pressure</span>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-4 text-center">Is this for you?</h2>
          <p className="text-gray-500 text-center mb-10">The health check is most valuable when one or more of these applies:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whoIsItFor.map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5">
                <AlertCircle className="text-brand flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-700">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we audit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">What we audit</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            6 areas covering the full health of your Salesforce org — not a surface-level check.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auditAreas.map((area, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                <div className="text-brand mb-4">{area.icon}</div>
                <h3 className="text-lg font-semibold mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-brand flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-4 text-center">What you receive</h2>
          <p className="text-gray-500 text-center mb-12">Everything delivered within 5 business days of org access.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatYouGet.map((w, i) => (
              <div key={i} className="bg-gray-900 text-white rounded-xl p-7">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg">{w.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing strip */}
      <section className="py-12 bg-brand text-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Clock size={40} className="flex-shrink-0 opacity-80" />
              <div>
                <p className="font-bold text-xl">Ready in 5 business days</p>
                <p className="text-white/80">From org access to written report delivered to your inbox.</p>
              </div>
            </div>
            <Link
              to="/contact-us"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-brand font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Book Free Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Health check FAQs</h2>
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
            <Link to="/salesforce-revops" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Salesforce RevOps automation <ArrowRight size={16} />
            </Link>
            <Link to="/agentforce-implementation" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Agentforce implementation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Book your free Salesforce health check"
        subheading="Takes 10 minutes to set up. We handle everything else — org access, audit, report, and debrief — within 5 business days."
        buttonText="Book Free Health Check"
      />
    </>
  );
};

export default SalesforceHealthCheck;
