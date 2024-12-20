// import ContentWrapper from "@/components/ContentWrapper";

// export default function PrivacyPolicy() {
//   return (
//     <div className="bg-white min-h-screen py-12">
//       <ContentWrapper>
//         <div className="max-w-3xl mx-auto">
//           <h1 className="font-heading text-5xl font-bold mb-12 text-center text-gray-800">
//             Privacy Policy
//           </h1>
//           <div className="space-y-6 font-body text-gray-600">
//             <p>
//               Your privacy is important to us. It is our policy to respect your
//               privacy regarding any information we may collect from you across
//               our website.
//             </p>
//             <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
//               Information We Collect
//             </h2>
//             <p>
//               We only ask for personal information when we truly need it to
//               provide a service to you. We collect it by fair and lawful means,
//               with your knowledge and consent.
//             </p>
//             <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
//               How We Use Your Information
//             </h2>
//             <p>
//               We use the information we collect in various ways, including to:
//             </p>
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Provide, operate, and maintain our website</li>
//               <li>Improve, personalize, and expand our website</li>
//               <li>Understand and analyze how you use our website</li>
//               <li>
//                 Develop new products, services, features, and functionality
//               </li>
//             </ul>
//             <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
//               Data Protection
//             </h2>
//             <p>
//               We implement a variety of security measures to maintain the safety
//               of your personal information when you enter, submit, or access
//               your personal information.
//             </p>
//             <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
//               Changes to This Policy
//             </h2>
//             <p>
//               We may update our Privacy Policy from time to time. We will notify
//               you of any changes by posting the new Privacy Policy on this page.
//             </p>
//             <p className="mt-8 text-sm text-gray-500">
//               This policy is effective as of 1 January 2023.
//             </p>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }
import ContentWrapper from "@/components/ContentWrapper";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CareerStick Privacy Policy - Your Data, Your Rights",
  description:
    "Learn how CareerStick protects your personal information and ensures your data privacy while using our AI-powered resume-building platform.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen py-12">
      <ContentWrapper>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl font-bold mb-12 text-center text-gray-800">
            Privacy Policy
          </h1>
          <div className="space-y-6 font-blogText text-[17px] text-gray-600">
            <p>
              Welcome to <strong>CareerStick</strong>! Your privacy is of the
              utmost importance to us. This Privacy Policy outlines how we
              collect, use, and protect your personal information when you use
              our website{" "}
              <Link href="https://careerstick.com/" className="text-blue-500">
                https://careerstick.com/
              </Link>{" "}
              (referred to as &quot;the Site&quot;) and our services. By using
              our Site, you agree to the terms outlined in this Privacy Policy.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Information We Collect
            </h2>
            <p>
              To provide you with personalized resume-building services, we may
              collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> This includes your name,
                email address, phone number, job preferences, and career
                details, provided directly by you during registration or usage
                of our app.
              </li>
              <li>
                <strong>Resume Data:</strong> Information you input into your
                resumes, such as education, work experience, skills, and other
                career-related data.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact
                with our Site and services, including IP address, browser type,
                and activity logs.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              How We Use Your Information
            </h2>
            <p>We use the information collected for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To provide you with our AI-powered resume-building services.
              </li>
              <li>To personalize and enhance your experience on the Site.</li>
              <li>
                To communicate with you regarding updates, new features, and
                customer support.
              </li>
              <li>
                To improve our services by analyzing user behavior and
                preferences.
              </li>
              <li>To ensure the security and integrity of our platform.</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Sharing Your Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>With Service Providers:</strong> Trusted third-party
                service providers who assist us in operating our platform and
                delivering services, under strict confidentiality agreements.
              </li>
              <li>
                <strong>For Legal Compliance:</strong> When required to comply
                with applicable laws, regulations, or legal processes.
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have explicitly
                authorized us to share your information.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Data Protection and Security
            </h2>
            <p>
              We are committed to protecting your personal data. CareerStick
              implements industry-standard security measures to safeguard your
              information from unauthorized access, alteration, disclosure, or
              destruction. These measures include encryption, secure servers,
              and periodic security audits.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Your Rights and Choices
            </h2>
            <p>
              You have the right to access, update, or delete your personal data
              at any time. If you wish to exercise these rights, please contact
              us at{" "}
              <a
                href="mailto:support@careerstick.com"
                className="text-blue-500"
              >
                support@careerstick.com
              </a>
              . Please note that deleting certain data may limit your ability to
              use our services effectively.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Cookies and Tracking Technologies
            </h2>
            <p>
              CareerStick uses cookies and similar tracking technologies to
              enhance user experience, analyze trends, and improve our platform.
              You can control cookie preferences through your browser settings.
              However, disabling cookies may affect the functionality of certain
              features on the Site.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update this Privacy Policy to reflect
              changes in our practices, technologies, or legal requirements. Any
              modifications will be posted on this page with an updated
              &quot;Effective Date.&quot; We encourage you to review this
              Privacy Policy periodically to stay informed.
            </p>

            <p className="mt-8 text-sm text-gray-500">
              This policy is effective as of December 6, 2024 (referred to as
              &quot;Effective Date&quot;).
            </p>

            <h2 className="font-heading text-2xl font-semibold text-gray-800 mt-8">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
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
              This policy is created on December 6, 2024.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
