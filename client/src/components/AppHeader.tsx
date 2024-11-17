// import React from "react";
// import iconMapping, { IconName } from "../../public/icons";
// import { Skeleton } from "./ui/skeleton";

// const AppHeader = ({
//   title,
//   buttonText,
//   iconName,
//   onButtonClick,
//   isLoading = false,
// }: {
//   iconName?: IconName;
//   title: string;
//   buttonText?: string;
//   onButtonClick?: () => void;
//   isLoading?: boolean;
// }) => {
//   const Icon = iconName ? iconMapping[iconName] : null;

//   return (
//     <header className="w-full h-[63px] bg-white border-b flex-shrink-0 z-0 ">
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
//         <div className="py-[13px] flex items-center justify-between">
//           <h1 className="font-heading font-semibold text-2xl text-gray-900">
//             {title}
//           </h1>
//           {buttonText ? (
//             isLoading ? (
//               <Skeleton className="w-[180px] px-3 h-[40px] bg-blue-50" />
//             ) : (
//               <button
//                 className="w-auto px-3 h-[36px] rounded font-heading font-semibold text-[16px] bg-primary text-white flex items-center justify-center gap-1"
//                 onClick={onButtonClick}
//               >
//                 {Icon && <Icon className="text-[20px] " />}
//                 {buttonText}
//                 {/* <MdAdd className="mr-2 inline" /> Create Resume */}
//               </button>
//             )
//           ) : null}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AppHeader;

import React from "react";
import iconMapping, { IconName } from "../../public/icons";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";

const AppHeader = ({
  title,
  buttonText,
  iconName,
  onButtonClick,
  isLoading = false,
  isCreating = false,
}: {
  iconName?: IconName;
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
  isCreating?: boolean;
}) => {
  const Icon = iconName ? iconMapping[iconName] : null;

  return (
    <header className="w-full h-[63px] bg-white border-b flex-shrink-0 z-0">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
        <div className="py-[13px] flex items-center justify-between">
          <h1 className="font-heading font-semibold text-2xl text-gray-900">
            {title}
          </h1>
          {buttonText ? (
            isLoading ? (
              <Skeleton className="w-[180px] px-3 h-[40px] bg-blue-50" />
            ) : (
              <button
                className="w-auto px-3 h-[36px] rounded font-heading font-semibold text-[16px] bg-primary text-white flex items-center justify-center gap-2"
                onClick={onButtonClick}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Resume...
                  </>
                ) : (
                  <>
                    {Icon && <Icon className="text-[20px]" />}
                    {buttonText}
                  </>
                )}
              </button>
            )
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
