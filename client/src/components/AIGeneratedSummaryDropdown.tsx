// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { BsChatRightTextFill } from "react-icons/bs";

// export default function AIGeneratedSummaryDropdown() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <div className="w-auto h-[36px] cursor-pointer border bg-primary border-white text-white absolute bottom-3 p-2 right-2 rounded flex items-center justify-center gap-1">
//           <BsChatRightTextFill className="mt-1.5" />
//           <p className="text-[14px] font-body font-semibold">
//             AI Generated Summary
//           </p>
//         </div>{" "}
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[518px] h-[310px] absolute lg:left-0 top-4 border border-gray-200 px-2   ">
//         <DropdownMenuLabel>AI Generated Professional Summary</DropdownMenuLabel>
//         <div className="w-full h-auto bg-blue-200 rounded py-1">
//           <div className="w-full h-[268px] flex items-center justify-center flex-col gap-1.5 overflow-y-auto py-4">
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//             <p className="font-body font-normal rounded text-[15px] text-gray-500 border px-2 cursor-pointer">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Recusandae voluptate accusantium eligendi iste officia aspernatur
//               ipsam eum placeat ut quidem.
//             </p>
//           </div>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChatRightTextFill } from "react-icons/bs";

export default function AIGeneratedSummaryDropdown({ onSelect }: any) {
  const [open, setOpen] = useState(false);

  const summaries = [
    "Experienced software developer with 5+ years in full-stack development, specializing in React and Node.js.",
    "Results-driven marketing professional with proven track record in digital campaign management and brand development.",
    "Creative graphic designer with expertise in Adobe Creative Suite and UI/UX principles.",
    "Detail-oriented project manager with PMP certification and experience leading cross-functional teams.",
    "Dynamic sales executive with consistent record of exceeding targets and building client relationships.",
    "Innovative product manager skilled in agile methodologies and stakeholder management.",
  ];

  const handleSelect = (text: any) => {
    onSelect(text);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 absolute bottom-3 right-2"
        >
          <BsChatRightTextFill />
          AI Generated Summary
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[480px] ">
        <div className="p-4">
          <h3 className="font-semibold mb-3">
            AI Generated Professional Summary
          </h3>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {summaries.map((summary, index) => (
              <p
                key={index}
                onClick={() => handleSelect(summary)}
                className="mb-3 p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              >
                {summary}
              </p>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
