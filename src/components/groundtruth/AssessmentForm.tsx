import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentFormProps {
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

const AGENTFORCE_STATES = [
  'Already running Agentforce',
  'Piloting / evaluating Agentforce',
  'Planning to adopt',
  'Just want cleaner CRM data',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const AssessmentForm = ({ open, onClose }: AssessmentFormProps) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', orgType: '', agentforce: '' });
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

    // Same pipeline as every other form: row in `inquiries` + notification email.
    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || 'Not provided',
      email: form.email.trim(),
      phone: null,
      service: 'GroundTruth Readiness Assessment',
      message:
        `GroundTruth free readiness assessment request. ` +
        `Org type: ${form.orgType || 'Not specified'}. ` +
        `Agentforce status: ${form.agentforce || 'Not specified'}.`,
    };

    const { error: dbError } = await supabase.from('inquiries').insert([payload]);
    if (dbError) {
      setStatus('error');
      return;
    }

    supabase.functions.invoke('send-contact-email', { body: payload }).catch(() => {});
    setStatus('success');
  };

  const close = () => {
    setStatus('idle');
    setForm({ name: '', email: '', company: '', orgType: '', agentforce: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8 overflow-y-auto animate-fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl my-auto"
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
            <h3 className="text-2xl font-bold mb-3">Request received</h3>
            <p className="text-gray-600 mb-6">
              Thanks — we'll be in touch to schedule your readiness assessment and walk
              through your org's score with you.
            </p>
            <button className="btn-primary" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Get a free readiness assessment</h3>
              <p className="text-gray-600 text-sm">
                We'll run GroundTruth against your org and walk you through the score,
                the six dimensions, and what's blocking go-live.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="gt-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <Input id="gt-name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="gt-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work email *
                </label>
                <Input
                  id="gt-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="gt-company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Input id="gt-company" name="company" value={form.company} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="gt-orgType" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="gt-orgType"
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
              <div>
                <label htmlFor="gt-agentforce" className="block text-sm font-medium text-gray-700 mb-1">
                  Where are you with Agentforce?
                </label>
                <select
                  id="gt-agentforce"
                  name="agentforce"
                  value={form.agentforce}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                >
                  <option value="">Select one</option>
                  {AGENTFORCE_STATES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-500">
                  Something went wrong. Please try again or email support@meethemind.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Request my assessment'}
                {status !== 'loading' && <Send size={16} className="ml-2" />}
              </button>

              <p className="text-xs text-gray-400 text-center">
                No spam. We'll only use your email to arrange the assessment.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
