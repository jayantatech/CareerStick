// import React from "react";
// const ResumePreview = ({ resumeData }: { resumeData: any }) => {
//   return (
//     <div className="w-[610px] h-[810px] bg-white rounded">
//       <div className="w-[610px] h-[840px]">
//         <h1 className="text-3xl">This is jay </h1>
//       </div>
//     </div>
//   );
// };

// // export default ResumePreview;import React, { useRef } from "react";import React from "react";import React from 'react';import React from 'react';
// import { jsPDF } from "jspdf";

// interface ResumeData {
//   personalInfo: {
//     name: string;
//     title: string;
//     email: string;
//     phone: string;
//     location: string;
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
//   }>;
//   skills: string[];
// }

// const PdfGenerator: React.FC = () => {
//   // Sample resume data
//   const resumeData: ResumeData = {
//     personalInfo: {
//       name: "John Doe",
//       title: "Frontend Developer",
//       email: "john.doe@email.com",
//       phone: "(555) 123-4567",
//       location: "San Francisco, CA",
//     },
//     experience: [
//       {
//         title: "Senior Frontend Developer",
//         company: "Tech Corp",
//         period: "2020 - Present",
//         achievements: [
//           "Led development of company's flagship web application",
//           "Implemented responsive design principles across platform",
//           "Mentored junior developers and conducted code reviews",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "StartUp Inc",
//         period: "2018 - 2020",
//         achievements: [
//           "Developed and maintained multiple React applications",
//           "Improved site performance by 40%",
//           "Implemented automated testing suite",
//         ],
//       },
//     ],
//     education: [
//       {
//         degree: "Bachelor of Science in Computer Science",
//         school: "University of Technology",
//         period: "2016-2020",
//       },
//     ],
//     skills: ["React", "TypeScript", "Node.js", "HTML/CSS", "Git"],
//   };

//   const generatePDF = () => {
//     const pdf = new jsPDF();
//     let yPos = 20;
//     const margin = 20;
//     const lineHeight = 7;

//     // Helper functions
//     const addSection = (title: string) => {
//       pdf.setFont("helvetica", "bold");
//       pdf.setFontSize(14);
//       pdf.text(title, margin, yPos);
//       yPos += lineHeight;
//       pdf.setFont("helvetica", "normal");
//       pdf.setFontSize(12);
//     };

//     const addLine = (text: string, indent: number = 0) => {
//       const maxWidth = pdf.internal.pageSize.width - 2 * margin;
//       const lines = pdf.splitTextToSize(text, maxWidth - indent);
//       lines.forEach((line: string) => {
//         if (yPos > pdf.internal.pageSize.height - margin) {
//           pdf.addPage();
//           yPos = margin;
//         }
//         pdf.text(line, margin + indent, yPos);
//         yPos += lineHeight;
//       });
//     };

//     // Header
//     pdf.setFontSize(18);
//     pdf.setFont("helvetica", "bold");
//     pdf.text(resumeData.personalInfo.name, margin, yPos);
//     yPos += lineHeight;

//     pdf.setFontSize(14);
//     pdf.setFont("helvetica", "normal");
//     pdf.text(resumeData.personalInfo.title, margin, yPos);
//     yPos += lineHeight;

//     pdf.setFontSize(12);
//     pdf.text(resumeData.personalInfo.email, margin, yPos);
//     yPos += lineHeight;
//     pdf.text(resumeData.personalInfo.phone, margin, yPos);
//     yPos += lineHeight;
//     pdf.text(resumeData.personalInfo.location, margin, yPos);
//     yPos += lineHeight * 2;

//     // Experience
//     addSection("Professional Experience");
//     resumeData.experience.forEach((exp) => {
//       pdf.setFont("helvetica", "bold");
//       addLine(`${exp.title} - ${exp.company}`);
//       pdf.setFont("helvetica", "italic");
//       addLine(exp.period);
//       pdf.setFont("helvetica", "normal");
//       exp.achievements.forEach((achievement) => {
//         addLine(`• ${achievement}`, 5);
//       });
//       yPos += lineHeight;
//     });

//     // Skills
//     addSection("Skills");
//     const skillsText = resumeData.skills.join(" • ");
//     addLine(skillsText);
//     yPos += lineHeight;

//     // Education
//     addSection("Education");
//     resumeData.education.forEach((edu) => {
//       pdf.setFont("helvetica", "bold");
//       addLine(edu.degree);
//       pdf.setFont("helvetica", "normal");
//       addLine(`${edu.school}, ${edu.period}`);
//       yPos += lineHeight;
//     });

//     pdf.save("resume.pdf");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button
//         onClick={generatePDF}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Download Resume PDF
//       </button>
//     </div>
//   );
// };

// // export default PdfGenerator;
// import React from "react";
// import { jsPDF } from "jspdf";
// import { Mail, Phone, MapPin, Download } from "lucide-react";

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
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript",
//           "Improved application performance by 60% through code splitting and lazy loading",
//           "Implemented automated testing strategy achieving 90% code coverage",
//           "Mentored junior developers and established frontend best practices",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux",
//           "Reduced build time by 40% by optimizing webpack configuration",
//           "Collaborated with UX team to implement new design system",
//           "Led migration from JavaScript to TypeScript across multiple projects",
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

//   const generatePDF = () => {
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: "letter",
//     });

//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const margin = 40;
//     let yPos = margin;

//     // Helper function for text wrapping and positioning
//     const addText = (text: string, x: number, y: number, options: any = {}) => {
//       const {
//         fontSize = 12,
//         fontStyle = "normal",
//         color = "#1F2937",
//         align = "left",
//         maxWidth = pageWidth - 2 * margin,
//       } = options;

//       pdf.setFontSize(fontSize);
//       pdf.setFont("Helvetica", fontStyle);
//       pdf.setTextColor(color);

//       const textStr = String(text);
//       const textWidth = pdf.getTextWidth(textStr);

//       if (textWidth > maxWidth) {
//         const words = textStr.split(" ");
//         let line = "";
//         let lines = [];

//         words.forEach((word) => {
//           const testLine = line + (line ? " " : "") + word;
//           const testWidth = pdf.getTextWidth(testLine);

//           if (testWidth > maxWidth) {
//             lines.push(line);
//             line = word;
//           } else {
//             line = testLine;
//           }
//         });

//         if (line) {
//           lines.push(line);
//         }

//         lines.forEach((l, i) => {
//           pdf.text(l, x, y + i * (fontSize * 1.2));
//         });

//         return lines.length * (fontSize * 1.2);
//       } else {
//         pdf.text(textStr, x, y, { align });
//         return fontSize * 1.2;
//       }
//     };

//     const addSection = (title: string) => {
//       yPos += 20;
//       addText(title, margin, yPos, {
//         fontSize: 20,
//         fontStyle: "bold",
//         color: "#1F2937",
//       });
//       yPos += 30;
//     };

//     // Header Section
//     yPos = 60;
//     addText(resumeData.personalInfo.name, margin, yPos, {
//       fontSize: 28,
//       fontStyle: "bold",
//       color: "#1F2937",
//     });

//     // Title
//     yPos += 35;
//     addText(resumeData.personalInfo.title, margin, yPos, {
//       fontSize: 18,
//       color: "#2563EB",
//     });

//     // Contact info
//     yPos += 30;
//     const contactInfoStyle = {
//       fontSize: 12,
//       color: "#4B5563",
//       maxWidth: pageWidth - 2 * margin,
//     };

//     let contactX = margin;
//     const contactY = yPos;

//     // Email
//     pdf.circle(contactX, contactY - 3, 2, "F");
//     addText(
//       resumeData.personalInfo.email,
//       contactX + 15,
//       contactY,
//       contactInfoStyle
//     );
//     contactX += pdf.getTextWidth(resumeData.personalInfo.email) + 40;

//     // Phone
//     pdf.circle(contactX, contactY - 3, 2, "F");
//     addText(
//       resumeData.personalInfo.phone,
//       contactX + 15,
//       contactY,
//       contactInfoStyle
//     );
//     contactX += pdf.getTextWidth(resumeData.personalInfo.phone) + 40;

//     // Location
//     pdf.circle(contactX, contactY - 3, 2, "F");
//     addText(
//       resumeData.personalInfo.location,
//       contactX + 15,
//       contactY,
//       contactInfoStyle
//     );

//     yPos += 40;

//     // Summary Section
//     addSection("Professional Summary");
//     yPos += addText(resumeData.personalInfo.summary, margin, yPos, {
//       color: "#4B5563",
//       maxWidth: pageWidth - 2 * margin,
//     });
//     yPos += 20;

//     // Experience Section
//     addSection("Professional Experience");
//     resumeData.experience.forEach((exp) => {
//       addText(exp.title, margin, yPos, {
//         fontSize: 16,
//         fontStyle: "bold",
//         color: "#1F2937",
//       });
//       yPos += 25;

//       // Company and period
//       pdf.setFontSize(14);
//       pdf.setTextColor("#2563EB");
//       pdf.text(exp.company, margin, yPos);

//       pdf.setTextColor("#4B5563");
//       pdf.text(
//         exp.period,
//         pageWidth - margin - pdf.getTextWidth(exp.period),
//         yPos
//       );
//       yPos += 20;

//       // Achievements
//       exp.achievements.forEach((achievement) => {
//         pdf.setFontSize(12);
//         pdf.setTextColor("#4B5563");

//         // Bullet point
//         pdf.text("•", margin, yPos);
//         const bulletWidth = pdf.getTextWidth("• ");

//         yPos += addText(achievement, margin + bulletWidth, yPos, {
//           fontSize: 12,
//           color: "#4B5563",
//           maxWidth: pageWidth - 2 * margin - bulletWidth,
//         });
//       });

//       yPos += 20;
//     });

//     // Skills Section
//     addSection("Technical Skills");
//     resumeData.skills.forEach((skillSet) => {
//       addText(skillSet.category, margin, yPos, {
//         fontSize: 16,
//         fontStyle: "bold",
//         color: "#1F2937",
//       });
//       yPos += 25;

//       let currentX = margin;
//       const skillsPerRow = 3;

//       skillSet.items.forEach((skill, index) => {
//         const textWidth = pdf.getTextWidth(skill) + 20;
//         pdf.setFillColor(239, 246, 255);
//         pdf.roundedRect(currentX, yPos - 15, textWidth, 25, 12, 12, "F");

//         addText(skill, currentX + 10, yPos + 2, {
//           fontSize: 12,
//           color: "#2563EB",
//         });

//         currentX += textWidth + 10;

//         if ((index + 1) % skillsPerRow === 0) {
//           yPos += 35;
//           currentX = margin;
//         }
//       });

//       yPos += 40;
//     });

//     // Education Section
//     addSection("Education");
//     resumeData.education.forEach((edu) => {
//       addText(edu.degree, margin, yPos, {
//         fontSize: 16,
//         fontStyle: "bold",
//         color: "#1F2937",
//       });
//       yPos += 25;

//       addText(
//         `${edu.school} | ${edu.period}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}`,
//         margin,
//         yPos,
//         {
//           fontSize: 14,
//           color: "#4B5563",
//         }
//       );
//       yPos += 30;
//     });

//     pdf.save("resume.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-end mb-6 px-6">
//           <button
//             onClick={generatePDF}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Download size={20} />
//             Download PDF
//           </button>
//         </div>

//         <div className="bg-white shadow-lg rounded-lg mx-6">
//           <div className="p-8 border-b border-gray-200">
//             <h1 className="text-4xl font-bold text-gray-800">
//               {resumeData.personalInfo.name}
//             </h1>
//             <h2 className="text-xl text-blue-600 mt-2">
//               {resumeData.personalInfo.title}
//             </h2>
//             <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
//               <div className="flex items-center gap-2">
//                 <Mail size={18} />
//                 <span>{resumeData.personalInfo.email}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone size={18} />
//                 <span>{resumeData.personalInfo.phone}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={18} />
//                 <span>{resumeData.personalInfo.location}</span>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <section className="mb-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Professional Summary
//               </h3>
//               <p className="text-gray-700 leading-relaxed">
//                 {resumeData.personalInfo.summary}
//               </p>
//             </section>

//             <section className="mb-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Professional Experience
//               </h3>
//               <div className="space-y-6">
//                 {resumeData.experience.map((exp, index) => (
//                   <div key={index}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="text-xl font-semibold text-gray-800">
//                           {exp.title}
//                         </h4>
//                         <p className="text-blue-600">{exp.company}</p>
//                       </div>
//                       <span className="text-gray-600">{exp.period}</span>
//                     </div>
//                     <ul className="mt-2 space-y-2">
//                       {exp.achievements.map((achievement, i) => (
//                         <li
//                           key={i}
//                           className="text-gray-700 pl-4 before:content-['•'] before:mr-2 before:text-blue-600"
//                         >
//                           {achievement}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section className="mb-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Technical Skills
//               </h3>
//               <div className="space-y-4">
//                 {resumeData.skills.map((skillSet, index) => (
//                   <div key={index}>
//                     <h4 className="text-lg font-semibold text-gray-800">
//                       {skillSet.category}
//                     </h4>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {skillSet.items.map((skill, i) => (
//                         <span
//                           key={i}
//                           className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             <section>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 Education
//               </h3>
//               <div className="space-y-4">
//                 {resumeData.education.map((edu, index) => (
//                   <div key={index}>
//                     <h4 className="text-xl font-semibold text-gray-800">
//                       {edu.degree}
//                     </h4>
//                     <p className="text-gray-700">
//                       {edu.school} | {edu.period}
//                       {edu.gpa && ` | GPA: ${edu.gpa}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeGenerator;

// import React, { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { Mail, Phone, MapPin, Download } from "lucide-react";

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
//   const componentRef = useRef<HTMLDivElement>(null);

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
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript",
//           "Improved application performance by 60% through code splitting and lazy loading",
//           "Implemented automated testing strategy achieving 90% code coverage",
//           "Mentored junior developers and established frontend best practices",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux",
//           "Reduced build time by 40% by optimizing webpack configuration",
//           "Collaborated with UX team to implement new design system",
//           "Led migration from JavaScript to TypeScript across multiple projects",
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

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current as HTMLDivElement | null,
//     documentTitle: "resume",
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Download Button */}
//         <div className="flex justify-end mb-6 px-6">
//           <button
//             onClick={handlePrint}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Download size={20} />
//             Download PDF
//           </button>
//         </div>

//         {/* Resume Content */}
//         <div
//           ref={componentRef}
//           className="bg-white shadow-lg rounded-lg mx-6 p-8"
//         >
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-gray-800">
//               {resumeData.personalInfo.name}
//             </h1>
//             <h2 className="text-xl text-blue-600 mt-2">
//               {resumeData.personalInfo.title}
//             </h2>
//             <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
//               <div className="flex items-center gap-2">
//                 <Mail size={18} />
//                 <span>{resumeData.personalInfo.email}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone size={18} />
//                 <span>{resumeData.personalInfo.phone}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={18} />
//                 <span>{resumeData.personalInfo.location}</span>
//               </div>
//             </div>
//           </div>

//           {/* Summary */}
//           <section className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Professional Summary
//             </h3>
//             <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
//           </section>

//           {/* Experience */}
//           <section className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Professional Experience
//             </h3>
//             <div className="space-y-6">
//               {resumeData.experience.map((exp, index) => (
//                 <div key={index}>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="text-xl font-semibold text-gray-800">
//                         {exp.title}
//                       </h4>
//                       <p className="text-blue-600">{exp.company}</p>
//                     </div>
//                     <span className="text-gray-600">{exp.period}</span>
//                   </div>
//                   <ul className="mt-2 space-y-2">
//                     {exp.achievements.map((achievement, i) => (
//                       <li
//                         key={i}
//                         className="text-gray-700 pl-4 before:content-['•'] before:mr-2 before:text-blue-600"
//                       >
//                         {achievement}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Skills */}
//           <section className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Technical Skills
//             </h3>
//             <div className="space-y-4">
//               {resumeData.skills.map((skillSet, index) => (
//                 <div key={index}>
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     {skillSet.category}
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {skillSet.items.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Education */}
//           <section>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Education</h3>
//             <div className="space-y-4">
//               {resumeData.education.map((edu, index) => (
//                 <div key={index}>
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     {edu.degree}
//                   </h4>
//                   <p className="text-gray-700">
//                     {edu.school} | {edu.period}
//                     {edu.gpa && ` | GPA: ${edu.gpa}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeGenerator;

// import React, { RefObject, useEffect, useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { Mail, Phone, MapPin, Download } from "lucide-react";

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
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript",
//           "Improved application performance by 60% through code splitting and lazy loading",
//           "Implemented automated testing strategy achieving 90% code coverage",
//           "Mentored junior developers and established frontend best practices",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux",
//           "Reduced build time by 40% by optimizing webpack configuration",
//           "Collaborated with UX team to implement new design system",
//           "Led migration from JavaScript to TypeScript across multiple projects",
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
//   const handlePrint = useReactToPrint({ contentRef });

//   useEffect(() => {
//     console.log(contentRef.current);
//   }, []);
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       {/* <div className="max-w-4xl mx-auto"> */}
//       {/* Download Button */}
//       <div className="flex justify-end mb-6 px-6">
//         <button
//           onClick={() => handlePrint && handlePrint()} // Call handlePrint as a function
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Download size={20} />
//           Download PDF
//         </button>
//       </div>

//       {/* Resume Content */}
//       <div
//         ref={contentRef}
//         className="bgs-white shadow-lg rounded-lg max-h-[842px] max-w-[595px] overflow-hidden"
//       >
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">
//             {resumeData.personalInfo.name}
//           </h1>
//           <h2 className="text-xl text-blue-600 mt-2">
//             {resumeData.personalInfo.title}
//           </h2>
//           <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
//             <div className="flex items-center gap-2">
//               <Mail size={18} />
//               <span>{resumeData.personalInfo.email}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Phone size={18} />
//               <span>{resumeData.personalInfo.phone}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <MapPin size={18} />
//               <span>{resumeData.personalInfo.location}</span>
//             </div>
//           </div>
//         </div>

//         {/* Summary */}
//         <section className="mb-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">
//             Professional Summary
//           </h3>
//           <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
//         </section>

//         {/* Experience */}
//         <section className="mb-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">
//             Professional Experience
//           </h3>
//           <div className="space-y-6">
//             {resumeData.experience.map((exp, index) => (
//               <div key={index}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="text-xl font-semibold text-gray-800">
//                       {exp.title}
//                     </h4>
//                     <p className="text-blue-600">{exp.company}</p>
//                   </div>
//                   <span className="text-gray-600">{exp.period}</span>
//                 </div>
//                 <ul className="mt-2 space-y-2">
//                   {exp.achievements.map((achievement, i) => (
//                     <li
//                       key={i}
//                       className="text-gray-700 pl-4 before:content-['•'] before:mr-2 before:text-blue-600"
//                     >
//                       {achievement}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Skills */}
//         {/* <section className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               Technical Skills
//             </h3>
//             <div className="space-y-4">
//               {resumeData.skills.map((skillSet, index) => (
//                 <div key={index}>
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     {skillSet.category}
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {skillSet.items.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section> */}

//         {/* Education */}
//         {/* <section>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">Education</h3>
//             <div className="space-y-4">
//               {resumeData.education.map((edu, index) => (
//                 <div key={index}>
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     {edu.degree}
//                   </h4>
//                   <p className="text-gray-700">
//                     {edu.school} | {edu.period}
//                     {edu.gpa && ` | GPA: ${edu.gpa}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section> */}
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default ResumeGenerator;

// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import { Mail, Phone, MapPin, Download } from "lucide-react";

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
//           "Led a team of 5 engineers in rebuilding the company's flagship SaaS platform using React and TypeScript",
//           "Improved application performance by 60% through code splitting and lazy loading",
//           "Implemented automated testing strategy achieving 90% code coverage",
//           "Mentored junior developers and established frontend best practices",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "InnovateSoft Inc",
//         period: "2018 - 2021",
//         achievements: [
//           "Developed responsive web applications using React and Redux",
//           "Reduced build time by 40% by optimizing webpack configuration",
//           "Collaborated with UX team to implement new design system",
//           "Led migration from JavaScript to TypeScript across multiple projects",
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

//   const generatePDF = () => {
//     const pdf = new jsPDF("p", "pt", "a4");
//     const margin = 40;

//     // Title
//     pdf.setFontSize(24);
//     pdf.text(resumeData.personalInfo.name, margin, 60);
//     pdf.setFontSize(14);
//     pdf.text(resumeData.personalInfo.title, margin, 85);

//     // Contact Info
//     pdf.setFontSize(12);
//     pdf.text(
//       `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
//       margin,
//       105
//     );

//     // Summary
//     pdf.setFontSize(16);
//     pdf.text("Professional Summary", margin, 135);
//     pdf.setFontSize(12);
//     pdf.text(resumeData.personalInfo.summary, margin, 155, { maxWidth: 500 });

//     // Experience
//     let yPosition = 195;
//     pdf.setFontSize(16);
//     pdf.text("Professional Experience", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);

//     resumeData.experience.forEach((exp) => {
//       pdf.text(exp.title, margin, yPosition);
//       pdf.text(`${exp.company} | ${exp.period}`, margin + 200, yPosition);
//       yPosition += 15;
//       exp.achievements.forEach((ach) => {
//         pdf.text(`- ${ach}`, margin + 15, yPosition);
//         yPosition += 12;
//       });
//       yPosition += 10;
//     });

//     // Education
//     pdf.setFontSize(16);
//     pdf.text("Education", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);

//     resumeData.education.forEach((edu) => {
//       pdf.text(`${edu.degree}, ${edu.school}`, margin, yPosition);
//       pdf.text(edu.period, margin + 250, yPosition);
//       if (edu.gpa) {
//         pdf.text(`GPA: ${edu.gpa}`, margin + 350, yPosition);
//       }
//       yPosition += 15;
//     });

//     // Skills
//     pdf.setFontSize(16);
//     pdf.text("Skills", margin, yPosition);
//     yPosition += 20;
//     pdf.setFontSize(12);

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
//       {/* Download Button */}
//       <div className="flex justify-end mb-6 px-6">
//         <button
//           onClick={generatePDF}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Download size={20} />
//           Download PDF
//         </button>
//       </div>

//       {/* Display content */}
//       <div
//         ref={contentRef}
//         className="bgs-white shadow-lg rounded-lg max-h-[842px] max-w-[595px] overflow-hidden"
//       >
//         {/* Render Resume Content */}
//         <div>{/* ...Content of Resume for viewing... */}</div>
//       </div>
//     </div>
//   );
// };

// export default ResumeGenerator;

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

import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica" },
  headerSection: { marginBottom: 20 },
  title: { fontSize: 26, marginBottom: 4, color: "#333" },
  subTitle: { fontSize: 12, marginBottom: 4, color: "#777" },
  contactText: { fontSize: 10, color: "#777" },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 6,
    color: "#444",
    borderBottom: "1px solid #777",
    paddingBottom: 4,
  },
  text: { fontSize: 10, marginBottom: 4, color: "#555" },
  list: { marginBottom: 6 },
  sideColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftColumn: { width: "60%", paddingRight: 10 },
  rightColumn: { width: "40%" },
  skillCategory: { fontSize: 12, color: "#555", marginBottom: 4 },
  skillText: { fontSize: 10, color: "#444" },
});

const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Personal Info Header */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{data.personalInfo.name}</Text>
        <Text style={styles.subTitle}>{data.personalInfo.title}</Text>
        <Text
          style={styles.contactText}
        >{`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`}</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.text}>{data.personalInfo.summary}</Text>
      </View>

      {/* Skills and Education Section */}
      <View style={styles.sideColumn}>
        {/* Education */}
        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.list}>
              <Text style={{ fontSize: 12, color: "#222" }}>{edu.degree}</Text>
              <Text style={styles.text}>{edu.school}</Text>
              <Text
                style={styles.text}
              >{`${edu.period} | GPA: ${edu.gpa}`}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.skillCategory}>{skill.category}</Text>
              {skill.items.map((item, i) => (
                <Text key={i} style={styles.skillText}>
                  {item}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Experience Section */}
      <View style={styles.leftColumn}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.list}>
            <Text style={{ fontSize: 14, color: "#222" }}>{exp.title}</Text>
            <Text style={styles.text}>{`${exp.company} | ${exp.period}`}</Text>
            {exp.achievements.map((ach, i) => (
              <Text key={i} style={styles.text}>{`. ${ach}`}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ResumeGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const resumeData: ResumeData = {
    personalInfo: {
      name: "Judy Foster",
      title: "Senior IT Project Manager",
      email: "help@enhancv.com",
      phone: "+123-456-7890",
      location: "San Francisco, CA",
      summary:
        "Senior IT Project Manager with Agile and Project Management certification from the PMI. Strong background in software development for enterprises and government-based organizations with Java. Capable of managing teams of up to 50, experienced with mentoring and coaching.",
    },
    experience: [
      {
        title: "Senior IT Project Manager",
        company: "Bank of America",
        period: "2019 - Present",
        achievements: [
          "Simultaneously managed several project teams (10-20 people), kept teams on schedule with Waterfall & Agile methodologies.",
          "Reduced project management costs by 50% & improved projects & department performance through streamlined operations and tracking/reporting automation.",
          "Developed and implemented solution to replace existing Windows server backup/recovery infrastructure with new solution which increased capacity (100%), performance (130%) and reliability (200%).",
        ],
      },
      {
        title: "IT Project Manager Associate",
        company: "Western Union",
        period: "2016 - 2019",
        achievements: [
          "Simultaneously Managed 30 subordinates including Developers and UX/UI designers.",
          "Managed small projects with budgets of up to $65K.",
          "Implemented the new front-sales software for 2000+ devices and salespeople.",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Business Administration",
        school: "UC Berkeley",
        period: "2011 - 2012",
        gpa: "3.8",
      },
      {
        degree: "B.S. Computer Science",
        school: "UC Berkeley",
        period: "2003 - 2007",
        gpa: "3.9",
      },
    ],
    skills: [
      {
        category: "Project Management",
        items: ["Merlin Projects", "Waterfall", "Agile", "Visio", "Clarity"],
      },
      {
        category: "IT",
        items: ["Java", "JS", "VueJS", "NodeJS", "MongoDB"],
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <PDFDownloadLink
          document={<ResumePDF data={resumeData} />}
          fileName="resume.pdf"
        >
          Download Resume
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default ResumeGenerator;
