
import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  /** simple-icons CDN slug — undefined means use text fallback */
  iconSlug?: string;
  /** colour shown on hover */
  hoverColor: string;
}

const PARTNERS: Partner[] = [
  { name: 'Salesforce',              iconSlug: 'salesforce',        hoverColor: '#00A1E0' },
  { name: 'Agentforce',              iconSlug: undefined,           hoverColor: '#00A1E0' },
  { name: 'Apollo.io',               iconSlug: undefined,           hoverColor: '#2563EB' },
  { name: 'LinkedIn Sales Nav',      iconSlug: 'linkedin',          hoverColor: '#0A66C2' },
  { name: 'Zapier',                  iconSlug: 'zapier',            hoverColor: '#FF4A00' },
  { name: 'Slack',                   iconSlug: 'slack',             hoverColor: '#4A154B' },
  { name: 'Tableau',                 iconSlug: 'tableau',           hoverColor: '#E8762D' },
  { name: 'QuickBooks',              iconSlug: 'intuit',            hoverColor: '#2CA01C' },
  { name: 'Mailchimp',               iconSlug: 'mailchimp',         hoverColor: '#FFE01B' },
];

const PartnerLogo = ({ partner }: { partner: Partner }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {partner.iconSlug ? (
        <img
          src={`https://cdn.simpleicons.org/${partner.iconSlug}`}
          alt={partner.name}
          width={36}
          height={36}
          style={{
            filter: hovered ? 'none' : 'grayscale(100%) opacity(0.45)',
            transition: 'filter 0.3s ease',
          }}
        />
      ) : (
        /* Text fallback for brands without a simple-icon (Agentforce, Apollo.io) */
        <div
          className="h-9 flex items-center justify-center px-2 rounded font-bold text-sm tracking-tight transition-colors duration-300"
          style={{ color: hovered ? partner.hoverColor : '#9CA3AF' }}
        >
          {partner.name === 'Agentforce' ? (
            <span>
              <span style={{ color: hovered ? '#00A1E0' : '#9CA3AF' }}>Agent</span>
              <span style={{ color: hovered ? '#032D60' : '#9CA3AF' }}>force</span>
            </span>
          ) : (
            <span>{partner.name}</span>
          )}
        </div>
      )}
      <span
        className="text-xs font-medium transition-colors duration-300"
        style={{ color: hovered ? partner.hoverColor : '#9CA3AF' }}
      >
        {partner.name}
      </span>
    </div>
  );
};

const TechStackStrip = () => {
  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technology Stack &amp; Integration Partners
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center items-end gap-10 md:gap-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {PARTNERS.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackStrip;
