import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

type Term = { term: string; def: string; more?: React.ReactNode; plain: string };

const groups: { title: string; intro: string; terms: Term[] }[] = [
  {
    title: 'Signals of deal risk',
    intro: 'The measurable warning signs, all of them already sitting in your CRM.',
    terms: [
      { term: 'Activity gap', def: 'The number of days since the last logged activity (call, email, or meeting) on a deal.', plain: 'A widening activity gap is one of the earliest signs a deal has gone quiet and stalled.', more: 'A widening activity gap is one of the earliest signs a deal has gone quiet and stalled.' },
      { term: 'Close-date slippage', def: 'When a deal\'s expected close date is moved to a later date, once or repeatedly.', plain: 'Repeated close-date pushes usually mean the deal is being rescheduled, not progressing.', more: 'Also called a close-date push. Repeated pushes usually mean the deal is being rescheduled, not actually progressing.' },
      { term: 'Stage regression', def: 'When an opportunity moves backward to an earlier sales stage instead of forward.', plain: 'It signals the deal has lost ground it previously gained.', more: 'It signals the deal has lost ground it previously gained, often because a buyer reopened a decision you thought was settled.' },
      { term: 'Stage stagnation', def: 'How long a deal has sat in its current stage without moving.', plain: 'A deal stuck well beyond the normal time in stage is at elevated risk.', more: 'A deal stuck well beyond the normal time in stage is at elevated risk, even if every other field looks healthy.' },
      { term: 'Missing next step', def: 'An opportunity with no defined next action recorded.', plain: 'Without a planned next step, nothing is scheduled to advance the deal.', more: 'Without a planned next step, nothing is scheduled to advance the deal, and it tends to drift.' },
      { term: 'Opportunity age', def: 'How long a deal has been open since it was created.', plain: 'Deals open far longer than a typical sales cycle tend to carry higher risk.', more: 'Deals open far longer than a typical sales cycle tend to carry higher risk of never closing.' },
      { term: 'Amount erosion', def: 'A drop in a deal\'s value from its earlier or peak amount.', plain: 'Shrinking deal value can signal reduced buyer commitment or a downgraded scope.', more: 'Shrinking deal value can signal reduced buyer commitment or a scope that keeps getting cut.' },
      { term: 'Single-threaded deal', def: 'A deal that depends on a single contact or champion on the buying side.', plain: 'If that one person disengages or leaves, the deal is exposed.', more: 'If that one person disengages or leaves, the deal is exposed. Multi-threading (engaging several stakeholders) reduces the risk.' },
      { term: 'Contact engagement', def: 'How many buying-side contacts are actively engaged on a deal.', plain: 'Low engagement, or a single-threaded deal, raises risk.', more: 'Low engagement, or a single-threaded deal, raises risk. Healthy deals usually show several engaged stakeholders.' },
    ],
  },
  {
    title: 'Core concepts',
    intro: 'The vocabulary of deal risk itself.',
    terms: [
      { term: 'Deal risk', def: 'The likelihood that an open opportunity will stall, slip, or fail to close as expected.', plain: 'It is measured from signals in the CRM rather than gut feel.', more: 'It is measured from signals in the CRM rather than gut feel.' },
      { term: 'Deal risk intelligence', def: 'The practice of automatically scoring every open opportunity for risk using signals already in the CRM.', plain: 'It is continuous and evidence-based, and it explains why a deal is at risk.', more: <>It is continuous and evidence-based, and it surfaces why a deal is at risk, not just that it is. See the full <Link to="/deal-risk-intelligence" className="text-brand hover:underline">deal risk intelligence guide</Link>.</> },
      { term: 'Opportunity risk', def: 'Another term for deal risk, framed around the Salesforce Opportunity record.', plain: 'Used interchangeably with deal risk in most Salesforce contexts.', more: 'Used interchangeably with deal risk in most Salesforce contexts.' },
      { term: 'Pipeline risk', def: 'The aggregate risk across all open deals in a pipeline, rather than a single deal.', plain: 'It answers how much of the pipeline, in dollars, is exposed.', more: 'It answers how much of the pipeline, in dollars and deal count, is exposed.' },
      { term: 'At-risk deal', def: 'An open opportunity flagged as likely to stall or slip based on its signals.', plain: 'The output of deal risk scoring applied to one record.', more: 'The output of deal risk scoring applied to a single record.' },
      { term: 'Deal slippage', def: 'When a deal fails to close in its expected period and moves into a later one.', plain: 'Slippage is one of the most common and costly forms of forecast miss.', more: 'Slippage is one of the most common and costly forms of forecast miss.' },
      { term: 'Forecast risk', def: 'The portion of a forecast that is exposed because the deals behind it are at risk.', plain: 'Deal risk intelligence turns forecast risk from a guess into a number.', more: 'Deal risk intelligence turns forecast risk from a guess into a number tied to specific deals.' },
    ],
  },
  {
    title: 'Tooling and approaches',
    intro: 'How the tools in this space actually work.',
    terms: [
      { term: 'Deterministic scoring', def: 'Risk scoring based on explicit, readable rules rather than a machine-learning model.', plain: 'Every score traces back to the exact conditions that triggered it.', more: 'Every score traces back to the exact conditions that triggered it, so it is fully explainable.' },
      { term: 'Glass-box scoring', def: 'Scoring whose logic you can read, audit, and edit.', plain: 'The opposite of a black-box model.', more: 'The opposite of a black-box model. It lets an admin tune risk to their own sales motion.' },
      { term: 'Black-box scoring', def: 'Scoring produced by a proprietary model you cannot inspect or adjust.', plain: 'You get a number, but not the reasons behind it.', more: 'You get a number, but not the reasons behind it, which makes it hard to defend to leadership.' },
      { term: 'Native app', def: 'A Salesforce app that runs entirely on-platform, with no data leaving the org.', plain: 'Native tools sidestep the security review that off-platform tools trigger.', more: 'Native tools make no external callouts and sidestep the security review that off-platform tools trigger.' },
      { term: 'Data egress', def: 'When a tool copies your CRM data into an external system to process it.', plain: 'Also called sync-out. Native tools avoid egress entirely.', more: 'Also called sync-out. Native tools avoid egress entirely by processing data in place.' },
      { term: 'Revenue intelligence', def: 'A broad platform category covering forecasting, pipeline analytics, and conversation intelligence.', plain: 'Usually delivered off-platform, and broader than deal risk alone.', more: <>Usually delivered off-platform, and broader than deal risk alone. See how it compares in our <Link to="/salesforce-deal-risk-apps" className="text-brand hover:underline">roundup of deal-risk apps</Link>.</> },
    ],
  },
];

const allTerms = groups.flatMap(g => g.terms);

const DealRiskGlossary = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Deal Risk Glossary',
    description: 'Definitions of the key deal risk and opportunity risk terms for Salesforce revenue teams.',
    url: `${SITE}/deal-risk-glossary`,
    hasDefinedTerm: allTerms.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: `${t.def} ${t.plain}`,
      inDefinedTermSet: `${SITE}/deal-risk-glossary`,
    })),
  };

  return (
    <>
      <Seo
        title="Deal Risk Glossary: Opportunity Risk, Slippage & More | Meet The Mind"
        description="Plain-English definitions of deal risk and opportunity risk terms for Salesforce: activity gap, close-date slippage, stage regression, deterministic scoring, and more."
        canonical="/deal-risk-glossary"
        jsonLd={definedTermSet}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Glossary</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-5">
            Deal risk glossary
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Plain-English definitions of the deal risk and opportunity risk terms that come up when a Salesforce
            pipeline starts to wobble. Updated {UPDATED}.
          </p>
        </div>
      </section>

      {/* Jump nav */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {allTerms.map(t => (
              <a
                key={t.term}
                href={`#${slug(t.term)}`}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand hover:text-brand transition-colors"
              >
                {t.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-14">
          {groups.map((g, gi) => (
            <div key={gi}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{g.title}</h2>
              <p className="text-gray-500 mb-8">{g.intro}</p>
              <dl className="space-y-8">
                {g.terms.map((t, ti) => (
                  <div key={ti} id={slug(t.term)} className="scroll-mt-28 border-l-2 border-brand/30 pl-5">
                    <dt className="text-xl font-bold text-gray-900 mb-1">{t.term}</dt>
                    <dd className="text-gray-700 leading-relaxed">
                      <span className="text-gray-900 font-medium">{t.def}</span>{' '}
                      {t.more}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {/* CTA */}
          <div className="rounded-2xl bg-gray-900 text-white p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">See these signals scored automatically</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">DealPulse</strong> reads every one of these signals on every open
              Opportunity, scores the risk with transparent rules, and tells the rep what to do next, all natively
              inside Salesforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dealpulse" className="btn-primary">
                Explore DealPulse <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/deal-risk-intelligence"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium py-3 px-7 rounded-md hover:bg-white/10 transition-colors"
              >
                Read the guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealRiskGlossary;
