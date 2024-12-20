import ArticlesSection from "@/components/pages/home/articles-section";
import CTASection from "@/components/pages/home/cta-section";
import FAQSection from "@/components/pages/home/FaqSection";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import HeroSection from "@/components/pages/home/HeroSection";
import ResumeSlider from "@/components/pages/home/HomeResumeSlider";
import ResumeAnalyzer from "@/components/pages/home/Resume-Analyzer";
import Testimonials from "@/components/pages/home/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Free Resume Generator - CareerStick",
  description:
    "Create professional resumes effortlessly with CareerStick, the free AI-powered resume generator. Build your perfect resume in minutes and stand out to employers.",
};

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <HeroSection />
      <Testimonials />
      <FeaturesSection />
      <ResumeAnalyzer />
      <ResumeSlider />
      <ArticlesSection />
      <FAQSection />
      <CTASection />
      {/* <Footer /> */}
    </>
  );
}
