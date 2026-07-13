
import React, { useState, useEffect } from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCms } from '@/cms/context/CmsContext';
import { useContactForm } from '@/hooks/useContactForm';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_URL = 'https://calendly.com/mitesh-meethemind/30min';

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Meet The Mind Technologies',
  url: 'https://www.meethemind.com',
  telephone: '+91-7358576420',
  email: 'mitesh@meethemind.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'S4, Solitaire Tower, Choolai',
    addressLocality: 'Chennai',
    postalCode: '600010',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-7358576420',
      contactType: 'sales',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      email: 'mitesh@meethemind.com',
      contactType: 'customer support',
    },
  ],
};

const ContactUs = () => {
  const { data } = useCms();
  const { contactSection, seoMetadata } = data;

  const { handleSubmit, isSubmitting, formSuccess, setFormSuccess } = useContactForm();

  useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  // Record a conversion when a visitor books a call through the Calendly widget.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') {
        trackEvent('book_consultation', { method: 'calendly' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // "Send a message" (form) vs "Book a call" (Calendly) — one ask at a time.
  const [activeTab, setActiveTab] = useState<'call' | 'message'>('message');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formState);
  };

  return (
    <>
      <Seo title={seoMetadata.contactUs.title} description={seoMetadata.contactUs.description} canonical="/contact-us" jsonLd={contactSchema} />
      <PageHeader 
        title={contactSection.title}
        subtitle={contactSection.subtitle}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-md mb-6">{contactSection.intro.title}</h2>
              <p className="text-gray-600 mb-8">
                {contactSection.intro.description}
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <Mail className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contactSection.contactInfo.email.title}</h3>
                    <a
                      href={`mailto:${contactSection.contactInfo.email.value}`}
                      onClick={() => trackEvent('contact_click', { method: 'email' })}
                      className="text-gray-600 hover:text-brand transition-colors break-all"
                    >
                      {contactSection.contactInfo.email.value}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <Phone className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contactSection.contactInfo.phone.title}</h3>
                    <a
                      href={`tel:${contactSection.contactInfo.phone.value.replace(/[^+\d]/g, '')}`}
                      onClick={() => trackEvent('contact_click', { method: 'phone' })}
                      className="text-gray-600 hover:text-brand transition-colors"
                    >
                      {contactSection.contactInfo.phone.value}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <MapPin className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contactSection.contactInfo.address.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {contactSection.contactInfo.address.value}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden h-72">
                <iframe
                  title="Office Location"
                  src={contactSection.contactInfo.address.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Book a call OR send a message — one ask at a time */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div role="tablist" aria-label="Get in touch" className="grid grid-cols-2 gap-1 p-1 mb-8 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'message'}
                  onClick={() => setActiveTab('message')}
                  className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'message' ? 'bg-white text-brand shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Send a message
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'call'}
                  onClick={() => setActiveTab('call')}
                  className={`py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'call' ? 'bg-white text-brand shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Book a call
                </button>
              </div>

              {/* Book a call */}
              <div className={activeTab === 'call' ? 'block' : 'hidden'}>
                <p className="text-gray-600 mb-6">{contactSection.consultation.description}</p>
                <div
                  className="calendly-inline-widget rounded-xl overflow-hidden"
                  data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
                  style={{ minWidth: '280px', height: '630px' }}
                />
              </div>

              {/* Send a message */}
              <div className={activeTab === 'message' ? 'block' : 'hidden'}>
              {formSuccess ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{contactSection.form.successTitle}</h2>
                  <p className="text-gray-600 mb-6">
                    {contactSection.form.successMessage}
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setFormSuccess(false);
                      setFormState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">{contactSection.form.title}</h2>
                  <form onSubmit={onSubmitForm}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name *
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Interested Service *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {contactSection.form.services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={18} className="ml-2" />}
                    </button>
                  </form>
                </>
              )}
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default ContactUs;
