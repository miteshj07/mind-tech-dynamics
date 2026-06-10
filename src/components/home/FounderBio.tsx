
import React from 'react';
import { Linkedin, Award, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const CERTIFICATIONS = [
  'Salesforce Administrator',
  'Platform Developer I',
  'Platform App Builder',
  'Sales Cloud Consultant',
  'Einstein Analytics',
];

const FounderBio = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Award className="h-5 w-5 text-brand" />
          <span className="text-brand font-semibold tracking-wide uppercase text-sm">
            Founder-Led Delivery
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar + name card */}
          <motion.div
            className="flex flex-col items-center lg:items-start gap-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-brand to-brand/60 flex items-center justify-center shadow-xl">
                <span className="text-white text-5xl font-bold tracking-tight select-none">MJ</span>
              </div>
              {/* Verified badge */}
              <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-md">
                <BadgeCheck className="h-7 w-7 text-[#00A1E0]" />
              </div>
            </div>

            {/* Name + title */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Mitesh Jain</h2>
              <p className="text-brand font-semibold mt-1">Founder & CEO, Meet The Mind Technologies</p>
              <p className="text-gray-500 text-sm mt-1">10+ Years Salesforce Experience</p>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/miteshj07/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0A66C2]/30 bg-[#0A66C2]/5 text-[#0A66C2] text-sm font-semibold hover:bg-[#0A66C2]/10 transition-colors"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </a>
          </motion.div>

          {/* Bio text + certs */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Mitesh Jain is the founder of Meet The Mind Technologies and leads every client
              engagement directly — no junior handoffs, no account managers as middlemen.
              Over 10 years, he has designed and deployed Salesforce Agentforce AI agents,
              Apollo.io-to-Salesforce lead automation workflows, and Sales Cloud implementations
              for B2B revenue teams across the US, UK, UAE, and Australia.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Meet The Mind Technologies implements Salesforce + Agentforce + Apollo.io
              automation to help B2B SaaS, FinTech, and Professional Services companies
              turn their CRM into a pipeline engine — measurable ROI, no black-box delivery.
            </p>

            {/* Certifications */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Salesforce Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <a
                    key={cert}
                    href="https://www.salesforce.com/trailblazer/mjain31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/8 border border-brand/20 text-brand text-xs font-semibold hover:bg-brand/15 transition-colors"
                  >
                    <BadgeCheck size={12} />
                    {cert}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderBio;
