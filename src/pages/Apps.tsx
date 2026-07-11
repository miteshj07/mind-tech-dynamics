import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Layers, ShieldCheck, LifeBuoy } from 'lucide-react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';

const FOREST = '#247854';
const gradientStrip = 'linear-gradient(90deg, #B31120 0%, #247854 100%)';

const whyColumns = [
  {
    icon: Layers,
    title: 'Born from real engagements',
    desc: 'Every app starts as a pattern we saw solving the same problem across multiple RevOps engagements — not a feature invented in a vacuum.',
  },
  {
    icon: ShieldCheck,
    title: 'Native-first, security-reviewed',
    desc: 'Built to run entirely inside your Salesforce org — no data leaving, honoring your sharing model and field-level security.',
  },
  {
    icon: LifeBuoy,
    title: 'Supported by the people who built them',
    desc: 'The team that designed and shipped the app is the team that answers when you need help. No handoff to a support queue.',
  },
];

const Apps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title="Salesforce Apps | DealPulse & Native Apps by Meet The Mind"
        description="Product-grade Salesforce apps built, run, and supported by Meet The Mind — starting with DealPulse, native deal-risk intelligence for revenue teams."
        canonical="/apps"
      />

      <PageHeader
        title="Salesforce Apps by Meet The Mind"
        subtitle="Product-grade apps we build, run, and support on the Salesforce platform — born from the same patterns we deploy for consulting clients."
      />

      {/* Tile grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* DealPulse tile */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
              <div className="h-1" style={{ background: gradientStrip }} />
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-5">
                  <img src="/dealpulse/dealpulse-icon.png" alt="DealPulse" className="w-12 h-12 rounded-lg" />
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                    Early access
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">DealPulse</h3>
                <p className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: FOREST }}>
                  Deal Risk Intelligence · 100% Native
                </p>
                <p className="text-gray-600 mb-6 flex-grow">
                  Know which deals are at risk before your pipeline review — and exactly
                  why. DealPulse scores every open Opportunity, shows the signals that are
                  firing, and tells the rep what to do next.
                </p>
                <Link
                  to="/dealpulse"
                  className="inline-flex items-center font-semibold text-brand hover:underline"
                >
                  Explore DealPulse <ArrowRight size={16} className="ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Ghost tile */}
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 flex flex-col justify-center items-center text-center">
              <Boxes size={36} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">More apps in the works</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Built the same way: native, security-reviewed, and nothing leaving your org.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why we build apps */}
      <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container mx-auto px-4">
          <h2 className="heading-md mb-14 text-center">Why we build apps</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyColumns.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex w-14 h-14 rounded-xl items-center justify-center mb-5 bg-white shadow-sm">
                    <Icon size={26} style={{ color: FOREST }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Want an app like this for your own org?"
        subheading="We turn the patterns behind our products into custom Salesforce solutions for revenue teams."
        buttonText="Book a Free Consultation"
      />
    </>
  );
};

export default Apps;
