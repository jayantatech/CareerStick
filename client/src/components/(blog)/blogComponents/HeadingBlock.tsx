import React from "react";

export interface HeadingBlockProps {
  content: { level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; text: string };
  onChange: (content: {
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    text: string;
  }) => void;
}

export default function HeadingBlock({ content, onChange }: HeadingBlockProps) {
  return (
    <div className="space-y-2">
      <select
        value={content.level}
        onChange={(e) =>
          onChange({
            ...content,
            level: e.target.value as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
          })
        }
        className="p-2 border rounded"
      >
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>
      <input
        type="text"
        value={content.text}
        onChange={(e) => onChange({ ...content, text: e.target.value })}
        className="w-full p-2 border rounded font-bold"
        placeholder="Heading text"
      />
    </div>
  );
}
