import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setMobileDesignAndFontBoxState,
  setMobileTemplateBoxState,
  setTemplateBoxState,
} from "@/lib/store/slices/resumeFeatureState";
import { setCurrentTemplate } from "@/lib/store/slices/templateChangeSlice";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

const MobileTemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const isMobileTemplateBoxActive = useAppSelector(
    (state) => state.resumeFeatureState.mobileTemplateBoxState
  );

  const handleTemplateClick = (index: number) => {
    setSelectedTemplate(index);
    const templateType = index === 0 ? "default" : "template2";
    dispatch(setCurrentTemplate(templateType));
    dispatch(setMobileTemplateBoxState(false));
  };

  return (
    <div
      className={`w-full h-[330px] bg-white border absolute  bottom-[94px] left-0 border-t flex-col z-50 items-center justify-center gap-2 rounded-t-md  ${
        isMobileTemplateBoxActive ? "block" : "hidden"
      }`}
    >
      {/* <div
        className="absolute -top-12 right-2 w-[36px] h-[36px] flex items-center justify-center bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-sm"
        onClick={() => dispatch(setMobileTemplateBoxState(false))}
      >
        <IoClose className="text-[26px]" />
      </div> */}
      <div className="w-full flex justify-between items-center py-2 px-3 border-b select-none">
        <span className="font-heading text-[15px]">Select Template</span>
        <button
          onClick={() => dispatch(setMobileTemplateBoxState(false))}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>
      <div className="h-auto px-3">
        <Carousel className="w-full h-[260px]  select-none">
          <CarouselContent className="-ml-2 h-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/2 sm:basis-1/3 h-full select-none"
              >
                <div
                  className="h-full p-1 transition-all duration-200 select-none cursor-pointer"
                  onClick={() => handleTemplateClick(index)}
                >
                  <div
                    className={cn(
                      "h-full aspect-[1/1.4] scale-95 bg-white rounded-lg border flex items-center justify-center overflow-hidden",
                      "hover:shadow-md transition-shadow duration-200",
                      selectedTemplate === index &&
                        "ring-2 ring-primary border-primary"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs font-medium text-gray-600">
                        Template {index + 1}
                      </div>
                      {selectedTemplate === index && (
                        <span className="text-xs text-primary font-medium">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden sm:flex -left-2 h-8 w-8" />
          <CarouselNext className="hidden sm:flex -right-2 h-8 w-8" /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default MobileTemplateSelector;
