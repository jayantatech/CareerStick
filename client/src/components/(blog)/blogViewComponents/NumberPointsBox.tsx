import { Card } from "@/components/ui/card";
import React from "react";
import { PiListNumbersBold } from "react-icons/pi";

const NumberPointsBox = () => {
  return (
    <Card className="bg-white shadow-lg rounded border border-gray-200 p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-start w-full gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
          <PiListNumbersBold className="text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Steps to Create Your Resume
        </h2>
      </div>
      <ol className="space-y-4 list-none pl-0">
        {[
          "Choose the right resume format based on your experience and the job requirements",
          "Start with your contact information, including your full name, phone number, email, and location",
          "Craft a compelling summary or objective statement that highlights your key qualifications",
          "List your work experience, starting with the most recent position                     List your work experience, starting with the most recent position,",
          "Include your educational background, relevant certifications, and academic achievements",
          "Highlight your skills, both hard and soft, that are relevant to the position",
          "Add optional sections such as volunteer work, projects, or awards if they strengthen your application",
          "Proofread your resume carefully and consider having someone else review it as well",
        ].map((point, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110">
              {index + 1}
            </div>
            <span className="text-gray-700 font-blogText leading-relaxed pt-1 group-hover:text-gray-900 transition-colors duration-300">
              {point}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default NumberPointsBox;
