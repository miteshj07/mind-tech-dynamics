
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/layout/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCms } from '@/cms/context/CmsContext';
import { useContactForm } from '@/hooks/use-contact-form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

const ContactUs = () => {
  const { data, isLoading } = useCms();
  const { contactSection, seoMetadata } = data;
  
  const {
    formState,
    handleChange,
    submitForm,
    resetForm,
    submitted,
    isLoading: formLoading,
    webhookUrl,
    setWebhookUrl
  } = useContactForm();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{seoMetadata.contactUs.title}</title>
        <meta name="description" content={seoMetadata.contactUs.description} />
      </Helmet>
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
                    <p className="text-gray-600">{contactSection.contactInfo.email.value}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <Phone className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contactSection.contactInfo.phone.title}</h3>
                    <p className="text-gray-600">{contactSection.contactInfo.phone.value}</p>
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
              
              {/* Admin section for Zapier webhook setup */}
              <div className="mt-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs">Admin: Setup Webhook</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Setup Zapier Webhook</h4>
                      <p className="text-xs text-gray-500">
                        Enter your Zapier webhook URL to receive form submissions via email.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="webhook" className="text-xs">Zapier Webhook URL</Label>
                        <Input 
                          id="webhook"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://hooks.zapier.com/hooks/catch/..."
                          className="text-xs"
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        <p>Create a "Catch Hook" trigger in Zapier and paste the URL here.</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {submitted ? (
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
                    onClick={resetForm}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">{contactSection.form.title}</h2>
                  <form onSubmit={submitForm}>
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
                      disabled={formLoading}
                    >
                      {formLoading ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">{contactSection.consultation.title}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {contactSection.consultation.description}
            </p>
            <button className="btn-secondary">
              Book a Time Slot
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
