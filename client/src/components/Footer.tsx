import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import ContentWrapper from "@/components/ContentWrapper";
import { FooterLogo } from "../../public/img";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16">
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src={FooterLogo}
                alt="Resume Builder Logo"
                height={60}
                width={220}
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-body">
              Create professional resumes and cover letters in minutes. Our
              AI-powered platform helps you craft the perfect document to land
              your dream job.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-4 font-body">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Cover Letter Templates
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Resume Examples
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 font-heading">
              Resources
            </h3>
            <ul className="space-y-4 font-body">
              <li>
                <Link
                  href="/app/resumes"
                  className="hover:text-white transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Cover Letter Builder
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Job Search Tips
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Interview Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 font-heading">
              Contact Us
            </h3>
            <ul className="space-y-4 font-body">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:contact@careerstick.com"
                  className="hover:text-white transition-colors"
                >
                  contact@careerstick.com
                </a>
              </li>
              {/* <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +91 878987653
                </a>
              </li> */}
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <address className="not-italic hover:text-white transition-colors">
                  Salt Lake City Sector 5,
                  <br />
                  Kolkata
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
}
