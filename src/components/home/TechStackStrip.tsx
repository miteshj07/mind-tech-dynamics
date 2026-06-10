
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import {
  SiSalesforce,
  SiZapier,
  SiSlack,
  SiMailchimp,
  SiIntuit,
} from 'react-icons/si';

interface Partner {
  name: string;
  hoverColor: string;
  render: (hovered: boolean) => React.ReactNode;
}

const iconStyle = (hovered: boolean, color: string) => ({
  color: hovered ? color : '#9CA3AF',
  transition: 'color 0.3s ease',
  fontSize: '2rem',
});

const PARTNERS: Partner[] = [
  {
    name: 'Salesforce',
    hoverColor: '#00A1E0',
    render: (h) => <SiSalesforce style={iconStyle(h, '#00A1E0')} />,
  },
  {
    name: 'Agentforce',
    hoverColor: '#00A1E0',
    render: (h) => (
      <span
        className="text-sm font-black tracking-tight leading-none"
        style={{ color: h ? '#00A1E0' : '#9CA3AF', transition: 'color 0.3s ease' }}
      >
        Agent<br />force
      </span>
    ),
  },
  {
    name: 'Apollo.io',
    hoverColor: '#2563EB',
    render: (h) => (
      <span
        className="text-sm font-black tracking-tight"
        style={{ color: h ? '#2563EB' : '#9CA3AF', transition: 'color 0.3s ease' }}
      >
        Apollo.io
      </span>
    ),
  },
  {
    name: 'LinkedIn Sales Nav',
    hoverColor: '#0A66C2',
    render: (h) => (
      <Linkedin
        size={32}
        style={{ color: h ? '#0A66C2' : '#9CA3AF', transition: 'color 0.3s ease' }}
      />
    ),
  },
  {
    name: 'Zapier',
    hoverColor: '#FF4A00',
    render: (h) => <SiZapier style={iconStyle(h, '#FF4A00')} />,
  },
  {
    name: 'Slack',
    hoverColor: '#4A154B',
    render: (h) => <SiSlack style={iconStyle(h, '#4A154B')} />,
  },
  {
    name: 'Tableau',
    hoverColor: '#E8762D',
    render: (h) => (
      <span
        className="text-sm font-black tracking-tight"
        style={{ color: h ? '#E8762D' : '#9CA3AF', transition: 'color 0.3s ease' }}
      >
        Tableau
      </span>
    ),
  },
  {
    name: 'QuickBooks',
    hoverColor: '#2CA01C',
    render: (h) => <SiIntuit style={iconStyle(h, '#2CA01C')} />,
  },
  {
    name: 'Mailchimp',
    hoverColor: '#FFE01B',
    render: (h) => <SiMailchimp style={iconStyle(h, '#c79a00')} />,
  },
];

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-2 min-w-[72px] cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-9 flex items-center justify-center">
        {partner.render(hovered)}
      </div>
      <span
        className="text-xs font-medium text-center leading-tight transition-colors duration-300"
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
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackStrip;
