// "use client";

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// const DynamicEditor = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   openInNewTab: boolean;
// }

// interface TextBlockProps {
//   content: { html: string; links: Link[] };
//   onChange: (content: { html: string; links: Link[] }) => void;
// }

// export default function TextBlock({ content, onChange }: TextBlockProps) {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [links, setLinks] = useState<Link[]>(content.links || []);

//   useEffect(() => {
//     if (content.html) {
//       const contentBlock = htmlToDraft(content.html);
//       if (contentBlock) {
//         const contentState = ContentState.createFromBlockArray(
//           contentBlock.contentBlocks
//         );
//         setEditorState(EditorState.createWithContent(contentState));
//       }
//     }
//     setLinks(content.links || []);
//   }, [content.html, content.links]);

//   const onEditorStateChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//     const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
//     onChange({ html, links });
//   };

//   const addLink = (linkData: Link) => {
//     const updatedLinks = [...links, linkData];
//     setLinks(updatedLinks);
//     onChange({ html: content.html, links: updatedLinks });
//   };

//   const updateLink = (index: number, linkData: Partial<Link>) => {
//     const updatedLinks = links.map((link, i) =>
//       i === index ? { ...link, ...linkData } : link
//     );
//     setLinks(updatedLinks);
//     onChange({ html: content.html, links: updatedLinks });
//   };

//   const removeLink = (index: number) => {
//     const updatedLinks = links.filter((_, i) => i !== index);
//     setLinks(updatedLinks);
//     onChange({ html: content.html, links: updatedLinks });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border rounded-md overflow-hidden">
//         <DynamicEditor
//           editorState={editorState}
//           onEditorStateChange={onEditorStateChange}
//           wrapperClassName="w-full"
//           editorClassName="px-4 py-2 min-h-[200px]"
//           toolbar={{
//             options: ["inline", "list", "link"],
//             inline: {
//               options: ["bold", "italic", "underline"],
//             },
//             list: {
//               options: ["unordered", "ordered"],
//             },
//             link: {
//               options: ["link"],
//             },
//           }}
//         />
//       </div>
//       <div className="space-y-2">
//         <h4 className="font-bold">Links</h4>
//         {links.map((link, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={link.text}
//               onChange={(e) => updateLink(index, { text: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="Link text"
//             />
//             <input
//               type="text"
//               value={link.url}
//               onChange={(e) => updateLink(index, { url: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="URL"
//             />
//             <select
//               value={link.type}
//               onChange={(e) =>
//                 updateLink(index, {
//                   type: e.target.value as "internal" | "external",
//                 })
//               }
//               className="p-2 border rounded"
//             >
//               <option value="internal">Internal</option>
//               <option value="external">External</option>
//             </select>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={link.openInNewTab}
//                 onChange={(e) =>
//                   updateLink(index, { openInNewTab: e.target.checked })
//                 }
//                 className="mr-2"
//               />
//               Open in new tab
//             </label>
//             <button
//               onClick={() => removeLink(index)}
//               className="px-2 py-1 bg-red-500 text-white rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() =>
//             addLink({
//               text: "",
//               url: "",
//               type: "internal",
//               openInNewTab: false,
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Link
//         </button>
//       </div>
//     </div>
//   );
// }
// v2
// "use client";

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import "quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   openInNewTab: boolean;
// }

// interface TextBlockProps {
//   content: { html: string; links: Link[] };
//   onChange: (content: { html: string; links: Link[] }) => void;
// }

// export default function TextBlock({ content, onChange }: TextBlockProps) {
//   const [html, setHtml] = useState(content.html || "");
//   const [links, setLinks] = useState<Link[]>(content.links || []);

//   useEffect(() => {
//     setHtml(content.html || "");
//     setLinks(content.links || []);
//   }, [content.html, content.links]);

//   const modules = {
//     toolbar: [
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//     ],
//   };

//   const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

//   const handleChange = (value: string) => {
//     setHtml(value);
//     onChange({ html: value, links });
//   };

//   const addLink = (linkData: Link) => {
//     const updatedLinks = [...links, linkData];
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   const updateLink = (index: number, linkData: Partial<Link>) => {
//     const updatedLinks = links.map((link, i) =>
//       i === index ? { ...link, ...linkData } : link
//     );
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   const removeLink = (index: number) => {
//     const updatedLinks = links.filter((_, i) => i !== index);
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border rounded-md overflow-hidden">
//         <ReactQuill
//           value={html}
//           onChange={handleChange}
//           modules={modules}
//           formats={formats}
//           className="min-h-[200px]"
//         />
//       </div>
//       <div className="space-y-2">
//         <h4 className="font-bold">Links</h4>
//         {links.map((link, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={link.text}
//               onChange={(e) => updateLink(index, { text: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="Link text"
//             />
//             <input
//               type="text"
//               value={link.url}
//               onChange={(e) => updateLink(index, { url: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="URL"
//             />
//             <select
//               value={link.type}
//               onChange={(e) =>
//                 updateLink(index, {
//                   type: e.target.value as "internal" | "external",
//                 })
//               }
//               className="p-2 border rounded"
//             >
//               <option value="internal">Internal</option>
//               <option value="external">External</option>
//             </select>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={link.openInNewTab}
//                 onChange={(e) =>
//                   updateLink(index, { openInNewTab: e.target.checked })
//                 }
//                 className="mr-2"
//               />
//               Open in new tab
//             </label>
//             <button
//               onClick={() => removeLink(index)}
//               className="px-2 py-1 bg-red-500 text-white rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() =>
//             addLink({
//               text: "",
//               url: "",
//               type: "internal",
//               openInNewTab: false,
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Link
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import "quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   openInNewTab: boolean;
//   doFollow: boolean;
// }

// interface TextBlockProps {
//   content: { html: string; links: Link[] };
//   onChange: (content: { html: string; links: Link[] }) => void;
// }

// export default function TextBlock({ content, onChange }: TextBlockProps) {
//   const [html, setHtml] = useState(content.html || "");
//   const [links, setLinks] = useState<Link[]>(content.links || []);

//   useEffect(() => {
//     setHtml(content.html || "");
//     setLinks(content.links || []);
//   }, [content.html, content.links]);

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "list",
//     "ordered",
//     "bullet",
//     "link",
//   ];

//   const handleChange = (value: string) => {
//     setHtml(value);
//     onChange({ html: value, links });
//   };

//   const addLink = (linkData: Link) => {
//     const updatedLinks = [...links, linkData];
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   const updateLink = (index: number, linkData: Partial<Link>) => {
//     const updatedLinks = links.map((link, i) =>
//       i === index ? { ...link, ...linkData } : link
//     );
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   const removeLink = (index: number) => {
//     const updatedLinks = links.filter((_, i) => i !== index);
//     setLinks(updatedLinks);
//     onChange({ html, links: updatedLinks });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="border rounded-md overflow-hidden">
//         <ReactQuill
//           value={html}
//           onChange={handleChange}
//           modules={modules}
//           formats={formats}
//           className="min-h-[400px]" // Increased height
//           style={{ height: "400px" }} // Explicit height
//         />
//       </div>
//       <div className="space-y-2">
//         <h4 className="font-bold">Links</h4>
//         {links.map((link, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={link.text}
//               onChange={(e) => updateLink(index, { text: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="Link text"
//             />
//             <input
//               type="text"
//               value={link.url}
//               onChange={(e) => updateLink(index, { url: e.target.value })}
//               className="flex-grow p-2 border rounded"
//               placeholder="URL"
//             />
//             <select
//               value={link.type}
//               onChange={(e) =>
//                 updateLink(index, {
//                   type: e.target.value as "internal" | "external",
//                 })
//               }
//               className="p-2 border rounded"
//             >
//               <option value="internal">Internal</option>
//               <option value="external">External</option>
//             </select>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={link.openInNewTab}
//                 onChange={(e) =>
//                   updateLink(index, { openInNewTab: e.target.checked })
//                 }
//                 className="mr-2"
//               />
//               Open in new tab
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={link.doFollow}
//                 onChange={(e) =>
//                   updateLink(index, { doFollow: e.target.checked })
//                 }
//                 className="mr-2"
//               />
//               Do Follow
//             </label>
//             <button
//               onClick={() => removeLink(index)}
//               className="px-2 py-1 bg-red-500 text-white rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() =>
//             addLink({
//               text: "",
//               url: "",
//               type: "internal",
//               openInNewTab: false,
//               doFollow: true,
//             })
//           }
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Link
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  doFollow: boolean;
}

interface TextBlockProps {
  content: { html: string; links: Link[] };
  onChange: (content: { html: string; links: Link[] }) => void;
}

export default function TextBlock({ content, onChange }: TextBlockProps) {
  const [html, setHtml] = useState(content.html || "");
  const [links, setLinks] = useState<Link[]>(content.links || []);

  useEffect(() => {
    setHtml(content.html || "");
    setLinks(content.links || []);
  }, [content.html, content.links]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "ordered",
    "bullet",
    "link",
  ];

  const handleChange = (value: string) => {
    setHtml(value);
    onChange({ html: value, links });
  };

  const addLink = (linkData: Link) => {
    const updatedLinks = [...links, linkData];
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  const updateLink = (index: number, linkData: Partial<Link>) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, ...linkData } : link
    );
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  const removeLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onChange({ html, links: updatedLinks });
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <ReactQuill
          value={html}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="min-h-[400px]"
          style={{ height: "400px" }}
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-bold">Links</h4>
        {links.map((link, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={link.text}
              onChange={(e) => updateLink(index, { text: e.target.value })}
              className="flex-grow p-2 border rounded"
              placeholder="Link text"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => updateLink(index, { url: e.target.value })}
              className="flex-grow p-2 border rounded"
              placeholder="URL"
            />
            <select
              value={link.type}
              onChange={(e) =>
                updateLink(index, {
                  type: e.target.value as "internal" | "external",
                })
              }
              className="p-2 border rounded"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={link.doFollow}
                onChange={(e) =>
                  updateLink(index, { doFollow: e.target.checked })
                }
                className="mr-2"
              />
              Do Follow
            </label>
            <button
              onClick={() => removeLink(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addLink({
              text: "",
              url: "",
              type: "internal",
              doFollow: true,
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Link
        </button>
      </div>
    </div>
  );
}
