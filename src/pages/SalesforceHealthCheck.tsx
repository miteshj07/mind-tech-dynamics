import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, ListChecks, SearchCheck, ArrowRight, CheckCircle, XCircle, ChevronDown,
} from 'lucide-react';
import Seo from '@/components/layout/Seo';

const CHECK_START = 'https://check.meethemind.com/start';
const CHECK_SANDBOX = 'https://check.meethemind.com/start?env=sandbox';
const CONTACT = 'mailto:partners@meethemind.com';

// GA click event, no new tracking or cookies (uses the existing GA if present)
const track = (name: string) => {
  try { (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', name); } catch { /* noop */ }
};

const RunButton = ({ className = '' }: { className?: string }) => (
  <a
    href={CHECK_START}
    onClick={() => track('run_free_check_click')}
    className={`inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 px-8 rounded-md transition-colors ${className}`}
  >
    Run the free check <ArrowRight size={18} />
  </a>
);

const SandboxLink = () => (
  <a
    href={CHECK_SANDBOX}
    onClick={() => track('run_free_check_sandbox_click')}
    className="text-sm text-gray-500 underline hover:text-brand transition-colors"
  >
    Running this on a sandbox?
  </a>
);

const cards = [
  {
    icon: <SearchCheck size={24} />,
    title: "What Salesforce's own tools leave out",
    body: "Salesforce's Health Check gives you a score. This check tells you which integrations stop working on which Salesforce deadline, who can fix each item and in what order, with a link to the Setup page that shows each finding.",
  },
  {
    icon: <ListChecks size={24} />,
    title: 'Every finding is free',
    body: 'Each one comes with its criticality, the Salesforce deadline where there is one, what to do and who can do it, so your own admin or developer can work through it. If you would rather we did the work, email us and we come back with a fixed price and a date.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Built so you can check us',
    body: "Setup data and metadata only, never customer records. The only name and email we keep are those of the person who approves the check. The report prints when our access was revoked and what Salesforce answered, and tells you where in Setup to confirm it.",
  },
];

const looksAt = [
  "Integrations on sign-in methods Salesforce is retiring, with the date each one stops: the Use Any API Auth permission for SOAP login() from 1 December 2026, password-based and browser-based OAuth sign-in from 20 February 2027, and SOAP login() on API versions 31 to 64 in Summer '27",
  'Integrations that depend on one person\'s login, and integrations that keep failing to sign in',
  'Admin access: whether passkeys (security keys, Touch ID, Windows Hello) are switched on, now that Salesforce requires them for admins, and how many people hold admin-level permissions',
  'Outside apps that still hold access to your data, including ones nobody has used in six months or no admin approved',
  'AI agents: whether generative AI is on, which agents are active, and whether any agent user holds admin-level permissions',
  'Workflow Rules and Process Builder still running after Salesforce stopped fixing them, and flows with no error handling',
  'Paid licenses with no login in 90 days, installed packages with no sign of use or on deprecated versions, and storage close to its limit',
  'Your Security Health Check score and the high-risk settings behind it',
];

const weRead = [
  'Workflow Rules, Process Builders and Flows: definitions and active flags, run through Lightning Flow Scanner',
  'Connected apps: app names, installed state, last-used dates and use counts',
  'Login History: login type, subtype, API type, API version, application and status, grouped by Salesforce user ID',
  'Users: active flag, last login date, created date, license type and profile, as counts',
  'Admin-level access: which active users hold Modify All Data, View All Data, Customize Application or Author Apex, by Salesforce user ID, with the profile or permission set that grants it',
  'Security settings, including whether security keys and built-in authenticators are allowed, and whether Einstein generative AI is on',
  "AI agents: each agent's name, type and active status, how many users can build agents, and which users are on an agent license",
  'The Security Health Check score and its risk settings',
  'Installed packages: versions, flags, licenses and seat counts, and signs of use as counts',
  'Setup Audit Trail: counts of package install and upgrade events, from the action and date only, never the entry text',
  'API request usage and storage against their limits',
];

const weNever = [
  'Customer records of any object: no Accounts, Contacts, Leads, Opportunities, Cases, custom object records, files or attachments',
  'Token values',
  'Names, usernames or email addresses of anyone except the person who approves the check',
  'Report results, dashboards, email content, Chatter, site traffic or event logs',
];

const steps = [
  'Click Run the free check. A System Administrator has to approve it; if that is not you, forward this page to your admin. Start and approve in the same browser, because a link forwarded halfway through will not start a check.',
  'Salesforce shows its own approval screen for "MTM Org Health Check", with the permission line "Manage user data via APIs (api)". That is Salesforce\'s wording. Click Allow. The screen appears every time, even for someone who approved it before.',
  'If Salesforce shows an "OAuth Error" page instead, with the code OAUTH_APPROVAL_ERROR_GENERIC, the org blocks apps nobody has installed yet, a Salesforce security change from September 2025. An admin can either give the person running the check the Approve Uninstalled Connected Apps permission through a permission set, or install MTM Org Health Check from Setup, Connected Apps OAuth Usage. Then open the link again. Stuck? Email partners@meethemind.com and we will walk you through it.',
  'The scan usually takes under a minute. When it finishes we revoke our access and record the time and Salesforce\'s answer.',
  'Mitesh reviews every report before it goes out. Once approved, the report link is emailed to the Salesforce user who approved the check, at the verified email address on their Salesforce user record; if Salesforce has not verified it, Mitesh sends the link by hand after confirming who asked. You get it within one working day. Reply to that email if any finding looks wrong and it is corrected.',
];

const forWhom = [
  'The admin who inherited the org, with no documentation and automation the previous person never wrote down. The report is the inventory, and every headline number can be checked in Setup before anyone acts on it.',
  'The solo admin with no developer to hand the migration to and no time to read Login History by hand.',
  'The owner or head of operations at a company or small college where nobody owns Salesforce, who pays the invoice and has never seen what is inside. Page one is written for you: what we found, what to fix first, and by when.',
];

const faqs = [
  {
    q: 'You are asking me to approve an outside app after the Salesloft Drift incident. Why should I?',
    a: 'You should not take it on trust. The check reads setup data and metadata only and revokes its access when the scan finishes. The report prints the revoke time and Salesforce\'s answer, and tells you which Setup page shows our app and how to revoke it yourself, so the proof comes from Salesforce rather than from us. If Salesforce does not confirm the revoke, the report says so plainly and Mitesh follows up. One of the findings is the list of outside apps that still hold access to your org.',
  },
  {
    q: 'What does "access revoked" mean in practice?',
    a: 'When the scan finishes, we ask Salesforce to revoke our token and record the time and Salesforce\'s answer; the report prints both. After that the app cannot reach your org again unless someone approves it again. Setup, Connected Apps OAuth Usage keeps a line showing that you approved the app. That line is not access, and Revoke removes it.',
  },
  {
    q: 'Is this GDPR compliant, and will you sign a DPA?',
    a: 'We do not read your customers\' personal data, because we do not read records. We do read setup data that includes Salesforce user IDs and login times, which count as personal data of your staff under UK and EU law, and we keep the name and email of the person who approves the check. The privacy notice and a data processing agreement are covered on the data and privacy page. UK and EU organisations can ask for the DPA to be signed before they approve the check.',
  },
  {
    q: 'Production or sandbox?',
    a: 'Production, because the findings are about what is running. A sandbox has different apps, login history and users. If your policy requires a sandbox first, run it there with the sandbox link, read the report, then run production.',
  },
  {
    q: 'Can I run it again after fixing things?',
    a: 'Yes. The same link works as many times as you like. Each run is a fresh check with a new report, so you can see what changed.',
  },
  {
    q: 'What happens after I get the report?',
    a: 'Mitesh may email you once to ask whether it was useful, and you can tell us to stop at any time. If you want the fixes done, write to partners@meethemind.com with the fix numbers and we come back with a fixed price and a date. If a finding is wrong, write and it gets corrected.',
  },
  {
    q: 'Does the report include a price?',
    a: 'No. The report tells you what to fix and in what order, so your own team can do it. If you want us to do it, email us with the fixes you care about and we quote a fixed price and a date.',
  },
  {
    q: 'Salesforce shows an OAuth Error, or says the API is off. Now what?',
    a: 'OAuth Error: see step 3 above. API off: Starter Suite and Free Suite have no API, and Professional and Pro Suite need the Web Services API add-on, so the check cannot run there.',
  },
];

const SalesforceHealthCheck = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo
        title="Free Salesforce Org Health Check | Meet The Mind Technologies"
        description="A free check of your Salesforce org: integrations that stop working on Salesforce's upcoming deadlines, admin access, outside apps, idle licenses and automation Salesforce no longer fixes. Reviewed by a Salesforce partner and emailed to you."
        canonical="/salesforce-health-check"
        jsonLd={faqSchema}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.12] text-gray-900 mb-6">
            What is actually running in your Salesforce org, and what to fix first.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            A free health check for the admin who got handed the org and the owner who pays for it. We read setup
            data and metadata only, revoke our access as soon as the scan ends, and email every finding in plain
            language, in the order we would fix them. Page one is a summary for whoever owns the org. No meeting
            needed to read any of it.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <RunButton />
            <SandboxLink />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            A System Administrator approves it on Salesforce's own screen. The scan takes about a minute.
          </p>
        </div>
      </section>

      {/* Three cards */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map((c, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-4">
                  {c.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the check looks at */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What the check looks at</h2>
          <ul className="space-y-4">
            {looksAt.map((t, i) => (
              <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                <CheckCircle size={20} className="text-brand flex-shrink-0 mt-1" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 mt-8 leading-relaxed">
            Runs on Enterprise, Unlimited, Performance, Core, Advanced, Max, Agentforce 1, Nonprofit Cloud and
            Education Cloud orgs, and on Professional or Pro Suite orgs that have the Web Services API add-on.
            Starter Suite and Free Suite do not expose the API, so the check cannot run there.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Every report is reviewed by Mitesh Jain, founder of Meet The Mind Technologies, a registered Salesforce
            Consulting Partner.
          </p>
        </div>
      </section>

      {/* What we read / never read */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-gray-100 bg-white p-7">
              <h3 className="font-bold text-lg text-gray-900 mb-1 flex items-center gap-2">
                <CheckCircle size={20} className="text-brand" /> We read
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                setup data and metadata, through the Metadata API, the Tooling API and setup objects
              </p>
              <ul className="space-y-3">
                {weRead.map((t, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                    <span className="text-brand mt-1">·</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-7">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <XCircle size={20} className="text-gray-400" /> We never read
              </h3>
              <ul className="space-y-3">
                {weNever.map((t, i) => (
                  <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                    <span className="text-gray-400 mt-1">·</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-600 mt-8 max-w-3xl leading-relaxed">
            The api scope is what Salesforce offers for this work, and it permits writes. We use it to read, we
            write nothing, and we revoke our access when the scan finishes.
          </p>
          <p className="mt-4">
            <Link to="/salesforce-health-check/data" className="text-brand font-semibold hover:underline">
              Object and field names, retention and sub-processors
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">How it works</h2>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
          <p className="text-gray-600 mt-8 leading-relaxed">
            If Salesforce answers API_DISABLED_FOR_ORG after Allow, the edition has no API access (Starter, Free
            Suite, or Professional without the Web Services API add-on). The page says so in plain words and the
            check stops there.
          </p>
        </div>
      </section>

      {/* Send this to your admin */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Send this to your admin</h2>
          <p className="text-gray-700 leading-relaxed">
            Only a System Administrator can approve the check. If you are the owner, president or head of
            operations, forward this page to whoever administers Salesforce and ask them to run it. Page one of the
            report is written for you, with the admin's fixes behind it. If nobody administers your Salesforce,
            write to <a href={CONTACT} className="text-brand hover:underline">partners@meethemind.com</a> and Mitesh
            will tell you which login can run it.
          </p>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Who this is for</h2>
          <ul className="space-y-4 mb-8">
            {forWhom.map((t, i) => (
              <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                <CheckCircle size={20} className="text-brand flex-shrink-0 mt-1" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Not for: data quality, duplicate records, report accuracy, user adoption or renewal negotiation. Those
            need records or your contract, and we read neither.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 bg-white">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-gray-900 list-none">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 max-w-2xl mx-auto">
            See what is running in your org, and what to fix first.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RunButton />
            <SandboxLink />
          </div>
          <p className="text-gray-400 text-sm mt-5">
            A System Administrator approves it on Salesforce's own screen. The scan takes about a minute.
          </p>
        </div>
      </section>
    </>
  );
};

export default SalesforceHealthCheck;
