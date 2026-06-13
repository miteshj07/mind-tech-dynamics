import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const SERVICE_LINKS = [
  { name: 'Agentforce Implementation', path: '/agentforce-implementation' },
  { name: 'B2B Lead-Gen Automation',   path: '/b2b-lead-generation' },
  { name: 'Apollo.io Integration',     path: '/apollo-io-salesforce-integration' },
  { name: 'Salesforce RevOps',         path: '/salesforce-revops' },
  { name: 'Data Cloud',                path: '/salesforce-data-cloud' },
  { name: 'All Services',              path: '/services' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Agentforce', path: '/agentforce' },
    { name: 'Lead Generation', path: '/b2b-lead-generation' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Trailblazer Playbook', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png"
            alt="Meet The Mind Technologies Logo"
            className="h-20 md:h-24"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-brand transition-colors">
            Home
          </Link>

          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(v => !v)}
              className="flex items-center gap-1 font-medium text-gray-700 hover:text-brand transition-colors"
            >
              Services <ChevronDown size={15} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                {SERVICE_LINKS.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setServicesOpen(false)}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors ${item.name === 'All Services' ? 'border-t border-gray-100 mt-1 pt-3 font-medium' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {menuItems.filter(i => i.name !== 'Home').map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="font-medium text-gray-700 hover:text-brand transition-colors"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/salesforce-health-check"
            className="font-semibold text-brand border border-brand/40 px-4 py-2 rounded-full hover:bg-brand/5 transition-colors text-sm whitespace-nowrap"
          >
            Free SF Audit
          </Link>
          <Button className="btn-primary">
            <Link to="/contact-us">Book a Free Consultation</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium text-gray-700 hover:text-brand transition-colors py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            {/* Mobile Services accordion */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setMobileServicesOpen(v => !v)}
                className="w-full flex items-center justify-between font-medium text-gray-700 hover:text-brand transition-colors py-2"
              >
                Services <ChevronDown size={15} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pb-2 flex flex-col gap-2">
                  {SERVICE_LINKS.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                      className="text-sm text-gray-600 hover:text-brand transition-colors py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.filter(i => i.name !== 'Home').map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="font-medium text-gray-700 hover:text-brand transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/salesforce-health-check"
              className="font-semibold text-brand py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Free Salesforce Audit
            </Link>
            <Button className="btn-primary mt-4">
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                Book a Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
