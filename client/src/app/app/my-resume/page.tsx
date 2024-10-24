import AppHeader from "@/components/AppHeader";
import React from "react";

const ResumeCard = () => (
  <div className="w-full max-w-[450px] h-[668px] bg-white border border-gray-200 rounded shadow-md p-3 m-4 cursor-pointer">
    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
      <span className="text-gray-400">Resume Preview</span>
    </div>
  </div>
);

const EmptyResumeCard = () => (
  <div className="w-full max-w-[418px] h-[618px] bg-white border-d border-gray-200 rounded shadow-md p-3 m-4 cursor-pointer">
    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
      <span className="text-gray-400">Empty Preview</span>
    </div>
  </div>
);

const MyResume = () => {
  const resumes = Array(10).fill(null); // Assuming 12 resumes for this example

  return (
    <div className="flex flex-col h-screen">
      {/* <div className="bg-secondary min-h-screen w-full"> */}
      {/* <div className="w-full bg-white shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
          <div className="py-[13px] flex items-center justify-between">
            <h1 className="font-heading font-semibold text-2xl text-gray-900">
              My Resumes
            </h1>
            <button className="px-4 py-2 rounded font-heading font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition duration-150 ease-in-out">
              <MdAdd className="mr-2" /> Create Resume
            </button>
          </div>
        </div>
      </div> */}
      <AppHeader title="My Resumes" buttonText="Create Resume" iconName="add" />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 gap-y-2 items-center justify-items-center">
          {resumes.length === 0 ? (
            <EmptyResumeCard />
          ) : (
            resumes.map((_, index) => <ResumeCard key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default MyResume;
