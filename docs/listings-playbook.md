# Listings Playbook: AppExchange, Clutch, G2 and Capterra

Prepared 2026-10-13 for Meet The Mind Technologies. Copy blocks are ready to paste. Steps marked **(check)** describe screens I could not see myself, so the button names may differ slightly in your portal.

---

## Priority order

| # | Task | Where | Time | Why it matters |
|---|------|-------|------|----------------|
| 1 | Register completed client projects | Salesforce Partner portal | 30 min | Unlocks **reviews** and **competencies** on your listing. Both are empty today. |
| 2 | Fix and enrich the consulting listing | Partner Console | 30 min | Categories are empty and the company name doesn't match the website. |
| 3 | Create a Clutch profile | clutch.co | 30 min + client calls | The main review site for consulting firms (G2 and Capterra are for software). |
| 4 | Prepare G2 + Capterra for DealPulse and GroundTruth | g2.com, capterra.com | 20 min each | Do this **when each app is generally available**. G2 rejects beta products. |

---

## 1. Get reviews and competencies on AppExchange (do this first)

**What I found on your listing (2026-10-13):** "No Ratings", Competencies tab says "No competencies listed", Categories section is empty.

**How Salesforce fills these in:** you record a client project in the partner portal and mark it **Completed**. Salesforce then emails your client contact a satisfaction (CSAT) survey. At the end of that survey, the client can choose to publish a review, which Salesforce posts to your listing's Reviews tab. Your completed projects, CSAT scores and certifications also earn **competencies** under the partner program (it replaced the old Navigator levels in FY27).

**Eligibility rule:** a project counts if its **End Date falls in the current or previous Salesforce fiscal year**, and it is in Completed status. Salesforce's fiscal year runs February to January, so that's roughly projects that ended from **February 2025 onward**. Projects where you were a subcontractor to another partner don't count.

### Steps

1. **Warn each client first.** Send a short note so the survey email isn't ignored (template below).
2. Log in to the **Salesforce Partner Community** (partners.salesforce.com) and open the **Business Console** / **Partner Business Console** **(check)**.
3. Find **Projects** (sometimes under *Customer Success* or *Implementations*) **(check)** → **New Project**.
4. Fill in, for each client:
   - Customer account name and the **client contact who will get the survey** (use a real decision-maker who will answer).
   - Salesforce products used (e.g. Sales Cloud, Platform).
   - Start date, **End date** (must be Feb 2025 or later), and a one-line description (use the lines below).
5. Set the project **Status = Completed** and save. This is what triggers the survey email.
6. Repeat for every eligible client.
7. Within a few weeks, check your listing's **Reviews** and **Competencies** tabs. Salesforce updates them periodically.

If a client needs to change their survey answer later: Partner Community → **New Case** → *Partner Programs & Benefits* → *Consulting Partner Program*, and attach the client's written OK.

### Projects to register (from your case studies; confirm end dates)

| Client | Project description to paste | Products | Industry |
|---|---|---|---|
| Adam Mesh Trading Group | Chargent subscription billing automation in Salesforce: 100% of recurring renewals automated across all 4 subscription tenures. | Sales Cloud, Salesforce Platform | Financial Services |
| Stock News Network LLC | Recurly ↔ Salesforce two-way subscription integration with instant activation and real-time sync. | Sales Cloud, Salesforce Platform | Financial Services |
| Lakewood University | Two-way QuickBooks ↔ Salesforce integration that eliminated manual double entry; Moodle course progress synced live into Salesforce. | Salesforce Platform | Education |

If any of these ended before February 2025, it won't count for CSAT. Register any newer client work instead.

### Message to send each client before you register their project

> Hi [Name], quick heads-up: I'm recording the [project] we did together in Salesforce's partner program. Salesforce will email you a short satisfaction survey (about 3 minutes) from a salesforce.com address. At the end it asks whether you'd like to publish a review on our AppExchange listing. If you're happy with the work, that review would help us a lot. Thank you!
> Mitesh

---

## 2. Fix and enrich the consulting listing

**Where:** Partner Community → **Partner Console** → **Listings** → open *Meet The Mind Technologies* → the **Listing Builder** opens. Edit the tabs below, then **Save** and **Publish / Submit for review** **(check)**.

### 2a. Company / provider name
Change **"MeetTheMind Technologies"** to **Meet The Mind Technologies**, to match your website, LinkedIn and Google. Consistent naming helps search engines and AI tools recognise you as one company. If the name comes from your partner account profile rather than the listing, update it there (Partner Community → company profile) **(check)**.

### 2b. Tagline (currently "The mind behind your Salesforce.")
Keep it if you like the brand line. If you want one buyers can search for:

> Senior Salesforce consulting, integration & native apps

### 2c. Short description / overview headline
> Founder-led Salesforce consultancy for B2B revenue teams. We implement Sales and Service Cloud, integrate billing, finance and outreach tools (Chargent, Recurly, QuickBooks, Apollo.io) into Salesforce, deliver Agentforce, and build 100% native apps: DealPulse (deal risk) and GroundTruth (AI data readiness).

### 2d. Highlights (three)
Your current three are good. Suggested refresh so the first one leads with what your case studies prove:

1. **Integrations that remove manual work.** Billing, finance and learning systems wired into Salesforce: Chargent renewals fully automated, Recurly and QuickBooks synced two-way, Moodle progress live in the CRM.
2. **Senior, hands-on delivery.** 5x Salesforce Certified, Agentblazer Innovator 2025, 10+ years. The person who scopes your project is the person who builds it.
3. **100% native, your data stays put.** Our apps and integrations run inside your org: no data egress, nothing to slow your security review.

### 2e. Categories / Service offering tab (currently empty)
Tick the options that exist in the builder that match these **(check)**:
- **Services:** Implementation · Integration · Custom Development · Strategy / Assessment (health checks) · Managed Services / Support (only if you offer ongoing support)
- **Products:** Sales Cloud · Service Cloud · Salesforce Platform · Agentforce · Data Cloud
- **Industries:** Financial Services · Education · Professional Services
- **Countries / regions served:** United States · United Kingdom · United Arab Emirates · Australia · India
- **Languages:** English

### 2f. Support tab "About" text
The current text is strong. Replace the em dash in the first sentence to match the house style:

> Meet The Mind Technologies works with B2B companies that are serious about turning Salesforce into a revenue engine, not just a system of record.

### 2g. Media
- Add the case-study screenshots from the website (`/case-studies` images) to the carousel.
- Add a **Contact / Learn More** link to `https://www.meethemind.com/contact-us` (or the Calendly link) so listing visitors can book directly.

---

## 3. Clutch profile (recommended for the consultancy)

G2 and Capterra review **software**. For a consulting firm, **Clutch** is the main B2B services review site, and it ranks well on Google for "Salesforce consultants" searches.

1. Go to **clutch.co** → **Get Listed** (free) **(check)**. Sign up with your work email.
2. Company profile: name *Meet The Mind Technologies*, website, founded 2022, Chennai HQ, team size 2–9, minimum project size and hourly rate band (pick honest ranges).
3. **Service lines:** Salesforce consulting is the primary focus (around 80%). Add CRM consulting / system integration for the rest.
4. Paste the short description from 2c, and add your 3–4 case studies under **Portfolio**.
5. **Request reviews:** Clutch gives you a review link, or a Clutch analyst interviews your client by phone or online form. Reviews are verified, which is why they carry weight. Send the link to the same clients as in step 1.
6. Ranking on Clutch depends mostly on the number and recency of reviews, so 3–5 reviews moves you a long way.

---

## 4. G2 and Capterra for DealPulse and GroundTruth (when generally available)

**Wait until each app is generally available,** meaning out of beta/early access, ideally live on AppExchange with published pricing. G2's rules say it does not accept products "in the alpha or beta stage of development". Capterra has no published eligibility rule I could find, but a listing works far better with pricing and a live install link.

### G2 steps
1. Search g2.com to confirm the product isn't already listed.
2. Submit at **g2.com/products/new**. G2's research team checks and categorises it (allow about a week).
3. Once live, open the profile → hover **Unclaimed** → **Claim this profile** (approval in 1–3 business days).
4. In **my.G2**, add the logo, screenshots, demo video and pricing, then invite customers to review.

### Capterra steps
1. Go to **capterra.com** → **For Vendors** / **List your software** (the free "Launch" tier) **(check)**.
2. Create a vendor account in the Gartner Digital Markets portal and add the product. One listing appears on **Capterra, GetApp and Software Advice**.
3. Add pricing, screenshots and features, then use the free review-collection link.

### Ready-to-paste copy: DealPulse
**Category:** Sales / Revenue Intelligence · Opportunity Management (Salesforce add-on)

**Tagline:** Native Salesforce deal-risk scoring with transparent rules.

**Short description:**
> DealPulse scores every open Salesforce Opportunity for risk using signals already in your CRM, and shows reps exactly which signals fired and what to do next. It runs 100% natively inside Salesforce, with no data leaving your org.

**Long description:**
> Most deals that slip send signals for weeks first: no activity, a pushed close date, a blank next step. DealPulse watches those signals on every open Opportunity and turns them into a clear, explainable risk tier.
>
> It ships with seven signals out of the box (days since last activity, no future scheduled activity, close-date push count, stage regression, stage stagnation, blank next step, and opportunity age). You can switch on four more (amount erosion, open high-priority cases, total contacts and engaged contacts), add custom signals without code, or use industry packs for Manufacturing, Financial Services, Health and CPQ.
>
> Every score is deterministic and traceable: admins define what "High Risk" means with plain AND/OR rules, and reps see exactly which signals fired. A per-deal risk brief, momentum history and a read-only Deal Risk Agent help teams act before the forecast call.
>
> DealPulse is 100% native to Salesforce. No sync-out, no external callouts, nothing to slow your security review.

**Key features (bullets):** Seven built-in risk signals · No-code custom signals · Transparent, editable rules · Risk brief on every Opportunity · Risk momentum and movers · Read-only Deal Risk Agent · Industry signal packs · 100% native, no data egress

### Ready-to-paste copy: GroundTruth
**Category:** Data Quality · AI Readiness (Salesforce add-on)

**Tagline:** Know if your Salesforce data is ready for Agentforce.

**Short description:**
> GroundTruth scores how ready your Salesforce data is for AI agents across six dimensions, shows exactly which records will trip an agent up, and helps you fix them before go-live, all without your data leaving Salesforce.

**Long description:**
> Agentforce projects rarely fail because of the agent. They fail because of the data the agent reads. GroundTruth measures your CRM's AI readiness across six dimensions and pinpoints the specific records that will cause wrong or embarrassing agent answers.
>
> Admins get a readiness dashboard, record-level findings, rules they can tune, and guided fixes such as resolving and merging duplicates. Readiness can gate go-live, so you ship agents on data you trust.
>
> GroundTruth runs 100% natively inside Salesforce. No data egress, no external callouts.

**Key features (bullets):** Six-dimension readiness score · Record-level findings · Data health dashboard · Tunable rules · Guided duplicate resolve and merge · Go-live readiness gating · 100% native

> Before submitting, have GroundTruth's product owner confirm the six dimension names and the feature list. I drafted this from the website and listing text, not from the app.

---

## Sources
- [The Customer Satisfaction (CSAT) Survey Overview (Salesforce Partner Community)](https://partners.salesforce.com/s/education/consultants/Customer_Satisfaction_v2)
- [Partner requests Project CSAT Change/Resubmit (Salesforce Help)](https://help.salesforce.com/apex/HTViewSolution?id=000354007&language=en_US&mode=1)
- [Salesforce partner program FY2027 changes (Noltic)](https://noltic.com/stories/salesforce-partner-program-updates)
- [Get Started with Consultants on AppExchange (Trailhead)](https://trailhead.salesforce.com/content/learn/modules/consultants-on-appexchange/get-started-with-consultants-on-appexchange)
- [Consulting & MSP Navigator requirements (Salesforce PDF)](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/partners/readiness/consulting-msp-navigator.pdf)
- [Create or Edit an AppExchange Listing (Salesforce docs)](https://developer.salesforce.com/docs/atlas.en-us.250.0.packagingGuide.meta/packagingGuide/appexchange_publish_listings.htm)
- [Finding or listing a product on G2 (G2 docs)](https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2)
- [G2 free profile](https://sell.g2.com/create-free-profile)
- [Why is Capterra free? (Capterra)](https://capterra.com/faq/why-is-capterra-free/)
- [Capterra General Vendor Terms](https://capterra.com/legal/general-vendor-terms/)
