import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

type Card = { icon: React.ReactNode; title: string; description: string };

export interface IntegrationPageProps {
  path: string;
  seoTitle: string;
  seoDescription: string;
  /** Service schema name, also the page H1. */
  name: string;
  schemaDescription: string;
  subtitle: string;
  intro: string[];
  problems: string[];
  gridHeading: string;
  grids: { heading?: string; items: Card[] }[];
  caseStudy: { heading: string; text: string; results: string[]; path: string };
  steps: [string, string][];
  faqs: { q: string; a: string }[];
  links: { label: string; path: string }[];
  cta: { heading: string; subheading: string; buttonText: string };
}

// Shared layout for the integration service pages (QuickBooks, Recurly, Chargent).
const IntegrationPage = (p: IntegrationPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    serviceType: p.name,
    provider: { '@type': 'Organization', name: 'Meet The Mind Technologies', url: 'https://www.meethemind.com/' },
    areaServed: ['United States', 'United Kingdom', 'Australia'],
    description: p.schemaDescription,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Seo title={p.seoTitle} description={p.seoDescription} canonical={p.path} jsonLd={[serviceSchema, faqSchema]} />
      <PageHeader title={p.name} subtitle={p.subtitle} />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {p.intro.map((para, i) => (
            <p key={i} className={`text-lg text-gray-700 leading-relaxed ${i === p.intro.length - 1 ? 'mb-8' : 'mb-5'}`}>{para}</p>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 font-semibold mb-2">What this fixes:</p>
            <ul className="space-y-2">
              {p.problems.map((x) => (
                <li key={x} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="mt-1 text-amber-500 flex-shrink-0">✕</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <h2 className="heading-md text-center">{p.gridHeading}</h2>
          {p.grids.map((g, gi) => (
            <div key={gi}>
              {g.heading && <h3 className="text-xl font-semibold mb-6 text-center">{g.heading}</h3>}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {g.items.map((c) => (
                  <div key={c.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="text-brand mb-3">{c.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{c.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-xl border border-brand/30 bg-brand/5 p-8">
            <p className="text-brand font-semibold uppercase tracking-widest text-sm mb-2">Delivered</p>
            <h2 className="text-2xl font-bold mb-3">{p.caseStudy.heading}</h2>
            <p className="text-gray-700 mb-4">{p.caseStudy.text}</p>
            <ul className="space-y-2 mb-6">
              {p.caseStudy.results.map((r) => (
                <li key={r} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} /> {r}
                </li>
              ))}
            </ul>
            <Link to={p.caseStudy.path} className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Read the full case study <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-12 text-center">How we build it</h2>
          <ol className="space-y-6">
            {p.steps.map(([title, desc], i) => (
              <li key={title} className="flex items-start">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-semibold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">{p.name} FAQs</h2>
          <div className="space-y-5">
            {p.faqs.map((f) => (
              <div key={f.q} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            {p.links.map((l) => (
              <Link key={l.path} to={l.path} className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
                {l.label} <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA heading={p.cta.heading} subheading={p.cta.subheading} buttonText={p.cta.buttonText} />
    </>
  );
};

export default IntegrationPage;
