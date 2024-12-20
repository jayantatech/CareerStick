import ContentWrapper from "@/components/ContentWrapper";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CareerStick Cookie Policy - How We Use Cookies",
  description:
    "Understand how CareerStick uses cookies to improve your experience and ensure seamless functionality on our AI-powered resume platform.",
};

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen py-12">
      <ContentWrapper>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl font-bold mb-12 text-center text-gray-800">
            Cookie Policy
          </h1>
          <div className="space-y-6 font-blogText text-[17px] text-gray-600">
            <p>
              At <strong>CareerStick</strong>, we use cookies and similar
              technologies to enhance your experience on our website,{" "}
              <Link href="https://careerstick.com/" className="text-blue-500">
                https://careerstick.com/
              </Link>
              . This Cookie Policy explains what cookies are, how we use them,
              and how you can control them.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help the website remember your preferences and
              provide functionality like secure logins and tailored content.
              Cookies can be categorized as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Necessary for the website to
                function properly.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect information about
                how users interact with the website to improve its performance.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Allow the website to
                remember user preferences.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Track user activity to
                deliver personalized ads.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              How We Use Cookies
            </h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To enable essential website functions like logging in and
                account management.
              </li>
              <li>
                To analyze website traffic and user behavior for improvement.
              </li>
              <li>
                To personalize your experience by remembering preferences and
                past interactions.
              </li>
              <li>
                To deliver relevant ads and marketing content tailored to your
                interests.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Third-Party Cookies
            </h2>
            <p>
              We may use third-party services, such as analytics tools (e.g.,
              Google Analytics) and advertising networks, that set cookies on
              your device to provide their services. These third parties may
              collect information about your online activities over time and
              across websites.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              How to Manage Cookies
            </h2>
            <p>
              You can control or disable cookies through your browser settings.
              Note that disabling certain cookies may affect the functionality
              of the website. Here’s how to manage cookies on common browsers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  className="text-blue-500"
                  target="_blank"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/en-us/HT201265"
                  className="text-blue-500"
                  target="_blank"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                  className="text-blue-500"
                  target="_blank"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  className="text-blue-500"
                  target="_blank"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
              Continued use of our website after changes are posted indicates
              your acceptance of the updated policy.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Cookie Policy,
              please contact us at{" "}
              <a
                href="mailto:support@careerstick.com"
                className="text-blue-500"
              >
                support@careerstick.com
              </a>
              .
            </p>

            <p className="mt-8 text-sm text-gray-500">
              This Cookie Policy is effective as of December 6, 2024.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
