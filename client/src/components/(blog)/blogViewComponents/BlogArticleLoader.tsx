"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ContentWrapper from "@/components/ContentWrapper";

const BlogArticleLoader = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b border-b from-[#EFF6FF] to-background pt-8 pb-10">
        <ContentWrapper>
          <div className="container mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-11 w-40" />
                  <Skeleton className="h-11 w-40" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-64" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-48" />
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full h-[415px]">
                <Skeleton className="absolute inset-0 rounded-md" />
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>

      {/* Main Content */}
      <ContentWrapper>
        <div className="container mx-auto py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="sticky top-24 hidden lg:block w-72 shrink-0">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
              {/* Newsletter Card */}
              <div className="mt-8">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 max-w-3xl">
              {/* Content Sections */}
              <div className="space-y-8">
                {/* Text Section */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <Skeleton className="h-[200px] w-full rounded-lg" />

                {/* Image Section */}
                <Skeleton className="h-[300px] w-full rounded-lg" />

                {/* Note Section */}
                <div className="rounded-lg border p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>

                {/* List Section */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default BlogArticleLoader;
