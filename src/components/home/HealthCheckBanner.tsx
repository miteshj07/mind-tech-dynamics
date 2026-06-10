
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthCheckBanner = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-brand to-brand/80">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-5 text-white">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Search size={28} className="text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-1">Free — No Obligation</p>
              <h2 className="text-2xl md:text-3xl font-black mb-2">Free Salesforce Health Check</h2>
              <p className="text-white/80 text-base leading-relaxed max-w-xl">
                We audit your Salesforce org across 6 areas — data quality, automation, security,
                integrations, reporting, and adoption — and deliver a written report with a
                prioritised fix list within 5 business days.
              </p>
            </div>
          </div>
          <Link
            to="/salesforce-health-check"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-brand font-bold rounded-xl hover:bg-gray-100 transition-colors text-base whitespace-nowrap shadow-lg"
          >
            Book Free Audit <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthCheckBanner;
