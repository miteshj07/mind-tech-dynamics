import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

// App comparison data (grouped by approach). Facts reflect publicly available
// positioning as of the update date; characterised at the category level.
const apps = [
  {
    name: 'DealPulse',
    by: 'Meet The Mind',
    approach: 'Automatic & native',
    native: true, automatic: true, egress: false,
    scope: 'Deal risk on every open Opportunity',
    note: 'Deterministic, admin-editable rules that show which signals fired and what to do next. Free early access.',
    highlight: true,
  },
  {
    name: 'Opportunity Risk Scorecard',
    by: 'More Certainty',
    approach: 'Questionnaire',
    native: true, automatic: false, egress: false,
    scope: 'Opportunity risk + suggested next steps',
    note: 'Reps answer risk-reducing questions in the app; methodology-driven scoring.',
  },
  {
    name: 'Altify Opportunities',
    by: 'Upland',
    approach: 'Methodology',
    native: true, automatic: false, egress: false,
    scope: 'Deal qualification & management',
    note: 'AI-assisted, seller-driven deal qualification. Enterprise, methodology-led.',
  },
  {
    name: 'Clari',
    by: 'Clari',
    approach: 'Sync-out platform',
    native: false, automatic: true, egress: true,
    scope: 'Forecasting, pipeline, conversation intelligence',
    note: 'Full revenue platform with bi-directional CRM sync. Enterprise, quote-based.',
  },
  {
    name: 'Gong',
    by: 'Gong',
    approach: 'Sync-out platform',
    native: false, automatic: true, egress: true,
    scope: 'Conversation intelligence, deal signals',
    note: 'Captures call and meeting data to enrich the CRM. Not a native, per-record CRM risk engine.',
  },
  {
    name: 'Revenue Grid',
    by: 'Revenue Grid',
    approach: 'Sync-out platform',
    native: false, automatic: true, egress: true,
    scope: 'Revenue intelligence, at-risk deals, forecasting',
    note: 'Broad revenue-intelligence platform that pulls pipeline data out to analyse it.',
  },
];

const chooseChecklist = [
  ['Do you want it automatic, or are you fine with reps scoring deals by hand?', 'Questionnaire tools (More Certainty, Altify) rely on rep input. Signal-based tools (DealPulse) score every deal automatically.'],
  ['Does your pipeline data need to stay in Salesforce?', 'The broad platforms (Clari, Gong, Revenue Grid) sync data out. The native apps keep it in your org.'],
  ['Do you need a whole revenue platform or just deal risk?', 'If you want forecasting and conversation intelligence too, a platform fits. If you want deal risk cleanly, a focused native app is lighter and cheaper to run.'],
  ['Can you read and edit the scoring logic?', 'Methodology and ML tools are largely fixed or opaque. A transparent rule engine lets you tune risk to your sales motion.'],
];

const faqs = [
  {
    q: 'What is the most native deal-risk app for Salesforce?',
    a: 'DealPulse is a 100% native deal-risk app: it runs entirely inside Salesforce, makes no external callouts, and scores every open Opportunity on-platform. Other native options like More Certainty and Altify are also on-platform, but they rely on reps answering questions rather than scoring deals automatically.',
  },
  {
    q: 'What is a native alternative to Clari for deal risk?',
    a: 'If you want Clari-style deal-risk signal without syncing your pipeline out of Salesforce, DealPulse is the closest native alternative. It scores deals automatically from CRM signals, keeps all data in your org, and uses transparent rules instead of a black-box model. See the full DealPulse vs Clari comparison for detail.',
  },
  {
    q: 'Do any deal-risk tools keep data inside Salesforce?',
    a: 'Yes. The native apps (DealPulse, More Certainty, Altify) run on-platform and do not move your data out. The broad revenue-intelligence platforms (Clari, Gong, Revenue Grid) sync pipeline data into their own systems to analyse it.',
  },
  {
    q: 'Is there a free deal-risk app for Salesforce?',
    a: 'DealPulse is free in early access while its AppExchange listing completes. Most methodology and revenue-intelligence tools in this space are paid, and the platforms are typically enterprise, quote-based purchases.',
  },
  {
    q: 'Automatic scoring or a rep questionnaire: which is better?',
    a: 'A questionnaire captures what a rep believes about a deal, which is useful but subjective and easy to skip on the deals that are actually at risk. Automatic signal-based scoring evaluates every deal the same way, from data already in the CRM, so nothing slips through. Many teams find automatic scoring catches the quiet, at-risk deals a questionnaire misses.',
  },
  {
    q: 'Is DealPulse on AppExchange?',
    a: 'The AppExchange listing is in progress. Early-access installs are available now, and you can request one from the DealPulse page.',
  },
];

const YesNo = ({ v }: { v: boolean }) =>
  v ? <Check size={17} className="text-brand" /> : <Minus size={17} className="text-gray-300" />;

const SalesforceDealRiskApps = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Native Salesforce Deal-Risk Apps: The Alternatives, Compared',
    description:
      'A fair comparison of deal-risk and opportunity-risk tools for Salesforce: automatic native apps, rep questionnaires, and sync-out revenue platforms. How to choose, and where each fits.',
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/salesforce-deal-risk-apps` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="Native Salesforce Deal-Risk Apps: The Alternatives Compared | Meet The Mind"
        description="A fair comparison of deal-risk and opportunity-risk tools for Salesforce: automatic native apps, rep questionnaires, and sync-out revenue platforms like Clari and Gong. How to choose."
        canonical="/salesforce-deal-risk-apps"
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Buyer's Guide</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
            Native Salesforce deal-risk apps, compared
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>By <strong className="text-gray-700">Meet The Mind</strong></span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Updated {UPDATED}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>7 min read</span>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-3">In short</p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              Tools that flag at-risk deals in Salesforce fall into three camps: <strong>rep questionnaires</strong>
              {' '}that ask sellers to score deals by hand, <strong>sync-out revenue platforms</strong> that pull your
              pipeline into an external system, and <strong>automatic native apps</strong> that read the signals
              already in your CRM. The automatic-and-native lane is the least crowded, and it is where DealPulse sits.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="pb-8">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How the category breaks down</h2>
            <p className="mb-4">
              When we mapped the tools that surface at-risk deals for Salesforce, the field sorted into three
              approaches, and the differences matter more than the marketing suggests.
            </p>
            <ul className="space-y-3 not-prose mb-2">
              <li className="flex gap-3"><span className="font-semibold text-gray-900 min-w-[9rem]">Questionnaires</span><span className="text-gray-600">Reps answer risk questions; a score is derived from their input. Native, but manual and subjective.</span></li>
              <li className="flex gap-3"><span className="font-semibold text-gray-900 min-w-[9rem]">Sync-out platforms</span><span className="text-gray-600">A broad revenue platform mirrors your pipeline out to run ML scoring, forecasting, and analytics. Powerful, but your data leaves the CRM.</span></li>
              <li className="flex gap-3"><span className="font-semibold text-gray-900 min-w-[9rem]">Automatic + native</span><span className="text-gray-600">A focused app scores every deal from CRM signals, on-platform, with transparent rules. Nothing leaves your org.</span></li>
            </ul>
            <p className="text-base text-gray-500">
              For the full framework, see our guide to <Link to="/deal-risk-intelligence" className="text-brand hover:underline">deal risk intelligence</Link>.
            </p>
          </div>

          {/* Comparison table */}
          <div className="not-prose">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The apps, side by side</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left border-collapse text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 font-semibold text-gray-700">App</th>
                    <th className="py-3 px-3 font-semibold text-gray-700">Approach</th>
                    <th className="py-3 px-3 font-semibold text-gray-700 text-center">Native</th>
                    <th className="py-3 px-3 font-semibold text-gray-700 text-center">Automatic</th>
                    <th className="py-3 px-3 font-semibold text-gray-700 text-center">Data stays in SF</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((a, i) => (
                    <tr key={i} className={`border-b border-gray-100 last:border-0 ${a.highlight ? 'bg-brand/[0.04]' : ''}`}>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${a.highlight ? 'text-brand' : 'text-gray-800'}`}>{a.name}</span>
                        <span className="block text-xs text-gray-400">{a.by}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-600">{a.approach}</td>
                      <td className="py-3 px-3 text-center"><span className="inline-flex justify-center"><YesNo v={a.native} /></span></td>
                      <td className="py-3 px-3 text-center"><span className="inline-flex justify-center"><YesNo v={a.automatic} /></span></td>
                      <td className="py-3 px-3 text-center"><span className="inline-flex justify-center"><YesNo v={!a.egress} /></span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Positioning reflects publicly available information as of {UPDATED}. Product names are trademarks of
              their respective owners; this comparison is independent and not endorsed by them.
            </p>
          </div>

          {/* Detail cards */}
          <div className="not-prose space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">A closer look</h2>
            {apps.map((a, i) => (
              <div key={i} className={`rounded-xl border p-5 ${a.highlight ? 'border-brand/30 bg-brand/5' : 'border-gray-100 bg-white shadow-sm'}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className={`text-lg font-bold ${a.highlight ? 'text-brand' : 'text-gray-900'}`}>{a.name}</h3>
                  <span className="text-xs text-gray-400">by {a.by}</span>
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{a.approach}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{a.scope}. {a.note}</p>
              </div>
            ))}
          </div>

          {/* How to choose */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How to choose</h2>
            <ol className="space-y-4 not-prose">
              {chooseChecklist.map(([q, a], i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-semibold text-sm">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{q}</p>
                    <p className="text-gray-600 text-base mt-0.5">{a}</p>
                  </div>
                </li>
              ))}
            </ol>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">The native, automatic option</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">DealPulse</strong> scores every open Opportunity from the signals
              already in your CRM, shows exactly why each deal is at risk, and tells the rep what to do next, with
              nothing leaving your Salesforce org.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dealpulse" className="btn-primary">
                Explore DealPulse <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/dealpulse-vs-clari"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium py-3 px-7 rounded-md hover:bg-white/10 transition-colors"
              >
                DealPulse vs Clari
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
};

export default SalesforceDealRiskApps;
