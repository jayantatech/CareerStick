// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import { Download } from "lucide-react";

// interface ResumeData {
//   personalInfo: {
//     name: string;
//     title: string;
//     email: string;
//     phone: string;
//     location: string;
//     summary: string;
//   };
//   experience: Array<{
//     title: string;
//     company: string;
//     period: string;
//     achievements: string[];
//   }>;
//   education: Array<{
//     degree: string;
//     school: string;
//     period: string;
//     gpa?: string;
//   }>;
//   skills: Array<{
//     category: string;
//     items: string[];
//   }>;
// }

// const ResumeGenerator: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);

// const resumeData: ResumeData = {
//   personalInfo: {
//     name: "Sarah Anderson",
//     title: "Senior Frontend Engineer",
//     email: "sarah.anderson@email.com",
//     phone: "(555) 123-4567",
//     location: "San Francisco, CA",
//     summary:
//       "Passionate frontend engineer with 6+ years of experience building scalable web applications. Specialized in React ecosystem and modern JavaScript.",
//   },
//   experience: [
//     {
//       title: "Senior Frontend Engineer",
//       company: "TechFlow Solutions",
//       period: "2021 - Present",
//       achievements: [
//         "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript.",
//         "Improved application performance by 60% through code splitting and lazy loading.",
//         "Implemented automated testing strategy achieving 90% code coverage.",
//         "Mentored junior developers and established frontend best practices.",
//       ],
//     },
//     {
//       title: "Frontend Developer",
//       company: "InnovateSoft Inc",
//       period: "2018 - 2021",
//       achievements: [
//         "Developed responsive web applications using React and Redux.",
//         "Reduced build time by 40% by optimizing webpack configuration.",
//         "Collaborated with UX team to implement new design system.",
//         "Led migration from JavaScript to TypeScript across multiple projects.",
//       ],
//     },
//   ],
//   education: [
//     {
//       degree: "Master of Science in Computer Science",
//       school: "Stanford University",
//       period: "2016-2018",
//       gpa: "3.8",
//     },
//     {
//       degree: "Bachelor of Science in Software Engineering",
//       school: "University of California, Berkeley",
//       period: "2012-2016",
//       gpa: "3.9",
//     },
//   ],
//   skills: [
//     {
//       category: "Frontend",
//       items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
//     },
//     {
//       category: "Backend",
//       items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "GraphQL"],
//     },
//     {
//       category: "Tools",
//       items: ["Git", "Docker", "Jest", "CI/CD", "AWS"],
//     },
//   ],
// };

//   const generatePDF = () => {
//     const pdf = new jsPDF("p", "pt", "a4");
//     const margin = 40;
//     let yPosition = 60;

//     // Title & Personal Info with Background
//     pdf.setFillColor(33, 150, 243); // blue background
//     pdf.rect(0, 0, pdf.internal.pageSize.width, 100, "F");
//     pdf.setFontSize(24);
//     pdf.setTextColor(255, 255, 255);
//     pdf.text(resumeData.personalInfo.name, margin, yPosition);
//     pdf.setFontSize(14);
//     pdf.text(resumeData.personalInfo.title, margin, yPosition + 25);
//     pdf.setFontSize(12);
//     pdf.text(
//       `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
//       margin,
//       yPosition + 50
//     );

//     // Summary Section
//     yPosition += 110;
//     pdf.setTextColor(0, 0, 0);
//     pdf.setFontSize(16);
//     pdf.text("Professional Summary", margin, yPosition);
//     pdf.setFontSize(12);
//     pdf.setTextColor(80, 80, 80);
//     pdf.text(resumeData.personalInfo.summary, margin, yPosition + 20, {
//       maxWidth: 500,
//     });

//     // Experience Section
//     yPosition += 60;
//     pdf.setTextColor(0, 0, 0);
//     pdf.setFontSize(16);
//     pdf.text("Professional Experience", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);
//     resumeData.experience.forEach((exp) => {
//       pdf.setTextColor(33, 150, 243);
//       pdf.text(exp.title, margin, yPosition);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text(`${exp.company} | ${exp.period}`, margin + 200, yPosition);
//       yPosition += 15;
//       pdf.setTextColor(80, 80, 80);
//       exp.achievements.forEach((ach) => {
//         pdf.text(`- ${ach}`, margin + 15, yPosition);
//         yPosition += 12;
//       });
//       yPosition += 10;
//     });

//     // Education Section
//     pdf.setFontSize(16);
//     pdf.setTextColor(0, 0, 0);
//     pdf.text("Education", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);
//     pdf.setTextColor(80, 80, 80);
//     resumeData.education.forEach((edu) => {
//       pdf.text(`${edu.degree}, ${edu.school}`, margin, yPosition);
//       pdf.text(edu.period, margin + 250, yPosition);
//       if (edu.gpa) {
//         pdf.text(`GPA: ${edu.gpa}`, margin + 350, yPosition);
//       }
//       yPosition += 15;
//     });

//     // Skills Section
//     pdf.setFontSize(16);
//     pdf.setTextColor(0, 0, 0);
//     pdf.text("Skills", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);
//     pdf.setTextColor(80, 80, 80);
//     resumeData.skills.forEach((skillSet) => {
//       pdf.text(skillSet.category, margin, yPosition);
//       pdf.text(skillSet.items.join(", "), margin + 100, yPosition);
//       yPosition += 15;
//     });

//     // Save the PDF
//     pdf.save("resume.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="flex justify-end mb-6 px-6">
//         <button
//           onClick={generatePDF}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Download size={20} />
//           Download PDF
//         </button>
//       </div>

//       <div
//         ref={contentRef}
//         className="bg-white shadow-lg rounded-lg max-h-[842px] max-w-[595px] overflow-hidden"
//       >
//         {/* Render Resume Content for Preview */}
//         <div>{/* Resume content for viewing */}</div>
//       </div>
//     </div>
//   );
// };

// export default ResumeGenerator;

// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   PDFDownloadLink,
//   StyleSheet,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30, fontFamily: "Helvetica" },
//   section: { marginBottom: 10, backgroundColor: "red" },
//   title: { fontSize: 24, marginBottom: 10, color: "blue" },
//   subTitle: { fontSize: 18, marginBottom: 8 },
//   text: { fontSize: 12, color: "gray" },
//   list: { marginBottom: 5 },
// });

// const ResumePDF = ({ data }: any) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.title}>{data.personalInfo.name}</Text>
//         <Text>{data.personalInfo.title}</Text>
//         <Text>{`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Professional Summary</Text>
//         <Text style={styles.text}>{data.personalInfo.summary}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Professional Experience</Text>
//         {data.experience.map((exp: any, index: any) => (
//           <View key={index} style={styles.list}>
//             <Text style={{ color: "blue" }}>{exp.title}</Text>
//             <Text>{`${exp.company} | ${exp.period}`}</Text>
//             {exp.achievements.map((ach: any, i: any) => (
//               <Text key={i} style={styles.text}>{`. ${ach}`}</Text>
//             ))}
//           </View>
//         ))}
//       </View>
//       {/* Repeat for Education, Skills, etc. */}
//     </Page>
//   </Document>
// );

// const ResumeGenerator = () => {
//   const resumeData = {
//     personalInfo: {
//       name: "Sarah Anderson",
//       title: "Senior Frontend Engineer",
//       email: "sarah.anderson@email.com",
//       phone: "(555) 123-4567",
//       location: "San Francisco, CA",
//       summary:
//         "Passionate frontend engineer with 6+ years of experience building scalable web applications. Specialized in React ecosystem and modern JavaScript.",
//     },
//     experience: [
//       {
//         title: "Senior Frontend Engineer",
//         company: "TechFlow Solutions",
//         period: "2021 - Present",
//         achievements: [
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript.",
//           "Improved application performance by 60% through code splitting and lazy loading.",
//           "Implemented automated testing strategy achieving 90% code coverage.",
//           "Mentored junior developers and established frontend best practices.",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux.",
//           "Reduced build time by 40% by optimizing webpack configuration.",
//           "Collaborated with UX team to implement new design system.",
//           "Led migration from JavaScript to TypeScript across multiple projects.",
//         ],
//       },
//     ],
//     education: [
//       {
//         degree: "Master of Science in Computer Science",
//         school: "Stanford University",
//         period: "2016-2018",
//         gpa: "3.8",
//       },
//       {
//         degree: "Bachelor of Science in Software Engineering",
//         school: "University of California, Berkeley",
//         period: "2012-2016",
//         gpa: "3.9",
//       },
//     ],
//     skills: [
//       {
//         category: "Frontend",
//         items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
//       },
//       {
//         category: "Backend",
//         items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "GraphQL"],
//       },
//       {
//         category: "Tools",
//         items: ["Git", "Docker", "Jest", "CI/CD", "AWS"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <PDFDownloadLink
//         document={<ResumePDF data={resumeData} />}
//         fileName="resume.pdf"
//       >
//         {"Download PDF"}
//       </PDFDownloadLink>
//     </div>
//   );
// };

// // export default ResumeGenerator;
// import React, { useEffect, useState } from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   PDFDownloadLink,
//   StyleSheet,
// } from "@react-pdf/renderer";
// import { setIsLoading } from "@/lib/store/slices/activeResumeSectionClice";
// import { time } from "console";

// interface PersonalInfo {
//   name: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
// }

// interface Experience {
//   title: string;
//   company: string;
//   period: string;
//   achievements: string[];
// }

// interface Education {
//   degree: string;
//   school: string;
//   period: string;
//   gpa: string;
// }

// interface Skill {
//   category: string;
//   items: string[];
// }

// interface ResumeData {
//   personalInfo: PersonalInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: Skill[];
// }
// const styles = StyleSheet.create({
//   page: { padding: 30, fontFamily: "Helvetica" },
//   section: { marginBottom: 10 },
//   title: { fontSize: 24, marginBottom: 10, color: "red" },
//   subTitle: { fontSize: 18, marginBottom: 8 },
//   text: { fontSize: 12, color: "gray" },
//   list: { marginBottom: 5 },
//   secendHalf: { width: "50%", backgroundColor: "red" },
//   secendRight: { width: "50%", backgroundColor: "green" },
// });

// const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.title}>{data.personalInfo.name}</Text>
//         <Text>{data.personalInfo.title}</Text>
//         <Text>{`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Professional Summary</Text>
//         <Text style={styles.text}>{data.personalInfo.summary}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subTitle}>Professional Experience</Text>
//         {data.experience.map((exp, index) => (
//           <View key={index} style={styles.list}>
//             <Text style={{ color: "blue" }}>{exp.title}</Text>
//             <Text>{`${exp.company} | ${exp.period}`}</Text>
//             {exp.achievements.map((ach, i) => (
//               <Text key={i} style={styles.text}>{`. ${ach}`}</Text>
//             ))}
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const ResumeGenerator: React.FC = () => {
//   const [isLoading, setIsloading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsloading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const resumeData: ResumeData = {
//     personalInfo: {
//       name: "Sarah Anderson",
//       title: "Senior Frontend Engineer",
//       email: "sarah.anderson@email.com",
//       phone: "(555) 123-4567",
//       location: "San Francisco, CA",
//       summary:
//         "Passionate frontend engineer with 6+ years of experience building scalable web applications. Specialized in React ecosystem and modern JavaScript.",
//     },
//     experience: [
//       {
//         title: "Senior Frontend Engineer",
//         company: "TechFlow Solutions",
//         period: "2021 - Present",
//         achievements: [
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript.",
//           "Improved application performance by 60% through code splitting and lazy loading.",
//           "Implemented automated testing strategy achieving 90% code coverage.",
//           "Mentored junior developers and established frontend best practices.",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux.",
//           "Reduced build time by 40% by optimizing webpack configuration.",
//           "Collaborated with UX team to implement new design system.",
//           "Led migration from JavaScript to TypeScript across multiple projects.",
//         ],
//       },
//     ],
//     education: [
//       {
//         degree: "Master of Science in Computer Science",
//         school: "Stanford University",
//         period: "2016-2018",
//         gpa: "3.8",
//       },
//       {
//         degree: "Bachelor of Science in Software Engineering",
//         school: "University of California, Berkeley",
//         period: "2012-2016",
//         gpa: "3.9",
//       },
//     ],
//     skills: [
//       {
//         category: "Frontend",
//         items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
//       },
//       {
//         category: "Backend",
//         items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "GraphQL"],
//       },
//       {
//         category: "Tools",
//         items: ["Git", "Docker", "Jest", "CI/CD", "AWS"],
//       },
//     ],
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <PDFDownloadLink
//           document={<ResumePDF data={resumeData} />}
//           fileName="resume.pdf"
//         >
//           Download Resume
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default ResumeGenerator;

// import React, { useEffect, useState } from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import { useAppSelector } from "@/lib/store/hooks";

// interface PersonalInfo {
//   name: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
// }

// interface Experience {
//   title: string;
//   company: string;
//   period: string;
//   achievements: string[];
// }

// interface Education {
//   degree: string;
//   school: string;
//   period: string;
//   gpa: string;
// }

// interface Skill {
//   category: string;
//   items: string[];
// }

// interface ResumeData {
//   personalInfo: PersonalInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: Skill[];
// }

// const styles = StyleSheet.create({
//   page: { padding: 30, fontFamily: "Helvetica" },
//   headerSection: { marginBottom: 20 },
//   title: { fontSize: 26, marginBottom: 4, color: "#333" },
//   subTitle: { fontSize: 12, marginBottom: 4, color: "#777" },
//   contactText: { fontSize: 10, color: "#777" },
//   sectionTitle: {
//     fontSize: 18,
//     marginBottom: 6,
//     color: "#444",
//     borderBottom: "1px solid #777",
//     paddingBottom: 4,
//   },
//   text: { fontSize: 10, marginBottom: 4, color: "#555" },
//   list: { marginBottom: 6 },
//   sideColumn: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   leftColumn: { width: "60%", paddingRight: 10 },
//   rightColumn: { width: "40%" },
//   skillCategory: { fontSize: 12, color: "#555", marginBottom: 4 },
//   skillText: { fontSize: 10, color: "#444" },
//   linkText: { fontSize: 10, color: "#0066cc", textDecoration: "underline" },
//   dateText: { fontSize: 10, color: "#666" },
// });

// const formatDate = (date: { month: string; year: string }) => {
//   return `${date.month} ${date.year}`.trim();
// };

// const ResumePDF: React.FC<{ data: any }> = ({ data }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Personal Info Header */}
//       <View style={styles.headerSection}>
//         <Text style={styles.title}>
//           {`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
//         </Text>
//         <Text style={styles.subTitle}>{data.jobIndustry.targetJob}</Text>
//         <Text style={styles.contactText}>
//           {`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.city}, ${data.personalInfo.country}`}
//         </Text>
//       </View>

//       {/* Summary Section */}
//       <View>
//         <Text style={styles.sectionTitle}>Professional Summary</Text>
//         <Text style={styles.text}>{data.professionalSummary.summaryText}</Text>
//       </View>

//       {/* Skills and Education Section */}
//       {/* <View style={styles.sideColumn}>
//         {/* Education */}
//       <View style={styles.leftColumn}>
//         <Text style={styles.sectionTitle}>Experience</Text>
//         {data.workExperience.map((exp: any, index: number) => (
//           <View key={index} style={styles.list}>
//             <Text style={{ fontSize: 14, color: "#222" }}>{exp.jobTitle}</Text>
//             <Text style={styles.text}>
//               {`${exp.company} | ${formatDate(exp.startDate)} - ${
//                 exp.isCurrentJob ? "Present" : formatDate(exp.endDate)
//               }`}
//             </Text>
//             <Text style={styles.text}>{exp.description}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Skills */}
//       <View style={styles.rightColumn}>
//         <Text style={styles.sectionTitle}>Education</Text>
//         {data.education.map((edu: any, index: number) => (
//           <View key={index} style={styles.list}>
//             <Text style={{ fontSize: 12, color: "#222" }}>{edu.degree}</Text>
//             <Text style={styles.text}>{edu.school}</Text>
//             <Text style={styles.text}>
//               {`${formatDate(edu.startDate)} - ${
//                 edu.isCurrentlyStudying ? "Present" : formatDate(edu.endDate)
//               }`}
//             </Text>
//             <Text style={styles.text}>{edu.description}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Experience Section */}
//       <View style={styles.rightColumn}>
//         <Text style={styles.sectionTitle}>Skills</Text>
//         <View style={styles.list}>
//           {data.selectedSkills.map((skill: string, i: number) => (
//             <Text key={i} style={styles.skillText}>
//               {skill}
//             </Text>
//           ))}
//           {data.customSkills.map((skill: string, i: number) => (
//             <Text key={i} style={styles.skillText}>
//               {skill}
//             </Text>
//           ))}
//         </View>
//       </View>
//       {data.projects.length > 0 && (
//         <View>
//           <Text style={styles.sectionTitle}>Projects</Text>
//           {data.projects.map((project: any, index: number) => (
//             <View key={index} style={styles.list}>
//               <Text style={{ fontSize: 12, color: "#222" }}>
//                 {project.title}
//               </Text>
//               <Text style={styles.text}>{`Role: ${project.role}`}</Text>
//               <Text style={styles.text}>{project.contributions}</Text>
//               <Text style={styles.text}>
//                 Technologies: {project.technologies.join(", ")}
//               </Text>
//             </View>
//           ))}
//         </View>
//       )}

//       {/* Languages */}
//       {data.languages.length > 0 && (
//         <View>
//           <Text style={styles.sectionTitle}>Languages</Text>
//           {data.languages.map((lang: any, index: number) => (
//             <Text key={index} style={styles.text}>
//               {`${lang.name} - ${lang.proficiency}`}
//             </Text>
//           ))}
//         </View>
//       )}

//       {/* Social Links */}
//       {data.socialLinks.length > 0 && (
//         <View>
//           <Text style={styles.sectionTitle}>Social Links</Text>
//           {data.socialLinks.map((link: any, index: number) => (
//             <Text key={index} style={styles.linkText}>
//               {`${link.platform}: ${link.url}`}
//             </Text>
//           ))}
//         </View>
//       )}
//     </Page>
//   </Document>
// );

// const resumeData: ResumeData = {
//   personalInfo: {
//     name: "Judy Foster",
//     title: "Senior IT Project Manager",
//     email: "help@enhancv.com",
//     phone: "+123-456-7890",
//     location: "San Francisco, CA",
//     summary:
//       "Senior IT Project Manager with Agile and Project Management certification from the PMI. Strong background in software development for enterprises and government-based organizations with Java. Capable of managing teams of up to 50, experienced with mentoring and coaching.",
//   },
//   experience: [
//     {
//       title: "Senior IT Project Manager",
//       company: "Bank of America",
//       period: "2019 - Present",
//       achievements: [
//         "Simultaneously managed several project teams (10-20 people), kept teams on schedule with Waterfall & Agile methodologies.",
//         "Reduced project management costs by 50% & improved projects & department performance through streamlined operations and tracking/reporting automation.",
//         "Developed and implemented solution to replace existing Windows server backup/recovery infrastructure with new solution which increased capacity (100%), performance (130%) and reliability (200%).",
//       ],
//     },
//     {
//       title: "IT Project Manager Associate",
//       company: "Western Union",
//       period: "2016 - 2019",
//       achievements: [
//         "Simultaneously Managed 30 subordinates including Developers and UX/UI designers.",
//         "Managed small projects with budgets of up to $65K.",
//         "Implemented the new front-sales software for 2000+ devices and salespeople.",
//       ],
//     },
//   ],
//   education: [
//     {
//       degree: "Master of Business Administration",
//       school: "UC Berkeley",
//       period: "2011 - 2012",
//       gpa: "3.8",
//     },
//     {
//       degree: "B.S. Computer Science",
//       school: "UC Berkeley",
//       period: "2003 - 2007",
//       gpa: "3.9",
//     },
//   ],
//   skills: [
//     {
//       category: "Project Management",
//       items: ["Merlin Projects", "Waterfall", "Agile", "Visio", "Clarity"],
//     },
//     {
//       category: "IT",
//       items: ["Java", "JS", "VueJS", "NodeJS", "MongoDB"],
//     },
//   ],
// };

// const ResumeGenerator: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <></>
//     // <div>
//     //   {isLoading ? (
//     //     <div>Loading...</div>
//     //   ) : (
//     //     <PDFDownloadLink
//     //       document={<ResumePDF data={} />}
//     //       fileName="resume.pdf"
//     //     >
//     //       Download Resume
//     //     </PDFDownloadLink>
//     //   )}
//     // </div>
//   );
// };

// export default ResumeGenerator;

// export { ResumePDF, resumeData };

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
import { ResumeState } from "@/lib/store/slices/resumeSlice";

// Custom SVG Icons Components
const LocationIcon = () => (
  <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </Svg>
);

const EmailIcon = () => (
  <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
    <Path
      fill="#4B5563"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);

// const LinkIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
//     />
//   </Svg>
// );

// const StarIcon = () => (
//   <Svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24">
//     <Path
//       fill="#4B5563"
//       d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
//     />
//   </Svg>
// );

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "white",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#3B82F6",
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
    fontSize: 10,
    color: "#4B5563",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 10,
    color: "#4B5563",
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 8,
  },
  schoolName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  degreeText: {
    fontSize: 10,
    color: "#4B5563",
  },
  dateLocation: {
    fontSize: 10,
    color: "#6B7280",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  experienceItem: {
    marginBottom: 12,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  jobTitle: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    color: "#4B5563",
    marginTop: 4,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: "#F3F4F6",
    padding: "4 8",
    borderRadius: 4,
    color: "#4B5563",
  },
  gpaText: {
    fontSize: 10,
    color: "#3B82F6",
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
});

const ResumePDF = ({ data }: { data: ResumeState }) => {
  // Placeholder text for empty fields
  const placeholderText = {
    name: data.personalInfo.firstName || "Enter your name",
    title: data.jobIndustry.targetJob || "Enter your job title",
    summary:
      data.professionalSummary.summaryText || "Enter your professional summary",
    phone: data.personalInfo.phone || "Enter phone number",
    email: data.personalInfo.email || "Enter email address",
    location: `${data.personalInfo.city || "City"}, ${
      data.personalInfo.country || "Country"
    }`,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{placeholderText.name}</Text>
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
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills Section */}
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

            {/* Education Section */}
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
                      {edu.startDate.month} {edu.startDate.year} -{" "}
                      {edu.isCurrentlyStudying
                        ? "Present"
                        : `${edu.endDate.month} ${edu.endDate.year}`}
                    </Text>
                  </View>
                  {edu.description && (
                    <Text style={styles.description}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>

            {/* Certifications Section */}
            {data.certificate && data.certificate.length > 0 && (
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
