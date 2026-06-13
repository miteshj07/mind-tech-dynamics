
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSignupProps {
  title: string;
  description: string;
}

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

const NewsletterSignup = ({ title, description }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

    setStatus('loading');
    const { error } = await (supabase as any)
      .from('newsletter_subscribers')
      .insert([{ email: trimmed }]);

    if (!error) {
      setEmail('');
      setStatus('success');
    } else if (error.code === '23505') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-8 mt-16">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {status === 'success' ? (
          <p className="text-green-600 font-medium py-3">
            You're subscribed! We'll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              className="flex-grow"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'duplicate' && (
          <p className="text-sm text-gray-500 mt-2">You're already on the list!</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
