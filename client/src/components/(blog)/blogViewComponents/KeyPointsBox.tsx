import { Card } from "@/components/ui/card";
import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";

const KeyPointsBox = ({ items }: { items: string[] }) => {
  return (
    <Card className="bg-white shadow rounded border border-gray-200 p-6 max-lg:p-5 max-md:p-4 max-w-4xl mx-auto my-4">
      {/* <div className="flex items-center justify-start w-full gap-4 mb-6">
        <div className="w-10 h-10 max-md:h-8 max-md:w-8  bg-primary/10 flex items-center justify-center rounded text-primary">
          <PiListChecksBold className="text-2xl max-md:text-2xl" />
        </div>

        <h2 className="text-3xl max-md:text-xl font-bold text-gray-800">
          Steps to Create Your Resume
        </h2>
      </div> */}
      <ul className="space-y-4">
        {items.map((point, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className="mt-1.5 transition-all duration-300 group-hover:scale-110">
              <IoCheckmarkDone className="h-5 w-5 flex-shrink-0 text-green-600" />
            </div>
            <span className="blogTextColor text-muted-foreground text-[18px]  font-blogText leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default KeyPointsBox;
