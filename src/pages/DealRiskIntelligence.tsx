import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Activity, CalendarClock, TrendingDown, ListChecks, Hourglass, Users } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const SITE = 'https://www.meethemind.com';
const UPDATED = 'July 2026';

const signals = [
  { icon: Activity, name: 'Activity gap', desc: 'No logged calls, emails, or meetings for an extended stretch, so the deal has gone quiet.' },
  { icon: CalendarClock, name: 'Close-date slippage', desc: 'The close date has been pushed forward once or repeatedly, a classic sign of a deal that is not really progressing.' },
  { icon: TrendingDown, name: 'Stage regression', desc: 'The opportunity moved backward to an earlier stage instead of forward.' },
  { icon: ListChecks, name: 'Missing next step', desc: 'No defined next action, so nothing is scheduled to move the deal ahead.' },
  { icon: Hourglass, name: 'Stage stagnation', desc: 'The deal has sat in the same stage far longer than a healthy deal should.' },
  { icon: Users, name: 'Weak engagement', desc: 'Few or no engaged buying-side contacts, or a single-threaded deal with one champion.' },
];

const approaches = [
  {
    name: 'Manual deal reviews & questionnaires',
    how: 'Reps answer risk questions or apply a sales methodology; a score is derived from their input.',
    tradeoff: 'Subjective and manual. It reflects what the rep believes (the same optimism bias you are trying to correct) and does not scale to every deal.',
  },
  {
    name: 'Black-box revenue intelligence',
    how: 'A machine-learning model scores deals, usually after syncing your pipeline out of the CRM into an external platform.',
    tradeoff: 'The score is opaque and hard to defend to leadership, your data leaves the CRM (a security-review problem), and it is an enterprise-scale purchase.',
  },
  {
    name: 'Automatic, native, signal-based',
    how: 'A deterministic engine scores every open opportunity from signals already in the CRM, on-platform, and explains which signals fired.',
    tradeoff: 'You have to define what "risk" means for your business, but the scoring is transparent, explainable, and nothing leaves your CRM.',
  },
];

const checklist = [
  ['Is it automatic, or does it depend on rep input?', 'The deals most likely to be at risk are the ones a rep is quietly avoiding, so anything that relies on manual scoring misses them.'],
  ['Does it explain why, or just hand you a number?', 'A score with no reasons is not actionable and not defensible. Look for the specific signals behind every verdict.'],
  ['Does your pipeline data leave the CRM?', 'Syncing deals out to an external platform turns every deployment into a security review. Native tools avoid it entirely.'],
  ['Can you see and edit the rules?', 'If the logic is a black box, you cannot tune it to your sales motion or explain a score to your CRO.'],
  ['Does it run on every open deal, continuously?', 'Risk that only surfaces in a weekly review surfaces two weeks too late. Continuous scoring catches it early.'],
  ['What does it cost to start?', 'Enterprise revenue-intelligence platforms carry six-figure commitments. Look for a path that lets you prove value first.'],
];

const faqs = [
  {
    q: 'What is deal risk intelligence?',
    a: 'Deal risk intelligence is the practice of automatically scoring every open sales opportunity for the risk that it stalls or slips, using signals already in the CRM, so revenue teams can act before a deal quietly dies. Unlike a manual deal review, it is continuous and evidence-based, and it surfaces why a deal is at risk, not just that it is.',
  },
  {
    q: 'How is deal risk intelligence different from revenue intelligence?',
    a: 'Revenue intelligence is a broad category covering forecasting, conversation intelligence, and pipeline analytics, usually delivered across an external platform. Deal risk intelligence is the narrower, more actionable slice: scoring individual open opportunities for risk and telling a rep what to do next. You can do deal risk intelligence natively inside Salesforce without adopting a full revenue-intelligence suite.',
  },
  {
    q: 'What signals indicate a deal is at risk?',
    a: 'The strongest signals are already in your CRM: no recent activity, a close date that keeps getting pushed, a deal that moved backward a stage, a blank next step, a deal stuck too long in one stage, an eroding amount, weak buyer engagement, and open high-priority support issues on the account. Deal risk intelligence pulls these together automatically instead of leaving a human to spot them one record at a time.',
  },
  {
    q: 'Is deal risk scoring the same as lead scoring?',
    a: 'No. Lead scoring predicts whether a prospect is worth pursuing at the top of the funnel. Deal risk scoring evaluates whether an opportunity already in your pipeline is likely to stall or slip. They answer different questions at different stages.',
  },
  {
    q: 'Do you need AI to do deal risk intelligence?',
    a: 'No. The most transparent approach is deterministic: explicit, admin-editable rules over CRM signals, with no model to train and no credits to spend. AI can add a plain-English narrative on top, but the risk classification itself does not require it.',
  },
  {
    q: 'Can you do deal risk intelligence natively in Salesforce?',
    a: 'Yes. A native app can score every open Opportunity from Salesforce data on-platform, with no data leaving your org. DealPulse, built by Meet The Mind, is one example of a 100% native, deterministic deal risk intelligence app.',
  },
];

const DealRiskIntelligence = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is Deal Risk Intelligence? A Practical Guide for Revenue Teams',
    description:
      'Deal risk intelligence is the practice of automatically scoring every open opportunity for the risk that it stalls or slips, using signals already in the CRM. This guide explains the signals, the approaches, and how to evaluate a tool.',
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE}/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png` },
    },
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/deal-risk-intelligence` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="What Is Deal Risk Intelligence? A Guide for Revenue Teams | Meet The Mind"
        description="Deal risk intelligence is the practice of automatically scoring every open opportunity for the risk it stalls or slips, using CRM signals. Learn the signals, the approaches, and how to evaluate a tool."
        canonical="/deal-risk-intelligence"
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-4">Guide · Deal Risk Intelligence</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-gray-900 mb-6">
            What is deal risk intelligence?
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

      {/* TL;DR / definition */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 md:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand mb-3">In short</p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              <strong>Deal risk intelligence</strong> is the practice of automatically scoring every open
              sales opportunity for the risk that it stalls or slips, using signals already in your CRM,
              so revenue teams can act before a deal quietly dies. Unlike a manual deal review, it is
              continuous and evidence-based, and it surfaces <em>why</em> a deal is at risk, not just that it is.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="pb-8">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-700 leading-relaxed">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why deal risk intelligence matters</h2>
            <p className="mb-4">
              Every sales team runs pipeline reviews, and every pipeline review has the same blind spot: the
              warning signs that a deal is dying have usually been there for weeks, but nobody was looking at all
              of them at once. A deal goes quiet. A close date slips. An opportunity slides back a stage. Each of
              those lives in a different place in the CRM, and a human would have to open every record to connect them.
            </p>
            <p>
              By the time the risk shows up in a forecast, it is often too late to save the deal. Deal risk
              intelligence closes that gap by doing the analysis automatically, on every open opportunity every
              day, and putting the answer where reps and managers already work.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The signals that predict a deal is at risk</h2>
            <p className="mb-6">
              Deal risk intelligence does not need new data. The signals are already sitting in your CRM, in the
              activity history, opportunity history, and related records. The most predictive ones:
            </p>
            <div className="grid sm:grid-cols-2 gap-5 not-prose">
              {signals.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <Icon size={22} className="text-brand mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1 text-base">{s.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Three ways tools measure deal risk</h2>
            <p className="mb-6">
              Not all deal risk intelligence works the same way. The tools on the market fall into three camps, and
              the differences matter more than the marketing suggests:
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 pr-4 font-semibold text-gray-900">Approach</th>
                    <th className="py-3 pr-4 font-semibold text-gray-900">How it scores</th>
                    <th className="py-3 font-semibold text-gray-900">The trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  {approaches.map((a, i) => (
                    <tr key={i} className="border-b border-gray-100 align-top">
                      <td className="py-4 pr-4 font-semibold text-gray-800">{a.name}</td>
                      <td className="py-4 pr-4 text-gray-600">{a.how}</td>
                      <td className="py-4 text-gray-600">{a.tradeoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6">
              The gap between the first two camps is where the most useful tools sit: <strong>automatic</strong> (so
              it catches the deals reps avoid), <strong>native</strong> (so your data never leaves the CRM), and
              <strong> transparent</strong> (so you can explain and edit the logic).
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How to evaluate a deal risk intelligence tool</h2>
            <p className="mb-6">Six questions that separate a useful tool from an expensive dashboard:</p>
            <ol className="space-y-4 not-prose">
              {checklist.map(([q, a], i) => (
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

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Deal risk intelligence vs. revenue intelligence</h2>
            <p className="mb-4">
              The two terms are often used interchangeably, but they are not the same. <strong>Revenue
              intelligence</strong> is a broad platform category (forecasting, conversation intelligence, pipeline
              analytics) typically delivered by syncing your data into an external system. <strong>Deal risk
              intelligence</strong> is the narrower, more actionable slice: scoring individual open opportunities for
              risk and telling a rep what to do next.
            </p>
            <p>
              You do not need a full revenue-intelligence suite to get deal risk intelligence. A focused, native app
              can score every open opportunity inside Salesforce without moving a single record off-platform.
            </p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">See deal risk intelligence in Salesforce</h2>
            <p className="text-gray-300 mb-6 max-w-2xl">
              <strong className="text-white">DealPulse</strong>, built by Meet The Mind, is a 100% native Salesforce
              app that scores every open Opportunity from the signals already in your CRM, shows exactly why each
              deal is at risk, and tells the rep what to do next, with nothing leaving your org.
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

        </div>
      </article>
    </>
  );
};

export default DealRiskIntelligence;
