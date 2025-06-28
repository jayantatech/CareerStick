"use client";

const QuickAnswer = ({
  title,
  content,
}: {
  title?: string;
  content: string;
}) => (
  <div className="rounded  border bg-[#EFF6FF] p-6 my-2 shadow transition-all duration-300 hover:shadow-md">
    <h3 className="text-xl font-semibold font-heading">Quick Answer</h3>
    {title && title?.length > 0 && (
      <h4 className="text-lg font-semibold font-heading">{title}</h4>
    )}
    <p className="mt-2 text-lg font-blogText">{content}</p>
  </div>
);

export default QuickAnswer;
