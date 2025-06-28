// import dynamic from "next/dynamic";

// import type { ReactQuillProps } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { MonthYearDate } from "@/lib/types/generaltypes";
// import React, { memo } from "react";

// const customStyles = `
// .ql-container {
//   font-family: inter, sans-serif !important;
//   font-size: 16px !important;
//   border: 1px solid #e5e7eb !important;
//   border-radius: 2px !important;
// }

// .ql-editor {
//   padding: 16px !important;
//   min-height: 148px !important;
//   max-height: 240px !important;
//   overflow-y: auto !important;
// }

// .ql-toolbar {
//   border: 1px solid #e5e7eb !important;
//   border-radius: 2px !important;
//   margin-bottom: 8px !important;
//   background-color: #f9fafb !important;
//   padding: 8px !important;
// }

// .ql-editor p {
//   margin-bottom: 0.5rem !important;
// }

// .ql-editor ul, .ql-editor ol {
//   padding-left: 1.5rem !important;
//   margin-bottom: 0.5rem !important;
// }

// .ql-editor ul > li {
//   list-style-type: none !important;
//   padding-left: 0.5rem !important;
// }

// .ql-editor ol > li {
//   list-style-type: none !important;
//   padding-left: 0.5rem !important;
// }

// .ql-snow .ql-toolbar button {
//   width: 28px !important;
//   height: 28px !important;
//   padding: 4px !important;
// }

// .ql-snow .ql-toolbar button:hover {
//   background-color: #f3f4f6 !important;
//   border-radius: 2px !important;
// }

// .ql-active {
//   background-color: #e5e7eb !important;
//   border-radius: 2px !important;
// }
// `;

// const ReactQuill = dynamic<ReactQuillProps>(
//   async () => {
//     const { default: RQ } = await import("react-quill");
//     return function QuillWrapper({ ...props }: ReactQuillProps) {
//       return (
//         <>
//           <style>{customStyles}</style>
//           <RQ {...props} />
//         </>
//       );
//     };
//   },
//   { ssr: false, loading: () => <p>Loading editor...</p> }
// );

// interface QuillFieldProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// const QuillField: React.FC<QuillFieldProps> = memo(({ value, onChange }) => {
//   const modules = {
//     toolbar: {
//       container: [
//         ["bold", "italic", "underline"],
//         [{ list: "ordered" }, { list: "bullet" }],
//       ],
//     },
//   };

//   const formats = ["bold", "italic", "underline", "list", "bullet"];

//   return (
//     <div className="w-full">
//       <ReactQuill
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//         theme="snow"
//         placeholder="Example: Managed a team of 8, improving project delivery time by 15%"
//         className="bg-white rounded shadow-sm transition-shadow duration-200"
//       />
//     </div>
//   );
// });

// QuillField.displayName = "QuillField";

// export default QuillField;

// import dynamic from "next/dynamic";
// import type { ReactQuillProps } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
// import { debounce } from "lodash";

// const customStyles = `
//   .ql-container {
//     font-family: inter, sans-serif !important;
//     font-size: 16px !important;
//     border: 1px solid #e5e7eb !important;
//     border-radius: 2px !important;
//   }

//   .ql-editor {
//     padding: 16px !important;
//     min-height: 148px !important;
//     max-height: 240px !important;
//     overflow-y: auto !important;
//   }

//   .ql-toolbar {
//     border: 1px solid #e5e7eb !important;
//     border-radius: 2px !important;
//     margin-bottom: 8px !important;
//     background-color: #f9fafb !important;
//     padding: 8px !important;
//   }

//   .ql-editor p {
//     margin-bottom: 0.5rem !important;
//   }

//   .ql-editor ul, .ql-editor ol {
//     padding-left: 1.5rem !important;
//     margin-bottom: 0.5rem !important;
//   }

//   .ql-editor ul > li {
//     list-style-type: normal !important;
//     padding-left: 0.5rem !important;
//   }

//   .ql-editor ol > li {
//     list-style-type: none !important;
//     padding-left: 0.5rem !important;
//   }

//   .ql-snow .ql-toolbar button {
//     width: 28px !important;
//     height: 28px !important;
//     padding: 4px !important;
//   }

//   .ql-snow .ql-toolbar button:hover {
//     background-color: #f3f4f6 !important;
//     border-radius: 2px !important;
//   }

//   .ql-active {
//     background-color: #e5e7eb !important;
//     border-radius: 2px !important;
//   }

// `;

// const modules = {
//   toolbar: {
//     container: [
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//     ],
//   },
// };

// const formats = ["bold", "italic", "underline", "list", "bullet"];

// const ReactQuill = dynamic<ReactQuillProps>(
//   async () => {
//     const { default: RQ } = await import("react-quill");
//     return function QuillWrapper({ ...props }: ReactQuillProps) {
//       return (
//         <>
//           <style>{customStyles}</style>
//           <RQ {...props} />
//         </>
//       );
//     };
//   },
//   { ssr: false, loading: () => <p>Loading editor...</p> }
// );

// interface QuillFieldProps {
//   value: string;
//   onChange: (content: string) => void;
//   placeholderText?: string;
// }

// const QuillField: React.FC<QuillFieldProps> = memo(
//   ({ value, onChange, placeholderText }) => {
//     const [localValue, setLocalValue] = useState(value);

//     const debouncedOnChange = useMemo(
//       () =>
//         debounce((content: string) => {
//           onChange(content);
//         }, 700), // I have increased the debounce time from 300 to 700
//       [onChange]
//     );

//     useEffect(() => {
//       setLocalValue(value);
//     }, [value]);

//     const handleLocalChange = useCallback(
//       (content: string) => {
//         setLocalValue(content);
//         debouncedOnChange(content);
//       },
//       [debouncedOnChange]
//     );

//     useEffect(() => {
//       return () => {
//         debouncedOnChange.cancel();
//       };
//     }, [debouncedOnChange]);

//     return (
//       <div className="w-full">
//         <ReactQuill
//           value={localValue}
//           onChange={handleLocalChange}
//           modules={modules}
//           formats={formats}
//           theme="snow"
//           placeholder={
//             placeholderText?.length ? placeholderText : "Enter your text here"
//           }
//           className="bg-white rounded shadow-sm transition-shadow duration-200 custom-scrollbar   "
//         />
//       </div>
//     );
//   }
// );

// QuillField.displayName = "QuillField";

// export default QuillField;

import dynamic from "next/dynamic";
import type { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const customStyles = `
  .ql-container {
    font-family: inter, sans-serif !important;
    font-size: 16px !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 2px !important;
  }

  .ql-editor {
    padding: 16px !important;
    min-height: 148px !important;
    max-height: 240px !important;
    overflow-y: auto !important;
  }

  .ql-toolbar {
    border: 1px solid #e5e7eb !important;
    border-radius: 2px !important;
    margin-bottom: 8px !important;
    background-color: #f9fafb !important;
    padding: 8px !important;
  }

  .ql-editor p {
    margin-bottom: 0.5rem !important;
  }

  .ql-editor ul,
  .ql-editor ol {
    padding-left: 1.5rem !important;
    margin-bottom: 0.5rem !important;
    margin-top: 0.5rem !important;
  }

  .ql-editor ul > li {
    list-style-type: disc !important;
    padding-left: 0.5rem !important;
    margin-bottom: 0.25rem !important;
  }

  .ql-editor ol > li {
    list-style-type: decimal !important;
    padding-left: 0.5rem !important;
    margin-bottom: 0.25rem !important;
  }

  .ql-editor ul > li::before,
  .ql-editor ol > li::before {
    display: none !important;
  }

  .ql-snow .ql-toolbar button {
    width: 28px !important;
    height: 28px !important;
    padding: 4px !important;
  }

  .ql-snow .ql-toolbar button:hover {
    background-color: #f3f4f6 !important;
    border-radius: 2px !important;
  }

  .ql-active {
    background-color: #e5e7eb !important;
    border-radius: 2px !important;
  }
`;

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  },
};

const formats = ["bold", "italic", "underline", "list", "bullet"];

const ReactQuill = dynamic<ReactQuillProps>(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function QuillWrapper({ ...props }: ReactQuillProps) {
      return (
        <>
          <style>{customStyles}</style>
          <RQ {...props} />
        </>
      );
    };
  },
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

interface QuillFieldProps {
  value: string;
  onChange: (content: string) => void;
  placeholderText?: string;
}

const QuillField: React.FC<QuillFieldProps> = memo(
  ({ value, onChange, placeholderText }) => {
    const [localValue, setLocalValue] = useState(value);

    const debouncedOnChange = useMemo(
      () =>
        debounce((content: string) => {
          onChange(content);
        }, 700),
      [onChange]
    );

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleLocalChange = useCallback(
      (content: string) => {
        setLocalValue(content);
        debouncedOnChange(content);
      },
      [debouncedOnChange]
    );

    useEffect(() => {
      return () => {
        debouncedOnChange.cancel();
      };
    }, [debouncedOnChange]);

    return (
      <div className="w-full">
        <ReactQuill
          value={localValue}
          onChange={handleLocalChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={
            placeholderText?.length ? placeholderText : "Enter your text here"
          }
          className="bg-white rounded shadow-sm transition-shadow duration-200 custom-scrollbar"
        />
      </div>
    );
  }
);

QuillField.displayName = "QuillField";

export default QuillField;
