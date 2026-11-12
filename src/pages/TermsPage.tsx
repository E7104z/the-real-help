import SeoHead from '../components/seo/SeoHead';
import { CONTACT_EMAIL } from '@/lib/constants/site';

const LAST_UPDATED = 'July 13, 2026';

export default function TermsPage() {
  return (
    <>
      <SeoHead
        title="Terms and Conditions | The Real Help, LLC"
        description="Terms and Conditions for The Real Help, LLC, including website use, SMS/text messaging terms, message frequency, and message and data rates disclosure."
        canonicalPath="/terms"
      />

      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-black">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-brand-silver-500">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose prose-slate mt-10 max-w-none text-brand-silver-700 leading-7">
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of
              the website and services provided by The Real Help, LLC
              (&ldquo;The Real Help,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;). By accessing our website at{' '}
              <a href="https://www.therealhelp.com" className="text-brand-blue-500 hover:underline">
                therealhelp.com
              </a>{' '}
              or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              1. Use of Our Services
            </h2>
            <p>
              You agree to use our website and services only for lawful purposes
              and in accordance with these Terms. You may not use our services in
              any way that could damage, disable, or impair the site or interfere
              with any other party&rsquo;s use of it.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              2. Services
            </h2>
            <p>
              The Real Help, LLC provides business consulting, compliance and
              certification assistance, systems, application development, and
              related professional services. Specific deliverables, timelines, and
              fees are governed by separate written agreements between you and us.
              Nothing on this website constitutes legal, financial, or professional
              advice unless expressly agreed in writing.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              3. SMS / Text Messaging Terms
            </h2>
            <p>
              By opting in and providing your mobile phone number, you agree to
              receive text messages from The Real Help, LLC related to your
              inquiries, appointments, account updates, and services.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Message frequency:</strong> Message frequency varies based
                on your interactions with us.
              </li>
              <li>
                <strong>Message and data rates:</strong> Message and data rates may
                apply. Contact your wireless provider for details about your plan.
              </li>
              <li>
                <strong>Opting out:</strong> Reply <strong>STOP</strong> at any time
                to cancel. Reply <strong>HELP</strong> for assistance.
              </li>
              <li>
                <strong>Privacy:</strong> No mobile information will be shared with
                third parties or affiliates for marketing or promotional purposes.
                See our{' '}
                <a href="/privacy" className="text-brand-blue-500 hover:underline">
                  Privacy Policy
                </a>{' '}
                for full details.
              </li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              images, is the property of The Real Help, LLC or its licensors and is
              protected by applicable intellectual property laws. You may not
              reproduce, distribute, or create derivative works without our prior
              written permission.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              5. Disclaimers
            </h2>
            <p>
              Our website and services are provided &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; without warranties of any kind, express or
              implied. We do not warrant that the site will be uninterrupted,
              error-free, or free of harmful components.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, The Real Help, LLC shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of our website
              or services.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              7. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of Missouri,
              without regard to its conflict of law principles.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              8. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will
              revise the &ldquo;Last updated&rdquo; date above. Your continued use
              of our website or services after changes take effect constitutes
              acceptance of the updated Terms.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-brand-black">
              9. Contact Us
            </h2>
            <p>If you have questions about these Terms, please contact us:</p>
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
