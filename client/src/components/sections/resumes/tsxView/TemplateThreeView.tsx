// import React from "react";
// import {
//   Calendar,
//   Mail,
//   MapPin,
//   Phone,
//   Linkedin,
//   Github,
//   Link,
// } from "lucide-react";

// interface SocialLink {
//   platform: string;
//   url: string;
// }

// interface Education {
//   school: string;
//   degree: string;
//   startDate: { month: string; year: string };
//   endDate?: { month: string; year: string };
//   isCurrentlyStudying?: boolean;
//   description?: string;
// }

// interface WorkExperience {
//   company: string;
//   jobTitle: string;
//   startDate: { month: string; year: string };
//   endDate: { month: string; year: string };
//   isCurrentJob?: boolean;
//   location: string;
//   description: string;
// }

// interface Project {
//   title: string;
//   role: string;
//   contributions: string;
//   technologies: string[];
//   links: SocialLink[];
// }

// interface Certificate {
//   name: string;
//   issuingOrganization: string;
//   description: string;
// }

// interface Award {
//   name: string;
//   issuer: string;
//   date: { month: string; year: string };
//   description: string;
// }

// interface Language {
//   name: string;
//   proficiency: string;
// }

// interface ResumeData {
//   personalInfo: {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     city: string;
//     country: string;
//   };
//   jobIndustry: {
//     targetJob: string;
//   };
//   professionalSummary: {
//     summaryText: string;
//   };
//   selectedSkills: Array<{ name: string }>;
//   workExperience: WorkExperience[];
//   projects?: Project[];
//   education?: Education[];
//   certificate?: Certificate[];
//   awards?: Award[];
//   languages?: Language[];
//   socialLinks?: SocialLink[];
//   customSections?: Array<{
//     title: string;
//     subtitle: string;
//     startDate?: { month: string; year: string };
//     endDate?: { month: string; year: string };
//     isPresent?: boolean;
//     description: string;
//   }>;
// }

// interface StyleConfig {
//   activeSections: {
//     jobIndustry?: boolean;
//     personalInfo?: boolean;
//     professionalSummary?: boolean;
//     education?: boolean;
//     languages?: boolean;
//     selectedSkills?: boolean;
//     awards?: boolean;
//     certificate?: boolean;
//     projects?: boolean;
//     workExperience?: boolean;
//     socialLinks?: boolean;
//     customSections?: boolean;
//   };
// }

// const getSocialIcon = (platform: string) => {
//   switch (platform.toLowerCase()) {
//     case "linkedin":
//       return <Linkedin className="w-4 h-4" />;
//     case "github":
//       return <Github className="w-4 h-4" />;
//     default:
//       return <Link className="w-4 h-4" />;
//   }
// };

// const TemplateThreeView = ({
//   data,
//   styleConfig,
// }: {
//   data: ResumeData;
//   styleConfig: StyleConfig;
// }) => {
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
//   };

//   const activeSections = styleConfig?.activeSections || {};
//   const hasSocialLinks =
//     data?.socialLinks &&
//     data?.socialLinks?.length > 0 &&
//     data?.socialLinks[0]?.url;

//   let activeThreeSections: number = 0;
//   if (styleConfig.activeSections) {
//     if (styleConfig.activeSections.education) activeThreeSections++;
//     if (styleConfig.activeSections.languages) activeThreeSections++;
//     if (styleConfig.activeSections.awards) activeThreeSections++;
//     if (styleConfig.activeSections.certificate) activeThreeSections++;
//   }

//   return (
//     <div className="w-full h-full bg-white p-8 text-gray-800">
//       {/* Header Section */}
//       <header className="mb-6">
//         <h1 className="text-4xl font-bold text-gray-900 mb-1 capitalize">
//           {placeholderText.firstName} {placeholderText.lastName}
//         </h1>
//         <h2 className="text-xl text-blue-600 mb-2">{placeholderText.title}</h2>

//         <div className="flex flex-wrap gap-4 mb-2">
//           <div className="flex items-center gap-1">
//             <Phone className="w-4 h-4 text-gray-600" />
//             <span className="text-sm">{placeholderText.phone}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Mail className="w-4 h-4 text-gray-600" />
//             <span className="text-sm">{placeholderText.email}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <MapPin className="w-4 h-4 text-gray-600" />
//             <span className="text-sm">{placeholderText.location}</span>
//           </div>
//         </div>

//         {/* Social Links */}
//         {hasSocialLinks && activeSections.socialLinks && (
//           <div className="flex flex-wrap gap-4 mt-2">
//             {data.socialLinks?.map(
//               (link, index) =>
//                 link.url && (
//                   <div key={index} className="flex items-center gap-1">
//                     {getSocialIcon(link.platform)}
//                     <span className="text-sm">{link.url}</span>
//                   </div>
//                 )
//             )}
//           </div>
//         )}
//       </header>

//       <div className="flex gap-8">
//         <div className="flex-1">
//           {/* Summary Section */}
//           <section className="mb-6">
//             <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//               SUMMARY
//             </h2>
//             <p className="text-sm leading-relaxed">{placeholderText.summary}</p>
//           </section>

//           {/* Skills Section */}
//           {activeSections.selectedSkills && (
//             <section className="mb-6">
//               <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//                 SKILLS
//               </h2>
//               <div className="flex flex-wrap gap-2">
//                 {(data.selectedSkills || []).map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-gray-100 text-sm rounded"
//                   >
//                     {skill.name || "Enter skill"}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Experience Section */}
//           <section className="mb-6">
//             <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//               EXPERIENCE
//             </h2>
//             {(data.workExperience || []).map((exp, index) => (
//               <div key={index} className="mb-4">
//                 <h3 className="text-base font-bold text-gray-900">
//                   {exp.company || "Enter company name"}
//                 </h3>
//                 <h4 className="text-sm text-gray-700 mb-1">
//                   {exp.jobTitle || "Enter job title"}
//                 </h4>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>
//                     {exp.startDate.month} {exp.startDate.year} -{" "}
//                     {exp.isCurrentJob
//                       ? "Present"
//                       : `${exp.endDate.month} ${exp.endDate.year}`}
//                   </span>
//                   <span>{exp.location || "Enter location"}</span>
//                 </div>
//                 <p className="text-sm mt-2">
//                   {exp.description || "Enter job description"}
//                 </p>
//               </div>
//             ))}
//           </section>

//           {/* Bottom Sections Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Education Section */}
//             {activeSections.education && (
//               <section
//                 className={`${
//                   activeThreeSections <= 3 ? "col-span-1" : "col-span-3"
//                 }`}
//               >
//                 <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//                   EDUCATION
//                 </h2>
//                 {(data.education || []).map((edu, index) => (
//                   <div key={index} className="mb-3">
//                     <h3 className="text-base font-bold text-gray-900">
//                       {edu.school || "Enter school name"}
//                     </h3>
//                     <p className="text-sm text-gray-700">
//                       {edu.degree || "Enter degree"}
//                     </p>
//                     <div className="text-sm text-gray-600">
//                       {edu.startDate?.month} {edu.startDate?.year} -{" "}
//                       {edu.isCurrentlyStudying
//                         ? "Present"
//                         : `${edu.endDate?.month} ${edu.endDate?.year}`}
//                     </div>
//                     {edu.description && (
//                       <p className="text-sm mt-1">{edu.description}</p>
//                     )}
//                   </div>
//                 ))}
//               </section>
//             )}

//     {/* Certifications Section */}
//     {data.certificate &&
//       data.certificate.length > 0 &&
//       activeSections.certificate && (
//         <section>
//           <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//             CERTIFICATION
//           </h2>
//           {data.certificate.map((cert, index) => (
//             <div key={index} className="mb-3">
//               <h3 className="text-base font-bold text-gray-900">
//                 {cert.name || "Enter certification name"}
//               </h3>
//               <p className="text-sm text-gray-700">
//                 {cert.issuingOrganization ||
//                   "Enter issuing organization"}
//               </p>
//               <p className="text-sm mt-1">
//                 {cert.description || "Enter certification description"}
//               </p>
//             </div>
//           ))}
//         </section>
//       )}

//     {/* Languages Section */}
//     {data.languages &&
//       data.languages.length > 0 &&
//       activeSections.languages && (
//         <section>
//           <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
//             LANGUAGES
//           </h2>
//           {data.languages.map((language, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center mb-2"
//             >
//               <span className="text-sm capitalize">
//                 {language.name || "Enter language"}
//               </span>
//               <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded capitalize">
//                 {language.proficiency || "Enter proficiency"}
//               </span>
//             </div>
//           ))}
//         </section>
//       )}
//   </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateThreeView;

import React from "react";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Link,
} from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface Education {
  school: string;
  degree: string;
  startDate: { month: string; year: string };
  endDate?: { month: string; year: string };
  isCurrentlyStudying?: boolean;
  description?: string;
}

interface WorkExperience {
  company: string;
  jobTitle: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isCurrentJob?: boolean;
  location: string;
  description: string;
}

interface Project {
  title: string;
  role: string;
  contributions: string;
  technologies: string[];
  links: SocialLink[];
}

interface Certificate {
  name: string;
  issuingOrganization: string;
  description: string;
}

interface Award {
  name: string;
  issuer: string;
  date: { month: string; year: string };
  description: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    country: string;
  };
  jobIndustry: {
    targetJob: string;
  };
  professionalSummary: {
    summaryText: string;
  };
  selectedSkills: Array<{ name: string }>;
  workExperience: WorkExperience[];
  projects?: Project[];
  education?: Education[];
  certificate?: Certificate[];
  awards?: Award[];
  languages?: Language[];
  socialLinks?: SocialLink[];
  customSections?: Array<{
    title: string;
    subtitle: string;
    startDate?: { month: string; year: string };
    endDate?: { month: string; year: string };
    isPresent?: boolean;
    description: string;
  }>;
}

interface StyleConfig {
  fontSize: {
    body: "small" | "normal" | "large" | "extraLarge";
    heading: "small" | "normal" | "large" | "extraLarge";
  };
  margins: {
    page: "compact" | "normal" | "spacious";
    section: "compact" | "normal" | "spacious";
  };
  fontFamily: "Helvetica" | "Times-Roman" | "Courier";
  colorScheme: {
    primary: string;
    secondary: string;
    text: string;
  };
  lineHeight: "compact" | "normal" | "spacious";
  sectionSpacing: "compact" | "normal" | "spacious";
  activeSections: {
    jobIndustry: boolean;
    personalInfo: boolean;
    professionalSummary: boolean;
    workExperience: boolean;
    education: boolean;
    socialLinks: boolean;
    projects: boolean;
    languages: boolean;
    selectedSkills: boolean;
    certificate: boolean;
    awards: boolean;
    openSourceContributions: boolean;
    customSections: boolean;
  };
}

const getFontSize = (size: string) => {
  const sizes = {
    small: "text-sm",
    normal: "text-base",
    large: "text-lg",
    extraLarge: "text-xl",
  };
  return sizes.normal;
  //   return sizes[size] || sizes.normal;
};

const getMargin = (spacing: string) => {
  const spacings = {
    compact: "mb-2",
    normal: "mb-4",
    spacious: "mb-6",
  };
  //   return spacings[spacing] || spacings.normal;
  return spacings.normal;
};

const getLineHeight = (height: string) => {
  const heights = {
    compact: "leading-tight",
    normal: "leading-normal",
    spacious: "leading-relaxed",
  };
  //   return heights[height] || heights.normal;
  return heights.normal;
};

const getFontFamily = (font: any) => {
  const fonts = {
    Helvetica: "font-sans",
    "Times-Roman": "font-serif",
    Courier: "font-mono",
  };
  return fonts.Helvetica;
  //   return fonts[font] || fonts.Helvetica;
};

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return <Linkedin className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    default:
      return <Link className="w-4 h-4" />;
  }
};

const TemplateThreeView = ({
  data,
  styleConfig,
}: {
  data: ResumeData;
  styleConfig: StyleConfig;
}) => {
  const placeholderText = {
    firstName: data?.personalInfo?.firstName || "Enter your name",
    lastName: data?.personalInfo?.lastName || "",
    title: data?.jobIndustry?.targetJob || "Enter your job title",
    summary:
      data?.professionalSummary?.summaryText ||
      "Enter your professional summary",
    phone: data?.personalInfo?.phone || "Enter phone number",
    email: data?.personalInfo?.email || "Enter email address",
    location: `${data?.personalInfo?.city || "City"}, ${
      data?.personalInfo?.country || "Country"
    }`,
  };

  const fontClass = getFontFamily(styleConfig.fontFamily);
  const bodyFontSize = getFontSize(styleConfig.fontSize.body);
  const headingFontSize = getFontSize(styleConfig.fontSize.heading);
  const sectionMargin = getMargin(styleConfig.sectionSpacing);
  const lineHeightClass = getLineHeight(styleConfig.lineHeight);

  const containerStyle = {
    backgroundColor: "white",
    color: styleConfig.colorScheme.text,
  };

  const headingStyle = {
    color: styleConfig.colorScheme.primary,
  };

  const subHeadingStyle = {
    color: styleConfig.colorScheme.secondary,
  };

  return (
    <div
      className={`w-full h-full p-8 ${fontClass} ${lineHeightClass}`}
      style={containerStyle}
    >
      {/* Header Section */}
      {styleConfig.activeSections.personalInfo && (
        <header className={getMargin(styleConfig.margins.section)}>
          <h1
            className={`${headingFontSize} font-bold mb-1 capitalize`}
            style={headingStyle}
          >
            {placeholderText.firstName} {placeholderText.lastName}
          </h1>

          {styleConfig.activeSections.jobIndustry && (
            <h2 className={`${bodyFontSize} mb-2`} style={subHeadingStyle}>
              {placeholderText.title}
            </h2>
          )}

          <div className="flex flex-wrap gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" style={subHeadingStyle} />
              <span className={bodyFontSize}>{placeholderText.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" style={subHeadingStyle} />
              <span className={bodyFontSize}>{placeholderText.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" style={subHeadingStyle} />
              <span className={bodyFontSize}>{placeholderText.location}</span>
            </div>
          </div>

          {styleConfig.activeSections.socialLinks &&
            data.socialLinks &&
            data.socialLinks?.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {data.socialLinks.map(
                  (link, index) =>
                    link.url && (
                      <div key={index} className="flex items-center gap-1">
                        {getSocialIcon(link.platform)}
                        <span className={bodyFontSize}>{link.url}</span>
                      </div>
                    )
                )}
              </div>
            )}
        </header>
      )}

      <div className="flex gap-8">
        <div className="flex-1">
          {/* Summary Section */}
          {styleConfig.activeSections.professionalSummary && (
            <section className={sectionMargin}>
              <h2
                className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                style={headingStyle}
              >
                SUMMARY
              </h2>
              <p className={`${bodyFontSize} ${lineHeightClass}`}>
                {placeholderText.summary}
              </p>
            </section>
          )}

          {/* Skills Section */}
          {styleConfig.activeSections.selectedSkills &&
            data.selectedSkills?.length > 0 && (
              <section className={sectionMargin}>
                <h2
                  className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                  style={headingStyle}
                >
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.selectedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded ${bodyFontSize}`}
                      style={{
                        backgroundColor:
                          styleConfig.colorScheme.secondary + "20",
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

          {/* Work Experience Section */}
          {styleConfig.activeSections.workExperience && (
            <section className={sectionMargin}>
              <h2
                className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                style={headingStyle}
              >
                EXPERIENCE
              </h2>
              {data.workExperience?.map((exp, index) => (
                <div
                  key={index}
                  className={getMargin(styleConfig.margins.section)}
                >
                  <h3 className={`${bodyFontSize} font-bold`}>{exp.company}</h3>
                  <h4
                    className={`${bodyFontSize} mb-1`}
                    style={subHeadingStyle}
                  >
                    {exp.jobTitle}
                  </h4>
                  <div className={`flex justify-between ${bodyFontSize}`}>
                    <span>
                      {exp.startDate.month} {exp.startDate.year} -{" "}
                      {exp.isCurrentJob
                        ? "Present"
                        : `${exp.endDate.month} ${exp.endDate.year}`}
                    </span>
                    <span>{exp.location}</span>
                  </div>
                  <p className={`${bodyFontSize} mt-2`}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects Section */}
          {styleConfig.activeSections.projects &&
            data.projects &&
            data.projects?.length > 0 && (
              <section className={sectionMargin}>
                <h2
                  className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                  style={headingStyle}
                >
                  PROJECTS
                </h2>
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className={getMargin(styleConfig.margins.section)}
                  >
                    <h3 className={`${bodyFontSize} font-bold`}>
                      {project.title}
                    </h3>
                    <h4
                      className={`${bodyFontSize} mb-1`}
                      style={subHeadingStyle}
                    >
                      {project.role}
                    </h4>
                    <p className={`${bodyFontSize} mt-2`}>
                      {project.contributions}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 rounded text-sm`}
                          style={{
                            backgroundColor:
                              styleConfig.colorScheme.secondary + "20",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

          {/* Education Section */}
          {styleConfig.activeSections.education &&
            data.education &&
            data.education?.length > 0 && (
              <section className={sectionMargin}>
                <h2
                  className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                  style={headingStyle}
                >
                  EDUCATION
                </h2>
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className={getMargin(styleConfig.margins.section)}
                  >
                    <h3 className={`${bodyFontSize} font-bold`}>
                      {edu.school}
                    </h3>
                    <p className={bodyFontSize}>{edu.degree}</p>
                    <div className={bodyFontSize}>
                      {edu.startDate?.month} {edu.startDate?.year} -{" "}
                      {edu.isCurrentlyStudying
                        ? "Present"
                        : `${edu.endDate?.month} ${edu.endDate?.year}`}
                    </div>
                    {edu.description && (
                      <p className={`${bodyFontSize} mt-1`}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

          {/* Awards Section */}
          {styleConfig.activeSections.awards &&
            data.awards &&
            data.awards?.length > 0 && (
              <section className={sectionMargin}>
                <h2
                  className={`${headingFontSize} font-bold border-b pb-1 mb-2`}
                  style={headingStyle}
                >
                  AWARDS
                </h2>
                {data.awards.map((award, index) => (
                  <div
                    key={index}
                    className={getMargin(styleConfig.margins.section)}
                  >
                    <h3 className={`${bodyFontSize} font-bold`}>
                      {award.name}
                    </h3>
                    <p className={bodyFontSize}>{award.issuer}</p>
                    <div className={bodyFontSize}>
                      {award.date.month} {award.date.year}
                    </div>
                    <p className={`${bodyFontSize} mt-1`}>
                      {award.description}
                    </p>
                  </div>
                ))}
              </section>
            )}

          {/* Certifications Section */}
          {/* Certifications Section */}
          {data.certificate &&
            data.certificate.length > 0 &&
            styleConfig.activeSections.certificate && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                  CERTIFICATION
                </h2>
                {data.certificate.map((cert, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-base font-bold text-gray-900">
                      {cert.name || "Enter certification name"}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {cert.issuingOrganization || "Enter issuing organization"}
                    </p>
                    <p className="text-sm mt-1">
                      {cert.description || "Enter certification description"}
                    </p>
                  </div>
                ))}
              </section>
            )}

          {/* Languages Section */}
          {data.languages &&
            data.languages.length > 0 &&
            styleConfig.activeSections?.languages && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                  LANGUAGES
                </h2>
                {data.languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span className="text-sm capitalize">
                      {language.name || "Enter language"}
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded capitalize">
                      {language.proficiency || "Enter proficiency"}
                    </span>
                  </div>
                ))}
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateThreeView;
