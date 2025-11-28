import { LandingNavbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ratee.me',
  description: 'Privacy policy and personal data protection for ratee.me',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageEN() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sora text-4xl font-bold text-content-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-content-secondary mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                1. Introduction
              </h2>
              <p className="text-content-secondary mb-4">
                Welcome to ratee.me. We place great importance on protecting your personal data.
                This privacy policy explains how we collect, use, store, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                2. Data Collection
              </h2>
              <p className="text-content-secondary mb-4">
                We collect the following information:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Identification information:</strong> name, first name, email address</li>
                <li><strong>Professional information:</strong> company name, industry</li>
                <li><strong>Feedback data:</strong> NPS responses, comments, testimonials</li>
                <li><strong>Payment data:</strong> securely processed by Stripe (we do not store your banking details)</li>
                <li><strong>Technical data:</strong> IP address, browser type, pages visited</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                3. Data Usage
              </h2>
              <p className="text-content-secondary mb-4">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Provide and improve our services</li>
                <li>Manage your account and subscriptions</li>
                <li>Send feedback requests to your clients</li>
                <li>Generate statistics and analytics</li>
                <li>Send you important service communications</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                4. Data Sharing
              </h2>
              <p className="text-content-secondary mb-4">
                We never sell your personal data. We may share your data with:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Service providers:</strong> Supabase (database hosting), Stripe (payments), Resend (emails)</li>
                <li><strong>Legal obligations:</strong> if required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                5. Data Security
              </h2>
              <p className="text-content-secondary mb-4">
                We implement appropriate technical and organizational security measures:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>SSL/TLS encryption for all communications</li>
                <li>Secure authentication via Supabase</li>
                <li>Regular database backups</li>
                <li>Restricted access to personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                6. Your Rights (GDPR)
              </h2>
              <p className="text-content-secondary mb-4">
                In accordance with GDPR, you have the following rights:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li><strong>Right of access:</strong> obtain a copy of your data</li>
                <li><strong>Right to rectification:</strong> correct inaccurate data</li>
                <li><strong>Right to erasure:</strong> delete your data (under certain conditions)</li>
                <li><strong>Right to data portability:</strong> retrieve your data in a structured format</li>
                <li><strong>Right to object:</strong> object to the processing of your data</li>
                <li><strong>Right to restriction:</strong> restrict the processing of your data</li>
              </ul>
              <p className="text-content-secondary mb-4">
                To exercise your rights, contact us at: <a href="mailto:privacy@ratee.me" className="text-emerald-500 hover:text-emerald-600">privacy@ratee.me</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                7. Cookies
              </h2>
              <p className="text-content-secondary mb-4">
                We use essential cookies to:
              </p>
              <ul className="list-disc list-inside text-content-secondary space-y-2 mb-4">
                <li>Maintain your login session</li>
                <li>Ensure site security</li>
                <li>Remember your preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                8. Data Retention
              </h2>
              <p className="text-content-secondary mb-4">
                We retain your data as long as necessary to provide our services and comply with our legal obligations.
                When you delete your account, your personal data is deleted within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                9. Policy Changes
              </h2>
              <p className="text-content-secondary mb-4">
                We may modify this privacy policy. We will inform you of any significant changes by email
                or via a notification on the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-sora text-2xl font-bold text-content-primary mb-4">
                10. Contact
              </h2>
              <p className="text-content-secondary mb-4">
                For any questions regarding this privacy policy:
              </p>
              <ul className="list-none text-content-secondary space-y-2 mb-4">
                <li>Email: <a href="mailto:privacy@ratee.me" className="text-emerald-500 hover:text-emerald-600">privacy@ratee.me</a></li>
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
