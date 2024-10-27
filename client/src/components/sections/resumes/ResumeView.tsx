// import ResumeSlider from "@/components/resume/ResumeSlider";
// import React from "react";

// const ResumeView = () => {
//   return (
//     <div className="w-full h-full bg-redd-200 flex items-center justify-center">
//       <div className="w-[34px] h-[812px] flex items-center justify-center gap-x-3 mr-1   ">
//         <div className="-rotate-90 flex items-center justify-start gap-3 -translate-y-60">
//           <button className="w-[160px] text-[14px] h-[30px] border border-primary bg-white  text-primary  rounded-sm font-heading font-semibold">
//             Resume Settings
//           </button>
//           <button className="w-[160px] text-[14px] h-[30px] text-primary border-primary bg-white border rounded-sm font-heading font-semibold">
//             {" "}
//             Change Template{" "}
//           </button>
//         </div>
//       </div>
//       <div className="w-[575px] h-auto mt-3">
//         <ResumeSlider />
//         <button className="w-full h-[44px] mt-2 bg-primary text-white rounded font-heading font-semibold">
//           {" "}
//           Generate{" "}
//         </button>
//       </div>
//       {/* <div className="w-[550px] h-[774px] bg-red-300"></div> */}
//     </div>
//   );
// };

// export default ResumeView;

// ResumeView.tsx
import React, { memo } from "react";
import ResumeSlider from "@/components/resume/ResumeSlider";

const ResumeView = memo(() => {
  return (
    <div className="w-full h-full bg-redd-200 flex items-center justify-center">
      <div className="w-[34px] h-[812px] flex items-center justify-center gap-x-3 mr-1">
        <div className="-rotate-90 flex items-center justify-start gap-3 -translate-y-60">
          <button className="w-[160px] text-[14px] h-[30px] border border-primary bg-white text-primary rounded-sm font-heading font-semibold">
            Resume Settings
          </button>
          <button className="w-[160px] text-[14px] h-[30px] text-primary border-primary bg-white border rounded-sm font-heading font-semibold">
            Change Template
          </button>
        </div>
      </div>
      <div className="w-[575px] h-auto mt-3">
        <ResumeSlider />
        <button className="w-full h-[44px] mt-2 bg-primary text-white rounded font-heading font-semibold">
          Generate
        </button>
      </div>
    </div>
  );
});

ResumeView.displayName = "ResumeView";
export default ResumeView;
