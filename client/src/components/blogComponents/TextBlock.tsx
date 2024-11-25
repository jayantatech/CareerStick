// import React, { useState } from "react";

// interface TextBlockProps {
//   content: string;
//   onChange: (content: string) => void;
// }

// export default function TextBlock({ content, onChange }: TextBlockProps) {
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [linkText, setLinkText] = useState("");
//   const [linkUrl, setLinkUrl] = useState("");
//   const [linkType, setLinkType] = useState("internal");
//   const [openInNewTab, setOpenInNewTab] = useState(false);

//   const applyStyle = (style: string) => {
//     let newContent = content;
//     if (style === "bold") {
//       newContent = isBold
//         ? newContent.replace(/\*\*(.*?)\*\*/g, "$1")
//         : `**${newContent}**`;
//       setIsBold(!isBold);
//     } else if (style === "italic") {
//       newContent = isItalic
//         ? newContent.replace(/\*(.*?)\*/g, "$1")
//         : `*${newContent}*`;
//       setIsItalic(!isItalic);
//     } else if (style === "underline") {
//       newContent = isUnderline
//         ? newContent.replace(/__(.*?)__/g, "$1")
//         : `__${newContent}__`;
//       setIsUnderline(!isUnderline);
//     }
//     onChange(newContent);
//   };

//   const addLink = () => {
//     const linkMarkdown = `[${linkText}](${linkUrl})`;
//     onChange(content + linkMarkdown);
//     setShowLinkModal(false);
//     setLinkText("");
//     setLinkUrl("");
//     setLinkType("internal");
//     setOpenInNewTab(false);
//   };

//   return (
//     <div className="space-y-2">
//       <div className="flex space-x-2">
//         <button
//           onClick={() => applyStyle("bold")}
//           className={`px-2 py-1 border rounded ${isBold ? "bg-gray-200" : ""}`}
//         >
//           B
//         </button>
//         <button
//           onClick={() => applyStyle("italic")}
//           className={`px-2 py-1 border rounded ${
//             isItalic ? "bg-gray-200" : ""
//           }`}
//         >
//           I
//         </button>
//         <button
//           onClick={() => applyStyle("underline")}
//           className={`px-2 py-1 border rounded ${
//             isUnderline ? "bg-gray-200" : ""
//           }`}
//         >
//           U
//         </button>
//         <button
//           onClick={() => setShowLinkModal(true)}
//           className="px-2 py-1 border rounded"
//         >
//           Link
//         </button>
//       </div>
//       <textarea
//         value={content}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full p-2 border rounded"
//         rows={4}
//         placeholder="Enter text here..."
//       />
//       {showLinkModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//           <div
//             className="bg-white p-5 rounded-lg space-y-2
// "
//           >
//             <input
//               type="text"
//               value={linkText}
//               onChange={(e) => setLinkText(e.target.value)}
//               placeholder="Link text"
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               value={linkUrl}
//               onChange={(e) => setLinkUrl(e.target.value)}
//               placeholder="URL"
//               className="w-full p-2 border rounded"
//             />
//             <select
//               value={linkType}
//               onChange={(e) => setLinkType(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="internal">Internal</option>
//               <option value="external">External</option>
//             </select>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={openInNewTab}
//                 onChange={(e) => setOpenInNewTab(e.target.checked)}
//                 className="mr-2"
//               />
//               Open in new tab
//             </label>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowLinkModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={addLink}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Add Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";

interface TextBlockProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextBlock({ content, onChange }: TextBlockProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkType, setLinkType] = useState("internal");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const applyStyle = (style: string) => {
    document.execCommand(style, false);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const linkElement = document.createElement("a");
        linkElement.href = linkUrl;
        linkElement.textContent = linkText || range.toString();
        if (linkType === "external") {
          linkElement.target = "_blank";
          linkElement.rel = "noopener noreferrer";
        }
        range.deleteContents();
        range.insertNode(linkElement);
        onChange(editorRef.current.innerHTML);
      }
    }
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
    setLinkType("internal");
    setOpenInNewTab(false);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex space-x-2">
        <button
          onClick={() => applyStyle("bold")}
          className="px-2 py-1 border rounded"
        >
          B
        </button>
        <button
          onClick={() => applyStyle("italic")}
          className="px-2 py-1 border rounded"
        >
          I
        </button>
        <button
          onClick={() => applyStyle("underline")}
          className="px-2 py-1 border rounded"
        >
          U
        </button>
        <button
          onClick={() => setShowLinkModal(true)}
          className="px-2 py-1 border rounded"
        >
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        }}
        className="w-full p-2 border rounded min-h-[100px]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {showLinkModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg space-y-2">
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Link text"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="URL"
              className="w-full p-2 border rounded"
            />
            <select
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="mr-2"
              />
              Open in new tab
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addLink}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
