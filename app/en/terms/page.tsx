import { LandingNavbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ratee.me',
  description: 'Terms and conditions for using the ratee.me service',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPageEN() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-content-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-content-secondary mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                1. Purpose
              </h2>
              <p className="text-content-secondary mb-4">
                These Terms of Service (ToS) govern the use of ratee.me,
                a SaaS platform for automated NPS feedback collection for freelancers and agencies.
              </p>
              <p className="text-content-secondary mb-4">
                By using ratee.me, you fully and unconditionally accept these ToS.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                2. Definitions
              </h2>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Service:</strong> the ratee.me platform and all its features</li>
                <li><strong>User:</strong> any person using the Service</li>
                <li><strong>Client:</strong> any person invited to provide feedback via ratee.me</li>
                <li><strong>Account:</strong> User's personal space on the platform</li>
                <li><strong>Subscription:</strong> pricing plan chosen by the User</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                3. Registration and Account
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>3.1 Registration Requirements</strong><br />
                To use ratee.me, you must:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and up-to-date information</li>
                <li>Create an account with a valid email address</li>
              </ul>
              <p className="text-content-secondary mb-4">
                <strong>3.2 Account Security</strong><br />
                You are responsible for maintaining the confidentiality of your credentials and all activities conducted from your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                4. Service Description
              </h2>
              <p className="text-content-secondary mb-4">
                ratee.me allows you to:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Create and manage client projects</li>
                <li>Automatically send NPS feedback requests</li>
                <li>Collect and analyze responses</li>
                <li>Obtain client testimonials</li>
                <li>Display an NPS badge on your website</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                5. Pricing and Payment
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>5.1 Pricing Plans</strong><br />
                ratee.me offers different pricing plans (Free, Pro, Business). Current pricing is available on the <a href="/pricing" className="text-emerald-500 hover:text-emerald-600">Pricing</a> page.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.2 Payment</strong><br />
                Payments are securely processed by Stripe. Subscriptions are billed monthly or annually based on your choice.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.3 Cancellation</strong><br />
                You can cancel your subscription at any time from your account. Cancellation takes effect at the end of the current billing period.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>5.4 Refunds</strong><br />
                No refunds are provided for periods already billed, except in case of major service malfunction not resolved within a reasonable time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                6. Service Usage
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>6.1 Proper Use</strong><br />
                You agree to use the Service lawfully and in accordance with these ToS.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>6.2 Prohibitions</strong><br />
                It is strictly prohibited to:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Use the Service to send spam or unsolicited messages</li>
                <li>Attempt to bypass the limitations of your pricing plan</li>
                <li>Impersonate another person or company</li>
                <li>Collect data illegally</li>
                <li>Use the Service to harass, threaten, or defame</li>
                <li>Attempt to access systems in an unauthorized manner</li>
                <li>Resell or redistribute the Service without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>7.1 Service</strong><br />
                All elements of the Service (code, design, trademarks, logos) are the exclusive property of ratee.me and protected by copyright.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>7.2 Your Data</strong><br />
                You retain all rights to the data you collect via the Service. We claim no ownership rights to your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                8. Responsibilities
              </h2>
              <p className="text-content-secondary mb-4">
                <strong>8.1 Our Responsibility</strong><br />
                We strive to maintain the Service available 24/7, but do not guarantee uninterrupted availability.
                We are not responsible for indirect damages resulting from the use of the Service.
              </p>
              <p className="text-content-secondary mb-4">
                <strong>8.2 Your Responsibility</strong><br />
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>The accuracy of the information you provide</li>
                <li>GDPR compliance of your feedback campaigns</li>
                <li>Obtaining consent from your clients to contact them</li>
                <li>Backing up your important data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                9. Personal Data
              </h2>
              <p className="text-content-secondary mb-4">
                The use of your personal data is governed by our <a href="/en/privacy" className="text-emerald-500 hover:text-emerald-600">Privacy Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                10. Suspension and Termination
              </h2>
              <p className="text-content-secondary mb-4">
                We reserve the right to suspend or terminate your account in case of:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Violation of these ToS</li>
                <li>Non-payment</li>
                <li>Fraudulent or abusive use of the Service</li>
                <li>Illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                11. Changes to ToS
              </h2>
              <p className="text-content-secondary mb-4">
                We may modify these ToS at any time. Changes take effect upon publication.
                Your continued use of the Service after modification constitutes acceptance of the new ToS.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                12. Applicable Law
              </h2>
              <p className="text-content-secondary mb-4">
                These ToS are governed by French law. Any dispute will be submitted to the competent courts of Paris, France.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                13. Contact
              </h2>
              <p className="text-content-secondary mb-4">
                For any questions regarding these terms of service:
              </p>
              <ul className="list-none text-content-secondary space-y-2 mb-4">
                <li>Email: <a href="mailto:legal@ratee.me" className="text-emerald-500 hover:text-emerald-600">legal@ratee.me</a></li>
                <li>Website: <a href="https://ratee.me" className="text-emerald-500 hover:text-emerald-600">https://ratee.me</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
