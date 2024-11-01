// // import { useAppDispatch } from "../hooks/useAppDispatch";

// import api from "../api";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   updateWorkExperience,
//   updateEducation,
//   updateAward,
//   updateCertificate,
//   updateCustomSection,
//   updateLanguage,
//   updateOpenSourceContribution,
//   updateProject,
//   updateSocialLink,
//   // updateCustomSections,
// } from "../store/slices/resumeSlice";
// // import { updateCustomSection } from "../store/slices/resumeSlice";

// export const handleAIResumeGenerate = async () => {
//   const dispatch = useAppDispatch();
//   const userSubmittedInfo = useAppSelector((state) => state.resume);
//   console.log("they clicked generate resume");

//   try {
//     const response = await api.post("/ai/generate-resume", {
//       prompt: userSubmittedInfo,
//       instruction: "Make it easy to read and professional",
//     });

//     // Parse the response data
//     const resumeData = JSON.parse(
//       response.data.data.replace("```json\n", "").replace("\n```", "")
//     );

//     // Helper function to convert date format
//     const convertDateFormat = (dateString: string) => {
//       if (!dateString) return { month: "", year: "" };
//       const date = new Date(dateString);
//       return {
//         month: date.toLocaleString("default", { month: "long" }),
//         year: date.getFullYear().toString(),
//       };
//     };

//     // Dispatch Job Industry
//     dispatch(
//       updateJobIndustry({
//         industry: resumeData.skills?.technicalSkills?.[0]?.category || "",
//         targetJob: resumeData.workExperience?.[0]?.jobTitle || "",
//         experience: `${
//           resumeData.skills?.technicalSkills?.[0]?.skills?.[0]
//             ?.yearsOfExperience || ""
//         } years`,
//       })
//     );

//     // Dispatch Personal Information
//     dispatch(
//       updatePersonalInfo({
//         firstName: resumeData.personalInfo.name.split(" ")[0] || "",
//         lastName:
//           resumeData.personalInfo.name.split(" ").slice(1).join(" ") || "",
//         email: resumeData.personalInfo.email || "",
//         phone: resumeData.personalInfo.phoneNumber || "",
//         city: resumeData.personalInfo.location?.city || "",
//         country: resumeData.personalInfo.location?.country || "",
//         address: "",
//         postalCode: resumeData.personalInfo.location?.postalCode || "",
//         photo: null,
//       })
//     );

//     // Dispatch Professional Summary
//     dispatch(
//       updateProfessionalSummary({
//         summaryText: resumeData.personalInfo.summary || "",
//       })
//     );

//     // Dispatch Work Experience
//     const workExperience =
//       resumeData.workExperience?.map((exp: any) => ({
//         id: `job-${Math.random().toString(36).substr(2, 9)}`,
//         jobTitle: exp.jobTitle || "",
//         company: exp.company || "",
//         startDate: convertDateFormat(exp.startDate),
//         endDate: convertDateFormat(exp.endDate),
//         isCurrentJob: !exp.endDate,
//         location: `${exp.location?.city || ""}, ${exp.location?.country || ""}`,
//         description: [
//           ...(exp.responsibilities || []),
//           ...(exp.achievements || []),
//         ].join("\n"),
//       })) || [];
//     dispatch(updateWorkExperience(workExperience));

//     // Dispatch Education
//     const education =
//       resumeData.education?.map((edu: any) => ({
//         id: `edu-${Math.random().toString(36).substr(2, 9)}`,
//         degree: edu.degree || "",
//         school: edu.institution || "",
//         startDate: convertDateFormat(edu.startDate),
//         endDate: convertDateFormat(edu.endDate),
//         isCurrentlyStudying: false,
//         location: `${edu.location?.city || ""}, ${edu.location?.country || ""}`,
//         description: [
//           ...(edu.relevantCourses || []),
//           ...(edu.projects || []),
//           ...(edu.honors || []),
//           ...(edu.activities || []),
//         ].join("\n"),
//       })) || [];
//     dispatch(updateEducation(education));

//     // Dispatch Social Links
//     const socialLinks = Object.entries(
//       resumeData.personalInfo.socialLinks || {}
//     )
//       .filter(([_, url]) => url)
//       .map(([platform, url]) => ({
//         id: `social-${Math.random().toString(36).substr(2, 9)}`,
//         platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//         url: url as string,
//       }));
//     dispatch(updateOpenSourceContribution(socialLinks));

//     // Dispatch Skills
//     const selectedSkills =
//       resumeData.skills?.technicalSkills?.flatMap((category: any) =>
//         category.skills.map((skill: any) => ({
//           id: `skill-${Math.random().toString(36).substr(2, 9)}`,
//           name: skill.name,
//         }))
//       ) || [];
//     dispatch(updateSelectedSkills(selectedSkills));

//     const customSkills =
//       resumeData.skills?.softSkills?.map((skill: string) => ({
//         id: `custom-${Math.random().toString(36).substr(2, 9)}`,
//         name: skill,
//       })) || [];
//     dispatch(updateCustomSkills(customSkills));

//     // Dispatch Projects
//     const projects =
//       resumeData.projects?.map((proj: any) => ({
//         id: `proj-${Math.random().toString(36).substr(2, 9)}`,
//         title: proj.title || "",
//         technologies: proj.technologies || [],
//         role: proj.role || "",
//         contributions: proj.description || "",
//         links:
//           proj.mediaLinks?.map((link: string) => ({
//             platform: "Other",
//             url: link,
//           })) || [],
//       })) || [];
//     dispatch(updateProjects(projects));

//     // Dispatch Languages
//     const languages =
//       resumeData.personalInfo.languages?.map((lang: any) => ({
//         id: `lang-${Math.random().toString(36).substr(2, 9)}`,
//         name: lang.language || "",
//         proficiency: lang.proficiency || "",
//         isCustom: false,
//       })) || [];
//     dispatch(updateLanguages(languages));

//     // Dispatch Certificates
//     const certificates =
//       resumeData.certifications?.map((cert: any) => ({
//         id: `cert-${Math.random().toString(36).substr(2, 9)}`,
//         name: cert.name || "",
//         issuingOrganization: cert.issuingOrganization || "",
//         issueDate: convertDateFormat(cert.issueDate),
//         expirationDate: convertDateFormat(cert.expirationDate),
//         credentialId: cert.credentialId || "",
//         verificationUrl: "",
//         description: cert.skills?.join(", ") || "",
//         isNeverExpires: false,
//       })) || [];
//     dispatch(updateCertificates(certificates));

//     // Dispatch Awards
//     const awards =
//       resumeData.achievements?.map((achievement: any) => ({
//         id: `award-${Math.random().toString(36).substr(2, 9)}`,
//         name: achievement.title || "",
//         issuer: "",
//         date: convertDateFormat(achievement.date),
//         description: achievement.description || "",
//       })) || [];
//     dispatch(updateAward(awards));

//     // Dispatch Open Source Contributions (if any in the data)
//     const openSourceContributions =
//       resumeData.openSourceContributions?.map((contrib: any) => ({
//         id: `opensource-${Math.random().toString(36).substr(2, 9)}`,
//         projectName: contrib.projectName || "",
//         role: contrib.role || "",
//         technologies: contrib.technologies || [],
//         description: contrib.description || "",
//         contributions: contrib.contributions || "",
//         links: contrib.links || [],
//         startDate: convertDateFormat(contrib.startDate),
//         endDate: convertDateFormat(contrib.endDate),
//         isOngoing: contrib.isOngoing || false,
//       })) || [];
//     dispatch(updateOpenSourceContributions(openSourceContributions));

//     // Dispatch Custom Sections (if any in the data)
//     const customSections =
//       resumeData.customSections?.map((section: any) => ({
//         id: `custom-${Math.random().toString(36).substr(2, 9)}`,
//         title: section.title || "",
//         subtitle: section.subtitle || "",
//         description: section.description || "",
//         startDate: convertDateFormat(section.startDate),
//         endDate: convertDateFormat(section.endDate),
//         isPresent: section.isPresent || false,
//       })) || [];
//     dispatch(updateCustomSections(customSections));

//     console.log("redux data after saving ", userSubmittedInfo);

//     return {
//       success: true,
//       message: "Resume generated successfully",
//     };
//   } catch (error) {
//     console.error("Error generating resume:", error);
//     return {
//       success: false,
//       message: "Internal server error",
//       error: error,
//     };
//   }
// };
