import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import Seo from '@/components/layout/Seo';

const CONTACT = 'mailto:partners@meethemind.com';

const weRead = [
  'Workflow, Flow and FlowDefinition',
  'OauthToken (AppName, AppMenuItemId, LastUsedDate, UseCount, UserId, CreatedDate) and ConnectedApplication',
  'LoginHistory (UserId, LoginType, LoginSubType, ApiType, ApiVersion, Application, Status, LoginTime)',
  'User (Id, IsActive, LastLoginDate, CreatedDate, ProfileId, UserType), Profile, UserLicense, Organization',
  'PermissionSet and PermissionSetAssignment for the approving user only, to check which parts of the check that user can see',
  'PermissionSetAssignment and PermissionSet (AssigneeId, Label, IsOwnedByProfile, Profile.Name, PermissionsModifyAllData, PermissionsViewAllData, PermissionsCustomizeApplication, PermissionsAuthorApex, PermissionsApiUserOnly) for active internal users, and a count of active internal users',
  'SecuritySettings and EinsteinGptSettings, through the Metadata API (the report uses enableU2F, enableBuiltInAuthenticator and enableEinsteinGptPlatform)',
  'BotDefinition (Id, MasterLabel, AgentType) and BotVersion (active versions only); User (Id and license name) for users on an agent license; PermissionSetAssignment (AssigneeId) for the permissions that let a user build agents',
  'SecurityHealthCheck and SecurityHealthCheckRisks',
  'InstalledSubscriberPackage through the Tooling API (package name, namespace, packaging model, version IDs and numbers, IsManaged, IsBeta, IsDeprecated, IsSecurityReviewed)',
  'PackageLicense (NamespacePrefix, Status, AllowedLicenses, UsedLicenses, ExpirationDate, CreatedDate) and UserPackageLicense (counts per namespace, for active and inactive users)',
  'AsyncApexJob (counts of namespaced Apex jobs and scheduled jobs)',
  'ApexTrigger and FlowDefinitionView (counts of active namespaced triggers and flows)',
  'AppMenuItem (Id, NamespacePrefix), UserAppInfo (counts per app) and AppDefinition (DurableId, NamespacePrefix)',
  'SetupAuditTrail (Action and CreatedDate only, never the entry text)',
  'The limits endpoint',
];

const weNever = [
  'Records of any standard or custom object',
  'AccessToken, DeleteToken or RequestToken on OauthToken',
  'Name, Username or Email on User, except for the person who approves the check',
  'Report results, dashboards, email content, Chatter, files, site traffic or event logs',
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
  </section>
);

const SalesforceHealthCheckData = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Seo
        title="What the health check reads, keeps and deletes | Meet The Mind Technologies"
        description="Exactly which Salesforce objects and fields the free health check reads, what it keeps, for how long, and how to revoke it yourself."
        canonical="/salesforce-health-check/data"
      />

      <section className="pt-32 pb-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/salesforce-health-check" className="text-sm text-gray-500 hover:text-brand transition-colors">
            &larr; Back to the health check
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            What the health check reads, keeps and deletes
          </h1>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">

          <Section title="Access">
            <p>
              You approve the check through Salesforce's OAuth 2.0 web server flow with PKCE. We request one scope,
              api, which Salesforce labels "Manage user data via APIs". The scope permits writes. We use it to read
              metadata and setup data, we write nothing to your org, and we revoke our token when the scan finishes.
              The report prints the revoke time in UTC and the answer Salesforce returned. If Salesforce does not
              confirm the revoke, the report says so plainly and Mitesh follows up.
            </p>
          </Section>

          <Section title="What we read (object and field names)">
            <ul className="space-y-3 not-prose">
              {weRead.map((t, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <CheckCircle size={16} className="text-brand flex-shrink-0 mt-0.5" /><span>{t}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What we never read">
            <ul className="space-y-3 not-prose">
              {weNever.map((t, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <XCircle size={16} className="text-gray-400 flex-shrink-0 mt-0.5" /><span>{t}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Who can approve">
            <p>
              A System Administrator. The user needs API Enabled, View Setup and Configuration, Customize
              Application, and Manage Users or Monitor Login History. Since September 2025 Salesforce also requires
              the Approve Uninstalled Connected Apps permission to approve an app no admin has installed. The
              standard System Administrator profile usually has all of these; some orgs restrict Approve Uninstalled
              Connected Apps, and there an admin installs MTM Org Health Check first, from Setup, Connected Apps
              OAuth Usage. If the approving user lacks a permission, the report says which finding was not computed
              and why, instead of printing a smaller number.
            </p>
          </Section>

          <Section title="Where the data goes">
            <p>
              The setup data read from your org is used in memory to build the report and is not kept. The report
              itself is stored and then deleted after the check; reply to the report email to have it deleted sooner.
            </p>
            <p>
              Sub-processors: Vercel (hosting), Supabase (database) and Resend (email delivery). Nobody else sees
              the data. Mitesh Jain reads every report before it is sent.
            </p>
          </Section>

          <Section title="Personal data">
            <p>
              We store the Salesforce user IDs and login times that appear in setup data. We also store the name,
              username, email address, user ID and time zone of the Salesforce user who approves the check, taken
              from Salesforce's identity service, and your company details from Company Information (company name,
              org ID, edition, city, state, country, phone and the date the org was created), so we can send the
              report and follow up with you. We do not store the names, usernames or email addresses of any other
              user. The report link is emailed to the approving user's email address once Salesforce has verified
              it; otherwise Mitesh sends the link by hand after confirming who asked. We keep these contact details
              for 12 months and delete them sooner if you ask at{' '}
              <a href={CONTACT} className="text-brand hover:underline">partners@meethemind.com</a>. For the setup
              data we act as processor; for your contact details we act as controller.
            </p>
          </Section>

          <Section title="Revoke it yourself, before or after we do">
            <p>
              Setup, Connected Apps OAuth Usage lists MTM Org Health Check once you approve the check. After we
              revoke our token the line stays: it records that you approved the app, not live access, because the
              app never holds a refresh token. To remove it, click the User Count number next to MTM Org Health
              Check, then Revoke. To stop the app for everyone in your org, click Block.
            </p>
          </Section>

          <Section title="What Salesforce's approval screen shows">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-semibold text-gray-800 w-40">App name</td>
                    <td className="py-3 px-4 text-gray-700">MTM Org Health Check</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-semibold text-gray-800">Description</td>
                    <td className="py-3 px-4 text-gray-700">
                      Free Salesforce org health check by Meet The Mind Technologies. Reads setup data and metadata
                      only; access is revoked after the scan.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-800">Scope</td>
                    <td className="py-3 px-4 text-gray-700">"Manage user data via APIs (api)", Salesforce's wording</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Salesforce shows this screen every time, even for someone who approved the app before, and may show
              only the name and the scope, so this page carries the description too.
            </p>
          </Section>

          <Section title="DPA and privacy">
            <p>
              Our <Link to="/privacy-policy" className="text-brand hover:underline">privacy notice</Link> covers how
              we handle this data. A data processing agreement is available on request. UK and EU organisations can
              ask for the DPA to be signed before approving; reply to any email from us or write to{' '}
              <a href={CONTACT} className="text-brand hover:underline">partners@meethemind.com</a>.
            </p>
          </Section>

          <Section title="About us">
            <p>Meet The Mind Technologies is a registered Salesforce Consulting Partner.</p>
          </Section>

        </div>
      </section>
    </>
  );
};

export default SalesforceHealthCheckData;
