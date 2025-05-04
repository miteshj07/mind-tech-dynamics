
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // 1. Insert data into Supabase inquiries table
      const { error: dbError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (dbError) {
        console.error('Error saving to database:', dbError);
        toast({
          title: "Error",
          description: "Failed to submit your message. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // 2. Call the Edge Function to send email
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (emailError) {
        console.error('Error sending email notification:', emailError);
        // If DB save was successful but email failed, still show success to the user
        // but log the error for monitoring
      }

      // Show success message
      toast({
        title: "Message sent!",
        description: "Thank you! Our team will get back to you shortly.",
      });
      
      setFormSuccess(true);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    formSuccess,
    setFormSuccess
  };
};
