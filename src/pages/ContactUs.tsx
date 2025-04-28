
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    submitted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ ...prev, submitted: true }));
      toast({
        title: "Message sent!",
        description: "Thank you! Our team will get back to you shortly.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <>
      <PageHeader 
        title="Contact Us" 
        subtitle="Have questions or ready to start your Salesforce journey? Reach out to our team today."
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-md mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you're looking to implement Salesforce, optimize your current setup, or just have questions about our services, our team is here to help.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <Mail className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">info@meetthemind.tech</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <Phone className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">(415) 555-1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand/10 rounded-full p-3 mr-4">
                    <MapPin className="text-brand" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      1234 Tech Boulevard, Suite 500<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden h-72">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95133083794!2d-122.43913249016922!3d37.77054771385948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858082235da2e7%3A0xb67dd9edf81992a4!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1683044897106!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {formState.submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your message has been received. Our team will get back to you shortly.
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => setFormState(prev => ({ ...prev, submitted: false, name: '', company: '', email: '', phone: '', service: '', message: '' }))}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
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
                        <option value="Implementation">Salesforce Implementation</option>
                        <option value="Customization">Customization</option>
                        <option value="Integration">Integration</option>
                        <option value="Migration">Migration</option>
                        <option value="Support">Support & Maintenance</option>
                        <option value="Training">Training</option>
                        <option value="Other">Other</option>
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
                    
                    <button type="submit" className="btn-primary w-full flex items-center justify-center">
                      Send Message <Send size={18} className="ml-2" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Schedule a Consultation</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Prefer to talk directly? Schedule a free 30-minute consultation with one of our Salesforce experts.
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
