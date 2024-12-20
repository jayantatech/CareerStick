import React from "react";
import PricingPageContent from "./PricingPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerStick Pricing - Affordable Plans for Everyone",
  description:
    "Start for free with CareerStick's AI-powered resume builder. Upgrade to premium for exclusive features and take your career to the next level.",
};

const PricingPage = () => {
  return <PricingPageContent />;
};

export default PricingPage;
