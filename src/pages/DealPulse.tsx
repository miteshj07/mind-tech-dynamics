import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  CalendarClock,
  CalendarX,
  TrendingDown,
  Hourglass,
  ListChecks,
  Clock,
  Lock,
  Eye,
  KeyRound,
  Sparkles,
  SlidersHorizontal,
  LineChart,
  PlusCircle,
  Building2,
  Bell,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Seo from '@/components/layout/Seo';
import EarlyAccessForm from '@/components/dealpulse/EarlyAccessForm';

const SITE = 'https://www.meethemind.com';

// DealPulse brand palette (page-scoped — do not touch global tokens)
const INK = '#10241C';
const CRIMSON = '#B31120';
const FOREST = '#247854';
const MIST = '#EEF4F0';

const gradientStrip = 'linear-gradient(90deg, #B31120 0%, #247854 100%)';

// The "Standard Seven" — active out of the box (matches DP_NativeSignalConfig / Signal Management screen)
const signals = [
  { icon: Activity, name: 'Days Since Last Activity', desc: 'Days since the last completed Task or Event on the deal.' },
  { icon: CalendarX, name: 'No Future Scheduled Activity', desc: 'Nothing open is on the calendar today or later to move it forward.' },
  { icon: CalendarClock, name: 'Close Date Push Count', desc: 'How many times the Close Date has been pushed to a later date.' },
  { icon: TrendingDown, name: 'Stage Regressed', desc: 'The opportunity moved backward to an earlier stage.' },
  { icon: Hourglass, name: 'Stage Stagnation', desc: 'How many days the deal has sat in its current stage.' },
  { icon: ListChecks, name: 'Next Step Blank', desc: 'The Opportunity has no Next Step defined.' },
  { icon: Clock, name: 'Opportunity Age', desc: 'How long the deal has been open since it was created.' },
];

// Capabilities beyond the risk score
const capabilities = [
  {
    icon: SlidersHorizontal,
    title: 'A glass-box rule engine',
    desc: 'You decide what “High Risk” means — in plain conditions, no code. Every tier traces back to rules you can read and edit, not a proprietary model you have to trust.',
  },
  {
    icon: LineChart,
    title: 'Risk momentum & history',
    desc: 'A per-deal sparkline shows whether a deal is getting riskier or cooling off, and a Movers panel surfaces the biggest shifts across your pipeline.',
  },
  {
    icon: PlusCircle,
    title: 'No-code Custom Signals',
    desc: 'Build your own signals from any related object — pick the source, the aggregate, and the threshold. They score right alongside the built-in seven.',
  },
  {
    icon: Building2,
    title: 'Industry signal packs',
    desc: 'Pre-built packs auto-detect your cloud and add vertical signals for Manufacturing, Financial Services, Health, and Revenue Cloud / CPQ.',
  },
  {
    icon: Sparkles,
    title: 'AI-optional by design',
    desc: 'Risk scoring is deterministic and never spends an AI credit. Einstein briefs are optional, run on your own entitlement, and quietly fall back to a written brief when AI is off.',
  },
  {
    icon: Bell,
    title: 'One digest, not a flood',
    desc: 'When deals change tier, each owner gets a single grouped digest email and one in-app alert — never a separate message per deal.',
  },
];

const steps = [
  {
    title: 'Install in ~15 minutes',
    desc: 'A packaged app with permission sets and a guided setup check. No external services to provision, no data pipeline to build.',
  },
  {
    title: 'The engine scores your pipeline',
    desc: 'Deterministic rules run over the built-in signals. Every score is traceable to the exact signals that fired — no black box, no model you can’t audit.',
  },
  {
    title: 'Reps get briefs, leaders get the board',
    desc: 'A plain-English risk brief and one recommended action on every Opportunity, plus a pipeline dashboard with dollars-at-risk, movers, and a forecast × risk matrix.',
  },
];

const trustPillars = [
  { icon: Lock, title: 'Your data never leaves Salesforce', desc: 'No external callouts. Nothing is synced out to a third-party cloud.' },
  { icon: Eye, title: 'Deterministic, auditable scoring', desc: 'Every risk tier traces back to the exact signals and thresholds that fired.' },
  { icon: KeyRound, title: 'Respects your security model', desc: 'Honors your org’s sharing rules and field-level security out of the box.' },
  { icon: Sparkles, title: 'Works with or without Einstein', desc: 'AI briefs run on your org’s own Einstein entitlement — never required.' },
];

const gallery = [
  {
    key: 'brief',
    tab: 'Deal Brief',
    src: '/dealpulse/deal-brief.png',
    caption: 'A color-coded risk brief on every Opportunity — the signals, the why, and the next action.',
    alt: 'DealPulse High Risk brief on a Salesforce Opportunity showing signals, explanation and action.',
  },
  {
    key: 'dashboard',
    tab: 'Pipeline Dashboard',
    src: '/dealpulse/pipeline-dashboard.png',
    caption: 'Deals and dollars at risk by tier, plus a forecast-category × risk roll-up.',
    alt: 'DealPulse dashboard: dollars at risk by tier and a forecast-category by risk matrix.',
  },
  {
    key: 'rules',
    tab: 'Risk Rule Builder',
    src: '/dealpulse/risk-rules.png',
    caption: 'Define what “High Risk” means — signals, thresholds, AND/OR logic. No code.',
    alt: 'DealPulse Risk Rules editor with conditions and AND/OR filter logic for a risk tier.',
  },
  {
    key: 'signals',
    tab: 'Custom Signals',
    src: '/dealpulse/signal-management.png',
    caption: 'Toggle built-in signals, set thresholds, or add your own — no code.',
    alt: 'DealPulse Signal Management with built-in signals, on/off toggles and thresholds.',
  },
  {
    key: 'agent',
    tab: 'Deal Risk Agent',
    src: '/dealpulse/deal-risk-agent.png',
    caption: 'Just ask — the read-only Deal Risk Agent answers from real signals.',
    alt: 'DealPulse Agentforce agent listing high-risk deals with amounts and reasons.',
  },
];

const faqs = [
  {
    q: 'Is DealPulse really 100% native?',
    a: 'Yes. DealPulse is a packaged Salesforce app that runs entirely inside your org. It makes no external callouts and syncs no data out — your pipeline never leaves Salesforce.',
  },
  {
    q: 'What does it cost?',
    a: 'Early access is free today. Commercial pricing is being finalized as part of the AppExchange listing process, so there are no dollar figures to share yet — early adopters get in before that lands.',
  },
  {
    q: 'Do I need Einstein or Agentforce licenses?',
    a: 'No. The deterministic scoring engine and Apex-generated narrative work without any AI licenses. If you do have Einstein or Agentforce, the AI briefs and Deal Risk Agent light up on your own entitlements.',
  },
  {
    q: 'How long does setup take?',
    a: 'About 15 minutes. DealPulse installs as a managed package with permission sets and a guided setup check that verifies everything is wired correctly.',
  },
  {
    q: 'Which signals does it track?',
    a: 'Seven built-in signals — Activity Gap, Close-Date Pushes, Stage Regression, Open High-Priority Cases, Missing Next Step, Amount Erosion, and Contact Engagement — plus no-code Custom Signals and industry packs for Manufacturing, Financial Services, Health, and CPQ.',
  },
  {
    q: 'Is it on AppExchange yet?',
    a: 'The AppExchange listing is in progress. In the meantime, early-access installs are available now — request access and we’ll send you a private install link.',
  },
];

const DealPulse = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(gallery[0].key);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DealPulse',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Salesforce',
    description:
      'DealPulse is a 100% native Salesforce app that scores every open Opportunity, shows exactly which risk signals are firing, and tells the rep what to do next.',
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: SITE,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const active = gallery.find(g => g.key === activeTab) ?? gallery[0];

  return (
    <>
      <Seo
        title="DealPulse — Native Salesforce Deal Risk Intelligence | Meet The Mind"
        description="DealPulse is a 100% native Salesforce app that scores every open Opportunity, shows which risk signals are firing, and tells reps what to do next. No sync-out, no black box."
        canonical="/dealpulse"
        jsonLd={[softwareSchema, faqSchema]}
      />

      <EarlyAccessForm open={formOpen} onClose={() => setFormOpen(false)} />

      {/* 1 · HERO — light background */}
      <section className="relative pt-28 pb-14" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <img
                src="/dealpulse/dealpulse-logo.png"
                srcSet="/dealpulse/dealpulse-logo.png 1x, /dealpulse/dealpulse-logo-2x.png 2x"
                alt="DealPulse"
                className="h-10 w-auto mb-6"
              />
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: FOREST }}
              >
                Deal Risk Intelligence · 100% Native
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5" style={{ color: INK }}>
                Know which deals are at risk — before your pipeline review.
              </h1>
              <p className="text-lg text-gray-600 mb-7 leading-relaxed">
                DealPulse is a 100% native Salesforce app that scores every open
                Opportunity, shows exactly which risk signals are firing, and tells the
                rep what to do next. No sync-out. No black box. No questionnaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary text-base px-7 py-3" onClick={() => setFormOpen(true)}>
                  Get early access <ArrowRight size={18} className="ml-2" />
                </button>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-medium py-3 px-7 rounded-md hover:border-gray-400 transition-colors"
                >
                  Book a 20-min walkthrough
                </Link>
              </div>
            </div>

            <div className="w-full max-w-[380px] mx-auto lg:mx-0 lg:ml-auto">
              <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <img
                  src="/dealpulse/deal-brief.png"
                  alt="DealPulse risk brief on a Salesforce Opportunity"
                  className="w-full"
                  width={950}
                  height={1270}
                />
              </div>
            </div>
          </div>
        </div>
        {/* gradient handoff strip */}
        <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: gradientStrip }} />
      </section>

      {/* 2 · STATUS STRIP */}
      <div className="border-l-4" style={{ backgroundColor: '#FEF2F2', borderColor: CRIMSON }}>
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <Activity size={18} style={{ color: CRIMSON }} className="mt-0.5 flex-shrink-0" />
            <span>
              <strong>DealPulse is production-ready and in the AppExchange listing process.</strong>{' '}
              Pricing is being finalized with Salesforce — early access is free while we
              complete the listing.
            </span>
          </p>
        </div>
      </div>

      {/* 3 · THE PROBLEM */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-8 text-center">Pipeline reviews find risk two weeks too late</h2>
          <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
            <p>
              By the time a deal comes up in the pipeline review, the warning signs have
              been there for weeks — no activity, a pushed close date, a support fire
              burning in the background. Nobody saw them because nobody was looking at all
              of them at once.
            </p>
            <p>
              Salesforce records what your reps type. It doesn’t tell you what your deals
              are actually <em>doing</em> — which ones have gone quiet, slipped, or started
              to erode while everyone was busy.
            </p>
            <p>
              And the revenue-intelligence tools that promise to help usually sync your
              entire pipeline out of Salesforce and hand you back a black-box score you
              can’t explain to your CRO. DealPulse takes the opposite approach: automatic,
              transparent, and 100% inside your org.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · HOW IT WORKS */}
      <section className="py-20" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-14 text-center">How DealPulse works</h2>
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <div
                  className="rounded-full w-11 h-11 flex items-center justify-center flex-shrink-0 font-bold text-white text-lg"
                  style={{ backgroundColor: FOREST }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: INK }}>{s.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · THE 7 SIGNALS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="heading-md mb-4">Seven signals, live on every deal out of the box</h2>
            <p className="text-gray-600 text-lg">
              Each one maps to something your reps already know matters — computed
              automatically from data already in Salesforce, on every open Opportunity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {signals.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderTop: `3px solid transparent`, borderImage: `${gradientStrip} 1` }}
                >
                  <Icon size={26} style={{ color: FOREST }} className="mb-3" />
                  <h3 className="font-semibold mb-1.5" style={{ color: INK }}>{s.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-500 mt-10 max-w-2xl mx-auto">
            Four more signals — <strong className="text-gray-700">Amount Erosion, Open High-Priority Cases,
            Total Contacts,</strong> and <strong className="text-gray-700">Engaged Contacts</strong> — switch
            on per org, alongside a no-code Custom Signal builder and 20 industry-pack signals.
          </p>
        </div>
      </section>

      {/* 5b · CAPABILITIES BEYOND THE SCORE */}
      <section className="py-20" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="heading-md mb-4">More than a risk score</h2>
            <p className="text-gray-600 text-lg">
              DealPulse is a full deal-risk workflow — you control the rules, watch the
              momentum, and extend it to your business, all inside Salesforce.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="rounded-xl bg-white p-7 shadow-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(36,120,84,0.1)' }}
                  >
                    <Icon size={24} style={{ color: FOREST }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: INK }}>{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 · SCREENSHOT GALLERY */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-4 text-center">See it in Salesforce</h2>
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12">
            Real screens from the shipped app — no mockups.
          </p>

          {/* tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {gallery.map(g => (
              <button
                key={g.key}
                onClick={() => setActiveTab(g.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  activeTab === g.key
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
                style={activeTab === g.key ? { backgroundColor: FOREST } : undefined}
              >
                {g.tab}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex justify-center bg-white p-4 sm:p-6">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="w-auto max-w-full max-h-[560px] object-contain rounded-md"
                />
              </div>
            </div>
            <p className="text-center text-gray-500 mt-5 max-w-2xl mx-auto">{active.caption}</p>
          </div>
        </div>
      </section>

      {/* 7 · NATIVE TRUST BLOCK — Ink dark band */}
      <section className="py-20" style={{ backgroundColor: INK }}>
        <div className="container mx-auto px-4">
          <div className="inline-flex bg-white rounded-xl px-4 py-2 mb-10">
            <img
              src="/dealpulse/dealpulse-logo.png"
              srcSet="/dealpulse/dealpulse-logo.png 1x, /dealpulse/dealpulse-logo-2x.png 2x"
              alt="DealPulse"
              className="h-7 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-14 max-w-2xl">
            Built to pass your security review — not work around it.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i}>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(36,120,84,0.2)' }}
                  >
                    <Icon size={24} style={{ color: '#4ade80' }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 · BUILT BY CONSULTANTS */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ShieldCheck size={40} style={{ color: FOREST }} className="mx-auto mb-5" />
          <h2 className="heading-md mb-4">Built by the consultants who see these deals every day</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            DealPulse came out of the patterns Meet The Mind sees across real RevOps
            engagements — the same stalled-deal anatomy, over and over. The team that
            built it is the team that supports it.
          </p>
          <Link to="/about-us" className="text-brand font-semibold hover:underline">
            Meet the team behind DealPulse →
          </Link>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="py-20" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">DealPulse FAQs</h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start">
                  <CheckCircle style={{ color: FOREST }} className="mr-2 mt-1 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · CTA BAND */}
      <section className="py-20" style={{ backgroundColor: INK }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 max-w-2xl mx-auto">
            See your at-risk deals this week.
          </h2>
          <p className="text-gray-300 text-lg mb-4 max-w-xl mx-auto">
            Free while the AppExchange listing completes · installs in a sandbox in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="btn-primary text-base px-8 py-3" onClick={() => setFormOpen(true)}>
              Get early access <ArrowRight size={18} className="ml-2" />
            </button>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-medium py-3 px-8 rounded-md hover:bg-white/10 transition-colors"
            >
              Book a walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealPulse;
