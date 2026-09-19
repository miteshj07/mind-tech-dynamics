
// Case Studies
export const caseStudiesSection = {
  title: "Case Studies",
  subtitle: "Real Salesforce integration and automation projects delivered by Meet The Mind, connecting billing, finance, and subscription systems directly into the CRM.",
  studies: [
    {
      title: "Automated Subscription Billing with Chargent",
      client: "Adam Mesh Trading Group",
      industry: "Financial Services",
      metric: "100% of recurring renewals automated across all 4 subscription tenures",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Financial Services", "Chargent", "Subscription Billing", "Sales Cloud"],
      challenge: "Adam Mesh Trading Group runs tiered subscriptions, monthly, quarterly, half-yearly, and annual, for its trading signals, investor alerts, and stock-coaching programs. Payments were handled in a separate system disconnected from Salesforce, so renewals were processed manually, failed or expired-card payments went unrecovered, and sales reps had no way to see a subscriber's payment status or billing history inside the CRM.",
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
      metric: "Instant subscription activation with real-time, two-way Recurly ↔ Salesforce sync",
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
      metric: "Manual double-entry between Salesforce and QuickBooks eliminated",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Education", "QuickBooks", "Integration", "Education Cloud"],
      challenge: "Lakewood University, a fully online accredited institution, managed student onboarding, academic progress, and communication in Salesforce Education Cloud, while tuition payments, scholarships, and refunds were handled separately in QuickBooks Online. The disconnect meant financial data was re-keyed by hand between systems, tuition invoices were issued late, refund reconciliation took days, and finance had no real-time visibility into student lifecycle events like enrollment or dropout.",
      solution: "We built a bi-directional integration between Salesforce and QuickBooks Online using Salesforce Apex. From Salesforce to QuickBooks, student enrollments generated tuition invoices automatically, contacts synced to customer records, and scholarship grants applied as invoice discounts. From QuickBooks back to Salesforce, payment status, refunds, and outstanding balances flowed onto each student profile, triggering automated reminder journeys for overdue accounts. Scheduled sync jobs every 15 minutes, paired with error-logging middleware to catch failed syncs, kept both systems aligned without overloading them.",
      results: [
        "Tuition invoices issued automatically on enrollment instead of days later",
        "Payment status, refunds, and balances sync back to each student record",
        "Refund reconciliation automated between finance and student services",
        "Outstanding balances trigger automated reminder journeys",
        "A unified student-and-financial view across Education Cloud and QuickBooks"
      ]
    },
    {
      title: "Moodle Course Progress, Live in Salesforce",
      client: "Lakewood University",
      industry: "Education",
      metric: "Weekly Moodle course-progress now on every student record, with no logging into Moodle",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Education", "Moodle", "Integration", "Student Success"],
      challenge: "Lakewood University's Success Coaches needed to see how far each student had actually progressed through their courses, but that figure lived in Moodle, not Salesforce. Lakewood already had a weekly push from Moodle that supplied GPA, lesson numbers, and last login, but not course-progress percentage, the number a coach reaches for first. To get it, a coach had to log into Moodle and check course by course, student by student. It was manual, it did not scale across a caseload, and the earliest warning sign of a disengaging student sat in a system the coaching team did not live in.",
      solution: "We built a weekly, scheduled Salesforce integration with Moodle's Web Services API that fills exactly that gap. A scheduled Apex batch reads each student's course-progress percentage from Moodle every week and writes it onto the existing Success Coach records the current push already creates, rather than building a second, parallel set of records. It contributes only the progress field, so it never fights the push over GPA or lessons, and reports stay consistent. It is configuration-driven, so new programs and courses are added without a code change, and it is built to respect Moodle's security: the API token is sent in the request body, never in the URL, so it never lands in Moodle's access logs.",
      results: [
        "Course progress now sits in Salesforce next to GPA and lessons, so coaches no longer log into Moodle to check it by hand",
        "The manual, per-student check is replaced by an automated weekly sync across the whole caseload",
        "A stalled progress percentage is now visible in the coaching workflow, where someone can act on it early",
        "The sync updates existing records instead of creating parallel ones, so there is one trustworthy progress number per student",
        "New programs and courses are added through configuration, not new code"
      ],
      images: [
        { src: "/case-studies/moodle-academic-trajectory.png", caption: "The Academic Trajectory view inside Salesforce: actual course completion plotted against the expected weekly pace, updated automatically from Moodle. Demo data." },
        { src: "/case-studies/moodle-review-history.png", caption: "The weekly review history and per-course progress a Success Coach sees in Salesforce, including when a standing crosses into unsatisfactory. Demo data." }
      ]
    },
    {
      title: "One-Click Microsoft 365 Provisioning from Salesforce",
      client: "Lakewood University",
      industry: "Education",
      metric: "Manual Microsoft 365 account setup replaced with one click, delivered to production in 3 days",
      image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Education", "Microsoft 365", "Microsoft Graph", "Integration"],
      challenge: "Every new Lakewood student needed a Microsoft 365 account, and someone created each one by hand in the Microsoft Admin Center: type the student's name, work around duplicate names, assign a license, set a password, then copy the details back into Salesforce. It was slow, it did not scale with enrollment, and it carried a security gap, students were often set up with a single shared password and there was no audit trail of who was provisioned or when.",
      solution: "We built a native Salesforce to Microsoft 365 integration on the Microsoft Graph API. From the student record in Salesforce, a staff member clicks one button and the account is created end to end: the username follows Lakewood's existing house convention, duplicate names are resolved automatically, an Office 365 A1 license is assigned, a unique password is generated for each student, the new address is written back onto the record, a branded welcome email is sent, and every attempt is written to a full audit log. It all runs inside Salesforce with permission-scoped access, so there is no second system for staff to learn.",
      results: [
        "A multi-step Admin Center task became a single click from the record staff already work in",
        "Built, tested, and deployed to production in three working days, not three weeks",
        "Every student now receives a unique password instead of a shared one, backed by a full audit trail",
        "The Office 365 A1 license is assigned automatically as part of the same click",
        "The work surfaced 1,613 inactive records still holding licensed Microsoft 365 accounts that can now be reclaimed"
      ],
      images: [
        { src: "/case-studies/m365-provisioning.png", caption: "One button on the student record provisions the Microsoft 365 account end to end: username, licence, unique password, welcome email, and a full audit log, all via Microsoft Graph inside Salesforce. Demo data." }
      ]
    },
    {
      title: "A Student Self-Service Portal on a Salesforce Site",
      client: "Lakewood University",
      industry: "Education",
      metric: "Students see their own progress, schedule and standing, without emailing a coach",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      tags: ["Education", "Salesforce Site", "Student Success", "Apex"],
      challenge: "Everything a Lakewood student might want to know, how far through the program they are, whether they are on pace, what is due next, and what it would take to get back into good standing, already lived in Salesforce. But it lived on the staff side. Students could not see it, so they emailed their Success Coach to ask, and coaches answered the same questions one email at a time. It did not scale, and the answer a student needed most, am I ok and what do I do next, was the slowest to arrive.",
      solution: "We built a student self-service portal on a public Salesforce Site. Each student signs in and sees only their own record: their academic trajectory against the expected pace using the same engine the coaching team relies on, their class schedule with the next courses due highlighted and calculated from their own program start date, the messages Lakewood has sent them, a welcome video, and a plain read on what it takes to get back into good standing. The public page runs as a guest user with the minimum it needs, the page and its controller and no object permissions, and the trajectory calculation was refactored so one engine safely serves both the coach view and the portal. Sign-in is gated, throttled and logged, so a page anyone can reach still only ever shows a student their own data.",
      results: [
        "Students self-serve their progress, schedule and standing instead of emailing a coach to ask",
        "The schedule shows what is due next, calculated from each student's program start date",
        "The messages Lakewood sent appear in the portal, so nothing gets lost in an inbox",
        "Built least-privilege: the public page runs with only the page and its controller, no object access",
        "Sign-in is throttled and logged, and sign-ins are tracked by device and browser to show adoption"
      ],
      images: [
        { src: "/case-studies/student-portal.png", caption: "The student portal on a Salesforce Site: each student's own progress against the expected pace, their class schedule with what is due next, and the messages the school has sent them. Demo data." }
      ]
    }
  ]
};
