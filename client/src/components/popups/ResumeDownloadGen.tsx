"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { ResumeGenGif } from "../../../public/video";

export function ResumeGeneratorPopup() {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="flex">
          <div className="w-1/2 bg-blue-100 flex items-center justify-center">
            <div className="w-full h-full relative">
              <Image
                src={ResumeGenGif}
                alt="Resume generation"
                layout="fill"
                objectFit="contain"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
          </div>
          <div className="w-1/2 p-6 bg-blue-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Generating Resume
            </h2>
            <p className="text-gray-600 mb-6">
              Please wait while we prepare your resume. This may take a few
              moments.
            </p>
            <Progress value={progress} className="w-full h-2 mb-2" />
            <p className="text-sm text-blue-600 font-semibold">
              {progress}% Complete
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
