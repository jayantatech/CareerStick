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
// import { ResumeState } from "@/lib/types/resumeInput";
// import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";
// import { StyleConfig } from "@/lib/types/resumeTemplate";

// const LocationIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//     />
//   </Svg>
// );

// const PhoneIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
//     />
//   </Svg>
// );

// const EmailIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
//     />
//   </Svg>
// );

// const CalendarIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-2-8h-3v3h3v-3zm-5 0H9v3h3v-3zm5 5h-3v3h3v-3zm-5 0H9v3h3v-3z"
//     />
//   </Svg>
// );

// const LinkedInIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
//     />
//   </Svg>
// );

// const GithubIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
//     />
//   </Svg>
// );

// const LinkIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
//     />
//   </Svg>
// );

// const getStyleValues = (config: StyleConfig = defaultStyleConfig) => {
//   const fontSizes = {
//     small: { body: 8, heading: 12, title: 24 },
//     normal: { body: 10, heading: 14, title: 28 },
//     large: { body: 12, heading: 16, title: 32 },
//     extraLarge: { body: 14, heading: 18, title: 36 },
//   };

//   const margins = {
//     compact: { page: 20, section: 12 },
//     normal: { page: 30, section: 16 },
//     spacious: { page: 40, section: 24 },
//   };

//   const lineHeights = {
//     compact: 1.2,
//     normal: 1.5,
//     spacious: 1.8,
//   };

//   const defaultFontSize = fontSizes.normal;
//   const defaultMargins = margins.normal;
//   const defaultLineHeight = lineHeights.normal;

//   return {
//     fontSize: fontSizes[config.fontSize?.body || "normal"] || defaultFontSize,
//     headingSize:
//       fontSizes[config.fontSize?.heading || "normal"] || defaultFontSize,
//     pageMargin:
//       margins[config.margins?.page || "normal"]?.page || defaultMargins.page,
//     sectionMargin:
//       margins[config.margins?.section || "normal"]?.section ||
//       defaultMargins.section,
//     lineHeight: lineHeights[config.lineHeight || "normal"] || defaultLineHeight,
//   };
// };
// const createDynamicStyles = (config: StyleConfig) => {
//   const values = getStyleValues(config);

//   return StyleSheet.create({
//     page: {
//       padding: values.pageMargin,
//       fontFamily: config?.fontFamily,
//       backgroundColor: "white",
//     },
//     header: {
//       marginBottom: values.sectionMargin,
//     },
//     name: {
//       fontSize: values?.headingSize?.title,
//       fontWeight: "bold",
//       color: config?.colorScheme.primary,
//       marginBottom: 4,
//       textTransform: "capitalize",
//     },
//     title: {
//       fontSize: values.headingSize?.heading,
//       color: config?.colorScheme.secondary,
//       marginBottom: 8,
//     },
//     contactRow: {
//       flexDirection: "row",
//       gap: 16,
//       marginBottom: 4,
//     },
//     contactItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       gap: 4,
//     },
//     contactText: {
//       fontSize: values.fontSize?.body,
//       color: config?.colorScheme.text,
//       lineHeight: values.lineHeight,
//     },
//     section: {
//       marginBottom: values.sectionMargin,
//     },
//     sectionTitle: {
//       fontSize: values.headingSize?.heading,
//       fontWeight: "bold",
//       color: config?.colorScheme.primary,
//       borderBottomWidth: 1,
//       borderBottomColor: "#E5E7EB",
//       paddingBottom: 4,
//       marginBottom: 8,
//     },
//     socialLinks: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       gap: 12,
//       marginTop: 8,
//     },
//     projectItem: {
//       marginBottom: 12,
//     },
//     projectTitle: {
//       fontSize: values.fontSize?.body + 2,
//       fontWeight: "bold",
//       color: config?.colorScheme?.primary,
//     },
//     projectRole: {
//       fontSize: values.fontSize?.body,
//       color: config?.colorScheme.text,
//       marginBottom: 2,
//     },
//     technologies: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       gap: 4,
//       marginTop: 4,
//     },
//     techItem: {
//       fontSize: values.fontSize?.body - 2,
//       backgroundColor: "#EEF2FF",
//       padding: "2 4",
//       borderRadius: 2,
//       color: config?.colorScheme.text,
//     },
//     languageItem: {
//       flexDirection: "row",
//       width: "100%",
//       justifyContent: "space-between",
//       marginBottom: 4,
//     },
//     languageName: {
//       fontSize: values.fontSize?.body,
//       color: config?.colorScheme.primary,
//       textTransform: "capitalize",
//     },
//     proficiencyBadge: {
//       fontSize: values.fontSize?.body - 1,
//       backgroundColor: "#EEF2FF",
//       padding: "2 6",
//       borderRadius: 4,
//       color: config?.colorScheme.secondary,
//       textTransform: "capitalize",
//     },
//     columns: {
//       flexDirection: "row",
//       gap: 30,
//     },
//     leftColumn: {
//       flex: 2,
//     },
//     rightColumn: {
//       flex: 1,
//     },
//     summaryText: {
//       fontSize: values.fontSize.body,
//       color: config?.colorScheme.text,
//       lineHeight: values.lineHeight,
//     },
//     educationItem: {
//       marginBottom: 8,
//     },
//     schoolName: {
//       fontSize: values.fontSize.body + 2,
//       fontWeight: "bold",
//       color: config.colorScheme.primary,
//     },
//     degreeText: {
//       fontSize: values.fontSize.body,
//       color: config?.colorScheme.text,
//     },
//     dateLocation: {
//       fontSize: values.fontSize.body,
//       color: config?.colorScheme.text,
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },
//     experienceItem: {
//       marginBottom: 12,
//     },
//     companyName: {
//       fontSize: values.fontSize.body + 2,
//       fontWeight: "bold",
//       color: config?.colorScheme.primary,
//     },
//     jobTitle: {
//       fontSize: values.fontSize.body,
//       color: config?.colorScheme.text,
//       marginBottom: 2,
//     },
//     description: {
//       fontSize: values.fontSize.body,
//       color: config?.colorScheme.text,
//       marginTop: 4,
//       lineHeight: values.lineHeight,
//     },
//     skillsGrid: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       gap: 8,
//     },
//     skillItem: {
//       fontSize: values.fontSize.body,
//       backgroundColor: "#F3F4F6",
//       padding: "4 8",
//       borderRadius: 4,
//       color: config?.colorScheme.text,
//     },
//     educationSection: {
//       width: "33%",
//     },
//   });
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
//   fontFamily: "Helvetica",
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

// interface ResumePDFProps {
//   data: ResumeState;
//   styleConfig?: StyleConfig;
// }

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

// const TemplateFour = ({
//   data,
//   styleConfig = defaultStyleConfig, // Provide default value
// }: {
//   data: ResumeState;
//   styleConfig: ResumeStyleState;
// }) => {
//   const styles = createDynamicStyles(styleConfig);

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

//   let activeThreeSections: number = 0;

//   if (styleConfig.activeSections) {
//     if (styleConfig.activeSections.education)
//       activeThreeSections = ++activeThreeSections;
//     if (styleConfig.activeSections.languages)
//       activeThreeSections = ++activeThreeSections;
//     if (styleConfig.activeSections.awards)
//       activeThreeSections = ++activeThreeSections;
//     if (styleConfig.activeSections.certificate)
//       activeThreeSections = ++activeThreeSections;
//   }
//   console.log("active sections", activeThreeSections);
//   const hasSocialLinks =
//     data?.socialLinks?.length > 0 && data?.socialLinks[0]?.url;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <Text style={styles.name}>
//             {placeholderText.firstName} {placeholderText.lastName}
//           </Text>
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
//           {hasSocialLinks && activeSections.socialLinks && (
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

//             {/* Skills Section */}
//             {activeSections.selectedSkills && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>SKILLS</Text>
//                 <View style={styles.skillsGrid}>
//                   {(data.selectedSkills || []).map((skill, index) => (
//                     <Text key={index} style={styles.skillItem}>
//                       {skill.name || "Enter skill"}
//                     </Text>
//                   ))}
//                 </View>
//               </View>
//             )}

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
//             {data.projects &&
//               // data.projects.length > 0 &&
//               activeSections.projects && (
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>PROJECTS</Text>
//                   {data.projects.map((project, index) => (
//                     <View key={index} style={styles.projectItem}>
//                       <Text style={styles.projectTitle}>
//                         {project.title || "Enter project title"}
//                       </Text>
//                       <Text style={styles.projectRole}>
//                         {project.role || "Enter role"}
//                       </Text>
//                       <Text style={styles.description}>
//                         {project.contributions || "Enter project contributions"}
//                       </Text>
//                       {project.technologies &&
//                         project.technologies.length > 0 && (
//                           <View style={styles.technologies}>
//                             {project.technologies.map((tech, techIndex) => (
//                               <Text key={techIndex} style={styles.techItem}>
//                                 {tech}
//                               </Text>
//                             ))}
//                           </View>
//                         )}
//                       {project.links && project.links.length > 0 && (
//                         <View style={styles.technologies}>
//                           {project.links.map((link, linkIndex) => (
//                             <Text key={linkIndex} style={styles.contactText}>
//                               {link.platform} : {link.url}
//                             </Text>
//                           ))}
//                         </View>
//                       )}
//                     </View>
//                   ))}
//                 </View>
//               )}
//             {/* custom Section */}
//             {data.customSections &&
//               data.customSections.length > 0 &&
//               data.customSections[0].title &&
//               activeSections.customSections && (
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
//                         <CalendarIcon />
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
//             {activeSections.education && activeThreeSections === 4 && (
//               <View
//                 style={
//                   (styles.section,
//                   {
//                     width: `100%`,
//                   })
//                 }
//               >
//                 <Text style={styles.sectionTitle}>EDUCATION</Text>
//                 {(data.education || []).map((edu, index) => (
//                   <View key={index} style={styles.educationItem}>
//                     <Text style={styles.schoolName}>
//                       {edu.school || "Enter school name"}
//                     </Text>
//                     <Text style={styles.degreeText}>
//                       {edu.degree || "Enter degree"}
//                     </Text>
//                     <View style={styles.dateLocation}>
//                       <Text>
//                         {edu.startDate?.month} {edu.startDate?.year} -{" "}
//                         {edu.isCurrentlyStudying
//                           ? "Present"
//                           : `${edu.endDate?.month} ${edu.endDate?.year}`}
//                       </Text>
//                     </View>
//                     {edu.description && (
//                       <Text style={styles.description}>{edu.description}</Text>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             )}
//             <View
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 gap: 28,
//                 alignItems: "flex-start",
//                 flexDirection: "row",
//               }}
//             >
//               {activeSections.education && activeThreeSections <= 3 && (
//                 <View
//                   style={
//                     (styles.section,
//                     {
//                       width: `${
//                         activeThreeSections == 1
//                           ? "100%"
//                           : activeThreeSections == 2
//                           ? "50%"
//                           : activeThreeSections == 3
//                           ? "33%"
//                           : activeThreeSections == 4 && "33%"
//                       }`,
//                     })
//                     // {  }
//                   }
//                 >
//                   <Text style={styles.sectionTitle}>EDUCATION</Text>
//                   {(data.education || []).map((edu, index) => (
//                     <View key={index} style={styles.educationItem}>
//                       <Text style={styles.schoolName}>
//                         {edu.school || "Enter school name"}
//                       </Text>
//                       <Text style={styles.degreeText}>
//                         {edu.degree || "Enter degree"}
//                       </Text>
//                       <View style={styles.dateLocation}>
//                         <Text>
//                           {edu.startDate?.month} {edu.startDate?.year} -{" "}
//                           {edu.isCurrentlyStudying
//                             ? "Present"
//                             : `${edu.endDate?.month} ${edu.endDate?.year}`}
//                         </Text>
//                       </View>
//                       {edu.description && (
//                         <Text style={styles.description}>
//                           {edu.description}
//                         </Text>
//                       )}
//                     </View>
//                   ))}
//                 </View>
//               )}
//               {data.certificate &&
//                 data.certificate.length > 0 &&
//                 activeSections.certificate && (
//                   <View
//                     style={
//                       (styles.section,
//                       {
//                         width: `${
//                           activeThreeSections == 1
//                             ? "100%"
//                             : activeThreeSections == 2
//                             ? "50%"
//                             : activeThreeSections == 3
//                             ? "33%"
//                             : activeThreeSections == 4 && "33%"
//                         }`,
//                       })
//                     }
//                   >
//                     <Text style={styles.sectionTitle}>CERTIFICATION</Text>
//                     {data.certificate.map((cert, index) => (
//                       <View key={index} style={styles.educationItem}>
//                         <Text style={styles.schoolName}>
//                           {cert.name || "Enter certification name"}
//                         </Text>
//                         <Text style={styles.degreeText}>
//                           {cert.issuingOrganization ||
//                             "Enter issuing organization"}
//                         </Text>
//                         <Text style={styles.description}>
//                           {cert.description ||
//                             "Enter certification description"}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}

//               {data.awards &&
//                 data.awards.length > 0 &&
//                 data.awards[0].name &&
//                 activeSections.awards && (
//                   <View
//                     style={
//                       (styles.section,
//                       {
//                         width: `${
//                           activeThreeSections == 1
//                             ? "100%"
//                             : activeThreeSections == 2
//                             ? "50%"
//                             : activeThreeSections == 3
//                             ? "33%"
//                             : activeThreeSections == 4 && "33%"
//                         }`,
//                       })
//                     }
//                   >
//                     <Text style={styles.sectionTitle}>AWARDS</Text>
//                     {data.awards.map((cert, index) => (
//                       <View key={index} style={styles.educationItem}>
//                         <Text style={styles.schoolName}>
//                           {cert.name || "Enter award name"}
//                         </Text>
//                         <Text style={styles.degreeText}>
//                           {cert.issuer || "Enter issuing organization"}
//                         </Text>
//                         <View style={styles.dateLocation}>
//                           <Text>
//                             {cert.date?.month} {cert.date?.year}
//                           </Text>
//                         </View>
//                         <Text style={styles.description}>
//                           {cert.description ||
//                             "Enter certification description"}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               {data.languages &&
//                 data.languages.length > 0 &&
//                 activeSections.languages && (
//                   <View
//                     style={
//                       (styles.section,
//                       {
//                         width: `${
//                           activeThreeSections == 1
//                             ? "100%"
//                             : activeThreeSections == 2
//                             ? "50%"
//                             : activeThreeSections == 3
//                             ? "33%"
//                             : activeThreeSections == 4 && "33%"
//                         }`,
//                       })
//                     }
//                   >
//                     <Text style={styles.sectionTitle}>LANGUAGES</Text>
//                     {data.languages.map((language, index) => (
//                       <View style={styles.languageItem}>
//                         <View key={index} style={styles.languageItem}>
//                           <Text style={styles.languageName}>
//                             {language.name || "Enter language name"}
//                           </Text>
//                           <Text style={styles.proficiencyBadge}>
//                             {language.proficiency || "Enter proficiency"}
//                           </Text>
//                         </View>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default TemplateFour;

// working perfactly before two errors - (one src)
// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Svg,
//   Path,
//   Image,
// } from "@react-pdf/renderer";
// import { ResumeState } from "@/lib/types/resumeInput";
// import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";
// import { StyleConfig } from "@/lib/types/resumeTemplate";
// import { Logo, UserAvatar } from "../../../../public/img";

// // Keep all your existing icon components (LocationIcon, PhoneIcon, etc.)

// // const LocationIcon = () => (
// //   <Svg
// //     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
// //     viewBox="0 0 24 24"
// //   >
// //     <Path
// //       fill="#4B5563"
// //       d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
// //     />
// //   </Svg>
// // );
// const LocationIcon = ({ color = "#fff" }) => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill={color}
//       d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//     />
//   </Svg>
// );

// // const PhoneIcon = () => (
// //   <Svg
// //     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
// //     viewBox="0 0 24 24"
// //   >
// //     <Path
// //       fill="#4B5563"
// //       d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
// //     />
// //   </Svg>
// // );
// const PhoneIcon = ({ color = "#fff" }) => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill={color}
//       d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
//     />
//   </Svg>
// );

// // const EmailIcon = () => (
// //   <Svg
// //     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
// //     viewBox="0 0 24 24"
// //   >
// //     <Path
// //       fill="#4B5563"
// //       d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
// //     />
// //   </Svg>
// // );

// const EmailIcon = ({ color = "#fff" }) => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill={color}
//       d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
//     />
//   </Svg>
// );

// const CalendarIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-2-8h-3v3h3v-3zm-5 0H9v3h3v-3zm5 5h-3v3h3v-3zm-5 0H9v3h3v-3z"
//     />
//   </Svg>
// );

// const LinkedInIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
//     />
//   </Svg>
// );

// const GithubIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
//     />
//   </Svg>
// );

// const LinkIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
//     />
//   </Svg>
// );

// const defaultStyleConfig: StyleConfig = {
//   fontSize: {
//     body: "normal",
//     heading: "normal",
//   },
//   margins: {
//     page: "normal",
//     section: "normal",
//   },
//   fontFamily: "Helvetica",
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

// const getStyleValues = (config: StyleConfig = defaultStyleConfig) => {
//   const fontSizes = {
//     small: { body: 8, heading: 12, title: 24 },
//     normal: { body: 10, heading: 14, title: 28 },
//     large: { body: 12, heading: 16, title: 32 },
//     extraLarge: { body: 14, heading: 18, title: 36 },
//   };

//   const margins = {
//     compact: { page: 20, section: 12 },
//     normal: { page: 30, section: 16 },
//     spacious: { page: 40, section: 24 },
//   };

//   //   const margins = {
//   //     compact: { page: 15, section: 10 },
//   //     normal: { page: 25, section: 14 },
//   //     spacious: { page: 35, section: 20 },
//   //   };

//   const lineHeights = {
//     compact: 1.2,
//     normal: 1.5,
//     spacious: 1.8,
//   };

//   return {
//     fontSize: fontSizes[config.fontSize?.body || "normal"],
//     headingSize: fontSizes[config.fontSize?.heading || "normal"],
//     pageMargin: margins[config.margins?.page || "normal"]?.page,
//     sectionMargin: margins[config.margins?.section || "normal"]?.section,
//     lineHeight: lineHeights[config.lineHeight || "normal"],
//   };
// };

// const createDynamicStyles = (config: StyleConfig) => {
//   const values = getStyleValues(config);
//   const primaryColor = config?.colorScheme?.primary || "#1a5f7a";
//   const secondaryColor = config?.colorScheme?.secondary || "#86BBD8";
//   const textColor = config?.colorScheme?.text || "#333333";

//   return StyleSheet.create({
//     page: {
//       flexDirection: "row",
//       backgroundColor: "white",
//     },
//     leftColumn: {
//       width: "32%",
//       backgroundColor: "#21405C",
//       //   backgroundColor: "#21405C",
//       padding: values.pageMargin - 6,
//       color: secondaryColor,
//     },
//     rightColumn: {
//       width: "68%",
//       padding: values.pageMargin - 6,
//     },
//     profileSection: {
//       alignItems: "flex-start",
//     },
//     name: {
//       fontSize: values.headingSize.title,
//       fontWeight: "bold",
//       color: "black",
//       textAlign: "left",
//       marginBottom: 4,
//     },
//     title: {
//       fontSize: values.fontSize.heading,
//       color: secondaryColor,
//       textAlign: "center",
//       marginBottom: values.sectionMargin - 6,
//     },
//     // contactInfo: {
//     //   marginBottom: values.sectionMargin,
//     // },
//     contactItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 2,
//       gap: 4,
//       color: "white",
//     },
//     contactText: {
//       fontSize: values.fontSize.body,
//       marginLeft: 8,
//     },
//     sectionTitle: {
//       fontSize: values.fontSize.heading,
//       fontWeight: "bold",
//       color: primaryColor,
//       borderBottomWidth: 2,
//       borderBottomColor: secondaryColor,
//       paddingBottom: 2,
//       marginBottom: values.sectionMargin - 8,
//     },
//     leftSectionTitle: {
//       fontSize: values.fontSize.heading,
//       fontWeight: "bold",
//       color: "white",
//       borderBottomWidth: 2,
//       borderBottomColor: secondaryColor,
//       paddingBottom: 4,
//       marginBottom: values.sectionMargin - 8,
//       marginTop: 6,
//     },
//     summaryText: {
//       fontSize: values.fontSize.body,
//       color: textColor,
//       lineHeight: values.lineHeight,
//       marginBottom: values.sectionMargin,
//     },
//     experienceItem: {
//       marginBottom: values.sectionMargin,
//     },
//     companyName: {
//       fontSize: values.fontSize.body + 2,
//       fontWeight: "bold",
//       color: primaryColor,
//     },
//     jobTitle: {
//       fontSize: values.fontSize.body,
//       color: textColor,
//       marginBottom: 4,
//     },
//     dateLocation: {
//       fontSize: values.fontSize.body - 1,
//       color: textColor,
//       marginBottom: 4,
//     },
//     description: {
//       fontSize: values.fontSize.body,
//       color: textColor,
//       lineHeight: values.lineHeight,
//     },
//     skillsGrid: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       gap: 4,
//     },
//     // skillItem: {
//     //   fontSize: values.fontSize.body,
//     //   color: "white",
//     //   marginBottom: 4,
//     // },
//     skillItem: {
//       fontSize: values.fontSize.body,
//       padding: "2 4",
//       borderRadius: 2,
//       color: "white",
//       backgroundColor: "#3A5F7A",
//     },
//     educationItem: {
//       marginBottom: values.sectionMargin,
//     },
//     schoolName: {
//       fontSize: values.fontSize.body + 1,
//       fontWeight: "bold",
//       color: "white",
//     },
//     degreeText: {
//       fontSize: values.fontSize.body,
//       color: "white",
//       marginBottom: 2,
//     },
//     languageItem: {
//       marginBottom: 6,
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },
//     languageName: {
//       fontSize: values.fontSize.body,
//       color: "white",
//       textTransform: "capitalize",
//     },
//     proficiencyBadge: {
//       fontSize: values.fontSize.body - 1,
//       color: "white",
//       textTransform: "capitalize",
//       padding: "2 4",
//       borderRadius: 2,
//       backgroundColor: "#3A5F7A",
//     },
//     section: {
//       //   marginBottom: values.sectionMargin,
//     },
//     projectItem: {
//       marginBottom: 12,
//     },
//     projectTitle: {
//       fontSize: values.fontSize?.body + 2,
//       fontWeight: "bold",
//       color: config?.colorScheme?.primary,
//     },
//     awardName: {
//       fontSize: values.fontSize.body + 2,
//       fontWeight: "bold",
//       color: "white",
//     },
//     awardJobTitle: {
//       fontSize: values.fontSize.body,
//       color: "white",
//       fontWeight: "bold",
//       marginBottom: 4,
//     },
//     awardDateLocation: {
//       fontSize: values.fontSize.body - 1,
//       color: "white",
//       marginBottom: 4,
//     },
//     awardDescription: {
//       fontSize: values.fontSize.body,
//       color: "white",
//     },
//     imageContainer: {
//       alignItems: "center",
//       marginVertical: 10,
//       width: 135,
//       height: 135,
//       borderRadius: 75,
//       overflow: "hidden",
//     },
//     image: {
//       width: "100%",
//       height: "100%",
//       resizeMode: "cover",
//       objectFit: "cover",
//     },
//     socialLinks: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       gap: 8,
//       marginBottom: 12,
//     },
//     linkText: {
//       fontSize: values.fontSize?.body,
//       color: textColor,
//       lineHeight: values.lineHeight,
//     },
//     leftIcon: {
//       color: secondaryColor,
//     },
//   });
// };
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

// const TemplateFour = ({
//   data,
//   styleConfig = defaultStyleConfig,
// }: {
//   data: ResumeState;
//   styleConfig: ResumeStyleState;
// }) => {
//   const styles = createDynamicStyles(styleConfig);
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
//   };
//   const hasSocialLinks =
//     data?.socialLinks?.length > 0 && data?.socialLinks[0]?.url;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Left Column */}
//         <View style={styles.leftColumn}>
//           {/* Profile Section */}
//           <View style={styles.imageContainer}>
//             <Image
//               src={data.personalInfo?.photo as string}
//               style={styles.image}
//             />
//           </View>
//           {/* Contact Information */}
//           <View>
//             <Text style={styles.leftSectionTitle}>CONTACTS</Text>
//             <View style={styles.contactItem}>
//               <PhoneIcon color="#A2B8C2" />
//               <Text style={styles.contactText}>{placeholderText.phone}</Text>
//             </View>
//             <View style={styles.contactItem}>
//               <EmailIcon color="#A2B8C2" />
//               <Text style={styles.contactText}>{placeholderText.email}</Text>
//             </View>
//             <View style={styles.contactItem}>
//               <LocationIcon color="#A2B8C2" />
//               <Text style={styles.contactText}>{placeholderText.location}</Text>
//             </View>
//           </View>

//           {/* Skills Section */}
//           {/* {activeSections.selectedSkills && (
//             <View style={styles.section}>
//               <Text style={styles.leftSectionTitle}>SKILLS</Text>
//               {(data.selectedSkills || []).map((skill, index) => (
//                 <Text key={index} style={styles.skillItem}>
//                   {skill.name || "Enter skill"}
//                 </Text>
//               ))}
//             </View>
//           )} */}
//           {activeSections.selectedSkills && (
//             <View style={styles.section}>
//               <Text style={styles.leftSectionTitle}>SKILLS</Text>
//               <View style={styles.skillsGrid}>
//                 {(data.selectedSkills || []).map((skill, index) => (
//                   <Text key={index} style={styles.skillItem}>
//                     {skill.name || "Enter skill"}
//                   </Text>
//                 ))}
//               </View>
//             </View>
//           )}
//           {/* Awards */}
//           {activeSections.awards && data.awards && data.awards.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.leftSectionTitle}>AWARDS</Text>
//               {data.awards.map((award, index) => (
//                 <View key={index} style={styles.experienceItem}>
//                   <Text style={styles.awardName}>
//                     {award.name || "Enter award name"}
//                   </Text>
//                   <Text style={styles.awardJobTitle}>
//                     {award.issuer || "Enter issuing organization"}
//                   </Text>
//                   <Text style={styles.awardDateLocation}>
//                     {award.date?.month} {award.date?.year}
//                   </Text>
//                   <Text style={styles.awardDescription}>
//                     {award.description || "Enter award description"}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* Languages Section */}
//           {activeSections.languages &&
//             data.languages &&
//             data.languages.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.leftSectionTitle}>LANGUAGES</Text>
//                 {data.languages.map((language, index) => (
//                   <View key={index} style={styles.languageItem}>
//                     <Text style={styles.languageName}>
//                       {language.name || "Enter language"}
//                     </Text>
//                     <Text style={styles.proficiencyBadge}>
//                       {language.proficiency || "Enter proficiency"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}
//         </View>

//         {/* Right Column */}
//         <View style={styles.rightColumn}>
//           <View style={styles.profileSection}>
//             <Text style={styles.name}>
//               {placeholderText.firstName} {placeholderText.lastName}
//             </Text>
//             <Text style={styles.title}>{placeholderText.title}</Text>
//           </View>
//           {/* Links Section */}
//           {hasSocialLinks && activeSections.socialLinks && (
//             <View style={styles.socialLinks}>
//               {data.socialLinks.map(
//                 (link, index) =>
//                   link.url && (
//                     <View key={index} style={styles.contactItem}>
//                       {getSocialIcon(link.platform)}
//                       <Text style={styles.linkText}>{link.url}</Text>
//                     </View>
//                   )
//               )}
//             </View>
//           )}
//           {/* Summary Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>SUMMARY</Text>
//             <Text style={styles.summaryText}>{placeholderText.summary}</Text>
//           </View>

//           {/* Experience Section */}
//           {activeSections.workExperience && (
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
//                   <Text style={styles.dateLocation}>
//                     {exp.startDate.month} {exp.startDate.year} -
//                     {exp.isCurrentJob
//                       ? "Present"
//                       : `${exp.endDate.month} ${exp.endDate.year}`}
//                     {" | "}
//                     {exp.location || "Enter location"}
//                   </Text>
//                   <Text style={styles.description}>
//                     {exp.description || "Enter job description"}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}
//           {/* Projects Section */}
//           {activeSections.projects &&
//             data.projects &&
//             data.projects.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>PROJECTS</Text>
//                 {data.projects.map((project, index) => (
//                   <View key={index} style={styles.experienceItem}>
//                     <Text style={styles.companyName}>
//                       {project.title || "Enter project title"}
//                     </Text>
//                     <Text style={styles.jobTitle}>
//                       {project.role || "Enter role"}
//                     </Text>
//                     <Text style={styles.description}>
//                       {project.contributions || "Enter project contributions"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//           {data.customSections &&
//             data.customSections.length > 0 &&
//             data.customSections[0].title &&
//             activeSections.customSections && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>
//                   {data.customSections[0].title}
//                 </Text>
//                 {data.customSections.map((customSection, index) => (
//                   <View key={index} style={styles.projectItem}>
//                     <Text style={styles.projectTitle}>
//                       {customSection.subtitle || "Enter title"}
//                     </Text>
//                     <View style={styles.dateLocation}>
//                       {/* <CalendarIcon /> */}
//                       <Text>
//                         {customSection.startDate?.month}{" "}
//                         {customSection.startDate?.year} -{" "}
//                         {customSection.isPresent
//                           ? "Present"
//                           : `${customSection.endDate?.month} ${customSection.endDate?.year}`}
//                       </Text>
//                     </View>
//                     <Text style={styles.description}>
//                       {customSection.description || "Enter Description"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//           {/* Education Section */}
//           {activeSections.education && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>EDUCATION</Text>
//               {(data.education || []).map((edu, index) => (
//                 <View key={index} style={styles.experienceItem}>
//                   <Text style={styles.companyName}>
//                     {edu.school || "Enter school name"}
//                   </Text>
//                   <Text style={styles.jobTitle}>
//                     {edu.degree || "Enter degree"}
//                   </Text>
//                   <Text style={styles.dateLocation}>
//                     {edu.startDate?.month} {edu.startDate?.year} -
//                     {edu.isCurrentlyStudying
//                       ? "Present"
//                       : `${edu.endDate?.month} ${edu.endDate?.year}`}
//                   </Text>
//                   {edu.description && (
//                     <Text style={styles.description}>{edu.description}</Text>
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* Certifications Section */}
//           {activeSections.certificate &&
//             data.certificate &&
//             data.certificate.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
//                 {data.certificate.map((cert, index) => (
//                   <View key={index} style={styles.experienceItem}>
//                     <Text style={styles.companyName}>
//                       {cert.name || "Enter certification name"}
//                     </Text>
//                     <Text style={styles.jobTitle}>
//                       {cert.issuingOrganization || "Enter issuing organization"}
//                     </Text>
//                     <Text style={styles.description}>
//                       {cert.description || "Enter certification description"}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//           {/* Awards Section */}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default TemplateFour;
// working perfactly before two errors - (one src)
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Image,
  Font,
} from "@react-pdf/renderer";
import { ResumeState } from "@/lib/types/resumeInput";
import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";
import { StyleConfig } from "@/lib/types/resumeTemplate";

// Keep all your existing icon components (LocationIcon, PhoneIcon, etc.)

// const LocationIcon = () => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill="#4B5563"
//       d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//     />
//   </Svg>
// );
const LocationIcon = ({ color = "#fff" }) => (
  <Svg
    style={{ width: 14, height: 14, marginTop: -3, color }}
    viewBox="0 0 24 24"
  >
    <Path
      fill={color}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Svg>
);

// const PhoneIcon = () => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill="#4B5563"
//       d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
//     />
//   </Svg>
// );
const PhoneIcon = ({ color = "#fff" }) => (
  <Svg
    style={{ width: 14, height: 14, marginTop: -3, color }}
    viewBox="0 0 24 24"
  >
    <Path
      fill={color}
      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </Svg>
);

// const EmailIcon = () => (
//   <Svg
//     style={{ width: 14, height: 14, marginTop: -3, color: "#fff" }}
//     viewBox="0 0 24 24"
//   >
//     <Path
//       fill="#4B5563"
//       d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
//     />
//   </Svg>
// );

const EmailIcon = ({ color = "#fff" }) => (
  <Svg
    style={{ width: 14, height: 14, marginTop: -3, color }}
    viewBox="0 0 24 24"
  >
    <Path
      fill={color}
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);

// const CalendarIcon = () => (
//   <Svg style={{ width: 14, height: 14, marginTop: -3 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm-2-8h-3v3h3v-3zm-5 0H9v3h3v-3zm5 5h-3v3h3v-3zm-5 0H9v3h3v-3z"
//     />
//   </Svg>
// );

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

Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyCg4QIFqPfE.ttf",
});

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

  //   const margins = {
  //     compact: { page: 15, section: 10 },
  //     normal: { page: 25, section: 14 },
  //     spacious: { page: 35, section: 20 },
  //   };

  const lineHeights = {
    compact: 1.2,
    normal: 1.5,
    spacious: 1.8,
  };

  return {
    fontSize: fontSizes[config.fontSize?.body || "normal"],
    headingSize: fontSizes[config.fontSize?.heading || "normal"],
    pageMargin: margins[config.margins?.page || "normal"]?.page,
    sectionMargin: margins[config.margins?.section || "normal"]?.section,
    lineHeight: lineHeights[config.lineHeight || "normal"],
  };
};

const createDynamicStyles = (config: StyleConfig) => {
  const values = getStyleValues(config);
  const primaryColor = config?.colorScheme?.primary || "#1a5f7a";
  const secondaryColor = config?.colorScheme?.secondary || "#86BBD8";
  const textColor = config?.colorScheme?.text || "#333333";

  return StyleSheet.create({
    page: {
      flexDirection: "row",
      fontFamily: config?.fontFamily,
      backgroundColor: "white",
      wrap: true,
    },
    leftColumn: {
      width: "32%",
      backgroundColor: "#21405C",
      //   backgroundColor: "#21405C",
      padding: values.pageMargin - 6,
      color: secondaryColor,
    },
    rightColumn: {
      width: "68%",
      padding: values.pageMargin - 6,
    },
    profileSection: {
      alignItems: "flex-start",
    },
    name: {
      fontSize: values.headingSize.title,
      fontWeight: "bold",
      color: "black",
      textAlign: "left",
      marginBottom: 4,
    },
    title: {
      fontSize: values.fontSize.heading,
      color: secondaryColor,
      textAlign: "center",
      marginBottom: values.sectionMargin - 6,
    },
    // contactInfo: {
    //   marginBottom: values.sectionMargin,
    // },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
      gap: 4,
      color: "white",
    },
    contactText: {
      fontSize: values.fontSize.body,
      marginLeft: 8,
    },
    sectionTitle: {
      fontSize: values.fontSize.heading,
      fontWeight: "bold",
      color: primaryColor,
      borderBottomWidth: 2,
      borderBottomColor: secondaryColor,
      paddingBottom: 2,
      marginBottom: values.sectionMargin - 8,
    },
    leftSection: {
      marginBottom: values.sectionMargin - 8,
    },
    leftSectionTitle: {
      fontSize: values.fontSize.heading,
      fontWeight: "bold",
      color: "white",
      borderBottomWidth: 2,
      borderBottomColor: secondaryColor,
      paddingBottom: 4,
      marginBottom: values.sectionMargin - 8,
      marginTop: 6,
    },
    summaryText: {
      fontSize: values.fontSize.body,
      color: textColor,
      lineHeight: values.lineHeight,
      marginBottom: values.sectionMargin,
    },
    experienceItem: {
      marginBottom: values.sectionMargin,
    },
    companyName: {
      fontSize: values.fontSize.body + 2,
      fontWeight: "bold",
      color: primaryColor,
    },
    jobTitle: {
      fontSize: values.fontSize.body,
      color: textColor,
      marginBottom: 4,
    },
    dateLocation: {
      fontSize: values.fontSize.body - 1,
      color: textColor,
      marginBottom: 4,
    },
    description: {
      fontSize: values.fontSize.body,
      color: textColor,
      lineHeight: values.lineHeight,
    },
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    // skillItem: {
    //   fontSize: values.fontSize.body,
    //   color: "white",
    //   marginBottom: 4,
    // },
    skillItem: {
      fontSize: values.fontSize.body,
      padding: "2 4",
      borderRadius: 2,
      color: "white",
      backgroundColor: "#3A5F7A",
    },
    educationItem: {
      marginBottom: values.sectionMargin,
    },
    schoolName: {
      fontSize: values.fontSize.body + 1,
      fontWeight: "bold",
      color: "white",
    },
    degreeText: {
      fontSize: values.fontSize.body,
      color: "white",
      marginBottom: 2,
    },
    languageItem: {
      marginBottom: 6,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    languageName: {
      fontSize: values.fontSize.body,
      color: "white",
      textTransform: "capitalize",
    },
    proficiencyBadge: {
      fontSize: values.fontSize.body - 1,
      color: "white",
      textTransform: "capitalize",
      padding: "2 4",
      borderRadius: 2,
      backgroundColor: "#3A5F7A",
    },
    section: {
      //   marginBottom: values.sectionMargin,
    },
    projectItem: {
      marginBottom: 12,
    },
    projectTitle: {
      fontSize: values.fontSize?.body + 2,
      fontWeight: "bold",
      color: primaryColor,
    },
    awardName: {
      fontSize: values.fontSize.body + 2,
      fontWeight: "bold",
      color: "white",
    },
    awardJobTitle: {
      fontSize: values.fontSize.body,
      color: "white",
      fontWeight: "bold",
      marginBottom: 4,
    },
    awardDateLocation: {
      fontSize: values.fontSize.body - 1,
      color: "white",
      marginBottom: 4,
    },
    awardDescription: {
      fontSize: values.fontSize.body,
      color: "white",
    },
    imageContainer: {
      alignItems: "center",
      width: 135,
      height: 135,
      borderRadius: 75,
      overflow: "hidden",
      marginBottom: 10,
    },
    image: {
      width: 135,
      height: 135,
      resizeMode: "cover",
      objectFit: "cover",
    },
    socialLinks: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12,
    },
    linkText: {
      fontSize: values.fontSize?.body,
      color: textColor,
      lineHeight: values.lineHeight,
    },
    leftIcon: {
      color: secondaryColor,
    },
    modifiedImageContainer: {
      alignItems: "center",
      marginVertical: 10,
      width: 135,
      height: 135,
    },
    modifiedImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 67.5, // Half of width/height for circular effect
    },
  });
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

const TemplateFour = ({
  data,
  styleConfig = defaultStyleConfig,
}: {
  data: ResumeState;
  styleConfig: ResumeStyleState;
}) => {
  const styles = createDynamicStyles(styleConfig);
  const activeSections = styleConfig?.activeSections || {};

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
  const hasSocialLinks =
    data?.socialLinks?.length > 0 && data?.socialLinks[0]?.url;
  // const photo = profile;
  const photo = (data.personalInfo?.photo as string) || "";

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Profile Section */}
          {photo ? (
            <View style={styles.imageContainer}>
              <Image src={photo} style={styles.image} />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                src={
                  "https://ai-resume.s3.us-east-1.amazonaws.com/profile/1731488429181-careerstick.com"
                }
                style={styles.image}
              />
            </View>
          )}
          {/* Contact Information */}
          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>CONTACTS</Text>
            <View style={styles.contactItem}>
              <PhoneIcon color="#A2B8C2" />
              <Text style={styles.contactText}>{placeholderText.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <EmailIcon color="#A2B8C2" />
              <Text style={styles.contactText}>{placeholderText.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <LocationIcon color="#A2B8C2" />
              <Text style={styles.contactText}>{placeholderText.location}</Text>
            </View>
          </View>

          {/* Skills Section */}
          {/* {activeSections.selectedSkills && (
            <View style={styles.section}>
              <Text style={styles.leftSectionTitle}>SKILLS</Text>
              {(data.selectedSkills || []).map((skill, index) => (
                <Text key={index} style={styles.skillItem}>
                  {skill.name || "Enter skill"}
                </Text>
              ))}
            </View>
          )} */}
          {activeSections.selectedSkills && (
            <View style={styles.leftSection}>
              <Text style={styles.leftSectionTitle}>SKILLS</Text>
              <View style={styles.skillsGrid}>
                {(data.selectedSkills || []).map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill.name || "Enter skill"}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {/* Awards */}
          {activeSections.awards && data.awards && data.awards.length > 0 && (
            <View style={styles.leftSection}>
              <Text style={styles.leftSectionTitle}>AWARDS</Text>
              {data.awards.map((award, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.awardName}>
                    {award.name || "Enter award name"}
                  </Text>
                  <Text style={styles.awardJobTitle}>
                    {award.issuer || "Enter issuing organization"}
                  </Text>
                  <Text style={styles.awardDateLocation}>
                    {award.date?.month} {award.date?.year}
                  </Text>
                  <Text style={styles.awardDescription}>
                    {award.description || "Enter award description"}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages Section */}
          {activeSections.languages &&
            data.languages &&
            data.languages.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionTitle}>LANGUAGES</Text>
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

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <View style={styles.profileSection}>
            <Text style={styles.name}>
              {placeholderText.firstName} {placeholderText.lastName}
            </Text>
            <Text style={styles.title}>{placeholderText.title}</Text>
          </View>
          {/* Links Section */}
          {hasSocialLinks && activeSections.socialLinks && (
            <View style={styles.socialLinks}>
              {data.socialLinks.map(
                (link, index) =>
                  link.url && (
                    <View key={index} style={styles.contactItem}>
                      {getSocialIcon(link.platform)}
                      <Text style={styles.linkText}>{link.url}</Text>
                    </View>
                  )
              )}
            </View>
          )}
          {/* Summary Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text style={styles.summaryText}>{placeholderText.summary}</Text>
          </View>

          {/* Experience Section */}
          {activeSections.workExperience && (
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
                  <Text style={styles.dateLocation}>
                    {exp.startDate.month} {exp.startDate.year} -
                    {exp.isCurrentJob
                      ? "Present"
                      : `${exp.endDate.month} ${exp.endDate.year}`}
                    {" | "}
                    {exp.location || "Enter location"}
                  </Text>
                  <Text style={styles.description}>
                    {exp.description || "Enter job description"}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {/* Projects Section */}
          {activeSections.projects &&
            data.projects &&
            data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROJECTS</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.companyName}>
                      {project.title || "Enter project title"}
                    </Text>
                    <Text style={styles.jobTitle}>
                      {project.role || "Enter role"}
                    </Text>
                    <Text style={styles.description}>
                      {project.contributions || "Enter project contributions"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

          {data.customSections &&
            data.customSections.length > 0 &&
            data.customSections[0].title &&
            activeSections.customSections && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {data.customSections[0].title}
                </Text>
                {data.customSections.map((customSection, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>
                      {customSection.subtitle || "Enter title"}
                    </Text>
                    <View style={styles.dateLocation}>
                      {/* <CalendarIcon /> */}
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

          {/* Education Section */}
          {activeSections.education && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              {(data.education || []).map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.companyName}>
                    {edu.school || "Enter school name"}
                  </Text>
                  <Text style={styles.jobTitle}>
                    {edu.degree || "Enter degree"}
                  </Text>
                  <Text style={styles.dateLocation}>
                    {edu.startDate?.month} {edu.startDate?.year} -
                    {edu.isCurrentlyStudying
                      ? "Present"
                      : `${edu.endDate?.month} ${edu.endDate?.year}`}
                  </Text>
                  {edu.description && (
                    <Text style={styles.description}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Certifications Section */}
          {activeSections.certificate &&
            data.certificate &&
            data.certificate.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                {data.certificate.map((cert, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.companyName}>
                      {cert.name || "Enter certification name"}
                    </Text>
                    <Text style={styles.jobTitle}>
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
        </View>
      </Page>
    </Document>
  );
};

export default TemplateFour;
