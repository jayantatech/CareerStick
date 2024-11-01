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
