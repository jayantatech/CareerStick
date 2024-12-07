"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContentWrapper from "@/components/ContentWrapper";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BigPostSkeleton,
  SmallPostSkeleton,
} from "@/components/(blog)/blogPostSkeleton";

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

export default function BlogPage() {
  const [blogData, setBlogData] = useState<blogCardDataType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/blog/all-blogs");
        if (!response.data.success) {
          toast.error("Failed to get blog");
        }
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
    <section className="py-24 bg-gray-50">
      <ContentWrapper>
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight sm:text-5xl font-heading"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Discover expert advice, industry insights, and practical tips to
            enhance your resume and boost your career prospects.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {isLoading
            ? Array(2)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={`skeleton-big-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BigPostSkeleton />
                  </motion.div>
                ))
            : blogData?.slice(0, 2)?.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.url}`} className="block group">
                    <Card className="overflow-hidden rounded-lg border shadow-lg">
                      <CardContent className="p-0">
                        <div className={`relative h-[300px] `}>
                          {" "}
                          {/* ${post.gradient} */}
                          {/* <Badge
                        className={`absolute top-4 left-4 rounded-sm z-10 ${post.badgeColor} text-white border-0`}
                      >
                        {post.category}
                      </Badge> */}
                          <Image
                            src={
                              post.imageUrl ||
                              "https://placehold.co/600x400/png"
                            }
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4" />
                            {post.readTime} Min Read
                          </div>
                          <h2 className="text-2xl font-semibold font-heading group-hover:text-primary transition-colors mb-2">
                            {post.title}
                          </h2>
                          {/* <p className="text-muted-foreground font-body">
                        {post.excerpt}
                      </p> */}
                          <div
                            className="prose max-w-full mb-4 leading-relaxed text-lg text-muted-foreground font-blogText"
                            dangerouslySetInnerHTML={{
                              __html: post.description || "",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={`post-skeleton-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SmallPostSkeleton />
                  </motion.div>
                ))
            : blogData?.slice(2, blogData.length)?.map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href="#" className="block group">
                    <Card className="overflow-hidden rounded-md border shadow-md">
                      <CardContent className="p-0">
                        <div className={`relative h-[200px] `}>
                          {/* <Badge
                        className={`absolute top-4 rounded-sm left-4 z-10 ${post.badgeColor} text-white border-0`}
                      >
                        {post.category}
                      </Badge> */}
                          <Image
                            src={
                              post.imageUrl ||
                              "https://placehold.co/600x400/png"
                            }
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 h-[132px] max-md:h-auto bg-white">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Clock className="h-4 w-4" />
                            {post.readTime} Min Read
                          </div>
                          <h3 className="text-xl font-semibold font-heading group-hover:text-primary transition-colors">
                            {post.title}
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
            Load More Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </ContentWrapper>
    </section>
  );
}
