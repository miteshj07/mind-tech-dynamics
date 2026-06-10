import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const markets = [
  {
    flag: '🇺🇸',
    region: 'United States',
    cities: 'New York · San Francisco · Chicago · Austin',
    detail: 'Helping US-based B2B teams close pipeline faster with Agentforce and Apollo.io automation.',
  },
  {
    flag: '🇬🇧',
    region: 'United Kingdom',
    cities: 'London · Manchester · Birmingham',
    detail: 'Modernising CRM and lead-gen workflows for UK enterprises adopting Salesforce AI.',
  },
  {
    flag: '🇦🇪',
    region: 'United Arab Emirates',
    cities: 'Dubai · Abu Dhabi',
    detail: 'Supporting UAE businesses to build scalable Salesforce ecosystems aligned with Vision 2031.',
  },
  {
    flag: '🇦🇺',
    region: 'Australia',
    cities: 'Sydney · Melbourne · Brisbane',
    detail: 'Partnering with Australian SMEs and enterprises to maximise their Salesforce ROI.',
  },
];

const MarketsWeServe = () => {
  return (
    <section className="py-20 bg-gray-50" aria-label="Markets We Serve">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-brand font-semibold text-sm uppercase tracking-widest mb-3">
            <MapPin size={16} />
            Global Reach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Markets We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver Salesforce consulting and Agentforce implementation across four English-speaking markets — remote-first, timezone-flexible, and enterprise-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market) => (
            <div
              key={market.region}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand/30 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{market.flag}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{market.region}</h3>
              <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                <MapPin size={11} />
                {market.cities}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{market.detail}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm mb-4">Not in one of these regions? We work globally.</p>
          <Link to="/contact-us" className="btn-primary inline-block">
            Talk to Us About Your Region
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketsWeServe;
