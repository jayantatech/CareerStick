import React from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
const FontAndDesignSection = () => {
  const isActive = useAppSelector(
    (state) => state.resumeFeatureState.designAndFontBoxState
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setDesignAndFontBoxState(false));
  };

  return (
    <div
      className={`bg-white border shadow-md fixed max-lg:hidden  right-9 bottom-7 rounded   ${
        isActive ? "block" : "hidden"
      }`}
    >
      {/* <button
        className="absolute  -left-16 flex items-center justify-center text-[14px] bg-gray-200 border w-[44px] h-[44px] bottom-1/2   px-1  rounded right-0 z-40 text-black hover:bg-gray-400"
        onClick={() => handleClose()}
      >
        <MdOutlineClose className="text-[28px]" />
      </button> */}
      <div className="w-full flex justify-between items-center p-2  border-b select-none">
        <span className="font-heading text-[15px]">Design Settings</span>
        <div className="flex gap-2  items-center justify-center">
          <button
            onClick={() => handleClose()}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
          >
            <MdOutlineClose className="text-[20px]" />
          </button>
        </div>
      </div>
      {/* <div className="w-full h-[28px]"></div> */}
      <div className=" px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
        <div className="w-full h-auto mb-2 p-1.5  rounded border">
          <span className="font-heading text-[13px]">
            FONT SIZE: EXTRA LARGE
          </span>
          <Slider defaultValue={[2]} max={4} step={1} className="w-full mt-1" />
          <div className="w-full h-auto mt-1">
            <span className="font-heading text-[13px]">FONT STYLE</span>
            <div>
              <Select>
                <SelectTrigger className="w-full h-[33px] rounded-sm font-body text-[14px] bg-white">
                  <SelectValue
                    placeholder="Theme"
                    className="font-heading text-[14px]"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="light"
                    className="font-heading text-[14px]"
                  >
                    Light
                  </SelectItem>
                  <SelectItem value="dark" className="font-heading text-[14px]">
                    Dark
                  </SelectItem>
                  <SelectItem
                    value="system"
                    className="font-heading text-[14px]"
                  >
                    System
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-1.5 rounded border mb-2">
          <span className="font-heading text-[13px]">COLORS</span>
          <div className="w-full h-auto items-center justify-center gap-1.5 grid grid-cols-3  ">
            <div className="col-span-1 h-[44px] bg-white border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
            </div>
            <div className="col-span-1 h-[44px] bg-white border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-blue-500 rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-yellow-400 rounded-sm"></div>
            </div>
            <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
            </div>
            <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
            </div>
            <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
            </div>
            <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
              <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
              <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-1.5 mb-2 rounded border">
          <div className="w-full h-auto pb-1  rounded">
            <span className="font-heading text-[13px]">PAGE MARGINS: 1</span>
            <Slider
              defaultValue={[2]}
              max={4}
              step={1}
              className="w-full mt-1"
            />
          </div>
          <div className="w-full h-auto ">
            <span className="font-heading text-[13px]">SECTION SPACING: 3</span>
            <Slider
              defaultValue={[2]}
              max={4}
              step={1}
              className="w-full mt-1"
            />
          </div>
        </div>

        <div className="w-full h-auto mb-2 border p-1.5 rounded">
          <span className="font-heading text-[13px]">BACKGROUNDS</span>
          <div className="w-full h-auto mt-1 grid grid-cols-3 gap-2">
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
            <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col p-2 border gap-1 ">
        <button className="w-full h-[36px] rounded border bg-white">
          Resume Settings
        </button>
        <button className="w-full h-[36px] rounded border bg-primary text-white font-heading">
          Save
        </button>
      </div>
    </div>
  );
};

export default FontAndDesignSection;
// // src/components/resume/FontAndDesignSection.tsx
// import React, { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MdOutlineClose } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
// import {
//   updateResumeSettings,
//   resetResumeSettings,
//   fetchResumeSettings,
// } from "@/lib/store/slices/resumeSettingsSlice";
// import type { IResumeSettings } from "@/lib/types/resumeSettings";

// // Define your types
// interface ColorOption {
//   primary: string;
//   secondary: string;
//   id: string;
// }

// // Constants
// const colorOptions: ColorOption[] = [
//   { primary: "bg-black", secondary: "bg-green-400", id: "black-green" },
//   { primary: "bg-blue-500", secondary: "bg-yellow-400", id: "blue-yellow" },
//   { primary: "bg-purple-600", secondary: "bg-pink-400", id: "purple-pink" },
//   { primary: "bg-red-500", secondary: "bg-orange-400", id: "red-orange" },
//   { primary: "bg-teal-500", secondary: "bg-cyan-400", id: "teal-cyan" },
//   { primary: "bg-indigo-500", secondary: "bg-violet-400", id: "indigo-violet" },
// ];

// const backgroundOptions = [
//   { id: "bg1", name: "Background 1" },
//   { id: "bg2", name: "Background 2" },
//   { id: "bg3", name: "Background 3" },
//   { id: "bg4", name: "Background 4" },
//   { id: "bg5", name: "Background 5" },
//   { id: "bg6", name: "Background 6" },
// ];

// const FontAndDesignSection = () => {
//   const params = useParams();
//   const resumeId = params?.id as string;
//   const dispatch = useAppDispatch();

//   const isActive = useAppSelector(
//     (state) => state.resumeFeatureState.designAndFontBoxState
//   );
//   const settings = useAppSelector((state) => state.resumeSettings.settings);
//   const loading = useAppSelector((state) => state.resumeSettings.loading);

//   useEffect(() => {
//     if (resumeId && isActive) {
//       dispatch(fetchResumeSettings(resumeId));
//     }
//   }, [dispatch, resumeId, isActive]);

//   const handleClose = () => {
//     dispatch(setDesignAndFontBoxState(false));
//   };

//   const handleSettingsUpdate = (updateData: Partial<IResumeSettings>) => {
//     if (resumeId) {
//       dispatch(
//         updateResumeSettings({
//           resumeId,
//           updateData: { ...settings, ...updateData } as IResumeSettings,
//         })
//       );
//     }
//   };

//   const handleReset = () => {
//     if (resumeId) {
//       dispatch(resetResumeSettings(resumeId));
//     }
//   };

//   const handleColorSelect = (primary: string, secondary: string) => {
//     handleSettingsUpdate({
//       primaryColor: primary.replace("bg-", ""),
//       secondaryColor: secondary.replace("bg-", ""),
//     });
//   };

//   if (loading) {
//     return (
//       <div className="fixed right-9 bottom-7 bg-white p-4 rounded shadow-md">
//         <div className="animate-pulse">Loading settings...</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded ${
//         isActive ? "block" : "hidden"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Design Settings</span>
//         <div className="flex gap-2 items-center justify-center">
//           <button
//             onClick={handleClose}
//             className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//             type="button"
//             aria-label="Close settings"
//           >
//             <MdOutlineClose className="text-[20px]" />
//           </button>
//         </div>
//       </div>

//       <div className="px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         {/* Font Size Section */}
//         <div className="w-full h-auto mb-2 p-1.5 rounded border">
//           <span className="font-heading text-[13px]">
//             FONT SIZE: {settings?.fontSize || "2"}
//           </span>
//           <Slider
//             defaultValue={[Number(settings?.fontSize || 2)]}
//             value={[Number(settings?.fontSize || 2)]}
//             max={4}
//             step={1}
//             className="w-full mt-1"
//             onValueChange={(value) =>
//               handleSettingsUpdate({ fontSize: value[0].toString() })
//             }
//           />

//           {/* Font Style Section */}
//           <div className="w-full h-auto mt-1">
//             <span className="font-heading text-[13px]">FONT STYLE</span>
//             <div>
//               <Select
//                 value={settings?.fontFamily}
//                 onValueChange={(value) =>
//                   handleSettingsUpdate({ fontFamily: value })
//                 }
//               >
//                 <SelectTrigger className="w-full h-[33px] rounded-sm font-body text-[14px] bg-white">
//                   <SelectValue placeholder="Select font" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="arial">Arial</SelectItem>
//                   <SelectItem value="times">Times New Roman</SelectItem>
//                   <SelectItem value="helvetica">Helvetica</SelectItem>
//                   <SelectItem value="calibri">Calibri</SelectItem>
//                   <SelectItem value="georgia">Georgia</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {/* Colors Section */}
//         <div className="w-full h-auto p-1.5 rounded border mb-2">
//           <span className="font-heading text-[13px]">COLORS</span>
//           <div className="w-full h-auto items-center justify-center gap-1.5 grid grid-cols-3">
//             {colorOptions.map((option) => (
//               <button
//                 key={option.id}
//                 type="button"
//                 className="col-span-1 h-[44px] bg-white border flex gap-1 hover:border-primary transition-all duration-150 items-center justify-center rounded-sm"
//                 onClick={() =>
//                   handleColorSelect(option.primary, option.secondary)
//                 }
//               >
//                 <div
//                   className={`w-[32px] h-[32px] ${option.primary} rounded-sm`}
//                 ></div>
//                 <div
//                   className={`w-[32px] h-[32px] ${option.secondary} rounded-sm`}
//                 ></div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Margins and Spacing Section */}
//         <div className="w-full h-auto p-1.5 mb-2 rounded border">
//           <div className="w-full h-auto pb-1 rounded">
//             <span className="font-heading text-[13px]">
//               PAGE MARGINS: {settings?.margin || "1"}
//             </span>
//             <Slider
//               defaultValue={[Number(settings?.margin || 1)]}
//               value={[Number(settings?.pageMargins || 1)]}
//               max={4}
//               step={1}
//               className="w-full mt-1"
//               onValueChange={(value) =>
//                 handleSettingsUpdate({ pageMargins: value[0].toString() })
//               }
//             />
//           </div>
//           <div className="w-full h-auto">
//             <span className="font-heading text-[13px]">
//               SECTION SPACING: {settings?.sectionSpacing || "3"}
//             </span>
//             <Slider
//               defaultValue={[Number(settings?.sectionSpacing || 3)]}
//               value={[Number(settings?.sectionSpacing || 3)]}
//               max={4}
//               step={1}
//               className="w-full mt-1"
//               onValueChange={(value) =>
//                 handleSettingsUpdate({ sectionSpacing: value[0].toString() })
//               }
//             />
//           </div>
//         </div>

//         {/* Backgrounds Section */}
//         <div className="w-full h-auto mb-2 border p-1.5 rounded">
//           <span className="font-heading text-[13px]">BACKGROUNDS</span>
//           <div className="w-full h-auto mt-1 grid grid-cols-3 gap-2">
//             {backgroundOptions.map((bg) => (
//               <button
//                 key={bg.id}
//                 type="button"
//                 className="w-[78px] h-[78px] border cursor-pointer rounded hover:border-primary"
//                 onClick={() => handleSettingsUpdate({ background: bg.id })}
//                 aria-label={bg.name}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="w-full h-auto flex flex-col p-2 border gap-1">
//         <button
//           type="button"
//           className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
//           onClick={handleReset}
//         >
//           Reset to Default
//         </button>
//         <button
//           type="button"
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading hover:bg-primary/90"
//           onClick={handleClose}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FontAndDesignSection;
