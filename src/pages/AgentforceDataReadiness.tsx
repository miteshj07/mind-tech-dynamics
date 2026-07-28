import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Clock,
  GitCompareArrows,
  CopyX,
  BadgeCheck,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Check,
} from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

const TEAL = '#159AA0';
const NAVY = '#1C3157';

const dimensions = [
  {
    icon: ClipboardCheck,
    name: 'Completeness',
    desc: 'Are the fields your agents rely on actually filled in? A blank Amount or Industry becomes a wrong answer the moment an agent reads it.',
  },
  {
    icon: Clock,
    name: 'Freshness',
    desc: 'Is the record current, or is your agent citing a deal nobody has touched in 90 days? Stale data reads as fact to an agent.',
  },
  {
    icon: GitCompareArrows,
    name: 'Consistency',
    desc: 'Do fields contradict each other? A Won opportunity with no Amount is a story the agent cannot tell straight.',
  },
  {
    icon: CopyX,
    name: 'Uniqueness',
    desc: 'Are there duplicates that make an agent cite the wrong version of the same customer, or double-count a pipeline?',
  },
  {
    icon: BadgeCheck,
    name: 'Integrity',
    desc: 'Are values structurally valid, real picklist values rather than free text an agent cannot reason over reliably?',
  },
  {
    icon: EyeOff,
    name: 'Exposure',
    desc: 'Is there compliance risk hiding in the data? A contact who opted out but is still marked contactable is a breach waiting to happen.',
  },
];

const approaches = [
  {
    label: 'Do nothing, hope for the best',
    how: 'Turn agents on and fix problems as customers report them.',
    problem: 'The first sign of bad data is an agent that already quoted the wrong number to a customer. You are debugging in production, in public.',
  },
  {
    label: 'Manual spot-checks and reports',
    how: 'Run list views and reports to eyeball records before go-live.',
    problem: 'It does not scale, it is not repeatable, and it measures what you remember to look at, not what an agent will actually read.',
  },
  {
    label: 'Traditional data-quality tools',
    how: 'Deduplicate and standardise records with a cleansing toolkit.',
    problem: 'They clean data, but they were built for humans and reports, not to answer the question "is this record safe for an agent to act on right now?"',
  },
  {
    label: 'Continuous readiness scoring',
    how: 'Score every record against readiness rules, on-platform, and gate go-live on the result.',
    problem: 'This is the approach purpose-built for agents. It turns readiness from an opinion into a number you can gate on.',
    good: true,
  },
];

const checklist = [
  'It scores readiness across all the dimensions that break an agent, not just duplicates.',
  'It measures at the record level, so you see exactly which records will trip an agent up.',
  'It runs natively, with no data leaving your Salesforce org for a security team to review.',
  'It is deterministic and auditable, so every score traces back to a rule you can read.',
  'It gives you a portable benchmark you can gate go-live on, not just a vanity dashboard.',
  'It can be checked at runtime, so an agent can decline to act on data that is not ready.',
];

const faqs = [
  {
    q: 'What is Agentforce data readiness?',
    a: 'Agentforce data readiness is a measure of how well your CRM data can support an AI agent that reads it. An agent answers by reading your records, so blank, stale, duplicated, contradictory, invalid, or non-compliant data leads directly to confident, wrong answers. Readiness scoring quantifies that risk across each of those dimensions before you turn agents loose.',
  },
  {
    q: 'Why does data readiness matter more for AI agents than for people?',
    a: 'A person reading a CRM record notices when something looks off and works around it. An AI agent does not hesitate. It reads a blank or stale field as fact and answers anyway, in a fluent voice your customer believes. The same record that a human treats with healthy suspicion becomes a confidently wrong answer in an agent flow.',
  },
  {
    q: 'What are the dimensions of data readiness?',
    a: 'The common dimensions are Completeness, Freshness, Consistency, Uniqueness, Integrity, and Exposure. Completeness asks whether the fields agents rely on are filled in. Freshness asks whether the record is current. Consistency asks whether fields contradict each other. Uniqueness asks whether duplicates exist. Integrity asks whether values are structurally valid. Exposure asks whether there is compliance risk in acting on the record.',
  },
  {
    q: 'Is data readiness the same as data quality?',
    a: 'They overlap, but they are not the same. Data quality is a general discipline aimed at accurate records for people and reports. Data readiness is the AI-specific slice: it asks whether data is safe for an agent to read and act on right now, and it is scored continuously and gated on before go-live rather than cleaned periodically.',
  },
  {
    q: 'How do you measure data readiness for Agentforce?',
    a: 'You define rules for each dimension, score every relevant record against them, and roll the results into a readiness score. A good approach runs on-platform, produces a portable benchmark you can gate go-live on, shows per-record findings so you know exactly what to fix, and can be checked at runtime so an agent can decline to act on data that is not ready.',
  },
  {
    q: 'What readiness score do I need before turning on Agentforce?',
    a: 'There is no universal number, but a practical pattern is a portable benchmark score computed from a standard rulebook, with a go-live gate in the mid-to-high range, plus an org-specific score that layers in your own data standards. The point is to gate go-live on an explicit, repeatable threshold instead of a gut feeling.',
  },
];

const AgentforceDataReadiness = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agentforce Data Readiness: Getting Your CRM Data AI-Ready',
    description:
      'What Agentforce data readiness means, why AI agents fail on bad CRM data, the six dimensions of readiness, and how to measure and gate on it before go-live.',
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/agentforce-data-readiness` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="Agentforce Data Readiness: Getting Your CRM Data AI-Ready | Meet The Mind"
        description="What Agentforce data readiness means, why AI agents fail on bad CRM data, the six dimensions of readiness, and how to measure and gate on it before go-live."
        canonical="/agentforce-data-readiness"
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Guide</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
            Agentforce data readiness
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>By <strong className="text-gray-700">Meet The Mind</strong></span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Updated {UPDATED}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* In short */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-3">In short</p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              <strong>Agentforce data readiness</strong> is how well your CRM data can support an AI agent that reads
              it. An agent answers by reading your records, so blank, stale, duplicated, or contradictory data turns
              straight into confident, wrong answers. Readiness scoring measures that risk across six dimensions
              before you go live, so you can gate on a number instead of hoping.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="pb-8">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why bad data breaks an AI agent</h2>
            <p className="mb-4">
              Agentforce answers by reading your CRM. That is the whole premise, and it is also the whole risk. When a
              record is blank, stale, duplicated, or contradicts itself, the agent does not hesitate. It answers
              anyway, wrong, in a fluent voice your customer believes. The failure does not look like a bug. It looks
              like a plausible, incorrect sentence.
            </p>
            <p>
              A person reading the same record behaves differently. People notice when a field looks off, cross-check
              it, and work around it. An agent has no such instinct. It treats an empty Amount, a 90-day-old status,
              or a duplicated contact as ground truth. This is why data readiness matters more for agents than it ever
              did for dashboards: the tolerance for bad data has effectively dropped to zero.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">The six dimensions of data readiness</h2>
            <p className="mb-8 text-gray-600">
              Readiness is not one number pulled from the air. It is the roll-up of six measurable dimensions, each a
              distinct way an agent can be confidently wrong.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 not-prose">
              {dimensions.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(21,154,160,0.1)' }}
                    >
                      <Icon size={22} style={{ color: TEAL }} />
                    </div>
                    <h3 className="font-semibold mb-1.5" style={{ color: NAVY }}>{d.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Four ways teams handle it</h2>
            <p className="mb-6 text-gray-600">
              Not every approach to readiness is equal. Here is how the common ones actually play out.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 not-prose">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold text-gray-700 w-1/4">Approach</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">How it works</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">The catch</th>
                  </tr>
                </thead>
                <tbody>
                  {approaches.map((a, i) => (
                    <tr key={i} className={`border-b border-gray-100 last:border-0 align-top ${a.good ? 'bg-brand/[0.04]' : ''}`}>
                      <td className="py-4 px-4 font-semibold text-gray-800">{a.label}</td>
                      <td className="py-4 px-4 text-gray-600">{a.how}</td>
                      <td className="py-4 px-4 text-gray-600">{a.problem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Data readiness vs. data quality</h2>
            <p className="mb-4">
              It is tempting to file readiness under the old heading of data quality, but they answer different
              questions. Data quality is a broad, ongoing discipline aimed at accurate records for people and reports.
              You clean it periodically and measure it against your own standards.
            </p>
            <p>
              Data readiness is the AI-specific slice of that work. It asks one sharper question: is this record safe
              for an agent to read and act on right now? That reframing changes how you measure. Readiness is scored
              continuously, at the record level, and gated on before go-live, because an agent will read the worst
              record in your org just as readily as the best one.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to measure it before go-live</h2>
            <p className="mb-6">
              A readiness tool worth adopting does more than draw a dashboard. When you evaluate one, look for these
              six things.
            </p>
            <ul className="space-y-3 not-prose">
              {checklist.map((c, i) => (
                <li key={i} className="flex gap-3 text-base text-gray-700">
                  <Check size={18} className="text-brand flex-shrink-0 mt-1" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-5 not-prose">
              {faqs.map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="text-brand mr-2 mt-1 flex-shrink-0" size={18} />
                    {f.q}
                  </h3>
                  <p className="text-gray-600 ml-7 text-base leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gray-900 text-white p-8 md:p-10 not-prose">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Score your readiness before your agents go live</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">GroundTruth</strong> scores your CRM data across all six dimensions,
              shows exactly which records will trip an agent up, and helps you fix them, all natively inside
              Salesforce. It is the readiness gate for Agentforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/groundtruth" className="btn-primary">
                Explore GroundTruth <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/groundtruth-vs-demandtools"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium py-3 px-7 rounded-md hover:bg-white/10 transition-colors"
              >
                Compare readiness tools
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
};

export default AgentforceDataReadiness;
