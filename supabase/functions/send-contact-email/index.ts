
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

const SITE = "https://www.meethemind.com";

// Confirmation ("auto-reply") copy sent back to the person who submitted an app
// form. Keyed by the form's `service` tag. Only these two services get an
// auto-reply; the general contact form is left as notify-only.
const AUTO_REPLIES: Record<
  string,
  { brand: string; subject: string; heading: string; intro: string; blurb: string; link: string; linkLabel: string }
> = {
  "DealPulse Early Access": {
    brand: "DealPulse",
    subject: "Thanks for your interest in DealPulse",
    heading: "Thanks for your interest in DealPulse",
    intro:
      "Thanks for requesting early access to DealPulse. We have your request, and someone from our team will be in touch shortly to set up your access and walk you through it.",
    blurb:
      "DealPulse scores every open Opportunity for risk, from the signals already in your CRM, entirely inside Salesforce. While you wait, here is a quick look at how it works:",
    link: `${SITE}/dealpulse`,
    linkLabel: "See how DealPulse works",
  },
  "GroundTruth Readiness Assessment": {
    brand: "GroundTruth",
    subject: "Thanks for requesting a GroundTruth readiness assessment",
    heading: "Thanks for requesting a readiness assessment",
    intro:
      "Thanks for requesting a GroundTruth readiness assessment. We have your request, and someone from our team will be in touch shortly to run it with you on your own org.",
    blurb:
      "GroundTruth scores how ready your CRM data is for Agentforce across six dimensions and shows exactly which records will trip an agent up, all without your data leaving Salesforce. While you wait, here is a quick look at how it works:",
    link: `${SITE}/groundtruth`,
    linkLabel: "See how GroundTruth works",
  },
};

const renderAutoReply = (
  firstName: string,
  a: (typeof AUTO_REPLIES)[string],
): string => `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;line-height:1.6;">
    <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 20px;">${esc(a.heading)}</h1>
    <p style="margin:0 0 16px;">Hi ${esc(firstName)},</p>
    <p style="margin:0 0 16px;">${esc(a.intro)}</p>
    <p style="margin:0 0 20px;">${esc(a.blurb)}</p>
    <p style="margin:0 0 28px;">
      <a href="${a.link}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px;">${esc(a.linkLabel)}</a>
    </p>
    <p style="margin:0 0 4px;">Talk soon,</p>
    <p style="margin:0 0 28px;">The Meet The Mind team</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />
    <p style="font-size:12px;color:#9ca3af;margin:0;">
      Meet The Mind Technologies · <a href="${SITE}" style="color:#9ca3af;">meethemind.com</a><br />
      You received this because you submitted a request at meethemind.com.
    </p>
  </div>
`;

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

    // Send a branded confirmation ("auto-reply") to the submitter for the two
    // app forms. Non-blocking: a failure here must never affect the admin
    // notification above or the response to the client. Sent from
    // support@meethemind.com, which works because the meethemind.com domain is
    // verified in Resend (domain verification covers every address at it).
    const autoReply = AUTO_REPLIES[service as string];
    if (autoReply) {
      const firstName = String(name ?? "").trim().split(/\s+/)[0] || "there";
      try {
        const { error: arError } = await resend.emails.send({
          from: `${autoReply.brand} <support@meethemind.com>`,
          to: email,
          reply_to: "support@meethemind.com",
          subject: autoReply.subject,
          html: renderAutoReply(firstName, autoReply),
        });
        if (arError) console.error("Auto-reply send error (non-blocking):", arError);
        else console.log("Auto-reply sent to submitter:", email);
      } catch (arErr) {
        console.error("Auto-reply threw (non-blocking):", arErr);
      }
    }

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
