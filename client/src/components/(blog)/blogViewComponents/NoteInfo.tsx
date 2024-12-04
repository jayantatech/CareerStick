import { Card } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";
import React from "react";

const NoteBox = ({ title, content }: { title: string; content: string }) => {
  return (
    <Card className="relative overflow-hidden my-3 bg-gradient-to-br rounded bg-[#EFF6FF] dark:from-blue-900/20 dark:to-blue-800/20 border-blue-100 dark:border-blue-700 p-6 shadow">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700/30 rounded -translate-y-16 translate-x-16 blur-3xl opacity-50"></div>
      <div className="relative flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
            <LightbulbIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Note:
          </h4>
          {title.length > 0 && (
            <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
              {title}
            </h4>
          )}
          <div className=" text-lg text-muted-foreground font-blogText leading-relaxed  group-hover:text-gray-900 transition-colors duration-300">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NoteBox;
