"use client";

const QuickAnswer = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="rounded  border bg-[#EFF6FF] p-6">
    <h3 className="text-xl font-semibold font-heading">Quick Answer</h3>
    {title.length > 0 && (
      <h4 className="text-lg font-semibold font-heading">{title}</h4>
    )}
    <p className="mt-2 text-lg font-blogText">{content}</p>
  </div>
);

export default QuickAnswer;
