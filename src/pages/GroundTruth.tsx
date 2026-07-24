import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ClipboardCheck,
  Clock,
  GitCompareArrows,
  CopyX,
  BadgeCheck,
  EyeOff,
  SlidersHorizontal,
  ListChecks,
  Wrench,
  Layers,
  Lock,
  Bot,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Seo from '@/components/layout/Seo';
import AssessmentForm from '@/components/groundtruth/AssessmentForm';

const SITE = 'https://www.meethemind.com';

// GroundTruth palette — sampled from the logo (page-scoped; global tokens untouched)
const NAVY = '#1C3157';
const TEAL = '#159AA0';
const MIST = '#EEF3F8';
const INK = '#0F172A';

const gradientStrip = 'linear-gradient(135deg, #159AA0 0%, #2E63B0 50%, #7A3B9D 100%)';

// The six dimensions, colour-ramped along the logo's teal → purple network gradient
const dimensions = [
  {
    icon: ClipboardCheck,
    color: '#159AA0',
    name: 'Completeness',
    desc: 'Are the fields your agents rely on actually filled in? A blank Amount or Industry becomes a wrong answer.',
  },
  {
    icon: Clock,
    color: '#1E86AE',
    name: 'Freshness',
    desc: 'Is the record current — or is your agent citing a deal nobody has touched in 90 days?',
  },
  {
    icon: GitCompareArrows,
    color: '#2E63B0',
    name: 'Consistency',
    desc: 'Do fields contradict each other? A Won opportunity with no Amount is a story the agent can’t tell straight.',
  },
  {
    icon: CopyX,
    color: '#4C51A8',
    name: 'Uniqueness',
    desc: 'Are there duplicates that make an agent cite the wrong version of the same customer?',
  },
  {
    icon: BadgeCheck,
    color: '#63459F',
    name: 'Integrity',
    desc: 'Are values structurally valid — real picklist values, not free text an agent can’t reason over?',
  },
  {
    icon: EyeOff,
    color: '#7A3B9D',
    name: 'Exposure',
    desc: 'Is there compliance risk? A contact who opted out but is still marked contactable is a breach waiting to happen.',
  },
];

const steps = [
  {
    title: 'Install and scan',
    desc: 'A packaged app scans your org across all six dimensions, on-platform. No data export, no external service to provision.',
  },
  {
    title: 'Get your Readiness Score',
    desc: 'One hero number, red/amber/green bars for each dimension, and a per-record list of exactly what is failing and why.',
  },
  {
    title: 'Remediate and re-check',
    desc: 'Fix fields, merge duplicates, or accept false positives in-app — then re-scan to clear the go-live gate before your agents ship.',
  },
];

const capabilities = [
  {
    icon: SlidersHorizontal,
    title: 'Two scores that mean something',
    desc: 'A portable Benchmark score — your go-live gate — computed only from the standard rulebook, plus an Org-Specific Readiness Score that layers in your own rules.',
  },
  {
    icon: ListChecks,
    title: 'Per-record findings',
    desc: 'Don’t just see “Completeness: 81”. See the exact records failing, the rule that caught them, and what to do about it.',
  },
  {
    icon: Wrench,
    title: 'Human-in-the-loop remediation',
    desc: 'Fix fields inline, merge duplicate groups past Salesforce’s native three-record cap, or suppress accepted false positives — with a full audit trail.',
  },
  {
    icon: Layers,
    title: 'Your own rules, no code',
    desc: 'Layer your org’s data standards on top of the benchmark rulebook with a glass-box rule builder. Every rule is readable and editable.',
  },
  {
    icon: Lock,
    title: 'Security-respecting by design',
    desc: 'Scores reflect the whole org, but per-record detail honours each viewer’s record access — even for administrators.',
  },
  {
    icon: Bot,
    title: 'A runtime guardrail for agents',
    desc: 'Agentforce and Flow can check readiness before they act — so an agent can decline to answer on data that isn’t ready.',
  },
];

const trustPillars = [
  { title: 'Your data never leaves Salesforce', desc: 'No external callouts, no data egress. The scan runs entirely on-platform.' },
  { title: 'Respects your security model', desc: 'Org-wide scoring for an honest picture; per-record detail gated to the viewer’s access.' },
  { title: 'Deterministic and auditable', desc: 'Every score traces to declarative rules you can read — no black-box model.' },
  { title: 'Agentforce-optional', desc: 'The base package runs without Agentforce; the runtime guardrail lights up when you have it.' },
];

const faqs = [
  {
    q: 'Is GroundTruth really 100% native?',
    a: 'Yes. It is a packaged Salesforce app that runs entirely inside your org, with no external callouts and no data leaving Salesforce.',
  },
  {
    q: 'Do I need Agentforce to use it?',
    a: 'No. The base package is Agentforce-free — you can score and clean your data on any supported edition. If you do run Agentforce or Flow, the runtime guardrail lets agents check readiness before they act.',
  },
  {
    q: 'What is a "Readiness Score"?',
    a: 'A 0–100 measure of how ready your CRM data is for AI agents, rolled up from six dimensions. We show a portable Benchmark score — comparable across orgs and the go-live gate at 85+ — and an Org-Specific score that includes your own rules.',
  },
  {
    q: 'What are the six dimensions?',
    a: 'Completeness, Freshness, Consistency, Uniqueness, Integrity, and Exposure — each scored on the records and fields that actually matter to your agents.',
  },
  {
    q: 'How does it handle data security?',
    a: 'The scan reads org-wide so the score reflects reality, but per-record finding detail respects each viewer’s record access — even administrators only see detail for records they are allowed to see.',
  },
  {
    q: 'Is it on AppExchange yet?',
    a: 'The listing is in progress. In the meantime, book a free readiness assessment and we will run it with you.',
  },
];

const GroundTruth = () => {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GroundTruth',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Salesforce',
    description:
      'GroundTruth is a 100% native Salesforce app that scores your CRM data readiness for Agentforce across six dimensions, surfaces per-record findings, and supports in-app remediation.',
    publisher: { '@type': 'Organization', name: 'Meet The Mind Technologies', url: SITE },
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

  return (
    <>
      <Seo
        title="GroundTruth — Trusted Data Layer for Agentforce | Meet The Mind"
        description="GroundTruth scores your Salesforce data's readiness for Agentforce across six dimensions, shows which records will trip an agent up, and helps you fix them — without data leaving your org."
        canonical="/groundtruth"
        jsonLd={[softwareSchema, faqSchema]}
      />

      <AssessmentForm open={formOpen} onClose={() => setFormOpen(false)} />

      {/* 1 · HERO — light */}
      <section className="relative pt-28 pb-14" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <img
                src="/groundtruth/groundtruth-logo.png"
                alt="GroundTruth — Trusted Data Layer"
                className="h-24 w-auto mb-6 -ml-1"
                width={560}
                height={334}
              />
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: TEAL }}>
                For Agentforce · 100% Native
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5" style={{ color: NAVY }}>
                Give your AI agents data they can trust.
              </h1>
              <p className="text-lg text-gray-600 mb-7 leading-relaxed">
                GroundTruth scores your CRM's readiness for Agentforce across six
                dimensions, shows you exactly which records will trip an agent up, and
                helps you fix them — all without your data ever leaving Salesforce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary text-base px-7 py-3" onClick={() => setFormOpen(true)}>
                  Get a free readiness assessment <ArrowRight size={18} className="ml-2" />
                </button>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 font-medium py-3 px-7 rounded-md hover:border-gray-400 transition-colors"
                >
                  Book a 20-min walkthrough
                </Link>
              </div>
            </div>

            <div className="w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
                <video
                  src="/groundtruth/teaser.mp4"
                  poster="/groundtruth/teaser-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: gradientStrip }} />
      </section>

      {/* 2 · STATUS STRIP */}
      <div className="border-l-4" style={{ backgroundColor: '#ECFDF5', borderColor: TEAL }}>
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <ShieldCheck size={18} style={{ color: TEAL }} className="mt-0.5 flex-shrink-0" />
            <span>
              <strong>GroundTruth is production-ready and in the AppExchange listing process.</strong>{' '}
              Book a free readiness assessment while we complete the listing.
            </span>
          </p>
        </div>
      </div>

      {/* 3 · THE PROBLEM */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-6 text-center">An AI agent grounded in bad data is confidently wrong.</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              Agentforce answers by reading your CRM. When a record is blank, stale,
              duplicated, or contradicts itself, the agent doesn't hesitate — it answers
              anyway, wrong, in a confident voice your customer believes. The failure
              doesn't look like a bug. It looks like a fluent, plausible, incorrect
              sentence.
            </p>
            <p>
              You can't see that risk by scrolling through records, and you can't fix it
              after an agent has already quoted the wrong number to a customer. GroundTruth
              measures it up front — every record, every rule — so you know your data is
              ready before you turn agents loose on it.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · HOW IT WORKS */}
      <section className="py-14" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-10 text-center">How GroundTruth works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={i}>
                <div
                  className="rounded-full w-11 h-11 flex items-center justify-center mb-4 font-bold text-white text-lg"
                  style={{ backgroundColor: TEAL }}
                >
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: NAVY }}>{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · THE SIX DIMENSIONS */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-md mb-4">Six dimensions of data readiness</h2>
            <p className="text-gray-600 text-lg">
              Every one of them is a way an agent can be confidently wrong — scored
              automatically on the records and fields that matter.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {dimensions.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${d.color}1A` }}
                  >
                    <Icon size={22} style={{ color: d.color }} />
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: NAVY }}>{d.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5b · MORE THAN A SCORE */}
      <section className="py-14" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-md mb-4">More than a score</h2>
            <p className="text-gray-600 text-lg">
              GroundTruth is a full readiness workflow — measure it, understand it, fix it,
              and prove it, all inside Salesforce.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="rounded-xl bg-white p-7 shadow-sm">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(21,154,160,0.1)' }}
                  >
                    <Icon size={24} style={{ color: TEAL }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: NAVY }}>{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 · NATIVE TRUST BLOCK */}
      <section className="py-14" style={{ backgroundColor: NAVY }}>
        <div className="container mx-auto px-4">
          <img
            src="/groundtruth/groundtruth-logo-white.png"
            alt="GroundTruth"
            className="h-20 w-auto mb-8 -ml-1"
            width={560}
            height={334}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 max-w-2xl">
            Built to pass your security review — not work around it.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((p, i) => (
              <div key={i}>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(21,154,160,0.22)' }}
                >
                  <ShieldCheck size={24} style={{ color: '#5EEAD4' }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · BUILT BY CONSULTANTS */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ShieldCheck size={40} style={{ color: TEAL }} className="mx-auto mb-5" />
          <h2 className="heading-md mb-4">Built by the team that implements Agentforce</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            GroundTruth came out of a pattern Meet The Mind kept hitting on real Agentforce
            projects: the agent was fine, the data wasn't. The people who built it are the
            people who support it.
          </p>
          <Link to="/about-us" className="text-brand font-semibold hover:underline">
            Meet the team behind GroundTruth →
          </Link>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="py-14" style={{ backgroundColor: MIST }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">GroundTruth FAQs</h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2 flex items-start">
                  <CheckCircle style={{ color: TEAL }} className="mr-2 mt-1 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · CTA BAND */}
      <section className="py-14" style={{ backgroundColor: NAVY }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 max-w-2xl mx-auto">
            See how ready your data is — before your agents go live.
          </h2>
          <p className="text-gray-300 text-lg mb-4 max-w-xl mx-auto">
            A free readiness assessment on your own org, run with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="btn-primary text-base px-8 py-3" onClick={() => setFormOpen(true)}>
              Get a free readiness assessment <ArrowRight size={18} className="ml-2" />
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

export default GroundTruth;
