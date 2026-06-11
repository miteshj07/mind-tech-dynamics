
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Award } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

const Footer = () => {
  const { data } = useCms();
  const { footerSection } = data;
  

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="mb-4">
              <img 
                src={footerSection.companyInfo.logo} 
                alt="Meet The Mind Technologies Logo" 
                className="h-20 mb-4"
              />
            </div>
            <p className="text-gray-300 mb-6">{footerSection.companyInfo.description}</p>
            <div className="flex space-x-4">
              <a href={footerSection.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-brand">
                <Linkedin size={20} />
              </a>
              <a href={footerSection.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-brand">
                <Twitter size={20} />
              </a>
              <a href={footerSection.socialLinks.trailhead} target="_blank" rel="noopener noreferrer" aria-label="Salesforce Trailblazer Profile" className="hover:text-brand" title="Salesforce Trailblazer">
                <Award size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerSection.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url} className="text-gray-300 hover:text-brand transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerSection.services.map((service, index) => (
                <li key={index}>
                  <Link to={service.url} className="text-gray-300 hover:text-brand transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-brand" />
                <p className="text-gray-300">{footerSection.contactInfo.address}</p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 text-brand" />
                <p className="text-gray-300">{footerSection.contactInfo.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2 text-brand" />
                <p className="text-gray-300">{footerSection.contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">{footerSection.copyright}</p>
          <div className="flex space-x-6">
            {footerSection.legalLinks.map((link, index) => (
              <Link key={index} to={link.url} className="text-gray-400 text-sm hover:text-brand transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
