"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import AppHeader from "@/components/AppHeader";
import DeleteResumeModal from "@/components/resume/DeleteResumeModal";
import ResumeViewBox from "@/components/resume/ResumeViewBox";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
import useAuth from "@/lib/hooks/useAuth";
import { ResumeState } from "@/lib/types/resumeInput";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/loading/PageLoading";
import { Plus, FileText, Loader2 } from "lucide-react";
import FeedbackForm from "@/components/inputComponents/FeedbackForm";
import ResumeViewer from "@/components/resume/ResumeViewer";

const EmptyResumeCard = React.memo(() => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleCreateResume = async () => {
    if (!user?._id || isCreating) return;

    setIsCreating(true);
    try {
      const response = await api.post("/resume/create-resume", {
        userId: user._id,
      });

      if (response.data.success) {
        router.push(`/app/resumes/${response.data.resumeId}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      onClick={handleCreateResume}
      className="w-full max-w-[420px] h-[583px] max-lg:h-[500px] max-lg:w-[360px]  aspect-[1/1.41] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 m-4 cursor-pointer group relative overflow-hidden"
    >
      <div className="w-full h-full  bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex flex-col items-center justify-center space-y-4 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-100">
        {isCreating ? (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <span className="text-blue-600 font-medium text-lg">
              Creating your resume...
            </span>
          </>
        ) : (
          <>
            <div className="relative">
              <FileText className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300 absolute -right-1 -top-1 bg-white rounded-full" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                Create New Resume
              </h3>
              <p className="text-sm -ml-2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300 max-w-[250px]">
                Start building your professional resume with our easy-to-use
                template
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

EmptyResumeCard.displayName = "EmptyResumeCard";

const LoadingGrid = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!showSkeleton) {
    return null;
  }

  return (
    <>
      {[1, 2, 3].map((index) => (
        <div key={index} className="w-full max-w-[420px] h-[583px] m-4">
          <Skeleton className="w-full h-full bg-gray-200" />
        </div>
      ))}
    </>
  );
};

const MyResume = () => {
  const [allResumes, setAllResumes] = useState<ResumeState[]>([]);
  const [isResumeDeletePopup, setIsResumeDeletePopup] = useState(false);
  const [resumeIdToDelete, setResumeIdToDelete] = useState<string>("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasLoadedInSession, setHasLoadedInSession] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDeletingResume, setIsDeletingResume] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // const ResumeViewer = useMemo(
  //   () =>
  //     dynamic(() => import("../../../components/resume/ResumeViewer"), {
  //       ssr: false,
  //       loading: () => (
  //         <div className="w-full h-full relative">
  //           <Skeleton className="w-full h-full bg-blue-50" />
  //         </div>
  //       ),
  //     }),
  //   []
  // );

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedMyResumes");

    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem("hasLoadedMyResumes", "true");
        setHasLoadedInSession(true);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setIsInitialLoading(false);
      setHasLoadedInSession(true);
    }
  }, []);

  const fetchAllResumes = useCallback(async () => {
    if (!user?._id || user._id.length !== 24) return;

    setIsDataLoading(true);
    try {
      const response = await api.post("/resume/get-all-resumes", {
        userId: user._id,
      });

      if (response.data.success) {
        setAllResumes(response.data.resumes || []);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsDataLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (!isAuthLoading && user?._id) {
      fetchAllResumes();
    }
  }, [isAuthLoading, user?._id, fetchAllResumes]);

  const handleCreateResume = async () => {
    if (!user?._id || isCreating) return;

    setIsCreating(true);
    try {
      const response = await api.post("/resume/create-resume", {
        userId: user._id,
      });

      if (response.data.success) {
        router.push(`/app/resumes/${response.data.resumeId}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleResumeDelete = useCallback(async () => {
    if (
      !resumeIdToDelete ||
      resumeIdToDelete.length !== 24 ||
      !user?._id ||
      isDeletingResume
    )
      return;

    setIsDeletingResume(true);
    try {
      const response = await api.post("/resume/delete-resume", {
        resumeId: resumeIdToDelete,
        userId: user._id,
      });

      if (response.data.success) {
        setAllResumes((prevResumes) =>
          prevResumes.filter((resume) => resume._id !== resumeIdToDelete)
        );
        setIsResumeDeletePopup(false);
        setResumeIdToDelete("");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setIsDeletingResume(false);
    }
  }, [resumeIdToDelete, user?._id, isDeletingResume]);

  const handleResumeDuplicate = useCallback(
    async (resumeId: string) => {
      try {
        if (!resumeId || resumeId.length !== 24) return;
        const response = await api.post("/resume/duplicate-resume", {
          resumeId: resumeId,
          userId: user?._id,
        });
        if (response.data.success) {
          await fetchAllResumes();
        }
      } catch (error) {
        console.error("Error duplicating resume:", error);
      }
    },
    [fetchAllResumes, user?._id]
  );

  const resumeGrid = useMemo(() => {
    if (isDataLoading) {
      return <LoadingGrid />;
    }
    const sortedResumes = [...allResumes].sort((a, b) => {
      const dateA = new Date(a.updatedAt as string).getTime();
      const dateB = new Date(b.updatedAt as string).getTime();
      return dateB - dateA;
    });
    const resumes = sortedResumes.map((resume) => {
      if (!resume) return null;
      // console.log("resume data to show", resume);
      const mappedData = mapMongoDataToReduxFormat(resume);
      // console.log("mappedData to show", mappedData);
      if (!mappedData) return null;

      return (
        <div
          key={resume._id}
          className="w-full max-w-[420px] h-[583px]  max-lg:h-[500px] max-lg:w-[360px] bg-white border-d border-gray-200 rounded shadow-md p-3 m-4 cursor-pointer aspect-[1/1.41]"
        >
          <div className="w-full h-full cursor-pointer relative">
            <ResumeViewBox
              onDelete={() => {
                setIsResumeDeletePopup(true);
                setResumeIdToDelete(resume._id as string);
              }}
              userId={user?._id as string}
              onDuplicate={() => handleResumeDuplicate(resume._id as string)}
              resumeId={resume._id as string}
              resume={mappedData}
              onTitleUpdate={fetchAllResumes}
            />

            <div className="w-full h-full absolute left-0 top-0 opacity-80 z-30"></div>

            <ResumeViewer resumeId={resume._id as string} resume={mappedData} />
          </div>
        </div>
      );
    });

    return [
      <EmptyResumeCard key="empty-card" />,
      ...(resumes.filter(Boolean) as JSX.Element[]),
    ];
  }, [
    allResumes,
    // ResumeViewer,
    user?._id,
    isDataLoading,
    handleResumeDuplicate,
    fetchAllResumes,
  ]);

  if (isInitialLoading && !hasLoadedInSession) {
    return <PageLoading />;
  }

  return (
    <div className="flex flex-col h-screen">
      <AppHeader
        title="My Resumes"
        buttonText="Create Resume"
        iconName="add"
        isLoading={isAuthLoading}
        isCreating={isCreating}
        onButtonClick={handleCreateResume}
      />
      <DeleteResumeModal
        isOpen={isResumeDeletePopup}
        onClose={() => setIsResumeDeletePopup(false)}
        onDelete={handleResumeDelete}
      />
      <FeedbackForm />
      <div className="w-full max-lg:pt-[60px] mx-auto px-4 sm:px-6 bg-gray-100 h-full lg:px-8 py-2 overflow-y-auto">
        <div className="grid grid-cols-1 max-md:grid-cols-1 max-l-laptop:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-2 items-center justify-items-center">
          {resumeGrid}
        </div>
      </div>
    </div>
  );
};

export default MyResume;

// "use client";

// import TemplateThree from "@/components/resumeTemplates/TemplateThree";
// import { useAppSelector } from "@/lib/store/hooks";
// import React from "react";

// const MyResume = () => {
//   const data = useAppSelector((state) => state.resume);
//   const styleConfig = useAppSelector((state) => state.resumeStyle);
//   return (
//     <div>
//       <TemplateThree data={data} styleConfig={styleConfig} />
//     </div>
//   );
// };

// export default MyResume;
