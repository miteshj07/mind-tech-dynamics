import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Quote } from 'lucide-react';
import Seo from '@/components/layout/Seo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/hooks/useContactForm';
import { CALENDLY_URL, useCalendly } from '@/hooks/useCalendly';

// Paid-traffic landing page: one offer (Salesforce integrations), one action
// (book a call or send a note). No site menu or footer, see BARE_ROUTES in App.tsx.

const BookButton = ({ label = 'Book a free 30-minute call' }: { label?: string }) => (
  <a href="#book" data-cta className="btn-primary gap-2 text-base">
    {label} <ArrowRight size={18} />
  </a>
);

const problems = [
  'Someone re-types invoices, payments or customers from Salesforce into your accounting system.',
  'Sales and support cannot see who has paid, who is overdue or what was refunded without asking finance.',
  'A sync or connector you already have keeps failing, and nobody knows until the numbers do not match.',
];

const builds = [
  {
    title: 'Accounting and billing',
    body: 'QuickBooks Online, Chargent, Recurly, Authorize.net. Invoices, payments, refunds and subscriptions move both ways on their own.',
  },
  {
    title: 'Microsoft 365 and sign-in',
    body: 'Microsoft 365 accounts created from a Salesforce record in one click, and single sign-on with Okta.',
  },
  {
    title: 'Any system with an API',
    body: 'Learning platforms, storefronts, file storage and in-house tools, connected with REST or SOAP and built in Apex so you own the code.',
  },
];

const cases = [
  {
    client: 'Lakewood University',
    title: 'QuickBooks Online and Salesforce, two-way',
    before: 'Tuition, scholarships and refunds were re-keyed by hand between Salesforce and QuickBooks.',
    after: 'Enrollment creates the invoice automatically, and payments, refunds and balances show on each student record.',
  },
  {
    client: 'Stock News Network',
    title: 'Recurly subscriptions inside Salesforce',
    before: 'Billing ran on a separate platform, so payment status and invoices never reached sales or finance in Salesforce.',
    after: 'Subscriptions, upgrades, cancellations and invoices stay in step across both systems.',
  },
  {
    client: 'Adam Mesh Trading Group',
    title: 'Recurring billing with Chargent',
    before: 'Renewals were processed manually and failed card payments were never followed up.',
    after: 'Renewals run on their own across four subscription terms, and failed payments are retried automatically.',
  },
];

const steps = [
  { title: 'A 30-minute call', body: 'You show me the two systems and what should move between them. I tell you plainly whether I can build it.' },
  { title: 'A written scope', body: 'You get the plan, a fixed price and a delivery date before any work starts.' },
  { title: 'Build, test, go live', body: 'I build it in a sandbox, your team tests it with real scenarios, then it goes live. Most integrations take 7 to 10 days.' },
];

const certifications = [
  'Salesforce Administrator',
  'Platform Developer I',
  'Platform App Builder',
  'Sales Cloud Consultant',
  'Einstein Analytics',
];

const SalesforceIntegrationConsulting = () => {
  useCalendly();
  const { handleSubmit, isSubmitting, formSuccess } = useContactForm();
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });

  // Ad landing page: keep it out of search results so it does not compete with the main site.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ ...form, company: '', phone: '', service: 'Integration' });
  };

  return (
    <>
      <Seo
        title="Salesforce Integration Consultant | Meet The Mind"
        description="Connect Salesforce to QuickBooks, your billing system and the tools your team already uses. Fixed price, built by one senior Salesforce developer."
        canonical="/salesforce-integration-consulting"
      />

      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <img src="/brand/mtm-logo.png" alt="Meet The Mind Technologies" className="h-10 w-auto" />
          <a href="#book" data-cta className="text-sm font-semibold text-brand hover:text-brand-dark">
            Book a call
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand/10 to-white py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-brand font-semibold uppercase tracking-wide text-sm mb-4">
              Salesforce integration consultant
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-5">
              Connect Salesforce to QuickBooks, your billing system and the tools your team already uses
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              I build the integration so data moves on its own, with no re-typing and no spreadsheets in
              between. You work with me directly: one senior Salesforce developer, 10+ years on the platform.
            </p>
            <BookButton />
            <p className="text-sm text-gray-500 mt-4">Fixed price and date agreed before any work starts.</p>
          </div>
        </section>

        {/* Problems */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="heading-md mb-6 text-gray-900">Is this happening in your business?</h2>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="text-brand shrink-0 mt-0.5" size={22} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What I build */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="heading-md mb-8 text-gray-900">What I connect to Salesforce</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {builds.map((b) => (
                <div key={b.title} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="heading-md mb-8 text-gray-900">Integrations I have delivered for US clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cases.map((c) => (
                <div key={c.title} className="rounded-xl border border-gray-100 p-6 shadow-sm">
                  <p className="text-sm font-semibold text-brand mb-1">{c.client}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{c.title}</h3>
                  <p className="text-sm text-gray-500 mb-1 font-medium">Before</p>
                  <p className="text-gray-600 mb-3">{c.before}</p>
                  <p className="text-sm text-gray-500 mb-1 font-medium">After</p>
                  <p className="text-gray-800">{c.after}</p>
                </div>
              ))}
            </div>

            <figure className="mt-10 bg-gray-50 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
              <Quote className="text-brand mb-3" size={28} />
              <blockquote className="text-lg text-gray-800">
                "We work extensively with Mitesh to customize Salesforce to our unique needs. He is a true expert
                and will find a solution to any problem, no matter how complex."
              </blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">
                James C, VP of Marketing, Stock News Network LLC
              </figcaption>
            </figure>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="heading-md mb-8 text-gray-900">How it works</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white font-semibold mb-3">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who you work with */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="/lovable-uploads/mitesh-jain-founder.png"
              alt="Mitesh Jain, founder of Meet The Mind Technologies"
              className="w-28 h-28 rounded-2xl object-cover object-top border-2 border-brand/20 shrink-0"
            />
            <div>
              <h2 className="heading-md text-gray-900 mb-2">You work with me, not a team of juniors</h2>
              <p className="text-gray-600 mb-4">
                I am Mitesh Jain, founder of Meet The Mind. I have built on Salesforce for more than 10 years and
                I write and test every integration myself, so the person on your call is the person doing the work.
              </p>
              <ul className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <li key={c} className="text-sm bg-brand/10 text-gray-800 rounded-full px-3 py-1">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Book */}
        <section id="book" className="py-12 md:py-16 bg-gray-50 scroll-mt-4">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="heading-md text-gray-900 mb-2 text-center">Tell me what you want connected</h2>
            <p className="text-gray-600 text-center mb-8">
              Pick a time for a free 30-minute call, or send a short note and I will reply within one business day.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
                  style={{ minWidth: '280px', height: '630px' }}
                />
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                {formSuccess ? (
                  <div className="text-center py-10">
                    <CheckCircle className="text-brand mx-auto mb-4" size={40} />
                    <h3 className="text-xl font-semibold mb-2">Thank you, your note is with me</h3>
                    <p className="text-gray-600">I will reply by email within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Prefer to write?</h3>
                    {/* Honeypot: hidden from real users; bots that fill every field trip it. */}
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={onChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-px h-px overflow-hidden"
                    />
                    <div>
                      <label htmlFor="lp-name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <Input id="lp-name" name="name" value={form.name} onChange={onChange} required autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="lp-email" className="block text-sm font-medium text-gray-700 mb-1">Work email *</label>
                      <Input id="lp-email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="lp-message" className="block text-sm font-medium text-gray-700 mb-1">
                        What should Salesforce be connected to? *
                      </label>
                      <Textarea id="lp-message" name="message" rows={4} value={form.message} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send my note'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Meet The Mind Technologies ·{' '}
        <a href="mailto:mitesh@meethemind.com" className="underline hover:text-brand">mitesh@meethemind.com</a> ·{' '}
        <a href="/privacy-policy" className="underline hover:text-brand">Privacy Policy</a>
      </footer>
    </>
  );
};

export default SalesforceIntegrationConsulting;
