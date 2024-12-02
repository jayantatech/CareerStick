"use client";

import { FC } from "react";
import { PiListNumbersBold } from "react-icons/pi";

const NumberedPoints: FC = () => (
  <div className="py-12">
    <div className="bg-white shadow rounded border p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
          <PiListNumbersBold className="text-2xl" />
        </div>
        <h2 className="text-3xl font-bold">Steps to Create Your Resume</h2>
      </div>
      <ol className="space-y-4">
        {[
          "Choose the right resume format based on your experience",
          "Add your contact information",
          "Write a compelling summary",
          "Highlight work experience",
        ].map((point, index) => (
          <li key={index} className="text-lg">
            {index + 1}. {point}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default NumberedPoints;
