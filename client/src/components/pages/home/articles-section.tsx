"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContentWrapper from "@/components/ContentWrapper";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
// import { SmallPostSkeleton } from "@/app/(gen_pages)/blog/page";

function SmallPostSkeleton() {
  return (
    <Card className="overflow-hidden rounded-md border shadow-md">
      <CardContent className="p-0">
        <div className="relative h-[200px] bg-gray-100 animate-pulse" />
        <div className="p-6 h-[132px] max-md:h-auto bg-white">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
type blogCardDataType = {
  id: string;
  title: string;
  url: string;
  readTime: number;
  imageUrl: string;
  author: { name: string; bio: string; avatar: string };
  description: string;
  createdAt: string;
  updatedAt: string;
};
export default function ArticlesSection() {
  const [blogData, setBlogData] = useState<blogCardDataType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/blog/all-blogs");
        if (response.data.success) {
          setBlogData(response.data.data);
        }
      } catch (error) {
        console.error("Error creating blog:", error);
        toast.error("Failed to get blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);
  return (
    <section className="py-24  bg-indigo-50 ">
      {" "}
      {/* bg-gray-50 */}
      <ContentWrapper>
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Recently Published Articles{" "}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Stay up-to-date with our latest articles! Get valuable career
            insights, job-seeking tips, and expert advice to help you succeed in
            your job search.
          </motion.p>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"> */}
        <div className="flex flex-row flex-wrap justify-center gap-6 max-md:flex-col max-md:gap-4 mb-16">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="xl:w-[31%] max-md:w-full max-lg:w-[31%] max-md:mb-4"
                  >
                    <SmallPostSkeleton />
                  </div>
                ))
            : blogData?.slice(0, 3).map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className=" xl:w-[31%] max-md:w-full max-lg:w-[31%] max-md:mb-4"
                >
                  <Link href={`blog/${article.url}`} className="block group">
                    <Card className="overflow-hidden rounded-md border shadow-lg">
                      <CardContent className="p-0">
                        <div className={`relative h-[240px] `}>
                          {/* <Badge
                        className={`absolute top-4 left-4 z-10 ${article.badgeColor} text-white border-0`}
                      >
                        {article.category}
                      </Badge> */}
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover "
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4" />
                            {article.readTime} Min Read
                          </div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="group">
            Explore Resources
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </ContentWrapper>
    </section>
  );
}

{
  /* <div className="mb-16">
          {/* <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Expert videos</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button>All videos</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertVideos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="#" className="block group">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-[200px]">
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-4 h-4 border-t-8 border-t-transparent border-l-[16px] border-l-black border-b-8 border-b-transparent ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Badge variant="secondary">{video.type}</Badge>
                          <span>•</span>
                          <span>{video.category}</span>
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div> */
}
