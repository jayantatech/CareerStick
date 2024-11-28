import { Card } from "@/components/ui/card";
import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { PiListChecksBold } from "react-icons/pi";

const KeyPointsBox = () => {
  return (
    <Card className="bg-white shadow-lg rounded border border-gray-200 p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-start w-full gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
          <PiListChecksBold className="text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Key Points for a Stellar Resume
        </h2>
      </div>
      <ul className="space-y-4">
        {[
          {
            title: "Choose the Right Format",
            content:
              "Select a chronological, functional, or combination resume format based on your experience and the job requirements.",
          },
          {
            title: "Start with Your Contact Information",
            content:
              "Include your full name, phone number, email address, and location (city and state/country).",
          },
          {
            title: "Craft a Compelling Summary or Objective",
            content:
              "Write a brief, impactful statement that highlights your key qualifications and career goals.",
          },
          {
            title: "List Your Work Experience",
            content:
              "Detail your relevant work history, starting with your most recent position. Use bullet points to describe your responsibilities and achievements.",
          },
          {
            title: "Highlight Your Education",
            content:
              "Include your highest level of education, relevant certifications, and any academic achievements.",
          },
          {
            title: "Showcase Your Skills",
            content:
              "List both hard and soft skills that are relevant to the position you're applying for.",
          },
          {
            title: "Add Optional Sections",
            content:
              "Consider including sections for volunteer work, projects, publications, or awards if they strengthen your application.",
          },
          {
            title: "Proofread and Refine",
            content:
              "Carefully review your resume for any errors or inconsistencies. Consider having someone else review it as well.",
          },
        ].map((point, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className="mt-1.5 transition-all duration-300 group-hover:scale-110">
              <IoCheckmarkDone className="h-5 w-5 flex-shrink-0 text-green-600" />
            </div>
            <span className="text-gray-700 font-blogText leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
              {point.content}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default KeyPointsBox;
