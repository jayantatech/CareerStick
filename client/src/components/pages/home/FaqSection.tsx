"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContentWrapper from "@/components/ContentWrapper";

const faqs = [
  {
    question: "How does the AI-powered resume builder work?",
    answer:
      "Our AI leverages advanced algorithms to analyze your input, such as job titles, skills, and experience.It then creates a professional, ATS-friendly resume tailored to your industry and specific job role. This ensures that your resume not only looks great but also meets recruiter expectations.",
  },
  {
    question: "Can I customize the templates?",
    answer:
      " Absolutely! Our templates are fully customizable. You can edit fonts, colors, layout, and content to suit your preferences. Add sections, rearrange details, and make your resume truly unique while still maintaining a professional and modern design, perfect for catching an employer's attention.",
  },
  {
    question: "Are the resumes ATS-compatible?",
    answer:
      " Yes, all resumes built using our app are designed to pass Applicant Tracking Systems (ATS). This means your resume will be structured and formatted in a way that ensures it’s readable by ATS software, increasing the chances of being seen by recruiters.",
  },
  {
    question: "Is the resume builder suitable for all career levels?",
    answer:
      "Definitely! Whether you’re a student crafting your first resume, an entry-level applicant breaking into a new field, or an experienced professional looking to level up, our tool tailors resumes to fit your specific career level and goals.",
  },
  {
    question: "Can I create multiple resumes for different jobs?",
    answer:
      "Yes, you can create and manage multiple resumes effortlessly. Customize each one for different roles or industries, ensuring every job application highlights the most relevant skills and experiences. Save your resumes in your account and access them anytime you need.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24  bg-slate-100">
      {" "}
      {/*bg-gradient-to-b from-white to-gray-50/50 */}
      <ContentWrapper>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg font-body">
              Everything you need to know about our resume builder and templates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-muted bg-white rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <span className="text-left font-semibold text-lg group-hover:text-primary transition-colors font-heading">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 font-body">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Still have questions? We&apos;re here to help!
            </p>
            {/* <Button
              size="lg"
              className="group text-white font-heading font-semibold"
            >
              Contact Support
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button> */}
            Email: example@example.com
          </motion.div>
        </div>
      </ContentWrapper>
    </section>
  );
}
