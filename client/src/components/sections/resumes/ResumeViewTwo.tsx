import React, { memo } from "react";
import ResumeSliderTwo from "@/components/resume/ResumeSliderTwo";

const ResumeViewTwo = memo(() => {
  return (
    <div className="w-full h-full flex items-center justify-start pl-8 py-8">
      <div className="w-[800px] h-auto">
        <ResumeSliderTwo />
        {/* <button className="w-full h-[44px] mt-2 bg-primary text-white rounded font-heading font-semibold">
          Generate
        </button> */}
      </div>
    </div>
  );
});

ResumeViewTwo.displayName = "ResumeViewTwo";
export default ResumeViewTwo;
