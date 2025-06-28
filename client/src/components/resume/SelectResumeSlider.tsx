// import React, { useEffect, useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import { LuChevronLeft } from "react-icons/lu";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { MdOutlineClose } from "react-icons/md";
// import { setTemplateBoxState } from "@/lib/store/slices/resumeFeatureState";
// import {
//   setCurrentTemplate,
//   TemplateType,
// } from "@/lib/store/slices/templateChangeSlice";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import useAuth from "@/lib/hooks/useAuth";
// import Image, { StaticImageData } from "next/image";
// import { ResumeFour, ResumeOne, ResumeThree } from "../../../public/img";

// interface SelectResumeSliderProps {
//   className?: string;
// }

// interface TemplateInfo {
//   id: TemplateType;
//   name: string;
//   imagePath: StaticImageData;
// }

// const templateData: TemplateInfo[] = [
//   {
//     id: "default",
//     name: "Classic Resume",
//     imagePath: ResumeOne,
//   },
//   // {
//   //   id: "template2",
//   //   name: "Modern Professional",
//   //   imagePath: "/images/templates/template2.png",
//   // },
//   {
//     id: "template3",
//     name: "Creative Design",
//     imagePath: ResumeThree,
//   },
//   {
//     id: "template4",
//     name: "Minimalist",
//     imagePath: ResumeFour,
//   },
// ];

// const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
//   className,
// }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [clickedSave, setClickedSave] = useState(false);
//   const { user } = useAuth();
//   const param = useParams();
//   const ResumeFeatureBoxState = useAppSelector(
//     (state) => state.resumeFeatureState
//   );
//   const ResumeTemplateState = useAppSelector(
//     (state) => state.templateSlice.currentTemplate
//   );

//   useEffect(() => {
//     if (ResumeTemplateState) {
//       const index = templateData.findIndex(
//         (template) => template.id === ResumeTemplateState
//       );
//       setSelectedTemplate(index);
//     }
//   }, [param?.id, ResumeTemplateState]);

//   const dispatch = useAppDispatch();

//   const handleTemplateClick = (index: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setSelectedTemplate(index);
//     dispatch(setCurrentTemplate(templateData[index].id));
//     setIsExpanded(false);
//   };

//   const handleExpandClick = () => {
//     setIsExpanded(true);
//   };

//   const handleCloseClick = () => {
//     dispatch(setTemplateBoxState(false));
//     setSelectedTemplate(null);
//     setIsExpanded(true);
//   };

//   const handleApiToSaveTemplate = async () => {
//     if (!param?.id || param.id.length !== 24) return null;
//     if (!user?._id) return null;
//     try {
//       const response = await api.post(
//         `/resume/save-resume-template/${param.id}`,
//         {
//           template: ResumeTemplateState,
//           userId: user?._id,
//         }
//       );

//       if (response.data.success) {
//         setClickedSave(false);
//       }
//     } catch (error) {
//       console.log("Error saving template:", error);
//       setClickedSave(false);
//     }
//   };

//   const templateSelectHandler = () => {
//     const index = templateData.findIndex(
//       (template) => template.id === ResumeTemplateState
//     );
//     setSelectedTemplate(index);
//     dispatch(setCurrentTemplate(templateData[index].id));
//     dispatch(setTemplateBoxState(false));
//     handleApiToSaveTemplate();
//     setSelectedTemplate(null);
//     setIsExpanded(true);
//   };

//   useEffect(() => {
//     if (clickedSave) {
//       handleApiToSaveTemplate();
//       setClickedSave(false);
//     }
//   }, [clickedSave]);

//   React.useEffect(() => {
//     if (!ResumeFeatureBoxState.templateBoxState) {
//       setSelectedTemplate(null);
//       setIsExpanded(true);
//     }
//   }, [ResumeFeatureBoxState.templateBoxState]);

//   if (!isExpanded && selectedTemplate !== null) {
//   return (
//     <div className="fixed bottom-10 scale-95 right-9 z-50 transition-all duration-300">
//       <div className="flex flex-col items-end gap-2">
//         <button
//           className="w-full bg-primary text-white rounded font-heading font-semibold px-1 py-1"
//           onClick={() => templateSelectHandler()}
//         >
//           Use Template
//         </button>

//         <div
//           className="w-60 p-3 rounded bg-white/95 backdrop-blur-sm shadow-lg cursor-pointer"
//           onClick={handleExpandClick}
//         >
//           <div className="w-full aspect-[1/1.4] bg-white rounded-lg shadow flex items-center justify-center select-none overflow-hidden">
//             <Image
//               src={templateData[selectedTemplate].imagePath}
//               alt={templateData[selectedTemplate].name}
//               // className="w-full h-full object-contain  "
//               className="w-full h-full object-cover object-center transform  transition-transform duration-300"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// return (
//   <div
//     className={`w-[calc(100%-5%)] max-lg:hidden rounded bg-white/95 border backdrop-blur-sm shadow-lg sticky bottom-10 left-7 z-50 transition-all duration-300 ${className} ${
//       ResumeFeatureBoxState.templateBoxState ? "block" : "hidden"
//     }`}
//   >
//     <div className="relative">
//       <div className="w-full flex justify-between items-center py-2 px-3 border-b select-none">
//         <span className="font-heading text-[15px]">Select Template</span>
//         <div className="flex gap-2 items-center justify-center">
//           {selectedTemplate !== null && (
//             <button
//               className="flex rounded items-center text-[14px] border text-black px-1 h-[24px] right-8 z-10"
//               onClick={() => setIsExpanded(false)}
//             >
//               <LuChevronLeft className="text-[16px] mt-0.5" />
//               Collapse
//             </button>
//           )}
//           {/* <button
//             className="flex rounded items-center text-[14px] border text-black px-1 h-[24px] right-8 z-10 gap-0.5"
//             onClick={() => setClickedSave(true)}
//           >
//             <HiOutlineSaveAs className="text-[15px] mt-0.5" />
//             {clickedSave ? <span>Saving...</span> : <span>Save</span>}
//           </button> */}
//           <button
//             onClick={handleCloseClick}
//             className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//           >
//             <MdOutlineClose className="text-[20px]" />
//           </button>
//         </div>
//       </div>

//       <Carousel
//         className="w-full p-2"
//         opts={{
//           align: "center",
//         }}
//       >
//         <CarouselContent className="py-2 px-2">
//           {templateData.map((template, index) => (
//             <CarouselItem key={index} className="pl-6 basis-1/5 md:basis-1/5">
//               <div
//                 className="p-1 transition-all duration-200 hover:scale-105 select-none cursor-pointer"
//                 onClick={(e) => handleTemplateClick(index, e)}
//               >
//                 <div
//                   className={cn(
//                     "w-[180px] aspect-[1/1.4] z-30 bg-white rounded shadow-sm flex items-center justify-center overflow-hidden group cursor-pointer",
//                     selectedTemplate === index
//                       ? "ring-2 ring-primary"
//                       : "ring-1 ring-gray-200 "
//                   )}
//                 >
//                   <Image
//                     src={template.imagePath}
//                     alt={template.name}
//                     className="w-full h-full object-cover object-center transform  transition-transform duration-300"
//                     // className="w-full h-full object-cover "
//                   />
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="absolute left-1 hover:scale-105 rounded h-[40px] w-[20px] transition-transform" />
//         <CarouselNext className="absolute right-2 hover:scale-105 h-[40px] w-[20px] rounded transition-transform" />
//       </Carousel>
//     </div>
//   </div>
// );
// };

import React, { useEffect, useState, useCallback } from "react";
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
import {
  setCurrentTemplate,
  TemplateType,
} from "@/lib/store/slices/templateChangeSlice";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import Image, { StaticImageData } from "next/image";
import { ResumeOne, ResumeThree, ResumeFive } from "../../../public/img";

interface SelectResumeSliderProps {
  className?: string;
}

interface TemplateInfo {
  id: TemplateType;
  name: string;
  imagePath: StaticImageData;
}

const templateData: TemplateInfo[] = [
  {
    id: "default",
    name: "Classic Resume",
    imagePath: ResumeOne,
  },
  {
    id: "template3",
    name: "Creative Design",
    imagePath: ResumeThree,
  },
  {
    id: "template4",
    name: "Minimalist",
    imagePath: ResumeFive,
  },
];

const SelectResumeSlider: React.FC<SelectResumeSliderProps> = ({
  className,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [clickedSave, setClickedSave] = useState(false);
  const { user } = useAuth();
  const param = useParams();
  const ResumeFeatureBoxState = useAppSelector(
    (state) => state.resumeFeatureState
  );
  const ResumeTemplateState = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );

  const dispatch = useAppDispatch();

  // Memoize the API save function to prevent unnecessary re-renders
  const handleApiToSaveTemplate = useCallback(async () => {
    if (!param?.id || param.id.length !== 24) return null;
    if (!user?._id) return null;
    try {
      const response = await api.post(
        `/resume/save-resume-template/${param.id}`,
        {
          template: ResumeTemplateState,
          userId: user?._id,
        }
      );

      if (response.data.success) {
        setClickedSave(false);
      }
    } catch (error) {
      console.log("Error saving template:", error);
      setClickedSave(false);
    }
  }, [param?.id, user?._id, ResumeTemplateState]);

  // Effect to update template when template state changes
  useEffect(() => {
    if (ResumeTemplateState) {
      const index = templateData.findIndex(
        (template) => template.id === ResumeTemplateState
      );
      setSelectedTemplate(index);
    }
  }, [param?.id, ResumeTemplateState]);

  // Effect to handle save when clickedSave is true
  useEffect(() => {
    if (clickedSave) {
      handleApiToSaveTemplate();
    }
  }, [clickedSave, handleApiToSaveTemplate]);

  // Other existing methods remain the same...
  const handleTemplateClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTemplate(index);
    dispatch(setCurrentTemplate(templateData[index].id));
    setIsExpanded(false);
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    dispatch(setTemplateBoxState(false));
    setSelectedTemplate(null);
    setIsExpanded(true);
  };

  const templateSelectHandler = () => {
    const index = templateData.findIndex(
      (template) => template.id === ResumeTemplateState
    );
    setSelectedTemplate(index);
    dispatch(setCurrentTemplate(templateData[index].id));
    dispatch(setTemplateBoxState(false));
    handleApiToSaveTemplate();
    setSelectedTemplate(null);
    setIsExpanded(true);
  };

  // Reset template selection when template box state changes
  React.useEffect(() => {
    if (!ResumeFeatureBoxState.templateBoxState) {
      setSelectedTemplate(null);
      setIsExpanded(true);
    }
  }, [ResumeFeatureBoxState.templateBoxState]);

  // Render logic remains the same as in the original code...
  if (!isExpanded && selectedTemplate !== null) {
    return (
      <div className="fixed bottom-10 scale-95 right-9 z-50 transition-all duration-300">
        <div className="flex flex-col items-end gap-2">
          <button
            className="w-full bg-primary text-white rounded font-heading font-semibold px-1 py-1"
            onClick={() => templateSelectHandler()}
          >
            Use Template
          </button>

          <div
            className="w-60 p-3 rounded bg-white/95 backdrop-blur-sm shadow-lg cursor-pointer"
            onClick={handleExpandClick}
          >
            <div className="w-full aspect-[1/1.4] bg-white rounded-lg shadow flex items-center justify-center select-none overflow-hidden">
              <Image
                src={templateData[selectedTemplate].imagePath}
                alt={templateData[selectedTemplate].name}
                className="w-full h-full object-cover object-center transform transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest of the render method remains the same...
  return (
    <div
      className={`w-[calc(100%-5%)] max-lg:hidden rounded bg-white/95 border backdrop-blur-sm shadow-lg sticky bottom-10 left-7 z-50 transition-all duration-300 ${className} ${
        ResumeFeatureBoxState.templateBoxState ? "block" : "hidden"
      }`}
    >
      <div className="relative">
        <div className="w-full flex justify-between items-center py-2 px-3 border-b select-none">
          <span className="font-heading text-[15px]">Select Template</span>
          <div className="flex gap-2 items-center justify-center">
            {selectedTemplate !== null && (
              <button
                className="flex rounded items-center text-[14px] border text-black px-1 h-[24px] right-8 z-10"
                onClick={() => setIsExpanded(false)}
              >
                <LuChevronLeft className="text-[16px] mt-0.5" />
                Collapse
              </button>
            )}
            {/* <button
              className="flex rounded items-center text-[14px] border text-black px-1 h-[24px] right-8 z-10 gap-0.5"
              onClick={() => setClickedSave(true)}
            >
              <HiOutlineSaveAs className="text-[15px] mt-0.5" />
              {clickedSave ? <span>Saving...</span> : <span>Save</span>}
            </button> */}
            <button
              onClick={handleCloseClick}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
            >
              <MdOutlineClose className="text-[20px]" />
            </button>
          </div>
        </div>

        <Carousel
          className="w-full p-2"
          opts={{
            align: "center",
          }}
        >
          <CarouselContent className="py-2 px-2">
            {templateData.map((template, index) => (
              <CarouselItem key={index} className="pl-6 basis-1/5 md:basis-1/5">
                <div
                  className="p-1 transition-all duration-200 hover:scale-105 select-none cursor-pointer"
                  onClick={(e) => handleTemplateClick(index, e)}
                >
                  <div
                    className={cn(
                      "w-[180px] aspect-[1/1.4] z-30 bg-white rounded shadow-sm flex items-center justify-center overflow-hidden group cursor-pointer",
                      selectedTemplate === index
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-gray-200 "
                    )}
                  >
                    <Image
                      src={template.imagePath}
                      alt={template.name}
                      className="w-full h-full object-cover object-center transform  transition-transform duration-300"
                      // className="w-full h-full object-cover "
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 hover:scale-105 rounded h-[40px] w-[20px] transition-transform" />
          <CarouselNext className="absolute right-2 hover:scale-105 h-[40px] w-[20px] rounded transition-transform" />
        </Carousel>
      </div>
    </div>
  );
};

export default SelectResumeSlider;
