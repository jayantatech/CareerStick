// import React from "react";

// interface TitleBlockProps {
//   content: string;
//   onChange: (content: string) => void;
// }

// export default function TitleBlock({ content, onChange }: TitleBlockProps) {
//   console.log("TitleBlock rendered", content);
//   const value = Object.keys(content)
//     .filter((key) => !isNaN(key)) // Ensure only numeric keys are included
//     .sort((a, b) => a - b) // Sort keys in ascending order
//     .map((key) => content[key]) // Map keys to their corresponding values
//     .join(""); // Combine all characters into a single string

//   return (
//     <div className="space-y-2">
//       <h2 className="text-xl font-bold">Blog Title</h2>
//       <input
//         type="text"
//         value={content}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full p-2 border rounded text-2xl font-bold"
//         placeholder="Enter blog title..."
//       />
//     </div>
//   );
// }
import React from "react";

interface TitleBlockProps {
  content: string; // Expecting string directly instead of object
  onChange: (content: string) => void;
}

export default function TitleBlock({
  content = "",
  onChange,
}: TitleBlockProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Blog Title</h2>
      <input
        type="text"
        value={content || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded text-2xl font-bold"
        placeholder="Enter blog title..."
      />
    </div>
  );
}
