import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface EarlyAccessFormProps {
  open: boolean;
  onClose: () => void;
}

const ORG_TYPES = [
  'B2B SaaS',
  'Financial Services',
  'Manufacturing',
  'Healthcare',
  'Professional Services',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const EarlyAccessForm = ({ open, onClose }: EarlyAccessFormProps) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', orgType: '' });
  const [status, setStatus] = useState<Status>('idle');

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return;

    setStatus('loading');

    // Reuse the existing inquiries pipeline so Mitesh gets the same email notification.
    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || 'Not provided',
      email: form.email.trim(),
      phone: null,
      service: 'DealPulse Early Access',
      message: `DealPulse early-access request. Org type: ${form.orgType || 'Not specified'}.`,
    };

    const { error: dbError } = await supabase.from('inquiries').insert([payload]);

    if (dbError) {
      setStatus('error');
      return;
    }

    // Fire the notification email (non-blocking — success even if this fails).
    supabase.functions.invoke('send-contact-email', { body: payload }).catch(() => {});

    setStatus('success');
  };

  const close = () => {
    setStatus('idle');
    setForm({ name: '', email: '', company: '', orgType: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-5">
              <CheckCircle className="text-brand" size={30} />
            </div>
            <h3 className="text-2xl font-bold mb-3">You're on the list!</h3>
            <p className="text-gray-600 mb-6">
              Thanks — we'll email you a private install link and a short setup guide
              shortly. DealPulse installs in a sandbox in about 15 minutes.
            </p>
            <button className="btn-primary" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Get early access</h3>
              <p className="text-gray-600 text-sm">
                Free while the AppExchange listing completes. We'll send a private
                install link you can drop into a sandbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ea-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <Input id="ea-name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="ea-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work email *
                </label>
                <Input
                  id="ea-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="ea-company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Input id="ea-company" name="company" value={form.company} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="ea-orgType" className="block text-sm font-medium text-gray-700 mb-1">
                  Org type
                </label>
                <select
                  id="ea-orgType"
                  name="orgType"
                  value={form.orgType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                >
                  <option value="">Select one</option>
                  {ORG_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500">
                  Something went wrong. Please try again or email mitesh@meethemind.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Request access'}
                {status !== 'loading' && <Send size={16} className="ml-2" />}
              </button>

              <p className="text-xs text-gray-400 text-center">
                No spam. We'll only use your email to send the install link and setup help.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EarlyAccessForm;
