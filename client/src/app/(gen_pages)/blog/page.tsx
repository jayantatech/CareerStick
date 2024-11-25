// import ContentWrapper from "@/components/ContentWrapper";
// import React from "react";

// const Blog = () => {
//   return (
//     <ContentWrapper>
//       <div></div>
//     </ContentWrapper>
//   );
// };

// export default Blog;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ContentWrapper from "@/components/ContentWrapper";
import { StockResume } from "../../../../public/img";

const featuredPosts = [
  {
    title: "The universal guide on how to write the perfect resume",
    category: "FIELD TESTED",
    readTime: "5 MIN READ",
    image: StockResume,
    gradient: "from-purple-500/20 to-purple-700/20",
    badgeColor: "bg-orange-400",
    excerpt:
      "Learn the essential elements of a standout resume that will catch the eye of recruiters and land you your dream job.",
  },
  {
    title: "A comprehensive guide on how to write a cover letter",
    category: "HR APPROVED",
    readTime: "3 MIN READ",
    image: StockResume,
    gradient: "from-teal-500/20 to-teal-700/20",
    badgeColor: "bg-blue-400",
    excerpt:
      "Discover the key components of an effective cover letter that complements your resume and increases your chances of getting an interview.",
  },
];

const blogPosts = [
  {
    title: "Master the art of personal branding in your resume",
    category: "TRENDING",
    readTime: "4 MIN READ",
    image: StockResume,
    gradient: "from-blue-500/10 to-blue-700/20",
    badgeColor: "bg-pink-400",
  },
  {
    title: "10 resume mistakes to avoid in 2023",
    category: "TIPS",
    readTime: "6 MIN READ",
    image: StockResume,
    gradient: "from-green-500/10 to-green-700/20",
    badgeColor: "bg-green-400",
  },
  {
    title: "How to tailor your resume for different industries",
    category: "STRATEGY",
    readTime: "5 MIN READ",
    image: StockResume,
    gradient: "from-yellow-500/10 to-yellow-700/20",
    badgeColor: "bg-yellow-400",
  },
  {
    title: "The impact of AI on resume screening: What you need to know",
    category: "TECH INSIGHTS",
    readTime: "7 MIN READ",
    image: StockResume,
    gradient: "from-red-500/10 to-red-700/20",
    badgeColor: "bg-red-400",
  },
  {
    title: "Crafting a resume for career transitions",
    category: "CAREER CHANGE",
    readTime: "5 MIN READ",
    image: StockResume,
    gradient: "from-indigo-500/10 to-indigo-700/20",
    badgeColor: "bg-indigo-400",
  },
  {
    title: "The do's and don'ts of resume formatting",
    category: "DESIGN",
    readTime: "4 MIN READ",
    image: StockResume,
    gradient: "from-purple-500/10 to-purple-700/20",
    badgeColor: "bg-purple-400",
  },
];

export default function BlogPage() {
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
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href="#" className="block group">
                <Card className="overflow-hidden rounded-lg border shadow-lg">
                  <CardContent className="p-0">
                    <div className={`relative h-[300px] ${post.gradient}`}>
                      <Badge
                        className={`absolute top-4 left-4 rounded-sm z-10 ${post.badgeColor} text-white border-0`}
                      >
                        {post.category}
                      </Badge>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                      <h2 className="text-2xl font-semibold font-heading group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground font-body">
                        {post.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post, index) => (
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
                    <div className={`relative h-[200px] ${post.gradient}`}>
                      <Badge
                        className={`absolute top-4 rounded-sm left-4 z-10 ${post.badgeColor} text-white border-0`}
                      >
                        {post.category}
                      </Badge>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 h-[132px] max-md:h-auto bg-white">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
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
