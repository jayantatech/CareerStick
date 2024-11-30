import React from "react";

const FAQBox = ({
  questions,
  answers,
}: {
  questions: string;
  answers: string;
}) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded border p-6">
        <h3 className="text-xl font-semibold">{questions}</h3>
        <p className="mt-2 text-muted-foreground">{answers}</p>
      </div>
    </div>
    // <div className="mt-6 space-y-6">
    //   {[
    //     {
    //       question: "How long should my resume be?",
    //       answer:
    //         "For most professionals, a one-page resume is ideal. If you have extensive relevant experience, two pages may be appropriate.",
    //     },
    //     {
    //       question: "Should I include a photo on my resume?",
    //       answer:
    //         "In most cases, it's best to avoid including a photo on your resume, unless specifically requested by the employer.",
    //     },
    //     {
    //       question: "How far back should my work history go?",
    //       answer:
    //         "Generally, focus on the last 10-15 years of your work history, unless older experience is highly relevant to the position.",
    //     },
    //     {
    //       question: "What file format should I use for my resume?",
    //       answer:
    //         "Unless otherwise specified, a PDF format is usually best as it preserves your formatting across different devices and systems.",
    //     },
    //   ].map((item, index) => (
    //     <div key={index} className="rounded border p-6">
    //       <h3 className="text-xl font-semibold">{item.question}</h3>
    //       <p className="mt-2 text-muted-foreground">{item.answer}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default FAQBox;
