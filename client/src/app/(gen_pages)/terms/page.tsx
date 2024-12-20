import ContentWrapper from "@/components/ContentWrapper";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CareerStick Terms of Service - Know Your Rights & Responsibilities",
  description:
    "Read the CareerStick Terms of Service to understand the rules, guidelines, and policies for using our AI-powered resume-building platform.",
};

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen py-12">
      <ContentWrapper>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl font-bold mb-12 text-center text-gray-800">
            Terms of Service
          </h1>
          <div className="space-y-6 font-blogText text-[17px] text-gray-600">
            <p>
              Welcome to <strong>CareerStick</strong>! These Terms of Service
              (&quot;Terms&quot;) govern your access to and use of our website{" "}
              <Link href="https://careerstick.com/" className="text-blue-500">
                https://careerstick.com/
              </Link>{" "}
              and related services (collectively, the &quot;Service&quot;). By
              accessing or using our Service, you agree to be bound by these
              Terms. If you do not agree, you may not use the Service.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Use of the Service
            </h2>
            <p>By using CareerStick, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for lawful purposes only.</li>
              <li>
                Provide accurate and up-to-date information during registration
                or use of the Service.
              </li>
              <li>
                Refrain from engaging in unauthorized access, data scraping, or
                reverse engineering of the Service.
              </li>
              <li>
                Respect the intellectual property rights of CareerStick and
                other users.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              User Accounts
            </h2>
            <p>
              To access certain features, you may need to create an account. You
              are responsible for maintaining the confidentiality of your login
              credentials and for all activities that occur under your account.
              If you suspect unauthorized access to your account, notify us
              immediately at{" "}
              <a
                href="mailto:support@careerstick.com"
                className="text-blue-500"
              >
                support@careerstick.com
              </a>
              .
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Payments and Subscriptions
            </h2>
            <p>
              Certain features of CareerStick may require a subscription or
              one-time payment. By purchasing a subscription, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pay all applicable fees as outlined during your purchase.</li>
              <li>
                Provide accurate billing information and update it as necessary.
              </li>
              <li>
                Comply with our{" "}
                <a href="/refund-policy" className="text-blue-500">
                  Refund Policy
                </a>
                , if applicable.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Intellectual Property
            </h2>
            <p>
              CareerStick retains all rights, title, and interest in the
              Service, including but not limited to text, graphics, logos, and
              software. Users may not copy, reproduce, or distribute any part of
              the Service without explicit permission.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              User Content
            </h2>
            <p>
              Users may upload, input, or share content, including resume
              details and personal data (&quot;User Content&quot;). By
              submitting User Content, you grant CareerStick a non-exclusive,
              royalty-free license to use, display, and process your content
              solely for providing the Service.
            </p>
            <p>
              Users are responsible for ensuring that their User Content does
              not infringe on any intellectual property or privacy rights of
              third parties.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Termination
            </h2>
            <p>
              CareerStick reserves the right to suspend or terminate your access
              to the Service at any time, with or without notice, for violating
              these Terms or engaging in any activity that harms the integrity
              of the platform.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Limitation of Liability
            </h2>
            <p>
              CareerStick provides the Service &quot;as is&quot; without
              warranties of any kind. We are not liable for any indirect,
              incidental, or consequential damages arising from your use of the
              Service, including but not limited to loss of data or employment
              opportunities.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Changes to the Terms
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              Service after such changes indicates your acceptance of the
              updated Terms. We recommend checking this page periodically for
              updates.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of India, without regard to its conflict of law principles.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@careerstick.com"
                className="text-blue-500"
              >
                support@careerstick.com
              </a>
              .
            </p>

            <p className="mt-8 text-sm text-gray-500">
              These Terms are effective as of December 6, 2024.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
