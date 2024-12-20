"use client";

import { motion } from "framer-motion";
import { CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContentWrapper from "@/components/ContentWrapper";
import Link from "next/link";

const features = [
  "Advanced resume builder",
  "AI-powered content suggestions",
  "Multiple resume templates",
  "Cover letter generator",
  "Job application tracker",
  "Interview preparation tools",
  "Career advice resources",
  "Premium customer support",
];

export default function PricingPageContent() {
  return (
    <section className="py-24 bg-gray-50">
      <ContentWrapper>
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Enjoy Premium Features for Free
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {`We're still in the development stage and value your feedback`}{" "}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="w-full max-w-3xl mx-auto rounded">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Early Access Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-semibold mb-6">
                All Features Unlocked
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-8">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-6">
                As we&apos;re still improving our app based on user feedback,
                all premium features are currently available for free. In the
                future, we may introduce subscription plans, but for now, enjoy
                full access to all our available tools!
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/app/resumes">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-heading font-semibold text-[18px] text-white rounded"
                >
                  <Zap className="mr-2 h-5 w-5" /> Get Started for Free
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Help Us Improve</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Your feedback is crucial in shaping the future of our app. Try out
            all our features and let us know what you think. Together, we can
            create the ultimate resume building experience!
          </p>
          <Link href="/app/resumes">
            <Button variant="outline" size="lg">
              Provide Feedback
            </Button>
          </Link>
        </motion.div>
      </ContentWrapper>
    </section>
  );
}
