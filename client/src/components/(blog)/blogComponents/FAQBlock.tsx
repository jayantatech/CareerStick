import React from "react";

interface FAQBlockProps {
  content: { question: string; answer: string };
  onChange: (content: { question: string; answer: string }) => void;
}

export default function FAQBlock({ content, onChange }: FAQBlockProps) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={content.question}
        onChange={(e) => onChange({ ...content, question: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Question"
      />
      <textarea
        value={content.answer}
        onChange={(e) => onChange({ ...content, answer: e.target.value })}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Answer"
      />
    </div>
  );
}
