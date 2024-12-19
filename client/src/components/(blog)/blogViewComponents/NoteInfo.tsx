// import { Card } from "@/components/ui/card";
// import { LightbulbIcon } from "lucide-react";
// import React from "react";

// const NoteBox = ({ title, content }: { title: string; content: string }) => {
//   return (
//     <Card className="relative overflow-hidden my-3 bg-gradient-to-br rounded bg-[#EFF6FF] dark:from-blue-900/20 dark:to-blue-800/20 border-blue-100 dark:border-blue-700 p-6 shadow">
//       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700/30 rounded -translate-y-16 translate-x-16 blur-3xl opacity-50"></div>
//       <div className="relative flex items-start space-x-4">
//         <div className="flex-shrink-0 mt-1">
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
//             <LightbulbIcon className="w-6 h-6" />
//           </div>
//         </div>
//         <div className="flex-grow">
//           <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
//             Note:
//           </h4>
//           {title.length > 0 && (
//             <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
//               {title}
//             </h4>
//           )}
//           <div className=" text-lg text-muted-foreground font-blogText leading-relaxed  group-hover:text-gray-900 transition-colors duration-300">
//             <p>{content}</p>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default NoteBox;

// import React from "react";
// import { Card } from "@/components/ui/card";
// import { LightbulbIcon } from "lucide-react";

// interface NoteBoxProps {
//   title: string;
//   content: string;
// }

// const NoteBox: React.FC<NoteBoxProps> = ({ title, content }) => {
//   return (
//     <Card className="my-6 overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
//       <div className="p-6">
//         <div className="flex items-center space-x-4 mb-4">
//           <div className="flex-shrink-0">
//             <div className="w-12 h-12 rounded-full bg-amber-400 dark:bg-amber-600 flex items-center justify-center">
//               <LightbulbIcon className="w-7 h-7 text-white" />
//             </div>
//           </div>
//           <div className="flex-grow">
//             <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">
//               Note
//             </h3>
//             {title && (
//               <h4 className="text-lg font-semibold text-amber-700 dark:text-amber-400 mt-1">
//                 {title}
//               </h4>
//             )}
//           </div>
//         </div>
//         <div className="pl-16">
//           <div className="prose dark:prose-invert max-w-none">
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//               {content}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="h-1 w-full bg-gradient-to-r from-amber-300 to-yellow-300 dark:from-amber-700 dark:to-yellow-700"></div>
//     </Card>
//   );
// };

// export default NoteBox;

import React from "react";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

interface NoteBoxProps {
  title: string;
  content: string;
}

const NoteBox: React.FC<NoteBoxProps> = ({ title, content }) => {
  return (
    <Card className="my-6 overflow-hidden bg-[#EFF6FF] dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 shadow transition-all duration-300 hover:shadow-md rounded">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
              <InfoIcon className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
              Note
            </h3>
            {title && (
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mt-1">
                {title}
              </h4>
            )}
          </div>
        </div>
        <div className="mt-4">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 font-blogText text-[18px] dark:text-gray-300 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600"></div>
    </Card>
  );
};

export default NoteBox;
