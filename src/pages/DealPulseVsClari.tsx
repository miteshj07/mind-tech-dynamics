import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, CheckCircle } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

// At-a-glance comparison rows
const rows = [
  { label: 'What it is', dp: 'A focused, native deal-risk app', clari: 'A full revenue-operations platform' },
  { label: 'Where it runs', dp: '100% inside Salesforce', clari: 'A separate platform with bi-directional CRM sync' },
  { label: 'Your pipeline data', dp: 'Never leaves your Salesforce org', clari: 'Mirrored out into Clari to be analysed' },
  { label: 'How risk is scored', dp: 'Deterministic, admin-editable rules that show which signals fired', clari: 'AI and machine-learning models over activity and CRM signals' },
  { label: 'Can you read and edit the logic?', dp: 'Yes, every rule is transparent and tunable', clari: 'No, the model is proprietary' },
  { label: 'Scope', dp: 'Deal risk on every open Opportunity', clari: 'Forecasting, pipeline, conversation intelligence, activity capture' },
  { label: 'Setup', dp: 'Managed package, roughly 15 minutes', clari: 'Platform rollout, integrations, and admin effort' },
  { label: 'Commitment to start', dp: 'Free early access, no platform contract', clari: 'Enterprise, quote-based, typically multi-year' },
  { label: 'Best fit', dp: 'Teams that want automatic, transparent deal risk inside Salesforce', clari: 'Enterprise revenue orgs that want one platform for the whole motion' },
];

const dpBest = [
  'You want deal-risk scoring without adopting (or paying for) a full revenue platform.',
  'Your security or compliance team does not want pipeline data leaving Salesforce.',
  'You need to explain a risk score to leadership, so a transparent, editable rulebook matters.',
  'You want to prove value first, starting free, before any commitment.',
];

const clariBest = [
  'You need forecasting, conversation intelligence, and activity capture across the whole revenue org, not just deal risk.',
  'You want a single system of record and intelligence layered on top of your CRM and communication tools.',
  'You have the budget and admin capacity for an enterprise platform rollout.',
];

const faqs = [
  {
    q: 'Is DealPulse a Clari alternative?',
    a: 'For the deal-risk piece, yes. DealPulse gives you automatic, transparent deal-risk scoring on every open Opportunity, natively inside Salesforce. It is not a full revenue-operations platform like Clari, and it does not try to be. If deal risk is what you actually need, DealPulse delivers it without the platform overhead.',
  },
  {
    q: 'Does Clari keep my data inside Salesforce?',
    a: 'No. Clari uses a bi-directional sync that mirrors your deal data, activity, and forecast submissions into the Clari platform to analyse them. DealPulse runs entirely inside your Salesforce org and makes no external callouts, so your pipeline never leaves.',
  },
  {
    q: 'Is DealPulse cheaper than Clari?',
    a: 'DealPulse is a focused native app you can start using free in early access, with no platform contract. Clari is an enterprise platform with quote-based pricing and, typically, a multi-year commitment, and the real cost usually includes implementation, integrations, and admin time. They are different kinds of purchase.',
  },
  {
    q: 'Can I use DealPulse and Clari together?',
    a: 'Yes. They do different jobs. Some teams run a broad revenue platform and still want a transparent, native, per-deal risk read that lives directly on the Opportunity for their reps. DealPulse fits alongside without moving any data.',
  },
  {
    q: 'Does DealPulse do forecasting and conversation intelligence like Clari?',
    a: 'No. DealPulse is deliberately focused on deal-risk intelligence: scoring open Opportunities, surfacing the signals behind each score, and telling the rep what to do next. That focus is the point, it keeps the app native, transparent, and quick to deploy.',
  },
  {
    q: 'Is DealPulse on AppExchange?',
    a: 'The AppExchange listing is in progress. In the meantime, early-access installs are available, and you can request one from the DealPulse page.',
  },
];

const DealPulseVsClari = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DealPulse vs Clari: A Native, Transparent Deal-Risk Alternative',
    description:
      'How DealPulse and Clari compare for deal risk: native vs synced-out, transparent rules vs black-box AI, a focused app vs a full revenue platform. An honest, factual comparison.',
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/dealpulse-vs-clari` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="DealPulse vs Clari: Native, Transparent Deal-Risk Alternative | Meet The Mind"
        description="DealPulse vs Clari for deal risk: native to Salesforce vs synced-out, transparent editable rules vs black-box AI, a focused app vs a full revenue platform. An honest comparison."
        canonical="/dealpulse-vs-clari"
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
            DealPulse vs. Clari
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

      {/* TL;DR */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-3">In short</p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              <strong>Clari</strong> is a full revenue-operations platform that syncs your pipeline out of the CRM
              to run forecasting, conversation intelligence, and analytics. <strong>DealPulse</strong> is a focused,
              100% native app that does one thing well: it scores every open Opportunity for risk, transparently,
              without your data ever leaving Salesforce. If you need a whole platform, look at Clari. If you need
              deal-risk intelligence you can read, edit, and trust, that is DealPulse.
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
                  <th className="py-3 px-4 font-bold text-brand">DealPulse</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Clari</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="py-4 px-4 font-semibold text-gray-800">{r.label}</td>
                    <td className="py-4 px-4 text-gray-700 bg-brand/[0.03]">{r.dp}</td>
                    <td className="py-4 px-4 text-gray-600">{r.clari}</td>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">The core difference: native vs. synced-out</h2>
            <p className="mb-4">
              Clari is a platform that sits next to Salesforce. Its deepest integration is a bi-directional sync that
              mirrors your deal data, activity, and forecast submissions into Clari so the whole revenue team works
              from one live view. That is powerful, and it is also the thing your security team asks about: your
              pipeline is now living in a second system.
            </p>
            <p>
              DealPulse takes the opposite approach. It is a managed package that runs entirely inside your
              Salesforce org, with zero external callouts. Nothing is synced out. For a lot of RevOps and security
              teams, "the data never leaves Salesforce" turns a multi-week review into a non-issue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Transparent rules vs. a black-box score</h2>
            <p className="mb-4">
              Clari scores deals with proprietary AI and machine-learning models. When it flags a deal, you get a
              signal, but the model itself is not something you can open up, read, or adjust.
            </p>
            <p>
              DealPulse is deterministic on purpose. Risk is decided by explicit rules you can read and edit, and
              every score traces back to the exact signals that fired. When your CRO asks "why is this deal red?",
              the answer is a list of reasons, not "the model said so." You can learn more about the category in our
              guide to <Link to="/deal-risk-intelligence" className="text-brand hover:underline">deal risk intelligence</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">A focused app vs. a full platform</h2>
            <p>
              This is the honest heart of the comparison. Clari is broad: forecasting, pipeline inspection,
              conversation intelligence, and activity capture across a long list of integrations. DealPulse is
              narrow by design: deal-risk scoring on every open Opportunity, delivered where reps already work. One
              is a platform you adopt. The other is an app you install. Which is right depends entirely on whether
              you need the whole motion or the one job done cleanly.
            </p>
          </div>

          {/* Best-fit columns */}
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose DealPulse if</h3>
              <ul className="space-y-3">
                {dpBest.map((t, i) => (
                  <li key={i} className="flex gap-3 text-base text-gray-700">
                    <Check size={18} className="text-brand flex-shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Clari if</h3>
              <ul className="space-y-3">
                {clariBest.map((t, i) => (
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">See DealPulse on your own pipeline</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">DealPulse</strong> scores every open Opportunity from the signals
              already in your CRM, shows exactly why each deal is at risk, and tells the rep what to do next, with
              nothing leaving your org.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dealpulse" className="btn-primary">
                Explore DealPulse <ArrowRight size={18} className="ml-2" />
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
            Clari is a trademark of its respective owner. This comparison reflects publicly available information
            about Clari as of {UPDATED} and our own view of the deal-risk category; it is not affiliated with or
            endorsed by Clari.
          </p>

        </div>
      </article>
    </>
  );
};

export default DealPulseVsClari;
