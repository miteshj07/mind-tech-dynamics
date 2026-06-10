
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, CheckCircle, Clock, ShieldCheck, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const useCases = [
  {
    icon: <Zap size={28} />,
    title: 'Inbound Lead Qualification',
    description: 'Agentforce agents engage every inbound lead instantly — asking qualification questions, enriching records from Apollo.io, and routing sales-ready prospects to the right rep. No lead waits hours for a response.',
  },
  {
    icon: <Users size={28} />,
    title: '24/7 Customer Service Agents',
    description: 'Deploy autonomous service agents grounded in your Salesforce knowledge base. They resolve common cases, deflect tickets, and escalate to humans with full context — reducing support load without sacrificing quality.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Internal Sales Ops Automation',
    description: 'Agents that handle repetitive CRM work — data entry, follow-up creation, record updates, and deal stage routing — so your reps spend time on revenue, not admin.',
  },
  {
    icon: <Bot size={28} />,
    title: 'Custom Action Agents',
    description: 'Purpose-built agents connected to your Salesforce Flows, Apex classes, and external APIs. If it can be done in Salesforce, an agent can be trained to do it autonomously.',
  },
];

const deliverables = [
  'Agentforce use-case scoping and ROI sizing',
  'Agent topic and action design (grounded in your Salesforce data)',
  'Flow and Apex integration for real CRM actions',
  'Knowledge base setup and article grounding',
  'Guardrails, escalation rules, and tone configuration',
  'UAT testing against real lead/case scenarios',
  'Go-live support and performance monitoring',
  'Post-launch optimisation and deflection reporting',
];

const whyUs = [
  {
    title: 'Founder-led delivery',
    desc: 'Mitesh Jain — 10+ year Salesforce-certified consultant — personally leads every Agentforce engagement. No junior handoffs.',
  },
  {
    title: 'Apollo.io pairing',
    desc: 'We uniquely combine Agentforce with Apollo.io outbound automation — agents qualify inbound while Apollo.io fills the top of funnel.',
  },
  {
    title: 'B2B revenue focus',
    desc: 'Every agent we build is scoped for pipeline impact: more qualified meetings, faster response, lower CAC.',
  },
  {
    title: 'Global delivery',
    desc: 'Serving B2B teams in the US, UK, UAE, and Australia — timezone-friendly, async-first communication.',
  },
];

const faqs = [
  {
    q: 'How long does an Agentforce implementation take?',
    a: 'A focused single-use-case implementation (e.g. lead qualification agent) typically takes 2–4 weeks from scoping to go-live. More complex multi-agent deployments run 6–10 weeks.',
  },
  {
    q: 'Do we need to already be on Salesforce to use Agentforce?',
    a: 'Yes — Agentforce runs natively inside Salesforce. If you\'re not yet on Salesforce, we can implement Sales Cloud and Agentforce together as a combined engagement.',
  },
  {
    q: 'What Salesforce licences are needed for Agentforce?',
    a: 'Agentforce requires an Einstein platform licence or Agentforce add-on, depending on your edition. We\'ll assess your current licence and advise on the most cost-effective path during discovery.',
  },
  {
    q: 'Can Agentforce integrate with Apollo.io?',
    a: 'Yes — and this is one of Meet The Mind\'s strongest differentiators. We wire Apollo.io lead data directly into Salesforce so Agentforce agents have enriched prospect context to qualify and route accurately.',
  },
  {
    q: 'What happens after the agent is live?',
    a: 'We monitor deflection rates, qualification accuracy, and escalation patterns, then tune agent topics and responses. Ongoing retainer support is available for continuous improvement.',
  },
];

const AgentforceImplementation = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Salesforce Agentforce Implementation',
    serviceType: 'Agentforce implementation partner and AI agent development',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'United Arab Emirates', 'Australia'],
    description:
      'End-to-end Salesforce Agentforce implementation — scoping, agent design, Flow/Apex integration, grounding, testing, and launch. Specialising in lead qualification agents and B2B sales automation.',
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
        title="Salesforce Agentforce Implementation Partner — Meet The Mind"
        description="Certified Agentforce implementation partner. We design, build, and deploy Salesforce AI agents for B2B lead qualification, customer service, and sales ops automation. US, UK, UAE & Australia."
        canonical="/agentforce-implementation"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Salesforce Agentforce Implementation"
        subtitle="We design and deploy Salesforce Agentforce AI agents that qualify leads 24/7, automate service, and take real action inside your CRM — grounded in your live Salesforce data."
      />

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Meet The Mind Technologies is a certified Salesforce Agentforce implementation partner. We help
            B2B revenue teams deploy autonomous AI agents that go beyond scripted chatbots — agents that
            reason over live Salesforce data, take real CRM actions, and integrate directly with your
            Apollo.io outbound workflows.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Every Agentforce engagement is led personally by Mitesh Jain — Salesforce-certified with 10+
            years of implementation experience — from use-case scoping through to post-launch optimisation.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              <ShieldCheck size={15} /> Salesforce Certified
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              <Clock size={15} /> 2–4 Week Implementations
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              <Bot size={15} /> Agentforce + Apollo.io Specialist
            </span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">Agentforce use cases we implement</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            We scope every agent deployment around a specific revenue or service outcome — not generic AI capabilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((u, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="text-brand mb-4">{u.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{u.title}</h3>
                <p className="text-gray-600 leading-relaxed">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-4 text-center">What's included in every engagement</h2>
          <p className="text-gray-500 text-center mb-10">End-to-end delivery — no separate change orders for testing, go-live, or optimisation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-700">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meet The Mind */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-12 text-center">Why choose Meet The Mind for Agentforce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyUs.map((w, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-brand mb-2">{w.title}</h3>
                <p className="text-gray-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Agentforce implementation FAQs</h2>
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
          <div className="text-center mt-10">
            <Link to="/agentforce" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Learn more about Agentforce <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Ready to deploy your first Agentforce agent?"
        subheading="Book a free 45-minute scoping call. We'll identify your highest-ROI use case and outline a deployment plan."
        buttonText="Book a Free Agentforce Scoping Call"
      />
    </>
  );
};

export default AgentforceImplementation;
