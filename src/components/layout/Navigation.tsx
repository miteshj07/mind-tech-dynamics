import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
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
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="font-medium text-gray-700 hover:text-brand transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button className="btn-primary">
            <Link to="/contact-us" className="group">
            Book a Free Consultation
            </Link>
          </Button>
          {/* Book a Free Consultation */}
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
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="font-medium text-gray-700 hover:text-brand transition-colors py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="btn-primary mt-4">
              {/* Book a Free Consultation */}
              <Link to="/contact-us" className="group" onClick={() => setIsOpen(false)>
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
