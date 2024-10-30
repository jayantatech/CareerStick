import React, { memo } from "react";
import ResumeSliderTwo from "@/components/resume/ResumeSliderTwo";

const ResumeViewTwo = memo(() => {
  return (
    <div className="w-full h-full flex items-center justify-start pl-8 py-8">
      <div className="w-[770px] max-xl-desktop:w-[720px] h-auto max-xl-desktop:h-[973px] max-s-desktop:w-[520px] max-s-desktop:h-[733px] max-m-desktop:w-[580px] max-m-desktop:bg-red-500 max-m-desktop:h-[818px] bg-fuchsia-600 max-u-s-desktop:h-[705px] max-u-s-desktop:w-[500px] max-l-tablet:w-[480px] max-l-tablet:h-[677px]">
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
