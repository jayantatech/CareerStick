import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { NewsLetterImage } from "../../../../public/img";

interface NewsletterCardProps {
  className?: string;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ className }) => {
  return (
    <Card
      className={`overflow-hidden rounded bg-[#EFF6FF] shadow p-4 mt-4 border ${className}`}
    >
      <div className="relative w-full h-48 bg-[#EFF6FF]">
        <Image
          src={NewsLetterImage}
          alt="Newsletter illustration"
          fill
          className="object-contain p-4 scale-[1.7]"
          priority
        />
      </div>

      <div className=" space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 text-center font-heading">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-600 text-center font-blogText">
            Get weekly resume tips and job search advice delivered straight to
            your inbox
          </p>
        </div>

        <form className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/80 backdrop-blur-sm rounded font-blogText border-blue-100 focus:border-blue-200 focus:ring-blue-200 placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary font-heading rounded font-semibold hover:bg-blue-700 text-white"
          >
            Subscribe Now
          </Button>
        </form>

        <div className="text-xs text-gray-500 text-center space-y-2 font-blogText">
          <p>
            By clicking "Subscribe Now" you agree to receive marketing
            communications.
          </p>
          <p className="space-x-1 ">
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>
            <span>and</span>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p>You can unsubscribe at any time.</p>
        </div>
      </div>
    </Card>
  );
};

export default NewsletterCard;
