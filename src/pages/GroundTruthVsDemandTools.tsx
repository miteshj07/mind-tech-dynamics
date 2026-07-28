import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, CheckCircle } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

// At-a-glance comparison rows
const rows = [
  { label: 'What it is', gt: 'A native readiness layer that scores CRM data for AI agents', dt: 'A data-quality toolkit for cleansing and deduplication' },
  { label: 'Primary question it answers', gt: 'Is this data safe for an agent to act on right now?', dt: 'Is this data clean, deduplicated, and standardised?' },
  { label: 'Built for', gt: 'Agentforce and AI readiness', dt: 'Admins and data stewards doing bulk cleansing' },
  { label: 'How it scores', gt: 'A 0-100 readiness score across six dimensions, per record', dt: 'No readiness score; it finds and fixes issues in bulk jobs' },
  { label: 'Where it runs', gt: '100% native, no data leaves Salesforce', dt: 'A desktop and cloud toolset that connects to your org' },
  { label: 'Go-live gate', gt: 'A portable benchmark score you can gate go-live on', dt: 'Not a concept it is built around' },
  { label: 'Runtime guardrail for agents', gt: 'Yes, agents can check readiness before they act', dt: 'No' },
  { label: 'Duplicate handling', gt: 'Detects and merges, past the native three-record cap', dt: 'Deep, mature dedup and mass-manipulation tooling' },
  { label: 'Best fit', gt: 'Teams getting CRM data ready for Agentforce', dt: 'Teams that need heavy-duty, ongoing data cleansing' },
];

const gtBest = [
  'Your goal is turning on Agentforce and you need to know the data is ready first.',
  'You want a single readiness score you can gate go-live on, not just a pile of cleansing jobs.',
  'Your security team does not want data leaving Salesforce for an external tool to process.',
  'You want agents themselves to check readiness at runtime before acting on a record.',
];

const dtBest = [
  'You run large, ongoing data-cleansing operations and need deep dedup and mass-edit power.',
  'Your priority is standardising and maintaining records for human users and reporting.',
  'You have data stewards who live in a dedicated cleansing toolkit day to day.',
];

const faqs = [
  {
    q: 'Is GroundTruth a DemandTools alternative?',
    a: 'They solve adjacent but different problems. DemandTools is a mature data-quality toolkit for cleansing, deduplicating, and standardising Salesforce records. GroundTruth is a readiness layer that scores whether your data is safe for an AI agent to act on. If your goal is getting data ready for Agentforce and gating go-live on a score, GroundTruth is purpose-built for that. If your goal is heavy-duty ongoing cleansing, DemandTools is built for that.',
  },
  {
    q: 'Does GroundTruth deduplicate records like DemandTools?',
    a: 'GroundTruth detects duplicates as one of its six readiness dimensions and can merge them in-app, including past the native Salesforce three-record cap. DemandTools has deeper, more mature mass-deduplication and manipulation tooling built over many years. GroundTruth deduplicates in service of a readiness score; DemandTools deduplicates as a core specialty.',
  },
  {
    q: 'Can I use GroundTruth and DemandTools together?',
    a: 'Yes, and many teams would. DemandTools handles heavy, ongoing cleansing, and GroundTruth measures whether the resulting data is actually ready for agents and holds the go-live gate. They complement each other: one does bulk remediation, the other scores and governs readiness for AI.',
  },
  {
    q: 'Does GroundTruth keep my data inside Salesforce?',
    a: 'Yes. GroundTruth is 100% native. It runs entirely inside your org with no external callouts and no data egress, which is often the difference between passing a security review quickly and not. Traditional cleansing toolkits typically connect to your org from a desktop or cloud application.',
  },
  {
    q: 'What does GroundTruth do that a data-quality tool does not?',
    a: 'It produces a readiness score aimed specifically at AI agents, gated on before go-live, and it exposes a runtime guardrail so an agent can decline to act on a record that is not ready. Data-quality tools clean data; GroundTruth measures and governs whether that data is safe for an agent to read and act on.',
  },
  {
    q: 'Is GroundTruth on AppExchange?',
    a: 'The AppExchange listing is in progress. In the meantime, you can book a free readiness assessment on your own org from the GroundTruth page and we will run it with you.',
  },
];

const GroundTruthVsDemandTools = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'GroundTruth vs DemandTools: Readiness Scoring vs Data Cleansing',
    description:
      'How GroundTruth and DemandTools compare for Salesforce data: AI readiness scoring vs data cleansing, native vs connected, go-live gating vs bulk remediation. An honest comparison.',
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/groundtruth-vs-demandtools` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="GroundTruth vs DemandTools: Readiness Scoring vs Data Cleansing | Meet The Mind"
        description="GroundTruth vs DemandTools for Salesforce data: AI readiness scoring vs cleansing, native vs connected, go-live gating vs bulk remediation. An honest, factual comparison."
        canonical="/groundtruth-vs-demandtools"
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
            GroundTruth vs. DemandTools
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>By <strong className="text-gray-700">Meet The Mind</strong></span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Updated {UPDATED}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>6 min read</span>
          </div>
        </div>
      </section>

      {/* In short */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-3">In short</p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              <strong>DemandTools</strong> is a mature toolkit for cleansing, deduplicating, and standardising
              Salesforce data. <strong>GroundTruth</strong> is a native readiness layer that scores whether your data
              is safe for an AI agent to act on and gates go-live on that score. One cleans your data. The other tells
              you, and your agents, whether it is ready. Many teams will use both.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">At a glance</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-500 w-1/4"></th>
                  <th className="py-3 px-4 font-bold text-brand">GroundTruth</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">DemandTools</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="py-4 px-4 font-semibold text-gray-800">{r.label}</td>
                    <td className="py-4 px-4 text-gray-700 bg-brand/[0.03]">{r.gt}</td>
                    <td className="py-4 px-4 text-gray-600">{r.dt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="pb-8">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The core difference: readiness vs. cleansing</h2>
            <p className="mb-4">
              DemandTools is one of the longest-standing data-quality toolkits in the Salesforce ecosystem. Its job is
              to find and fix data problems in bulk: deduplicate, standardise, mass-edit, and maintain records at
              scale. If you have a data steward whose day is spent cleaning the org, it is a serious tool for that.
            </p>
            <p>
              GroundTruth starts from a different question. Not "is this data clean?" but "is this data ready for an
              agent to act on?" It scores every record across six readiness dimensions, rolls that into a readiness
              score, and gates go-live on it. Cleansing is a means; readiness is the outcome it measures and governs.
              You can read more about the category in our guide to{' '}
              <Link to="/agentforce-data-readiness" className="text-brand hover:underline">Agentforce data readiness</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Native and on-platform vs. a connected toolkit</h2>
            <p className="mb-4">
              GroundTruth runs entirely inside your Salesforce org. There are no external callouts and no data egress,
              which is often what turns a multi-week security review into a non-issue. Scores reflect the whole org,
              but per-record detail respects each viewer's record access, even for administrators.
            </p>
            <p>
              Traditional cleansing suites typically operate as a desktop or cloud application that connects to your
              org to pull, manipulate, and push records. That is a proven model for bulk work, but it is a different
              trust posture than an app that never moves your data off-platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">They are better together than opposed</h2>
            <p>
              This is the honest heart of the comparison: these are not really competitors. A heavy-duty cleansing
              toolkit and a native readiness layer do different jobs. Use a cleansing tool to do bulk remediation at
              scale, and use GroundTruth to measure whether the resulting data is actually ready for agents, to hold
              the go-live gate, and to give agents a runtime check before they act. One remediates. The other scores
              and governs.
            </p>
          </div>

          {/* Best-fit columns */}
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose GroundTruth if</h3>
              <ul className="space-y-3">
                {gtBest.map((t, i) => (
                  <li key={i} className="flex gap-3 text-base text-gray-700">
                    <Check size={18} className="text-brand flex-shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose DemandTools if</h3>
              <ul className="space-y-3">
                {dtBest.map((t, i) => (
                  <li key={i} className="flex gap-3 text-base text-gray-700">
                    <Check size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">See your readiness score on your own org</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">GroundTruth</strong> scores your CRM data across six dimensions, shows
              which records will trip an agent up, and helps you fix them, all natively inside Salesforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/groundtruth" className="btn-primary">
                Explore GroundTruth <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium py-3 px-7 rounded-md hover:bg-white/10 transition-colors"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <p className="text-sm text-gray-400 not-prose">
            DemandTools is a trademark of its respective owner. This comparison reflects publicly available
            information about DemandTools as of {UPDATED} and our own view of the data-readiness category; it is not
            affiliated with or endorsed by Validity or DemandTools.
          </p>

        </div>
      </article>
    </>
  );
};

export default GroundTruthVsDemandTools;
