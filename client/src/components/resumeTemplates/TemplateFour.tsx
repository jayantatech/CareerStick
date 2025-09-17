// import React, { useEffect, useRef, useState } from "react";
// import { Phone, Mail, MapPin, Linkedin, Github } from "lucide-react";
// import Link from "next/link";
// import { LuExternalLink, LuFacebook } from "react-icons/lu";
// import { RiTwitterXFill } from "react-icons/ri";
// import { FiYoutube } from "react-icons/fi";
// import { FaBehance, FaInstagram } from "react-icons/fa";
// import { IoLogoGithub } from "react-icons/io5";
// import { StyleConfig } from "@/lib/types/resumeTemplate";
// import { ResumeState } from "@/lib/types/resumeInput";
// import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";
// interface TemplateThreeProps {
//   data: ResumeState;
//   styleConfig: ResumeStyleState;
// }

// interface ActiveSections {
//   jobIndustry?: boolean;
//   personalInfo?: boolean;
//   professionalSummary?: boolean;
//   education?: boolean;
//   languages?: boolean;
//   selectedSkills?: boolean;
//   awards?: boolean;
//   certificate?: boolean;
//   projects?: boolean;
//   workExperience?: boolean;
//   openSourceContributions?: boolean;
//   socialLinks?: boolean;
//   customSections?: boolean;
// }

// type Section = {
//   type: string;
//   content: React.ReactNode;
//   height?: number;
// };

// const getStyleValues = (config: StyleConfig = defaultStyleConfig) => {
//   const fontSizes = {
//     small: { body: "text-sm", heading: "text-2xl", title: "text-md" },
//     normal: { body: "text-base", heading: "text-3xl", title: "text-lg" },
//     large: { body: "text-[17px]", heading: "text-4xl", title: "text-xl" },
//     extraLarge: {
//       body: "text-[20px]",
//       heading: "text-[40px]",
//       title: "text-[22px]",
//     },
//   };

//   const jobRoleSizes = {
//     small: "text-[16px]",
//     normal: "text-[18px]",
//     large: "text-[20px]",
//     extraLarge: "text-[23px]",
//   };
//   const skillsFontSizes = {
//     small: "text-[13px]",
//     normal: "text-[15px]",
//     large: "text-[17px]",
//     extraLarge: "text-[19px]",
//   };

//   const sectionInnerTitle = {
//     small: "text-[14px]",
//     normal: "text-[17px]",
//     large: "text-[19px]",
//     extraLarge: "text-[21px]",
//   };

//   const subInfoFontSizes = {
//     small: "text-[12px]",
//     normal: "text-[14px]",
//     large: "text-[15px]",
//     extraLarge: "text-[17px]",
//   }; //This one is for the Date and location etc

//   const margins = {
//     compact: { page: "p-7", section: "mb-5" },
//     normal: { page: "p-9", section: "mb-7" },
//     spacious: { page: "p-11", section: "mb-8" },
//   };

//   const lineHeights = {
//     compact: "leading-snug",
//     normal: "leading-normal",
//     spacious: "leading-relaxed",
//   };

//   const fontFamilies: Record<string, string> = {
//     Inter: "font-inter",
//     Roboto: "font-roboto",
//     Merriweather: "font-merriweather",
//     Courier: "font-courier",
//     // Helvetica: "font-helvetica",
//     Helvetica: "font-inter",
//     "Times-Roman": "font-times-roman",
//   };

//   const sectionSpacing = {
//     compact: "mb-1",
//     normal: "mb-2",
//     spacious: "mb-4",
//   };

//   return {
//     fontSize: fontSizes[config.fontSize?.body || "normal"],
//     headingSize: fontSizes[config.fontSize?.heading || "normal"],
//     pageMargin: margins[config.margins?.page || "normal"]?.page,
//     sectionMargin: margins[config.margins?.section || "normal"]?.section,
//     lineHeight: lineHeights[config.lineHeight || "normal"],
//     jobRoleSize: jobRoleSizes[config.fontSize?.body || "normal"],
//     skillsFontSizes: skillsFontSizes[config.fontSize?.body || "normal"],
//     sectionInnerTitle: sectionInnerTitle[config.fontSize?.body || "normal"],
//     subInfoFontSizes: subInfoFontSizes[config.fontSize?.body || "normal"],
//     fontFamilies: fontFamilies[config.fontFamily || "Inter"] || "font-inter",
//     sectionSpacing: sectionSpacing[config.sectionSpacing || "normal"],
//   };
// };

// const defaultStyleConfig: StyleConfig = {
//   fontSize: {
//     body: "normal",
//     heading: "normal",
//   },
//   margins: {
//     page: "normal",
//     section: "normal",
//   },
//   fontFamily: "Courier",
//   colorScheme: {
//     primary: "#111827",
//     secondary: "#3B82F6",
//     text: "#4B5563",
//   },
//   lineHeight: "normal",
//   sectionSpacing: "normal",
//   activeSections: {
//     jobIndustry: true,
//     personalInfo: true,
//     professionalSummary: true,
//     education: true,
//     languages: true,
//     selectedSkills: true,
//     awards: false,
//     certificate: false,
//     projects: false,
//     workExperience: true,
//     openSourceContributions: false,
//     socialLinks: true,
//     customSections: false,
//   },
// };

// const getSocialIcon = (platform: string) => {
//   const iconMap = {
//     linkedin: <Linkedin className="w-4 h-4" />,
//     github: <IoLogoGithub className="w-4 h-4" />,
//     twitter: <RiTwitterXFill className="w-4 h-4" />,
//     instagram: <FaInstagram className="w-4 h-4" />,
//     facebook: <LuFacebook className="w-4 h-4" />,
//     youtube: <FiYoutube className="w-4 h-4" />,
//     behance: <FaBehance className="w-4 h-4" />,
//   };
//   return (
//     iconMap[platform.toLowerCase() as keyof typeof iconMap] || (
//       <LuExternalLink className="w-4 h-4" />
//     )
//   );
//   // return <LuExternalLink className="w-4 h-4" />;
// };

// const TemplateFour = ({ data, styleConfig = {} }) => {
//   const [firstPageSections, setFirstPageSections] = useState([]);
//   const [overflowSections, setOverflowSections] = useState([]);
//   const contentRefs = useRef(new Map());

//   const primaryColor = styleConfig?.colorScheme?.primary || "#2C3E50";
//   const secondaryColor = styleConfig?.colorScheme?.secondary || "#3498DB";

//   // Standard A4 dimensions (in pixels at 96 DPI)
//   const PAGE_HEIGHT = 842; // 11.69 inches * 72 DPI
//   const PAGE_WIDTH = 595; // 8.27 inches * 72 DPI
//   const CONTENT_PADDING = 32;
//   const USABLE_HEIGHT = PAGE_HEIGHT - CONTENT_PADDING * 2;

//   const activeSections = styleConfig?.activeSections || {};

//   const placeholderText = {
//     firstName: data?.personalInfo?.firstName || "Enter your name",
//     lastName: data?.personalInfo?.lastName || "",
//     title: data?.jobIndustry?.targetJob || "Enter your job title",
//     summary:
//       data?.professionalSummary?.summaryText ||
//       "Enter your professional summary",
//     phone: data?.personalInfo?.phone || "Enter phone number",
//     email: data?.personalInfo?.email || "Enter email address",
//     location: `${data?.personalInfo?.city || "City"}, ${
//       data?.personalInfo?.country || "Country"
//     }`,
//     photo: data?.personalInfo?.photo || "/api/placeholder/200/200",
//   };

//   const SectionTitle = ({ children }) => (
//     <div className="relative mb-4">
//       <h3
//         className="text-lg font-bold uppercase relative z-10"
//         style={{ color: primaryColor }}
//       >
//         {children}
//       </h3>
//       <div
//         className="absolute bottom-0 left-0 h-1 w-16"
//         style={{ backgroundColor: secondaryColor }}
//       />
//     </div>
//   );

//   const ContactItem = ({ icon: Icon, text }) => (
//     <div className="flex items-center gap-3 text-gray-600">
//       <div
//         className="w-8 h-8 rounded-full flex items-center justify-center"
//         style={{ backgroundColor: secondaryColor }}
//       >
//         <Icon className="w-4 h-4 text-white" />
//       </div>
//       <span className="text-sm">{text}</span>
//     </div>
//   );

//   const LeftColumn = () => (
//     <div className="w-1/3 bg-gray-50 p-6 border-r border-gray-200">
//       <div className="flex flex-col items-center text-center mb-6">
//         <div
//           className="w-28 h-28 rounded-full overflow-hidden mb-3 border-4 shadow-lg"
//           style={{ borderColor: secondaryColor }}
//         >
//           <img
//             src={placeholderText.photo}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h1 className="text-xl font-bold" style={{ color: primaryColor }}>
//           {placeholderText.firstName} {placeholderText.lastName}
//         </h1>
//         <h2 className="text-base mt-1" style={{ color: secondaryColor }}>
//           {placeholderText.title}
//         </h2>
//       </div>

//       <div className="space-y-3 mb-6">
//         <ContactItem icon={Phone} text={placeholderText.phone} />
//         <ContactItem icon={Mail} text={placeholderText.email} />
//         <ContactItem icon={MapPin} text={placeholderText.location} />
//       </div>

//       {activeSections.selectedSkills && data.selectedSkills?.length > 0 && (
//         <div className="mb-6">
//           <SectionTitle>Skills</SectionTitle>
//           <div className="flex flex-wrap gap-2">
//             {data.selectedSkills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 rounded-full text-xs"
//                 style={{
//                   backgroundColor: `${secondaryColor}20`,
//                   color: primaryColor,
//                 }}
//               >
//                 {skill.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeSections.languages && data.languages?.length > 0 && (
//         <div className="mb-6">
//           <SectionTitle>Languages</SectionTitle>
//           <div className="space-y-2">
//             {data.languages.map((language, index) => (
//               <div key={index} className="space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span className="font-medium" style={{ color: primaryColor }}>
//                     {language.name}
//                   </span>
//                   <span style={{ color: secondaryColor }}>
//                     {language.proficiency}
//                   </span>
//                 </div>
//                 <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full rounded-full"
//                     style={{
//                       backgroundColor: secondaryColor,
//                       width: `${
//                         language.proficiency === "Native"
//                           ? 100
//                           : language.proficiency === "Fluent"
//                           ? 90
//                           : language.proficiency === "Advanced"
//                           ? 75
//                           : language.proficiency === "Intermediate"
//                           ? 50
//                           : 25
//                       }%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeSections.education && data.education?.length > 0 && (
//         <div>
//           <SectionTitle>Education</SectionTitle>
//           <div className="space-y-3">
//             {data.education.map((edu, index) => (
//               <div
//                 key={index}
//                 className="border-l-2 pl-3"
//                 style={{ borderColor: secondaryColor }}
//               >
//                 <h4
//                   className="font-bold text-sm"
//                   style={{ color: primaryColor }}
//                 >
//                   {edu.school}
//                 </h4>
//                 <div className="text-sm text-gray-700">{edu.degree}</div>
//                 <div className="text-xs" style={{ color: secondaryColor }}>
//                   {edu.startDate?.year} -{" "}
//                   {edu.isCurrentlyStudying ? "Present" : edu.endDate?.year}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const MainSection = ({ section }) => {
//     return (
//       <div ref={(el) => el && contentRefs.current.set(section.type, el)}>
//         {section.content}
//       </div>
//     );
//   };

//   const generateSections = () => {
//     const sections = [];

//     if (activeSections.professionalSummary) {
//       sections.push({
//         type: "summary",
//         content: (
//           <section className="mb-6">
//             <SectionTitle>Professional Summary</SectionTitle>
//             <div
//               className="text-sm text-gray-600 leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: placeholderText.summary }}
//             />
//           </section>
//         ),
//       });
//     }

//     if (activeSections.workExperience && data.workExperience?.length) {
//       sections.push({
//         type: "experience",
//         content: (
//           <section className="mb-6">
//             <SectionTitle>Work Experience</SectionTitle>
//             <div className="space-y-4">
//               {data.workExperience.map((exp, index) => (
//                 <div
//                   key={index}
//                   className="relative pl-4 border-l-2"
//                   style={{ borderColor: secondaryColor }}
//                 >
//                   <div
//                     className="absolute left-[-4px] top-2 w-1.5 h-1.5 rounded-full"
//                     style={{ backgroundColor: primaryColor }}
//                   />
//                   <h4
//                     className="text-base font-bold"
//                     style={{ color: primaryColor }}
//                   >
//                     {exp.jobTitle}
//                   </h4>
//                   <div className="font-medium text-sm text-gray-700">
//                     {exp.company}
//                   </div>
//                   <div
//                     className="text-xs mb-2"
//                     style={{ color: secondaryColor }}
//                   >
//                     {exp.startDate.month} {exp.startDate.year} -
//                     {exp.isCurrentJob
//                       ? " Present"
//                       : ` ${exp.endDate.month} ${exp.endDate.year}`}
//                   </div>
//                   <div
//                     className="text-sm text-gray-600 leading-relaxed"
//                     dangerouslySetInnerHTML={{ __html: exp.description }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ),
//       });
//     }

//     if (activeSections.projects && data.projects?.length) {
//       sections.push({
//         type: "projects",
//         content: (
//           <section className="mb-6">
//             <SectionTitle>Projects</SectionTitle>
//             <div className="space-y-4">
//               {data.projects.map((project, index) => (
//                 <div key={index} className="p-4 rounded-lg bg-gray-50">
//                   <h4
//                     className="text-base font-bold mb-2"
//                     style={{ color: primaryColor }}
//                   >
//                     {project.title}
//                   </h4>
//                   <div
//                     className="text-sm text-gray-600 leading-relaxed mb-2"
//                     dangerouslySetInnerHTML={{ __html: project.contributions }}
//                   />
//                   {project.technologies?.length > 0 && (
//                     <div className="flex flex-wrap gap-1.5">
//                       {project.technologies.map((tech, techIndex) => (
//                         <span
//                           key={techIndex}
//                           className="px-2 py-0.5 rounded text-xs"
//                           style={{
//                             backgroundColor: `${primaryColor}10`,
//                             color: primaryColor,
//                           }}
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         ),
//       });
//     }

//     return sections;
//   };

//   useEffect(() => {
//     const sections = generateSections();
//     const distributeContent = () => {
//       let currentHeight = 0;
//       const firstPage = [];
//       const overflow = [];

//       sections.forEach((section) => {
//         const sectionEl = contentRefs.current.get(section.type);
//         if (!sectionEl) return;

//         const sectionHeight = sectionEl.offsetHeight;
//         if (currentHeight + sectionHeight <= USABLE_HEIGHT) {
//           firstPage.push(section);
//           currentHeight += sectionHeight;
//         } else {
//           overflow.push(section);
//         }
//       });

//       setFirstPageSections(firstPage);
//       setOverflowSections(overflow);
//     };

//     // Allow time for content to render
//     const timer = setTimeout(distributeContent, 0);

//     const resizeObserver = new ResizeObserver(distributeContent);
//     contentRefs.current.forEach((ref) => {
//       if (ref) resizeObserver.observe(ref);
//     });

//     return () => {
//       clearTimeout(timer);
//       resizeObserver.disconnect();
//     };
//   }, [data, styleConfig]);

//   return (
//     <div className="flex flex-col gap-8">
//       <div
//         className="w-full bg-white shadow-lg"
//         style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
//       >
//         <div className="flex h-full">
//           <LeftColumn />
//           <div className="w-2/3 p-6 overflow-hidden">
//             {firstPageSections.map((section, index) => (
//               <MainSection key={index} section={section} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {overflowSections.length > 0 && (
//         <div
//           className="w-full bg-white shadow-lg"
//           style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
//         >
//           <div className="flex h-full">
//             <LeftColumn />
//             <div className="w-2/3 p-6 overflow-hidden">
//               {overflowSections.map((section, index) => (
//                 <MainSection key={index} section={section} />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateFour;

import React, { useEffect, useRef, useState } from "react";
import { ResumeState } from "@/lib/types/resumeInput";
import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";
import { StyleConfig } from "@/lib/types/resumeTemplate";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import Link from "next/link";
import { LuExternalLink, LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { FaBehance, FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { useParams, usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  setCodeToGenerate,
  setDownloadRequest,
} from "@/lib/store/slices/resumeDownloadSlice";
import Image from "next/image";

interface TemplateThreeProps {
  data: ResumeState;
  styleConfig: ResumeStyleState;
  isMultiPage: boolean;
}

interface ActiveSections {
  jobIndustry?: boolean;
  personalInfo?: boolean;
  professionalSummary?: boolean;
  education?: boolean;
  languages?: boolean;
  selectedSkills?: boolean;
  awards?: boolean;
  certificate?: boolean;
  projects?: boolean;
  workExperience?: boolean;
  openSourceContributions?: boolean;
  socialLinks?: boolean;
  customSections?: boolean;
}

type Section = {
  type: string;
  content: React.ReactNode;
  height?: number;
};

const getStyleValues = (config: StyleConfig = defaultStyleConfig) => {
  const fontSizes = {
    small: { body: "text-sm", heading: "text-2xl", title: "text-md" },
    normal: { body: "text-base", heading: "text-3xl", title: "text-lg" },
    large: { body: "text-[17px]", heading: "text-4xl", title: "text-xl" },
    extraLarge: {
      body: "text-[20px]",
      heading: "text-[40px]",
      title: "text-[22px]",
    },
  };

  const jobRoleSizes = {
    small: "text-[16px]",
    normal: "text-[18px]",
    large: "text-[20px]",
    extraLarge: "text-[23px]",
  };
  const skillsFontSizes = {
    small: "text-[13px]",
    normal: "text-[15px]",
    large: "text-[17px]",
    extraLarge: "text-[19px]",
  };

  const sectionInnerTitle = {
    small: "text-[14px]",
    normal: "text-[17px]",
    large: "text-[19px]",
    extraLarge: "text-[21px]",
  };

  const subInfoFontSizes = {
    small: "text-[12px]",
    normal: "text-[14px]",
    large: "text-[15px]",
    extraLarge: "text-[17px]",
  }; //This one is for the Date and location etc

  const margins = {
    compact: { page: "p-7", section: "mb-5" },
    normal: { page: "p-9", section: "mb-7" },
    spacious: { page: "p-11", section: "mb-8" },
  };

  const lineHeights = {
    compact: "leading-snug",
    normal: "leading-normal",
    spacious: "leading-relaxed",
  };

  const fontFamilies: Record<string, string> = {
    Inter: "font-inter",
    Roboto: "font-roboto",
    Merriweather: "font-merriweather",
    Courier: "font-courier",
    // Helvetica: "font-helvetica",
    Helvetica: "font-inter",
    "Times-Roman": "font-times-roman",
  };

  const sectionSpacing = {
    compact: "mb-1",
    normal: "mb-2",
    spacious: "mb-4",
  };

  return {
    fontSize: fontSizes[config.fontSize?.body || "normal"],
    headingSize: fontSizes[config.fontSize?.heading || "normal"],
    pageMargin: margins[config.margins?.page || "normal"]?.page,
    sectionMargin: margins[config.margins?.section || "normal"]?.section,
    lineHeight: lineHeights[config.lineHeight || "normal"],
    jobRoleSize: jobRoleSizes[config.fontSize?.body || "normal"],
    skillsFontSizes: skillsFontSizes[config.fontSize?.body || "normal"],
    sectionInnerTitle: sectionInnerTitle[config.fontSize?.body || "normal"],
    subInfoFontSizes: subInfoFontSizes[config.fontSize?.body || "normal"],
    fontFamilies: fontFamilies[config.fontFamily || "Inter"] || "font-inter",
    sectionSpacing: sectionSpacing[config.sectionSpacing || "normal"],
  };
};

const defaultStyleConfig: StyleConfig = {
  fontSize: {
    body: "normal",
    heading: "normal",
  },
  margins: {
    page: "normal",
    section: "normal",
  },
  fontFamily: "Courier",
  colorScheme: {
    primary: "#111827",
    secondary: "#3B82F6",
    text: "#4B5563",
  },
  lineHeight: "normal",
  sectionSpacing: "normal",
  activeSections: {
    jobIndustry: true,
    personalInfo: true,
    professionalSummary: true,
    education: true,
    languages: true,
    selectedSkills: true,
    awards: false,
    certificate: false,
    projects: false,
    workExperience: true,
    openSourceContributions: false,
    socialLinks: true,
    customSections: false,
  },
};

const getSocialIcon = (platform: string) => {
  const iconMap = {
    linkedin: <Linkedin className="w-4 h-4" />,
    github: <IoLogoGithub className="w-4 h-4" />,
    twitter: <RiTwitterXFill className="w-4 h-4" />,
    instagram: <FaInstagram className="w-4 h-4" />,
    facebook: <LuFacebook className="w-4 h-4" />,
    youtube: <FiYoutube className="w-4 h-4" />,
    behance: <FaBehance className="w-4 h-4" />,
  };
  return (
    iconMap[platform.toLowerCase() as keyof typeof iconMap] || (
      <LuExternalLink className="w-4 h-4" />
    )
  );
  // return <LuExternalLink className="w-4 h-4" />;
};

const TemplateFour: React.FC<TemplateThreeProps> = ({
  data,
  styleConfig = defaultStyleConfig,
  isMultiPage = true,
}) => {
  const styles = getStyleValues(styleConfig);
  const primaryColor = styleConfig?.colorScheme?.primary || "#1a5f7a";
  const secondaryColor = styleConfig?.colorScheme?.secondary || "#86BBD8";

  const [firstPageSections, setFirstPageSections] = useState<Section[]>([]);
  const [secondPageSections, setSecondPageSections] = useState<Section[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const firstPageRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const path = usePathname();
  const params = useParams();
  console.log(path, "path");
  console.log(params, "params");
  const PAGE_HEIGHT_THRESHOLD = 1028; // Adjusted to account for margins and padding
  console.log("styleConfig", styles.fontFamilies);
  // const isDownloadRequested = useAppSelector(
  //   (state) => state.resumeDownloadInfo.isDownloadRequested
  // );
  const dispatch = useAppDispatch();
  const placeholderText = {
    firstName: data?.personalInfo?.firstName || "Enter your name",
    lastName: data?.personalInfo?.lastName || "",
    title: data?.jobIndustry?.targetJob || "Enter your job title",
    summary:
      data?.professionalSummary?.summaryText ||
      "Enter your professional summary",
    phone: data?.personalInfo?.phone || "Enter phone number",
    profileImage: data?.personalInfo.photo || "",
    email: data?.personalInfo?.email || "Enter email address",
    location: `${data?.personalInfo?.city || "City"}, ${
      data?.personalInfo?.country || "Country"
    }`,
  };

  // let activeThreeSections: number = 0;
  // if (styleConfig.activeSections) {
  //   if (styleConfig.activeSections.education) activeThreeSections++;
  //   if (styleConfig.activeSections.languages) activeThreeSections++;
  //   if (styleConfig.activeSections.awards) activeThreeSections++;
  //   if (styleConfig.activeSections.certificate) activeThreeSections++;
  // }

  const activeSections = (styleConfig?.activeSections || {}) as ActiveSections;

  const createSection = (type: string, content: React.ReactNode): Section => ({
    type,
    content,
  });


  useEffect(() => {
    const generateSections = (): Section[] => {
    const sections: Section[] = [];

    // Header section (full width)
    sections.push(
      createSection(
        "header",
        <div className="flex gap-4 items-start mb-1">
          {/* Profile Image Box */}
          <div className="min-w-[112px] min-h-[112px] w-[112px] h-[112px] rounded overflow-hidden flex-shrink-0 border-2 border-gray-200">
            <Image
              src={placeholderText.profileImage || "/api/placeholder/128/128"}
              alt="Profile"
              className="w-full h-full object-cover "
              loading="lazy"
              width={128}
              height={128}
            />
            {/* <img
              src={placeholderText.profileImage || "/api/placeholder/128/128"}
              alt="Profile"
              className="w-full h-full object-cover "
              loading="lazy"
              width={128}
              height={128}
            /> */}
          </div>

          {/* Content Section */}
          <div className="w-full mb-2">
            <h1
              className={`font-bold capitalize ${styles.fontSize.heading}`}
              style={{ color: primaryColor }}
            >
              {placeholderText.firstName} {placeholderText.lastName}
            </h1>
            <h2
              className={`${styles.jobRoleSize} font-semibold capitalize mt-0`}
              style={{ color: secondaryColor }}
            >
              {placeholderText.title}
            </h2>
            <div className="flex flex-wrap gap-y-0.5 gap-4">
              {placeholderText.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-600">{placeholderText.phone}</span>
                </div>
              )}
              {placeholderText.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-gray-600">{placeholderText.email}</span>
                </div>
              )}
              {placeholderText.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-gray-600">
                    {placeholderText.location}
                  </span>
                </div>
              )}
            </div>
            {activeSections.socialLinks && data.socialLinks?.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-0 gap-y-0.5">
                {data.socialLinks.map((link, index) =>
                  link.url ? (
                    <Link key={index} href={link.url} target="_blank">
                      <div className="flex items-center gap-1">
                        {getSocialIcon(link.platform)}
                        <span className="text-gray-600">{link.url}</span>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      )
    );

    // Main content container with two columns
    sections.push(
      createSection(
        "main-content",
        <div className="flex gap-4">
          {/* Right Column */}
          <div className="flex-1 border-r pr-2.5">
            {/* Skills */}
            {activeSections.selectedSkills &&
              data.selectedSkills?.length > 0 && (
                <section className={`${styles.sectionSpacing}`}>
                  <h3
                    className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                    style={{ color: primaryColor }}
                  >
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.selectedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0 border bg-gray-100 ${styles.skillsFontSizes} rounded-[2px] text-gray-600`}
                      >
                        {skill.name || "Enter skill"}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* Education */}
            {activeSections.education && data.education?.length > 0 && (
              <section className={`${styles.sectionSpacing}`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Education
                </h3>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h4 className={`font-bold ${styles.sectionInnerTitle}`}>
                      {edu.school || "Enter school name"}
                    </h4>
                    <div className="text-gray-600">
                      {edu.degree || "Enter degree"}
                    </div>
                    <div className={`text-gray-500 ${styles.subInfoFontSizes}`}>
                      {edu.startDate?.month} {edu.startDate?.year} -{" "}
                      {edu.isCurrentlyStudying
                        ? "Present"
                        : `${edu.endDate?.month} ${edu.endDate?.year}`}
                    </div>
                    <div
                      className={`text-gray-600 mt-1 resumeList ${styles.fontSize.body}`}
                      dangerouslySetInnerHTML={{
                        __html: edu.description || "",
                      }}
                    />
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {activeSections.certificate && data.certificate?.length > 0 && (
              <section className={`${styles.sectionSpacing}`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Certifications
                </h3>
                {data.certificate.map((cert, index) => (
                  <div key={index} className="mb-3">
                    <h4 className={`font-bold ${styles.sectionInnerTitle}`}>
                      {cert.name || "Enter certification name"}
                    </h4>
                    <div className="text-gray-600">
                      {cert.issuingOrganization || "Enter issuing organization"}
                    </div>
                    <div
                      className={`text-gray-600 mt-1 resumeList ${styles.fontSize.body}`}
                      dangerouslySetInnerHTML={{
                        __html:
                          cert.description || "Enter certification description",
                      }}
                    />
                  </div>
                ))}
              </section>
            )}
            {/* Certifications */}
            {activeSections.awards && (
              <section className={`${styles.sectionMargin} w-full`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Awards
                </h3>
                {data.awards.map((award, index) => (
                  <div key={index} className={`${styles.sectionSpacing}`}>
                    <h4
                      className={`${styles.fontSize.body} font-bold`}
                      // style={{ color: primaryColor }}
                    >
                      {award.name || "Enter award name"}
                    </h4>
                    <div className="text-gray-600">
                      {award.issuer || "Enter issuing organization"}
                    </div>
                    {/* <p
                        className={`mt-2 text-gray-600 ${styles.fontSize.body}`}
                      >
                        {award.description || "Enter award description"}
                      </p> */}

                    <div
                      className={`text-gray-600 mt-1 resumeList ${styles.fontSize.body}`}
                      dangerouslySetInnerHTML={{
                        __html: award.description || "Enter award description",
                      }}
                    />
                  </div>
                ))}
              </section>
            )}

            {/* Languages */}
            {activeSections.languages && data.languages?.length > 0 && (
              <section className={`${styles.sectionSpacing}`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Languages
                </h3>
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between mb-1">
                    <span className="text-gray-600 capitalize">
                      {language.name || "Language"}
                    </span>
                    <span
                      className="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize"
                      style={{ color: secondaryColor }}
                    >
                      {language.proficiency || "Proficiency"}
                    </span>
                  </div>
                ))}
              </section>
            )}
          </div>
          {/* Left Column */}
          <div className="flex-[2] ">
            {/* Professional Summary */}
            {activeSections.professionalSummary && (
              <section className={`${styles.sectionSpacing}`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Summary
                </h3>
                <div
                  className={`text-gray-600 resumeList ${styles.fontSize.body}`}
                  dangerouslySetInnerHTML={{
                    __html: placeholderText.summary || "",
                  }}
                />
              </section>
            )}

            {/* Work Experience */}
            {activeSections.workExperience &&
              data.workExperience?.length > 0 && (
                <section className={`${styles.sectionSpacing}`}>
                  <h3
                    className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                    style={{ color: primaryColor }}
                  >
                    Experience
                  </h3>
                  {data.workExperience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h4 className={`font-bold ${styles.sectionInnerTitle}`}>
                        {exp.jobTitle || "Enter job title"}
                      </h4>
                      <div className={`text-gray-600 ${styles.fontSize.body}`}>
                        {exp.company || "Enter company name"}
                      </div>
                      <div
                        className={`flex justify-between text-gray-500 ${styles.subInfoFontSizes}`}
                      >
                        <span>
                          {exp.startDate.month} {exp.startDate.year} -{" "}
                          {exp.isCurrentJob
                            ? "Present"
                            : `${exp.endDate.month} ${exp.endDate.year}`}
                        </span>
                        <span>{exp.location || "Enter location"}</span>
                      </div>
                      <div
                        className={`mt-2 text-gray-600 resumeList ${styles.fontSize.body}`}
                        dangerouslySetInnerHTML={{
                          __html: exp.description || "Enter job description",
                        }}
                      />
                    </div>
                  ))}
                </section>
              )}

            {/* Projects */}
            {activeSections.projects && data.projects?.length > 0 && (
              <section className={`${styles.sectionSpacing}`}>
                <h3
                  className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                  style={{ color: primaryColor }}
                >
                  Projects
                </h3>
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h4 className={`font-bold ${styles.sectionInnerTitle}`}>
                      {project.title || "Enter project title"}
                    </h4>
                    <div className="text-gray-600">
                      {project.role || "Enter role"}
                    </div>
                    <div
                      className={`mt-2 text-gray-600 resumeList ${styles.fontSize.body}`}
                      dangerouslySetInnerHTML={{
                        __html:
                          project.contributions ||
                          "Enter project contributions",
                      }}
                    />
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-1 py-0 rounded-[2px] bg-gray-100 border text-xs text-gray-600 "
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    {project.links && project.links.length > 0 && (
                      <div
                        className={`mt-1.5 text-[15px] flex flex-col gap-y-0.5`}
                      >
                        {project.links.map((link, linkIndex) => (
                          <p
                            key={linkIndex}
                            className="text-gray-600 resumeLink -mb-[1px]"
                          >
                            {link.platform} :{" "}
                            <span>
                              <Link
                                href={link.url}
                                target="_blank"
                                className={`no-underline`}
                                style={{ color: secondaryColor }}
                              >
                                {link.url}
                              </Link>
                            </span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
            {activeSections.customSections &&
              data.customSections?.length > 0 && (
                <section className={`${styles.sectionSpacing}`}>
                  <h3
                    className={`font-bold uppercase border-b border-gray-200 pb-1 mb-2 ${styles.fontSize.title}`}
                    style={{ color: primaryColor }}
                  >
                    {data.customSections[0]?.title || "Custom Section"}
                  </h3>
                  {data.customSections.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h4
                        className={`font-bold ${styles.sectionInnerTitle}`}
                        // style={{ color: primaryColor }}
                      >
                        {section.subtitle || "Enter Sub title"}
                      </h4>
                      {section.startDate?.month ||
                      section.startDate?.year ||
                      section.endDate?.month ||
                      section.endDate?.year ? (
                        <div className="text-sm text-gray-500">
                          {section.startDate?.month} {section.startDate?.year} -{" "}
                          {section.isPresent
                            ? "Present"
                            : `${section.endDate?.month} ${section.endDate?.year}`}
                        </div>
                      ) : null}

                      {/* <p className={`mt-2 text-gray-600 ${styles.fontSize.body}`}>
                  {section.description || "Enter description"}
                </p> */}
                      <div
                        className={`text-gray-600 mt-1 resumeList ${styles.fontSize.body}`}
                        dangerouslySetInnerHTML={{
                          __html: section.description || "Enter description",
                        }}
                      />
                    </div>
                  ))}
                </section>
              )}
          </div>
          {/* Custom Sections */}
        </div>
      )
    );

    return sections;
  };
    const sections = generateSections();
    const distributeContent = () => {
      let currentHeight = 0;
      const firstPage: Section[] = [];
      const secondPage: Section[] = [];

      sections.forEach((section) => {
        const sectionRef = sectionRefs.current.get(section.type);
        const sectionHeight = sectionRef?.offsetHeight || 0;

        if (currentHeight + sectionHeight <= PAGE_HEIGHT_THRESHOLD) {
          firstPage.push(section);
          currentHeight += sectionHeight;
        } else {
          secondPage.push(section);
        }
      });

      setFirstPageSections(firstPage);
      setSecondPageSections(secondPage);
    };

    // Initial distribution
    distributeContent();

    // Setup resize observer
    const resizeObserver = new ResizeObserver(distributeContent);
    sectionRefs.current.forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });

    return () => resizeObserver.disconnect();
  }, [
    data,
    styleConfig,
    mainContentRef?.current?.clientHeight &&
      mainContentRef?.current?.clientHeight > PAGE_HEIGHT_THRESHOLD,
  ]);

  // resume tex code send to the server

  useEffect(() => {
    // if (isDownloadRequested) {
    console.log("trying to send to the server");
    dispatch(setCodeToGenerate(mainContentRef.current?.outerHTML || ""));
    dispatch(setDownloadRequest(false));
    // }
  }, [
    data,
    styleConfig,
    dispatch,
    mainContentRef?.current?.clientHeight &&
      mainContentRef?.current?.clientHeight > PAGE_HEIGHT_THRESHOLD,
    secondPageSections,
    firstPageSections,
  ]);

  const renderSection = (section: Section) => {
    return (
      <div
        key={section.type}
        ref={(el) => {
          if (el) sectionRefs.current.set(section.type, el);
        }}
      >
        {section.content}
      </div>
    );
  };
  console.log("mainContentRef.current", mainContentRef.current);
  return (
    <div className="flex flex-col gap-8" ref={mainContentRef}>
      {/* First Page */}
      <div
        className={`w-[794px] h-[1123px] shadow bg-white ${styles.pageMargin} overflow-hidden mx-auto  ${styles.fontFamilies} ${styles.lineHeight}`}
      >
        <div ref={firstPageRef}>{firstPageSections.map(renderSection)}</div>
      </div>

      {/* Second Page */}
      {isMultiPage && secondPageSections.length > 0 && (
        <div
          className={`w-[794px] h-[1123px] shadow bg-white ${styles.pageMargin} overflow-hidden mx-auto ${styles.fontFamilies} ${styles.lineHeight}`}
        >
          {secondPageSections.map(renderSection)}
        </div>
      )}
    </div>
  );
};

export default TemplateFour;

// I Will use intern 1st main roboto next 2nd and
