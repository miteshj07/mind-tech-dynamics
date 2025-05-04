
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
    setSubmitted(false);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Insert data into Supabase inquiries table
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formState.name,
          company: formState.company,
          email: formState.email,
          phone: formState.phone || null,
          service: formState.service,
          message: formState.message
        });

      if (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Form submission failed",
          description: "There was an error submitting your message. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // If a Zapier webhook URL is provided, trigger it
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors", // Handle CORS
            body: JSON.stringify({
              name: formState.name,
              email: formState.email,
              company: formState.company,
              phone: formState.phone || "Not provided",
              service: formState.service,
              message: formState.message,
              timestamp: new Date().toISOString()
            }),
          });
          console.log("Webhook triggered successfully");
        } catch (webhookError) {
          console.error("Error triggering webhook:", webhookError);
          // Continue with form submission even if webhook fails
        }
      }

      // Show success state
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you! Our team will get back to you shortly.",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      toast({
        title: "Form submission failed",
        description: "There was an error submitting your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    handleChange,
    submitForm,
    resetForm,
    submitted,
    setSubmitted,
    isLoading,
    webhookUrl,
    setWebhookUrl
  };
}
