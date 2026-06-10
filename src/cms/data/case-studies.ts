
// Case Studies
export const caseStudiesSection = {
  title: "Case Studies",
  subtitle: "Real Salesforce integration and automation projects delivered by Meet The Mind — connecting billing, finance, and subscription systems directly into the CRM.",
  studies: [
    {
      title: "Automated Subscription Billing with Chargent",
      client: "Adam Mesh Trading Group",
      industry: "Financial Services",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Financial Services", "Chargent", "Subscription Billing", "Sales Cloud"],
      challenge: "Adam Mesh Trading Group runs tiered subscriptions — monthly, quarterly, half-yearly, and annual — for its trading signals, investor alerts, and stock-coaching programs. Payments were handled in a separate system disconnected from Salesforce, so renewals were processed manually, failed or expired-card payments went unrecovered, and sales reps had no way to see a subscriber's payment status or billing history inside the CRM.",
      solution: "We implemented Chargent payment processing natively inside Salesforce Sales Cloud, using Authorize.Net as the gateway. This created a single, end-to-end subscription billing engine: automated recurring payments across every tier, custom payment schedules defined in Salesforce, and automatic dunning sequences with retry logic to recover failed payments. Card data was secured with Chargent's PCI-compliant tokenization, and billing communications were coordinated through Pardot. Scheduled flows replaced the manual renewal process entirely.",
      results: [
        "Recurring billing fully automated across all subscription tiers",
        "Failed and expired-card payments recovered automatically through dunning sequences",
        "Sales reps can view payment status and subscription history directly on the Account and Opportunity",
        "Card data secured with PCI-compliant tokenization inside Salesforce",
        "Manual renewal admin replaced by scheduled flows"
      ]
    },
    {
      title: "Recurly–Salesforce Subscription Integration",
      client: "Stock News Network LLC",
      industry: "Financial Services",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Financial Services", "Recurly", "Integration", "Apex"],
      challenge: "Stock News Network offered multiple subscription tiers for trading signals, market analysis, and premium alerts. Customers and leads lived in Salesforce, but billing ran on a legacy platform with no automation: there was no recurring billing tied to the CRM, poor tracking of lifecycle events like signup, upgrade, and churn, and payment statuses and invoices that never synced back into Salesforce for finance or sales to see.",
      solution: "We integrated Recurly as the subscription billing engine and connected it directly to Salesforce through the Recurly API and custom Apex classes. New subscriptions initiated in Salesforce created the matching records in Recurly; real-time payment status, renewal dates, and invoice links synced back into custom Subscription and Invoice objects; and upgrades, downgrades, and cancellations reflected instantly across both platforms. Recurly's native dunning and renewal emails were mapped to Salesforce campaigns for centralized analytics, with the integration secured by OAuth2 and token-refreshing API keys.",
      results: [
        "New subscriptions activate near-instantly instead of manual setup",
        "Real-time payment status, invoices, and renewal dates surfaced inside Salesforce",
        "Upgrades, downgrades, and cancellations sync automatically across both systems",
        "A subscription lifecycle dashboard gives account managers a 360° client view",
        "Failing subscribers flagged early so support can reach out proactively"
      ]
    },
    {
      title: "Two-Way QuickBooks–Salesforce Integration",
      client: "Lakewood University",
      industry: "Education",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Education", "QuickBooks", "Integration", "Education Cloud"],
      challenge: "Lakewood University, a fully online accredited institution, managed student onboarding, academic progress, and communication in Salesforce Education Cloud — while tuition payments, scholarships, and refunds were handled separately in QuickBooks Online. The disconnect meant financial data was re-keyed by hand between systems, tuition invoices were issued late, refund reconciliation took days, and finance had no real-time visibility into student lifecycle events like enrollment or dropout.",
      solution: "We built a bi-directional integration between Salesforce and QuickBooks Online using Salesforce Apex. From Salesforce to QuickBooks, student enrollments generated tuition invoices automatically, contacts synced to customer records, and scholarship grants applied as invoice discounts. From QuickBooks back to Salesforce, payment status, refunds, and outstanding balances flowed onto each student profile — triggering automated reminder journeys for overdue accounts. Scheduled sync jobs every 15 minutes, paired with error-logging middleware to catch failed syncs, kept both systems aligned without overloading them.",
      results: [
        "Tuition invoices issued automatically on enrollment instead of days later",
        "Payment status, refunds, and balances sync back to each student record",
        "Refund reconciliation automated between finance and student services",
        "Outstanding balances trigger automated reminder journeys",
        "A unified student-and-financial view across Education Cloud and QuickBooks"
      ]
    }
  ]
};
