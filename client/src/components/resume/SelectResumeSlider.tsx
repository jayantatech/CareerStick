// import React from "react";
// import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// const SelectResumeSlider = () => {
//   return (
//     <div className=" w-[calc(100%-4%)] p-3  rounded h-[280px] bg-red-300 sticky bottom-10 left-8 z-50">
//       <Carousel className="w-full h-full basis-3/4">
//         <CarouselContent>
//           {Array.from({ length: 10 }).map((item, index) => (
//             <CarouselItem key={index}>
//               <div className="w-[150px] h-[150px] bg-blue-300">adfasdf</div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// };

// export default SelectResumeSlider;

// // components/SelectResumeSlider.tsx
// "use client";

// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// // import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// interface SelectResumeSliderProps {
//   className?: string;
// }

// const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
//   className,
// }) => {
//   return (
//     <div
//       className={cn(
//         "w-[calc(100%-4%)] p-3 rounded h-[280px] bg-red-300 sticky bottom-10 left-8 z-50",
//         className
//       )}
//     >
//       <Carousel
//         className="w-full h-full"
//         opts={{
//           align: "start",
//           slidesToScroll: "auto",
//         }}
//       >
//         <CarouselContent className="-ml-4">
//           {Array.from({ length: 10 }).map((_, index) => (
//             <CarouselItem key={index} className="pl-4 basis-1/5 md:basis-1/5">
//               <div className="border-0 select-none">
//                 <div className="p-0">
//                   <div className="w-[150px] h-[150px] bg-blue-300 flex items-center justify-center">
//                     {`Item ${index + 1}`}
//                   </div>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// };

// export default SelectResumeSlider;

// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// interface SelectResumeSliderProps {
//   className?: string;
// }

// const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
//   className,
// }) => {
//   return (
//     <div
//       className={cn(
//         "w-[calc(100%-4%)] p-6 rounded bg-white/95 backdrop-blur-sm shadow-lg sticky bottom-10 left-8 z-50",
//         className
//       )}
//     >
//       <div className="relative">
//         <Carousel
//           className="w-full"
//           opts={{
//             align: "start",
//             slidesToScroll: 1,
//           }}
//         >
//           <CarouselContent className="-ml-4">
//             {Array.from({ length: 10 }).map((_, index) => (
//               <CarouselItem
//                 key={index}
//                 className="pl-4 basis-1/5 md:basis-1/5 cursor-pointer"
//               >
//                 <div className="p-1 transition-all duration-200 hover:scale-105">
//                   <div className="w-[150px] aspect-[1/1.4] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center overflow-hidden group">
//                     <div className="text-sm font-medium text-gray-600">
//                       Template {index + 1}
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
{
  /* <CarouselPrevious className="absolute -left-4 hover:scale-105 transition-transform" />
<CarouselNext className="absolute -right-4 hover:scale-105 transition-transform" /> */
}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default SelectResumeSlider;

// import React, { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";

// interface SelectResumeSliderProps {
//   className?: string;
// }

// const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
//   className,
// }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const handleTemplateClick = (index: number) => {
//     setSelectedTemplate(index);
//     setIsExpanded(false);
//   };

//   if (!isExpanded && selectedTemplate !== null) {
//     return (
//       <div className="fixed bottom-10 right-8 z-50 transition-all duration-300">
//         <div className="flex flex-col items-end gap-4">
//           <Button variant="default" className="w-full">
//             Use Template
//           </Button>
//           <div
//             className="w-60 p-4 rounded bg-white/95 backdrop-blur-sm shadow-lg "
//             onClick={() => setIsExpanded(true)}
//           >
//             <div className="w-full aspect-[1/1.4] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center">
//               <div className="text-sm font-medium text-gray-600">
//                 Template {selectedTemplate + 1}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "w-[calc(100%-4%)] p-6 rounded bg-white/95 backdrop-blur-sm shadow-lg sticky bottom-10 left-8 z-50 transition-all duration-300",
//         className
//       )}
//       onClick={() => selectedTemplate !== null && setIsExpanded(false)}
//     >
//       <div className="relative">
//         {selectedTemplate !== null && (
//           <Button
//             variant="ghost"
//             size="sm"
//             className="absolute -top-4 right-0 z-10"
//             onClick={() => setIsExpanded(false)}
//           >
//             <ChevronLeft className="mr-2 h-4 w-4" />
//             Collapse
//           </Button>
//         )}
//         <Carousel
//           className="w-full"
//           opts={{
//             align: "start",
//             slidesToScroll: 1,
//           }}
//         >
//           <CarouselContent className="-ml-4">
//             {Array.from({ length: 10 }).map((_, index) => (
//               <CarouselItem
//                 key={index}
//                 className="pl-4 basis-1/5 md:basis-1/5 cursor-pointer"
//                 onClick={() => handleTemplateClick(index)}
//               >
//                 <div className="p-1 transition-all duration-200 hover:scale-105">
//                   <div
//                     className={cn(
//                       "w-[150px] aspect-[1/1.4] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center overflow-hidden group",
//                       selectedTemplate === index && "ring-2 ring-blue-500"
//                     )}
//                   >
//                     <div className="text-sm font-medium text-gray-600">
//                       Template {index + 1}
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious className="absolute -left-4 hover:scale-105 transition-transform" />
//           <CarouselNext className="absolute -right-4 hover:scale-105 transition-transform" />
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default SelectResumeSlider;

// // fully working code
// import React, { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { FaAngleLeft } from "react-icons/fa";
// import { LuChevronLeft } from "react-icons/lu";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { MdOutlineClose } from "react-icons/md";
// import { setTemplateBoxState } from "@/lib/store/slices/resumeFeatureState";

// interface SelectResumeSliderProps {
//   className?: string;
// }

// const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
//   className,
// }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const ResumeFeatureBoxState = useAppSelector(
//     (state) => state.resumeFeatureState
//   );

//   const dispatch = useAppDispatch();

//   const handleTemplateClick = (index: number, event: React.MouseEvent) => {
//     // Stop event propagation to prevent carousel from catching the click
//     event.stopPropagation();
//     setSelectedTemplate(index);
//     setIsExpanded(false);
//   };

//   const handleExpandClick = () => {
//     setIsExpanded(true);
//   };

//   const handleCloseClick = () => {
//     dispatch(setTemplateBoxState(false));
//   };

//   const templateSelectHandler = () => {
//     dispatch(setTemplateBoxState(false));
//   };
//   if (!isExpanded && selectedTemplate !== null) {
//     return (
//       <div
//         className={`fixed bottom-10 right-9 z-50 transition-all duration-300 ${
//           ResumeFeatureBoxState.templateBoxState ? "block" : "hidden"
//         }`}
//       >
//         <div className="flex flex-col items-end gap-2 ">
//           <button
//             className="w-full bg-primary text-white rounded font-heading font-semibold px-1 py-1"
//             onClick={() => templateSelectHandler()}
//           >
//             Use Template
//           </button>
//           <div
//             className="w-60 p-4 rounded bg-white/95 backdrop-blur-sm shadow-lg cursor-pointer"
//             onClick={handleExpandClick}
//           >
//             <div className="w-full aspect-[1/1.4] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center">
//               <div className="text-sm font-medium text-gray-600">
//                 Template {selectedTemplate + 1}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`w-[calc(100%-4%)]  p-4 rounded bg-white/95 border backdrop-blur-sm shadow-lg sticky bottom-10 left-8 z-50 transition-all duration-300 ${className} ${
//         ResumeFeatureBoxState.templateBoxState ? "block" : "hidden"
//       }`}
//     >
//       <div className="relative ">
//         {selectedTemplate !== null && (
//           <button
//             className="absolute -top-12 flex items-center text-[14px] bg-white text-black px-1 h-[24px] rounded right-8 z-10"
//             onClick={() => setIsExpanded(false)}
//           >
//             <LuChevronLeft className="text-[16px] mt-0.5" />
//             Collapse
//           </button>
//         )}
//         <button
//           className="absolute -top-12 flex items-center text-[14px] bg-white text-black px-1 h-[24px] rounded right-0 z-10 hover:bg-gray-200"
//           onClick={() => dispatch(setTemplateBoxState(false))}
//         >
//           <MdOutlineClose className="text-[16px]" />
//         </button>
//         <Carousel className="w-full">
//           <CarouselContent className="-ml-4 py-2 ">
//             {Array.from({ length: 10 }).map((_, index) => (
//               <CarouselItem key={index} className="pl-4 basis-1/5 md:basis-1/5">
//                 <div
//                   className="p-1 transition-all duration-200 hover:scale-105 select-none cursor-pointer"
//                   onClick={(e) => handleTemplateClick(index, e)}
//                 >
//                   <div
//                     className={cn(
//                       "w-[150px] aspect-[1/1.4] z-30 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center overflow-hidden group cursor-pointer",
//                       selectedTemplate === index && "ring-2 ring-primary"
//                     )}
//                   >
//                     <div className="text-sm font-medium text-gray-600">
//                       Template {index + 1}
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           {/* <CarouselPrevious
//             className="absolute -left-4 hover:scale-105 transition-transform"
//             onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
//           />
//           <CarouselNext
//             className="absolute -right-4 hover:scale-105 transition-transform"
//             onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
//           /> */}
//           <CarouselPrevious className="absolute -left-4 hover:scale-105 transition-transform" />
//           <CarouselNext className="absolute -right-4 hover:scale-105 transition-transform" />
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default SelectResumeSlider;

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { LuChevronLeft } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { MdOutlineClose } from "react-icons/md";
import { setTemplateBoxState } from "@/lib/store/slices/resumeFeatureState";

interface SelectResumeSliderProps {
  className?: string;
}

const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
  className,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const ResumeFeatureBoxState = useAppSelector(
    (state) => state.resumeFeatureState
  );

  const dispatch = useAppDispatch();

  const handleTemplateClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTemplate(index);
    setIsExpanded(false);
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    dispatch(setTemplateBoxState(false));
    // Reset states when closing
    setSelectedTemplate(null);
    setIsExpanded(true);
  };

  const templateSelectHandler = () => {
    dispatch(setTemplateBoxState(false));
    // Reset states when selecting template
    setSelectedTemplate(null);
    setIsExpanded(true);
  };

  // Reset states when component is hidden
  React.useEffect(() => {
    if (!ResumeFeatureBoxState.templateBoxState) {
      setSelectedTemplate(null);
      setIsExpanded(true);
    }
  }, [ResumeFeatureBoxState.templateBoxState]);

  if (!isExpanded && selectedTemplate !== null) {
    return (
      <div
        className={`fixed bottom-10 scale-95 right-9 z-50 transition-all duration-300`}
      >
        <div className="flex flex-col items-end gap-2 ">
          <button
            className="w-full bg-primary text-white rounded font-heading font-semibold px-1 py-1"
            onClick={() => templateSelectHandler()}
          >
            Use Template
          </button>
          <div
            className="w-60 p-4 rounded bg-white/95 backdrop-blur-sm shadow-lg cursor-pointer"
            onClick={handleExpandClick}
          >
            <div className="w-full aspect-[1/1.4] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center select-none">
              <div className="text-sm font-medium text-gray-600">
                Template {selectedTemplate + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-[calc(100%-4%)]  p-4 rounded bg-white/95 border backdrop-blur-sm shadow-lg sticky bottom-10 left-8 z-50 transition-all duration-300 ${className} ${
        ResumeFeatureBoxState.templateBoxState ? "block" : "hidden"
      }`}
    >
      <div className="relative ">
        {selectedTemplate !== null && (
          <button
            className="absolute -top-12 flex items-center text-[14px] bg-white text-black px-1 h-[24px] rounded right-8 z-10"
            onClick={() => setIsExpanded(false)}
          >
            <LuChevronLeft className="text-[16px] mt-0.5" />
            Collapse
          </button>
        )}
        <button
          className="absolute -top-12 flex items-center text-[14px] bg-white text-black px-1 h-[24px] rounded right-0 z-10 hover:bg-gray-200"
          onClick={handleCloseClick}
        >
          <MdOutlineClose className="text-[16px]" />
        </button>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4 py-2 ">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/5 md:basis-1/5">
                <div
                  className="p-1 transition-all duration-200 hover:scale-105 select-none cursor-pointer"
                  onClick={(e) => handleTemplateClick(index, e)}
                >
                  <div
                    className={cn(
                      "w-[150px] aspect-[1/1.4] z-30 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center overflow-hidden group cursor-pointer",
                      selectedTemplate === index && "ring-2 ring-primary"
                    )}
                  >
                    <div className="text-sm font-medium text-gray-600">
                      Template {index + 1}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 hover:scale-105 transition-transform" />
          <CarouselNext className="absolute -right-4 hover:scale-105 transition-transform" />
        </Carousel>
      </div>
    </div>
  );
};

export default SelectResumeSlider;
