import Footer from "@/components/Footer";
import Header from "@/components/headers/Header";
// import Header from "@/components/headers/Header";
import ArticlesSection from "@/components/pages/home/articles-section";
import CTASection from "@/components/pages/home/cta-section";
import FAQSection from "@/components/pages/home/FaqSection";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import HeroSection from "@/components/pages/home/HeroSection";
import ResumeSlider from "@/components/pages/home/HomeResumeSlider";
import ResumeAnalyzer from "@/components/pages/home/Resume-Analyzer";
import Testimonials from "@/components/pages/home/Testimonials";
import Image from "next/image";

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
