import { Card } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";
import React from "react";

const NoteInfo = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br rounded bg-[#EFF6FF] dark:from-blue-900/20 dark:to-blue-800/20 border-blue-100 dark:border-blue-700 p-6 shadow">
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
          <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert">
            <p>
              Keep in mind that resume keywords won't do much unless you're
              using an ATS-friendly resume template. After all, if the ATS can't
              even read your resume, it won't be able to scan for the keywords!
            </p>
            <p className="mt-4">
              Our resume templates are built with ATS in mind. Just pick one,
              and you won't have to worry about formatting!
            </p>{" "}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NoteInfo;
