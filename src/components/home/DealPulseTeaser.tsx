import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const INK = '#10241C';
const CRIMSON = '#B31120';

const DealPulseTeaser = () => {
  return (
    <section className="py-16" style={{ backgroundColor: INK }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: CRIMSON }}
            >
              New · Salesforce App
            </p>
            <div className="bg-white rounded-lg inline-flex px-3 py-1.5 mb-6">
              <img
                src="/dealpulse/dealpulse-logo.png"
                srcSet="/dealpulse/dealpulse-logo.png 1x, /dealpulse/dealpulse-logo-2x.png 2x"
                alt="DealPulse"
                className="h-6 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Know which deals are at risk — before your pipeline review.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              DealPulse is our 100% native Salesforce app that scores every open
              Opportunity, shows exactly why it’s at risk, and tells the rep what to do
              next. Built by the team behind Meet The Mind.
            </p>
            <Link
              to="/dealpulse"
              className="inline-flex items-center font-semibold text-white bg-brand hover:bg-brand-dark px-6 py-3 rounded-md transition-colors"
            >
              Explore DealPulse <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <img
              src="/dealpulse/pipeline-dashboard.png"
              alt="DealPulse pipeline health dashboard showing dollars at risk by tier"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealPulseTeaser;
