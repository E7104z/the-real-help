import SeoHead from '../components/seo/SeoHead';
import { CONTACT_EMAIL } from '@/lib/constants/site';

const LAST_UPDATED = 'July 13, 2026';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SeoHead
        title="Privacy Policy | The Real Help, LLC"
        description="Privacy Policy for The Real Help, LLC, including our SMS/text messaging terms, mobile number non-sharing commitment, message frequency, and message and data rates disclosure."
        canonicalPath="/privacy"
      />

      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-black">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-brand-silver-500">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose prose-slate mt-10 max-w-none text-brand-silver-700 leading-7">
            <p>
              The Real Help, LLC (&ldquo;The Real Help,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
              committed to protecting the personal information you share with us.
              This Privacy Policy explains what information we collect, how we use
              it, and the choices you have. It applies to information collected
              through our website at{' '}
              <a href="https://www.therealhelp.com" className="text-brand-blue-500 hover:underline">
                therealhelp.com
              </a>
              , our forms, and our text messaging (SMS) program.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              1. Information We Collect
            </h2>
            <p>We may collect the following information when you interact with us:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Contact information</strong> — such as your name, email
                address, mobile phone number, and mailing address.
              </li>
              <li>
                <strong>Business information</strong> — details you provide about
                your organization when requesting our services.
              </li>
              <li>
                <strong>Communications</strong> — messages you send us and your
                consent preferences for email and text messaging.
              </li>
              <li>
                <strong>Usage data</strong> — non-identifying analytics about how
                you use our website.
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to your inquiries and provide requested services.</li>
              <li>Send appointment reminders, updates, and service-related messages.</li>
              <li>Send informational or promotional text messages when you have opted in.</li>
              <li>Improve our website, services, and customer support.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              3. SMS / Text Messaging Program
            </h2>
            <p>
              By providing your mobile phone number and opting in, you consent to
              receive text messages from The Real Help, LLC related to your
              inquiries, appointments, account updates, and service information.
            </p>

            <div className="mt-6 rounded-2xl border border-brand-blue-100 bg-brand-blue-50 p-5">
              <p className="font-semibold text-brand-black">
                Mobile Information &amp; Non-Sharing Commitment
              </p>
              <p className="mt-2">
                No mobile information will be shared with third parties or
                affiliates for marketing or promotional purposes. Information
                sharing to subcontractors in support services, such as customer
                service, is permitted. All other use case categories exclude text
                messaging originator opt-in data and consent; this information
                will not be shared with any third parties.
              </p>
            </div>

            <ul className="mt-6 list-disc space-y-2 pl-6">
              <li>
                <strong>Message frequency:</strong> Message frequency varies.
                You may receive recurring messages based on your interactions with
                us, appointment activity, and the services you request.
              </li>
              <li>
                <strong>Message and data rates:</strong> Message and data rates
                may apply. Please contact your wireless provider for details about
                your plan.
              </li>
              <li>
                <strong>Opting out:</strong> You can cancel the SMS service at any
                time by replying <strong>STOP</strong> to any message. After you
                send <strong>STOP</strong>, we will send a confirmation message and
                will no longer send text messages, unless you opt in again.
              </li>
              <li>
                <strong>Help:</strong> Reply <strong>HELP</strong> for assistance,
                or contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue-500 hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              4. How We Share Information
            </h2>
            <p>
              We do not sell your personal information. We do not share mobile
              numbers or SMS opt-in consent with third parties or affiliates for
              their marketing purposes. We may share information with trusted
              service providers who help us operate our business (for example,
              hosting, communications, or customer-support vendors), and only to
              the extent necessary to perform those services on our behalf. We may
              also disclose information when required by law or to protect our
              legal rights.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              5. Data Security
            </h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards
              designed to protect your information. However, no method of
              transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              6. Your Choices
            </h2>
            <p>
              You may opt out of marketing emails by using the unsubscribe link in
              any email, and out of text messages by replying STOP. You may also
              contact us to request access to, correction of, or deletion of your
              personal information, subject to applicable law.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we
              will revise the &ldquo;Last updated&rdquo; date at the top of this
              page. Your continued use of our services after changes take effect
              constitutes acceptance of the updated policy.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul className="mt-3 list-none space-y-1 pl-0">
              <li>The Real Help, LLC</li>
              <li>St. Louis, Missouri</li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-blue-500 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
