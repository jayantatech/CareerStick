// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Svg,
//   Path,
// } from "@react-pdf/renderer";
// // import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import { ResumeState } from "@/lib/types/resumeInput";

// const LocationIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//     />
//   </Svg>
// );

// const PhoneIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
//     />
//   </Svg>
// );

// const EmailIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
//     />
//   </Svg>
// );

// // New Social Media Icons
// const LinkedInIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
//     />
//   </Svg>
// );

// const GithubIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
//     />
//   </Svg>
// );

// const LinkIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
//     />
//   </Svg>
// );

// const styles = StyleSheet.create({
//   //new code start
//   page: {
//     padding: 30,
//     fontFamily: "Helvetica",
//     backgroundColor: "white",
//   },
//   header: {
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#111827",
//     marginBottom: 4,
//   },
//   title: {
//     fontSize: 16,
//     color: "#3B82F6",
//     marginBottom: 8,
//   },
//   contactRow: {
//     flexDirection: "row",
//     gap: 16,
//     marginBottom: 4,
//   },
//   contactItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   contactText: {
//     fontSize: 10,
//     color: "#4B5563",
//   },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#111827",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//     paddingBottom: 4,
//     marginBottom: 8,
//   },
//   // New styles
//   socialLinks: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//     marginTop: 8,
//   },
//   projectItem: {
//     marginBottom: 12,
//   },
//   projectTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   projectRole: {
//     fontSize: 10,
//     color: "#4B5563",
//     marginBottom: 2,
//   },
//   technologies: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 4,
//     marginTop: 4,
//   },
//   techItem: {
//     fontSize: 8,
//     backgroundColor: "#EEF2FF",
//     padding: "2 4",
//     borderRadius: 2,
//     color: "#4B5563",
//   },
//   languageItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   languageName: {
//     fontSize: 10,
//     color: "#111827",
//   },
//   proficiency: {
//     fontSize: 10,
//     color: "#3B82F6",
//   },
//   proficiencyBadge: {
//     fontSize: 9,
//     backgroundColor: "#EEF2FF",
//     padding: "2 6",
//     borderRadius: 4,
//     color: "#3B82F6",
//   },
//   columns: {
//     flexDirection: "row",
//     gap: 30,
//   },
//   leftColumn: {
//     flex: 2,
//   },
//   rightColumn: {
//     flex: 1,
//   },
//   languages: {
//     marginBottom: 16,
//   },
//   summaryText: {
//     fontSize: 10,
//     color: "#4B5563",
//     lineHeight: 1.5,
//   },
//   educationItem: {
//     marginBottom: 8,
//   },

//   schoolName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   degreeText: {
//     fontSize: 10,
//     color: "#4B5563",
//   },
//   dateLocation: {
//     fontSize: 10,
//     color: "#6B7280",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   experienceItem: {
//     marginBottom: 12,
//   },
//   companyName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   jobTitle: {
//     fontSize: 10,
//     color: "#4B5563",
//     marginBottom: 2,
//   },
//   description: {
//     fontSize: 10,
//     color: "#4B5563",
//     marginTop: 4,
//   },
//   skillsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   skillItem: {
//     fontSize: 10,
//     backgroundColor: "#F3F4F6",
//     padding: "4 8",
//     borderRadius: 4,
//     color: "#4B5563",
//   },
//   gpaText: {
//     fontSize: 10,
//     color: "#3B82F6",
//   },
// });

// const getSocialIcon = (platform: string) => {
//   switch (platform.toLowerCase()) {
//     case "linkedin":
//       return <LinkedInIcon />;
//     case "github":
//       return <GithubIcon />;
//     default:
//       return <LinkIcon />;
//   }
// };

// const ResumePDF = ({ data }: { data: ResumeState }) => {
//   // console.log("Rendering ResumeOne template");
//   // Placeholder text for empty fields
//   const placeholderText = {
//     name: data.personalInfo.firstName || "Enter your name",
//     title: data.jobIndustry.targetJob || "Enter your job title",
//     summary:
//       data.professionalSummary.summaryText || "Enter your professional summary",
//     phone: data.personalInfo.phone || "Enter phone number",
//     email: data.personalInfo.email || "Enter email address",
//     location: `${data.personalInfo.city || "City"}, ${
//       data.personalInfo.country || "Country"
//     }`,
//   };
//   const hasSocialLinks =
//     data.socialLinks && data.socialLinks.length > 0 && data.socialLinks[0].url;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <Text style={styles.name}>{placeholderText.name}</Text>
//           <Text style={styles.title}>{placeholderText.title}</Text>

//           <View style={styles.contactRow}>
//             <View style={styles.contactItem}>
//               <PhoneIcon />
//               <Text style={styles.contactText}>{placeholderText.phone}</Text>
//             </View>
//             <View style={styles.contactItem}>
//               <EmailIcon />
//               <Text style={styles.contactText}>{placeholderText.email}</Text>
//             </View>
//             <View style={styles.contactItem}>
//               <LocationIcon />
//               <Text style={styles.contactText}>{placeholderText.location}</Text>
//             </View>
//           </View>

//           {/* Social Links */}
//           {hasSocialLinks && (
//             <View style={styles.socialLinks}>
//               {data.socialLinks.map(
//                 (link, index) =>
//                   link.url && (
//                     <View key={index} style={styles.contactItem}>
//                       {getSocialIcon(link.platform)}
//                       <Text style={styles.contactText}>{link.url}</Text>
//                     </View>
//                   )
//               )}
//             </View>
//           )}
//         </View>

//         {/* Main Content */}
//         <View style={styles.columns}>
//           {/* Left Column */}
//           <View style={styles.leftColumn}>
//             {/* Summary Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>SUMMARY</Text>
//               <Text style={styles.summaryText}>{placeholderText.summary}</Text>
//             </View>

//             {/* Experience Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>EXPERIENCE</Text>
//               {(data.workExperience || []).map((exp, index) => (
//                 <View key={index} style={styles.experienceItem}>
//                   <Text style={styles.companyName}>
//                     {exp.company || "Enter company name"}
//                   </Text>
//                   <Text style={styles.jobTitle}>
//                     {exp.jobTitle || "Enter job title"}
//                   </Text>
//                   <View style={styles.dateLocation}>
//                     <Text>
//                       {exp.startDate.month} {exp.startDate.year} -{" "}
//                       {exp.isCurrentJob
//                         ? "Present"
//                         : `${exp.endDate.month} ${exp.endDate.year}`}
//                     </Text>
//                     <Text>{exp.location || "Enter location"}</Text>
//                   </View>
//                   <Text style={styles.description}>
//                     {exp.description || "Enter job description"}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Projects Section */}
//             {data.projects && data.projects.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>PROJECTS</Text>
//                 {data.projects.map((project, index) => (
//                   <View key={index} style={styles.projectItem}>
//                     <Text style={styles.projectTitle}>
//                       {project.title || "Enter project title"}
//                     </Text>
//                     <Text style={styles.projectRole}>
//                       {project.role || "Enter role"}
//                     </Text>
//                     <Text style={styles.description}>
//                       {project.contributions || "Enter project contributions"}
//                     </Text>
//                     {project.technologies &&
//                       project.technologies.length > 0 && (
//                         <View style={styles.technologies}>
//                           {project.technologies.map((tech, techIndex) => (
//                             <Text key={techIndex} style={styles.techItem}>
//                               {tech}
//                             </Text>
//                           ))}
//                         </View>
//                       )}
//                     {project.links && project.links.length > 0 && (
//                       <View style={styles.technologies}>
//                         {project.links.map((link, linkIndex) => (
//                           <Text key={linkIndex} style={styles.contactText}>
//                             {link.platform} : {link.url}
//                           </Text>
//                         ))}
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             )}
//             {/* custom Section */}
//             {data.customSections &&
//               data.customSections.length > 0 &&
//               data.customSections[0].title && (
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>
//                     {data.customSections[0].title}
//                   </Text>
//                   {data.customSections.map((customSection, index) => (
//                     <View key={index} style={styles.projectItem}>
//                       <Text style={styles.projectTitle}>
//                         {customSection.subtitle || "Enter title"}
//                       </Text>
//                       <View style={styles.dateLocation}>
//                         <Text>
//                           {customSection.startDate?.month}{" "}
//                           {customSection.startDate?.year} -{" "}
//                           {customSection.isPresent
//                             ? "Present"
//                             : `${customSection.endDate?.month} ${customSection.endDate?.year}`}
//                         </Text>
//                       </View>
//                       <Text style={styles.description}>
//                         {customSection.description || "Enter Description"}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               )}
//           </View>
//           {/* project section  */}

//           {/* Right Column */}
//           <View style={styles.rightColumn}>
//             {/* Skills Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>SKILLS</Text>
//               <View style={styles.skillsGrid}>
//                 {(data.selectedSkills || []).map((skill, index) => (
//                   <Text key={index} style={styles.skillItem}>
//                     {skill.name || "Enter skill"}
//                   </Text>
//                 ))}
//               </View>
//             </View>

//             {/* Education Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>EDUCATION</Text>
//               {(data.education || []).map((edu, index) => (
//                 <View key={index} style={styles.educationItem}>
//                   <Text style={styles.schoolName}>
//                     {edu.school || "Enter school name"}
//                   </Text>
//                   <Text style={styles.degreeText}>
//                     {edu.degree || "Enter degree"}
//                   </Text>
//                   <View style={styles.dateLocation}>
//                     <Text>
//                       {edu.startDate?.month} {edu.startDate?.year} -{" "}
//                       {edu.isCurrentlyStudying
//                         ? "Present"
//                         : `${edu.endDate?.month} ${edu.endDate?.year}`}
//                     </Text>
//                   </View>
//                   {edu.description && (
//                     <Text style={styles.description}>{edu.description}</Text>
//                   )}
//                 </View>
//               ))}
//             </View>

//             {/* Certifications Section */}
//             {data.certificate && data.certificate.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>CERTIFICATION</Text>
//                 {data.certificate.map((cert, index) => (
//                   <View key={index} style={styles.educationItem}>
//                     <Text style={styles.schoolName}>
//                       {cert.name || "Enter certification name"}
//                     </Text>
//                     <Text style={styles.degreeText}>
//                       {cert.issuingOrganization || "Enter issuing organization"}
//                     </Text>
//                     <Text style={styles.description}>
//                       {cert.description || "Enter certification description"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//             {/* Awards Section */}
//             {data.awards && data.awards.length > 0 && data.awards[0].name && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>AWARDS</Text>
//                 {data.awards.map((cert, index) => (
//                   <View key={index} style={styles.educationItem}>
//                     <Text style={styles.schoolName}>
//                       {cert.name || "Enter award name"}
//                     </Text>
//                     <Text style={styles.degreeText}>
//                       {cert.issuer || "Enter issuing organization"}
//                     </Text>
//                     <View style={styles.dateLocation}>
//                       <Text>
//                         {cert.date?.month} {cert.date?.year}
//                       </Text>
//                     </View>
//                     <Text style={styles.description}>
//                       {cert.description || "Enter certification description"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//             {/* Languages Section */}
//             {data.languages &&
//               data.languages.length > 0 &&
//               data.languages[0].name && (
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>LANGUAGES</Text>
//                   <View style={styles.languages}>
//                     {data.languages.map((language, index) => (
//                       <View key={index} style={styles.languageItem}>
//                         <Text style={styles.languageName}>{language.name}</Text>
//                         <Text style={styles.proficiencyBadge}>
//                           {language.proficiency}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 </View>
//               )}
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default ResumePDF;
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { ResumeState } from "@/lib/types/resumeInput";
import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";

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

const LocationIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </Svg>
);

const EmailIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-2-8h-3v3h3v-3zm-5 0H9v3h3v-3zm5 5h-3v3h3v-3zm-5 0H9v3h3v-3z"
    />
  </Svg>
);

const LinkedInIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
    />
  </Svg>
);

const GithubIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);

const LinkIcon = () => (
  <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
    />
  </Svg>
);

const getStyleValues = (config: StyleConfig = defaultStyleConfig) => {
  const fontSizes = {
    small: { body: 8, heading: 12, title: 24 },
    normal: { body: 10, heading: 14, title: 28 },
    large: { body: 12, heading: 16, title: 32 },
    extraLarge: { body: 14, heading: 18, title: 36 },
  };

  const margins = {
    compact: { page: 20, section: 12 },
    normal: { page: 30, section: 16 },
    spacious: { page: 40, section: 24 },
  };

  const lineHeights = {
    compact: 1.2,
    normal: 1.5,
    spacious: 1.8,
  };

  const defaultFontSize = fontSizes.large;
  const defaultMargins = margins.normal;
  const defaultLineHeight = lineHeights.normal;

  return {
    fontSize: fontSizes[config.fontSize?.body || "large"] || defaultFontSize,
    headingSize:
      fontSizes[config.fontSize?.heading || "normal"] || defaultFontSize,
    pageMargin:
      margins[config.margins?.page || "normal"]?.page || defaultMargins.page,
    sectionMargin:
      margins[config.margins?.section || "normal"]?.section ||
      defaultMargins.section,
    lineHeight: lineHeights[config.lineHeight || "normal"] || defaultLineHeight,
  };
};
const createDynamicStyles = (config: StyleConfig) => {
  const values = getStyleValues(config);
  const primaryColor = config?.colorScheme?.primary || "#1a5f7a";
  const secondaryColor = config?.colorScheme?.secondary || "#86BBD8";
  const textColor = config?.colorScheme?.text || "#333333";
  return StyleSheet.create({
    page: {
      padding: values.pageMargin,
      fontFamily: config?.fontFamily,
      backgroundColor: "white",
    },
    header: {
      marginBottom: values.sectionMargin,
    },
    name: {
      fontSize: values?.headingSize?.title,
      fontWeight: "bold",
      color: primaryColor,
      marginBottom: 4,
    },
    title: {
      fontSize: values.headingSize?.heading,
      color: secondaryColor,
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 4,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    contactText: {
      fontSize: values.fontSize?.body,
      color: textColor,
      lineHeight: values.lineHeight,
    },
    section: {
      marginBottom: values.sectionMargin,
    },
    sectionTitle: {
      fontSize: values.headingSize?.heading,
      fontWeight: "bold",
      color: primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
      paddingBottom: 4,
      marginBottom: 8,
    },
    socialLinks: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 8,
    },
    projectItem: {
      marginBottom: 12,
    },
    projectTitle: {
      fontSize: values.fontSize?.body + 2,
      fontWeight: "bold",
      color: primaryColor,
    },
    projectRole: {
      fontSize: values.fontSize?.body,
      color: textColor,
      marginBottom: 2,
    },
    technologies: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 4,
    },
    techItem: {
      fontSize: values.fontSize?.body - 2,
      backgroundColor: "#EEF2FF",
      padding: "2 4",
      borderRadius: 2,
      color: textColor,
    },
    languageItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
      width: "100%",
      textTransform: "capitalize",
    },
    languageName: {
      fontSize: values.fontSize?.body,
      color: primaryColor,
    },
    proficiencyBadge: {
      fontSize: values.fontSize?.body - 1,
      backgroundColor: "#EEF2FF",
      padding: "2 6",
      borderRadius: 4,
      color: secondaryColor,
      textTransform: "capitalize",
    },
    columns: {
      flexDirection: "row",
      gap: 30,
    },
    leftColumn: {
      flex: 2,
    },
    rightColumn: {
      flex: 1,
    },
    summaryText: {
      fontSize: values.fontSize.body,
      color: textColor,
      lineHeight: values.lineHeight,
    },
    educationItem: {
      marginBottom: 8,
    },
    schoolName: {
      fontSize: values.fontSize.body + 2,
      fontWeight: "bold",
      color: primaryColor,
    },
    degreeText: {
      fontSize: values.fontSize.body,
      color: textColor,
    },
    dateLocation: {
      fontSize: values.fontSize.body,
      color: textColor,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    experienceItem: {
      marginBottom: 12,
    },
    companyName: {
      fontSize: values.fontSize.body + 2,
      fontWeight: "bold",
      color: primaryColor,
    },
    jobTitle: {
      fontSize: values.fontSize.body,
      color: textColor,
      marginBottom: 2,
    },
    description: {
      fontSize: values.fontSize.body,
      color: textColor,
      marginTop: 4,
      lineHeight: values.lineHeight,
    },
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillItem: {
      fontSize: values.fontSize.body,
      backgroundColor: "#F3F4F6",
      padding: "4 8",
      borderRadius: 4,
      color: textColor,
    },
  });
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
  fontFamily: "Helvetica",
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
  switch (platform.toLowerCase()) {
    case "linkedin":
      return <LinkedInIcon />;
    case "github":
      return <GithubIcon />;
    default:
      return <LinkIcon />;
  }
};

const ResumePDF = ({
  data,
  styleConfig = defaultStyleConfig, // Provide default value
}: {
  data: ResumeState;
  styleConfig: ResumeStyleState;
}) => {
  const styles = createDynamicStyles(styleConfig);

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

  const activeSections = styleConfig?.activeSections || {};

  const hasSocialLinks =
    data?.socialLinks?.length > 0 && data?.socialLinks[0]?.url;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {" "}
            {placeholderText.firstName} {placeholderText.lastName}
          </Text>
          <Text style={styles.title}>{placeholderText.title}</Text>

          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <PhoneIcon />
              <Text style={styles.contactText}>{placeholderText.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <EmailIcon />
              <Text style={styles.contactText}>{placeholderText.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <LocationIcon />
              <Text style={styles.contactText}>{placeholderText.location}</Text>
            </View>
          </View>

          {/* Social Links */}
          {hasSocialLinks && activeSections.socialLinks && (
            <View style={styles.socialLinks}>
              {data.socialLinks.map(
                (link, index) =>
                  link.url && (
                    <View key={index} style={styles.contactItem}>
                      {getSocialIcon(link.platform)}
                      <Text style={styles.contactText}>{link.url}</Text>
                    </View>
                  )
              )}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.columns}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Summary Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
              <Text style={styles.summaryText}>{placeholderText.summary}</Text>
            </View>

            {/* Experience Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              {(data.workExperience || []).map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>
                    {exp.company || "Enter company name"}
                  </Text>
                  <Text style={styles.jobTitle}>
                    {exp.jobTitle || "Enter job title"}
                  </Text>
                  <View style={styles.dateLocation}>
                    <Text>
                      {exp.startDate.month} {exp.startDate.year} -{" "}
                      {exp.isCurrentJob
                        ? "Present"
                        : `${exp.endDate.month} ${exp.endDate.year}`}
                    </Text>
                    <Text>{exp.location || "Enter location"}</Text>
                  </View>
                  <Text style={styles.description}>
                    {exp.description || "Enter job description"}
                  </Text>
                </View>
              ))}
            </View>

            {/* Projects Section */}
            {activeSections.projects && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>
                      {project.title || "Enter project title"}
                    </Text>
                    <Text style={styles.projectRole}>
                      {project.role || "Enter role"}
                    </Text>
                    <Text style={styles.description}>
                      {project.contributions || "Enter project contributions"}
                    </Text>
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <View style={styles.technologies}>
                          {project.technologies.map((tech, techIndex) => (
                            <Text key={techIndex} style={styles.techItem}>
                              {tech}
                            </Text>
                          ))}
                        </View>
                      )}
                    {project.links && project.links.length > 0 && (
                      <View style={styles.technologies}>
                        {project.links.map((link, linkIndex) => (
                          <Text key={linkIndex} style={styles.contactText}>
                            {link.platform} : {link.url}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            {/* custom Section */}
            {activeSections.customSections && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {data.customSections[0].title || "Custom Section Title"}
                </Text>
                {data.customSections.map((customSection, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>
                      {customSection.subtitle || "Enter title"}
                    </Text>
                    <View style={styles.dateLocation}>
                      <Text>
                        {customSection.startDate?.month}{" "}
                        {customSection.startDate?.year} -{" "}
                        {customSection.isPresent
                          ? "Present"
                          : `${customSection.endDate?.month} ${customSection.endDate?.year}`}
                      </Text>
                    </View>
                    <Text style={styles.description}>
                      {customSection.description || "Enter Description"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills Section */}
            {activeSections.selectedSkills && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                <View style={styles.skillsGrid}>
                  {(data.selectedSkills || []).map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill.name || "Enter skill"}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Education Section */}
            {activeSections.education && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                {(data.education || []).map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.schoolName}>
                      {edu.school || "Enter school name"}
                    </Text>
                    <Text style={styles.degreeText}>
                      {edu.degree || "Enter degree"}
                    </Text>
                    <View style={styles.dateLocation}>
                      <Text>
                        {edu.startDate?.month} {edu.startDate?.year} -{" "}
                        {edu.isCurrentlyStudying
                          ? "Present"
                          : `${edu.endDate?.month} ${edu.endDate?.year}`}
                      </Text>
                    </View>
                    {edu.description && (
                      <Text style={styles.description}>{edu.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications Section */}
            {activeSections.certificate && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CERTIFICATION</Text>
                {data.certificate.map((cert, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.schoolName}>
                      {cert.name || "Enter certification name"}
                    </Text>
                    <Text style={styles.degreeText}>
                      {cert.issuingOrganization || "Enter issuing organization"}
                    </Text>
                    <Text style={styles.description}>
                      {cert.description || "Enter certification description"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Awards Section */}
            {activeSections.awards && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>AWARDS</Text>
                {data.awards.map((cert, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.schoolName}>
                      {cert.name || "Enter award name"}
                    </Text>
                    <Text style={styles.degreeText}>
                      {cert.issuer || "Enter issuing organization"}
                    </Text>
                    <View style={styles.dateLocation}>
                      <Text>
                        {cert.date?.month} {cert.date?.year}
                      </Text>
                    </View>
                    <Text style={styles.description}>
                      {cert.description || "Enter certification description"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages Section */}
            {activeSections.languages && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
                {/* <View style={styles.languageItem}> */}
                {data.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>
                      {language.name || "language"}
                    </Text>
                    <Text style={styles.proficiencyBadge}>
                      {language.proficiency || "proficiency"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
