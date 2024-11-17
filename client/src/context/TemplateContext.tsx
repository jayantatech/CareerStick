// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export type TemplateType = "default" | "template2";

// interface TemplateContextType {
//   currentTemplate: TemplateType;
//   setCurrentTemplate: (template: TemplateType) => void;
// }

// const TemplateContext = createContext<TemplateContextType>({
//   currentTemplate: "default",
//   setCurrentTemplate: () => {},
// });

// export const useTemplate = () => useContext(TemplateContext);

// export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [currentTemplate, setCurrentTemplate] =
//     useState<TemplateType>("default");

//   useEffect(() => {
//     console.log("Current Template from context", currentTemplate);
//   }, [currentTemplate]);

//   return (
//     <TemplateContext.Provider value={{ currentTemplate, setCurrentTemplate }}>
//       {children}
//     </TemplateContext.Provider>
//   );
// };

// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export type TemplateType = "default" | "template2";

// interface TemplateContextType {
//   currentTemplate: TemplateType;
//   setCurrentTemplate: (template: TemplateType) => void;
// }

// // Creating the context with a default value
// const TemplateContext = createContext<TemplateContextType | undefined>(
//   undefined
// );

// // Custom hook to use the Template context
// export const useTemplate = () => {
//   const context = useContext(TemplateContext);
//   if (!context) {
//     throw new Error("useTemplate must be used within a TemplateProvider");
//   }
//   return context;
// };

// export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [currentTemplate, setCurrentTemplate] =
//     useState<TemplateType>("default");

//   useEffect(() => {
//     console.log("Current Template from context:", currentTemplate);
//   }, [currentTemplate]);

//   const handleSetCurrentTemplate = (template: TemplateType) => {
//     setCurrentTemplate(template);
//   };

//   return (
//     <TemplateContext.Provider
//       value={{
//         currentTemplate,
//         setCurrentTemplate: handleSetCurrentTemplate,
//       }}
//     >
//       {children}
//     </TemplateContext.Provider>
//   );
// };

"use client";
import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
import React, { createContext, useContext, useEffect, useState } from "react";

// export type TemplateType = "default" | "template2" | "template3" | "template4";

interface TemplateContextType {
  currentTemplate: TemplateType;
  setCurrentTemplate: (template: TemplateType) => void;
}

const TemplateContext = createContext<TemplateContextType>({
  currentTemplate: "default",
  setCurrentTemplate: () => {},
});

export const useTemplate = () => useContext(TemplateContext);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTemplate, setCurrentTemplate] =
    useState<TemplateType>("default");

  const handleTemplateChange = (template: TemplateType) => {
    setCurrentTemplate(template);
  };

  useEffect(() => {
    console.log("Current Template from context:", currentTemplate);
  }, [currentTemplate]);

  return (
    <TemplateContext.Provider
      value={{
        currentTemplate,
        setCurrentTemplate: handleTemplateChange,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
