
import React from 'react';
import { motion } from 'framer-motion';
import { Search, ClipboardList, Rocket, LifeBuoy } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery Call',
    description:
      'We start with a focused 45-minute conversation to understand your revenue goals, current Salesforce setup, and the biggest friction points in your pipeline. No generic questionnaires — just direct questions from Mitesh, who will personally lead your engagement.',
    deliverable: 'Scope summary + recommended approach',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Audit & Assessment',
    description:
      'We conduct a structured Salesforce health check — reviewing your data model, automation flows, lead routing logic, and Apollo.io integration points. We identify exactly what needs to be built, fixed, or optimised before writing a single line of code.',
    deliverable: 'Prioritised action plan with effort estimates',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Implementation',
    description:
      'Mitesh leads hands-on delivery: configuring Salesforce, deploying Agentforce AI agents, wiring Apollo.io-to-Salesforce lead workflows, and building Flow automations. Weekly check-ins keep you informed. You see working software in days, not months.',
    deliverable: 'Fully deployed, tested solution in your org',
  },
  {
    number: '04',
    icon: LifeBuoy,
    title: 'Support & Optimisation',
    description:
      'Post-launch, we monitor performance, fine-tune automation rules, and ensure your team can use what we built. Ongoing retainer options available for continuous RevOps improvements as your pipeline scales.',
    deliverable: 'Ongoing performance monitoring & iteration',
  },
];

const HowWeWork = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand font-semibold uppercase tracking-widest text-sm mb-3">
            Our Methodology
          </p>
          <h2 className="text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-gray-400 text-lg">
            Every engagement follows the same four-phase process — designed for
            B2B revenue teams that need measurable results, not months of
            discovery theatre.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-brand/50 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step number — large background watermark */}
                <span className="absolute top-6 right-6 text-7xl font-black text-white/5 select-none group-hover:text-brand/10 transition-colors duration-300">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5 group-hover:bg-brand/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-brand" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">
                  <span className="text-brand mr-2">{step.number}.</span>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Deliverable chip */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block" />
                  {step.deliverable}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA note */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Typical implementation timelines: 2–4 weeks for focused automation projects · 6–12 weeks for full Salesforce implementations
        </motion.p>
      </div>
    </section>
  );
};

export default HowWeWork;
