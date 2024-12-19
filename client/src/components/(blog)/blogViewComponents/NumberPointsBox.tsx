import { Card } from "@/components/ui/card";
import React from "react";
const NumberPointsBox = ({ items }: { items: string[] }) => {
  return (
    <Card className="bg-white shadow rounded border border-gray-200 p-6 mb-6 max-w-4xl mx-auto">
      {/* <div className="flex items-start justify-start w-full flex-col gap-2 mb-3">
        <h2 className="text-3xl font-bold text-gray-800">
          Steps to Create Your Resume
        </h2>
        <p className="  text-muted-foreground  text-lg font-blogText leading-relaxed  group-hover:text-gray-900 transition-colors duration-300">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio aperiam
          nesciunt dolor in ratione, facere reiciendis nisi iure inventore
          exercitationem.
        </p>
      </div> */}
      <ol className="space-y-2 list-none pl-0">
        {items.map((point, index) => (
          <li key={index} className="flex items-start gap-3 group ">
            <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded mt-2 flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-105">
              {index + 1}
            </div>
            <p className="  text-muted-foreground  text-lg font-blogText leading-relaxed pt-1 group-hover:text-gray-900 transition-colors duration-300">
              {point}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default NumberPointsBox;
