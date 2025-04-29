import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png" 
                alt="Meet The Mind Technologies Logo" 
                className="h-20 mb-4"
              />
            </div>
            <p className="text-gray-300 mb-6">Empowering businesses with smart Salesforce solutions that drive growth and innovation.</p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-brand">
                <Linkedin size={20} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-brand">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-brand">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-brand transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Services</Link></li>
              <li><Link to="/about-us" className="text-gray-300 hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="text-gray-300 hover:text-brand transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-brand transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-brand transition-colors">Careers</Link></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-brand transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Salesforce Implementation</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Customization</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Integration</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Migration</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Support & Maintenance</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-brand transition-colors">Training</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-brand" />
                <p className="text-gray-300">1234 Tech Boulevard, Suite 500<br />San Francisco, CA 94107</p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 text-brand" />
                <p className="text-gray-300">(415) 555-1234</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2 text-brand" />
                <p className="text-gray-300">info@meetthemind.tech</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Meet The Mind Technologies. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-brand transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-brand transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-brand transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
