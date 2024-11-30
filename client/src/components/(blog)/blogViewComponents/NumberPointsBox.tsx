import { Card } from "@/components/ui/card";
import React from "react";
import { PiListNumbersBold } from "react-icons/pi";

const NumberPointsBox = ({ items }: { items: string[] }) => {
  return (
    <Card className="bg-white shadow-md rounded border border-gray-200 p-8 mb-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-start w-full gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
          <PiListNumbersBold className="text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          Steps to Create Your Resume
        </h2>
      </div>
      <ol className="space-y-4 list-none pl-0">
        {items.map((point, index) => (
          <li key={index} className="flex items-start gap-3 group ">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110">
              {index + 1}
            </div>
            <p className=" text-base text-muted-foreground font-blogText leading-relaxed pt-1 group-hover:text-gray-900 transition-colors duration-300">
              {point}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default NumberPointsBox;
