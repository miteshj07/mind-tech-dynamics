
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Escape user-supplied values before embedding them in the notification email,
// so a submission can't inject markup / phishing links / tracking pixels into
// the admin's inbox.
const esc = (s: unknown): string =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

const isValidEmail = (s: unknown): s is string =>
  typeof s === "string" && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, service, message } = await req.json();

    // Reject invalid submissions (also protects the attacker-controlled reply_to).
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "A valid email address is required." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received contact form submission for interest:", service || "general");

    // Recipient + sender are configurable via Supabase secrets so they can be
    // changed without a redeploy. Defaults: notify support@, send from the
    // Resend sandbox until the meethemind.com domain is verified in Resend.
    //   RESEND_TO   → e.g. "support@meethemind.com"
    //   RESEND_FROM → e.g. "DealPulse <notifications@meethemind.com>" (needs verified domain)
    const toAddress = Deno.env.get("RESEND_TO") || "support@meethemind.com";
    const fromAddress = Deno.env.get("RESEND_FROM") || "Meet The Mind <onboarding@resend.dev>";

    const isEarlyAccess = service === "DealPulse Early Access";
    const subject = isEarlyAccess
      ? "New DealPulse Early-Access Request"
      : "New Contact Form Submission – Meet The Mind";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      reply_to: email,
      subject,
      html: `
        <h2>${isEarlyAccess ? "New DealPulse Early-Access Request" : "New Contact Form Submission"}</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || "Not provided"}</p>
        <p><strong>Company:</strong> ${esc(company)}</p>
        <p><strong>Interest:</strong> ${esc(service)}</p>
        <p><strong>Message:</strong> ${esc(message)}</p>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
