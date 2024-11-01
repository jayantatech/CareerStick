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
import { setMobileDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";

const MobileFontAndDesignSection = () => {
  const isMobileDesignAndFontBoxState = useAppSelector(
    (state) => state.resumeFeatureState.mobileDesignAndFontBoxState
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setMobileDesignAndFontBoxState(false));
  };

  return (
    <div
      className={`w-full h-[310px] bg-white border absolute bottom-[94px] left-0 border-t flex-col rounded z-50  items-center justify-center gap-2 rounded-t-md ${
        isMobileDesignAndFontBoxState ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-between items-center py-2 px-3 border-b">
        <span className="font-heading text-[15px]">Design Settings</span>
        <button
          onClick={() => handleClose()}
          className="p-1 rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[22px]" />
        </button>
      </div>

      <div className="w-full h-[260px] rounded p-3 overflow-y-auto  custom-scrollbar">
        <div className="w-full h-auto rounded border flex gap-2 p-1 font-heading">
          <button className="w-1/2 h-[36px] rounded border bg-white text-[15px]">
            Reset
          </button>
          <button className="w-1/2 h-[36px] rounded bg-primary text-white text-[15px]">
            Apply
          </button>
        </div>
        {/* Font Size Section */}
        <div className="w-full mb-3 space-y-1">
          <span className="font-heading text-[13px]">FONT SIZE</span>
          <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
        </div>

        {/* Font Style Section */}
        <div className="w-full mb-3">
          <span className="font-heading text-[13px] block mb-1">
            FONT STYLE
          </span>
          <Select>
            <SelectTrigger className="w-full h-[40px] text-[14px]">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arial">Arial</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="opensans">Open Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Colors Section */}
        <div className="w-full mb-3">
          <span className="font-heading text-[13px] block mb-1">COLORS</span>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square border rounded-md hover:border-primary cursor-pointer flex items-center justify-center"
              >
                <div className="w-4/5 h-4/5 bg-gray-200 rounded-md border-4 border-black" />
              </div>
            ))}
          </div>
        </div>

        {/* Spacing Section */}
        <div className="w-full mb-3 space-y-3">
          <div>
            <span className="font-heading text-[13px] block mb-1">
              PAGE MARGINS
            </span>
            <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
          </div>
          <div>
            <span className="font-heading text-[13px] block mb-1">
              SECTION SPACING
            </span>
            <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
    </div>
  );
};

export default MobileFontAndDesignSection;
