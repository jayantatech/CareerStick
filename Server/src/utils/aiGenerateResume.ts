// import OpenAI from "openai";

// // Initialize OpenAI client with API key
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!, // Ensure API key is correctly loaded
// });

// const resumeJSONSchema = {
//   isPrime: "boolean", // Marks if this is the prime version of the resume
//   personalInfo: {
//     name: "string", // Full name of the user
//     phoneNumber: "string", // Phone number of the user
//     email: "string", // Professional email of the user
//     location: {
//       // User's location details
//       city: "string",
//       state: "string",
//       country: "string",
//       postalCode: "string", // Added for more precise location
//     },
//     socialLinks: {
//       // Professional social media and portfolio links
//       linkedIn: "string", // LinkedIn profile URL
//       github: "string", // GitHub profile URL
//       stackOverflow: "string", // Stack Overflow profile URL
//       personalWebsite: "string", // Personal website or portfolio URL
//       twitter: "string", // Twitter profile URL (optional)
//       medium: "string", // Medium profile URL (for tech bloggers)
//       devTo: "string", // Dev.to profile URL
//     },
//     languages: [
//       // Languages the user speaks (important for international roles)
//       {
//         language: "string", // Name of the language (e.g., English, Spanish)
//         proficiency: "string", // Level of proficiency (e.g., Native, Fluent, Intermediate, Basic)
//         certifications: ["string"], // Any language certifications (e.g., TOEFL, IELTS)
//       },
//     ],
//     summary: "string", // Professional summary or objective statement
//     image: "string", // URL of the user's professional headshot (optional)
//     visaStatus: "string", // Visa/work authorization status (important for international applicants)
//   },

//   workExperience: [
//     {
//       jobTitle: "string", // Job title (e.g., "Senior Software Engineer")
//       company: "string", // Company name
//       jobType: "string", // Job type (e.g., "Full-time", "Part-time", "Internship", "Contract")
//       location: {
//         city: "string",
//         state: "string",
//         country: "string",
//         workplaceType: "string", // "On-site", "Remote", or "Hybrid"
//       },
//       startDate: "Date", // Start date of the job
//       endDate: "Date or 'Present'", // End date or "Present" if current job
//       responsibilities: ["string"], // Key job responsibilities
//       achievements: ["string"], // Notable achievements or contributions
//       technologies: ["string"], // Technologies used in this role
//       projects: [
//         {
//           name: "string", // Project name
//           description: "string", // Brief project description
//           role: "string", // User's role in the project
//           technologies: ["string"], // Technologies used in the project
//           achievements: ["string"], // Specific achievements in this project
//         },
//       ],
//     },
//   ],
//   education: [
//     // Formal education history
//     {
//       degree: "string", // Degree obtained (e.g., "BSc in Computer Science")
//       institution: "string", // Institution name
//       location: {
//         // Location of the institution
//         city: "string",
//         state: "string",
//         country: "string",
//       },
//       startDate: "Date", // Start date of the degree/program
//       endDate: "Date", // End date or year of graduation
//       gpa: "number", // GPA (if applicable)
//       relevantCourses: ["string"], // Relevant coursework
//       projects: ["string"], // Academic projects
//       honors: ["string"], // Academic honors or awards
//       activities: ["string"], // Relevant extracurricular activities
//     },
//   ],
//   certifications: [
//     // Professional certifications
//     {
//       name: "string", // Name of the certification (e.g., "AWS Certified Solutions Architect")
//       issuingOrganization: "string", // Organization issuing the certification
//       issueDate: "Date", // Date certification was obtained
//       expirationDate: "Date", // Expiration date (if applicable)
//       credentialId: "string", // Credential ID or verification URL
//       skills: ["string"], // Skills demonstrated by this certification
//     },
//   ],
//   projects: [
//     // Significant projects (personal, open-source, or academic)
//     {
//       title: "string", // Project title
//       description: "string", // Detailed project description
//       role: "string", // User's role in the project
//       startDate: "Date", // Project start date
//       endDate: "Date or 'Ongoing'", // Project end date or "Ongoing"
//       technologies: ["string"], // Technologies used in the project
//       achievements: ["string"], // Key achievements or features
//       url: "string", // Project URL or repository link
//       mediaLinks: ["string"], // Links to demos, screenshots, or videos
//     },
//   ],
//   skills: {
//     // Comprehensive skills section
//     technicalSkills: [
//       // Technical skills categorized
//       {
//         category: "string", // Skill category (e.g., "Programming Languages", "Frameworks", "Databases")
//         skills: [
//           {
//             name: "string", // Skill name (e.g., "JavaScript", "React", "PostgreSQL")
//             proficiency: "string", // Proficiency level (e.g., "Expert", "Advanced", "Intermediate", "Beginner")
//             yearsOfExperience: "number", // Years of experience with this skill
//             lastUsed: "Date", // When the skill was last used professionally
//           },
//         ],
//       },
//     ],
//     softSkills: ["string"], // Soft skills relevant to tech roles (e.g., "Problem-solving", "Team leadership")
//   },
//   achievements: [
//     // Notable professional or academic achievements
//     {
//       title: "string", // Title of the achievement
//       description: "string", // Detailed description
//       date: "Date", // Date of achievement
//       url: "string", // URL for verification or more info (optional)
//     },
//   ],
//   publications: [
//     // Technical publications or articles
//     {
//       title: "string", // Title of the publication
//       publishedIn: "string", // Where it was published (e.g., journal name, website)
//       date: "Date", // Publication date
//       url: "string", // Link to the publication
//       description: "string", // Brief description or abstract
//     },
//   ],
//   volunteerExperience: [
//     // Tech-related volunteer work
//     {
//       organization: "string", // Name of the organization
//       role: "string", // Volunteer role
//       startDate: "Date", // Start date
//       endDate: "Date or 'Present'", // End date or "Present" if ongoing
//       description: "string", // Description of volunteer work
//       skills: ["string"], // Skills used or developed
//     },
//   ],
//   awards: [
//     // Professional awards or recognitions
//     {
//       name: "string", // Name of the award
//       issuingOrganization: "string", // Organization that gave the award
//       date: "Date", // Date received
//       description: "string", // Brief description of the award
//     },
//   ],
//   openSourceContributions: [
//     // Open source project contributions
//     {
//       projectName: "string", // Name of the open source project
//       url: "string", // Project or contribution URL
//       description: "string", // Description of contributions
//       startDate: "Date", // Start date of involvement
//       endDate: "Date or 'Ongoing'", // End date or "Ongoing" if still active
//     },
//   ],
//   atsCompatibilityScore: "number", // ATS compatibility score (0-100)
//   keywords: ["string"], // Keywords extracted from the resume for ATS optimization
// };

// // Function to generate resume using OpenAI's chat API
// async function aiGenerateResume(prompt: string) {
//   // console.log("OpenAI API Key:", process.env.OPENAI_API_KEY!);

//   try {
//     // Call OpenAI's chat completion API
//     const chatCompletion = await client.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `You are an AI-powered resume assistant designed to help users create highly optimized, ATS-friendly resumes. First, thoroughly understand the user's query by analyzing the provided job description, industry requirements, key achievements, and skills relevant to the desired position. Based on this analysis, generate a detailed and personalized resume output that is comprehensive, modern, and tailored to the user’s specific needs.

// The resume should adhere to the following enhanced guidelines to ensure it meets modern professional standards and maximizes ATS compatibility:

// ### 1. **ATS Optimization:**
// - Structure the resume in a way that makes it highly scannable by Applicant Tracking Systems (ATS).
// - Calculate and display an ATS compatibility score (out of 100).
// - Integrate essential keywords and phrases from the job description and the user's experiences.
// - Prioritize formatting and readability: ensure no use of images, charts, or unconventional fonts.
// - Use common section titles (e.g., "Work Experience" instead of "Career Journey") to improve ATS parsing.

// ### 2. **Modern Professional Structure:**
// - **Contact Information:** Display the user's name, professional email, phone number, LinkedIn profile, and portfolio link (if applicable).
// - **Professional Summary:** Craft a compelling 2-3 sentence summary (around 50-75 words), emphasizing the user's primary skills, years of experience, and core strengths relevant to the target role.
// - **Key Skills:** Ensure the list of key skills includes at least 6-8 relevant technical and soft skills. Prioritize keywords matching the job description.
// - **Work Experience:**
//    - For each position, list the job title, company name, and employment dates.
//    - Aim for 3-5 bullet points per job, detailing achievements in measurable terms (e.g., "Increased sales by 20% in 6 months by implementing new outreach strategies").
//    - Use action verbs (e.g., "led," "developed," "optimized") and quantify impact wherever possible.
//    - Job descriptions should contain **minimum 60-80 words** per entry to ensure enough detail is provided.
//    - Ensure each bullet point is no longer than **20 words** for easy readability.
// - **Education:** Include degrees, institutions, and graduation dates. Include GPA if applicable and recent (within the last 5 years).
// - **Certifications:** List all relevant certifications with the name and date obtained. Prioritize certifications that enhance credibility for technical or specialized roles (e.g., AWS Certified Solutions Architect).

// ### 3. **Comprehensive Skills Section:**
// - Divide the skills into **Technical Skills** and **Soft Skills**.
// - **Technical Skills:** Prioritize industry-relevant skills, especially those critical for tech roles (e.g., programming languages like Python, Java, frameworks like React or Node.js, cloud services like AWS or Azure).
// - **Soft Skills:** Include a minimum of 3 soft skills (e.g., leadership, teamwork, problem-solving).
// - Minimum total number of skills: **6-8** to ensure the resume meets industry standards.

// ### 4. **Personalization and Role-Specific Adjustments:**
// - Tailor each resume for the job position by emphasizing the user's most relevant experiences and achievements.
// - Adjust the wording and focus of the Professional Summary and Work Experience to reflect the user's qualifications and match the job description.
// - Emphasize accomplishments, especially those that demonstrate leadership, innovation, and measurable success.
// - Ensure the tone is professional yet friendly to create a personalized but polished resume.

// ### 5. **Length and Formatting Guidelines:**
// - The resume should be no longer than **1-2 pages**.
// - Maintain consistent formatting, using bullet points, section headers, and bold text to ensure readability.
// - Avoid excessive use of colors or graphics that could interfere with ATS parsing.

// ### 6. **Tech-Specific Guidelines:**
// - Focus on highlighting relevant technical skills, projects, and software proficiencies, especially for users applying to tech positions (e.g., software engineers, data analysts, IT managers).
// - Include a **Projects** section if applicable, to detail specific technical projects, the tools and technologies used, and the outcomes. Ensure this section has at least 2-3 projects if the user is in a tech role.
// - For developers, include **GitHub** or other portfolio links to showcase code samples or projects.

// Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included:

// ${JSON.stringify(resumeJSONSchema)}`,
//         },
//         {
//           role: "user",
//           content: `${JSON.stringify(prompt)}`,
//         },
//       ],
//       model: "gpt-4o-mini", // Use the correct model name
//       max_tokens: 3000, // Set token limit based on requirements
//       temperature: 0.7, // Control randomness
//     });

//     // Return the first choice in the response if it exists
//     if (chatCompletion.choices && chatCompletion.choices.length > 0) {
//       return chatCompletion.choices[0].message?.content;
//     } else {
//       throw new Error("No choices found in the response.");
//     }
//   } catch (error: any) {
//     // Log detailed error and throw custom error message
//     console.error(
//       "Error generating resume:",
//       error.response?.data || error.message
//     );
//     throw new Error("Failed to generate resume");
//   }
// }

// export { aiGenerateResume };

// import OpenAI from "openai";
// import {
//   IResumeGenerationRequest,
//   IResumeGenerationResponse,
// } from "../types/resumeGenerationType";

// export class OpenAIService {
//   private client: OpenAI;

//   constructor() {
//     this.client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY!,
//     });
//   }

//   private createSystemPrompt(
//     jobIndustry: IResumeGenerationRequest["jobIndustry"]
//   ): string {
//     return `As an AI resume assistant, create a professional resume for a ${jobIndustry?.targetJob} position
//     in the ${jobIndustry?.industry} industry with ${jobIndustry?.experience} years of experience.
//     Focus on relevant skills and experiences that align with the industry requirements.
//     Ensure the resume is ATS-friendly and highlights key achievements and technical competencies.`;
//   }

//   async generateResume(
//     resumeData: IResumeGenerationRequest
//   ): Promise<IResumeGenerationResponse> {
//     try {
//       const completion = await this.client.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content: this.createSystemPrompt(resumeData.jobIndustry),
//           },
//           {
//             role: "user",
//             content: JSON.stringify(resumeData),
//           },
//         ],
//         temperature: 0.7,
//         max_tokens: 3000,
//       });

//       console.log(
//         "the data for ai generate resume",
//         completion.choices[0].message?.content
//       );
//       const generatedContent = completion.choices[0].message?.content;
//       if (!generatedContent) {
//         throw new Error("Failed to generate resume content");
//       }
//       return JSON.parse(generatedContent);
//     } catch (error) {
//       console.error("OpenAI API Error:", error);
//       throw new Error("Failed to generate resume");
//     }
//   }
// }

// import OpenAI from "openai";
// import {
//   IResumeGenerationRequest,
//   IResumeGenerationResponse,
// } from "../types/resumeGenerationType";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// const createSystemPrompt = (jobIndustry) => {
//   return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes. Generate a detailed professional resume that strictly follows the provided MongoDB schema structure.

// Key Requirements:
// 1. ONLY generate content that matches the MongoDB schema structure exactly
// 2. Format dates as objects with month and year fields
// 3. Ensure all responses can be directly stored in MongoDB without structure modifications
// 4. Include relevant industry-specific keywords and skills
// 5. Focus on quantifiable achievements and metrics
// 6. Generate content that is specific to the ${jobIndustry?.targetJob} position in ${jobIndustry?.industry} industry
// 7. Tailor the content based on ${jobIndustry?.experience} years of experience

// Schema-Specific Guidelines:

// 1. Personal Information:
//    - Generate a professional summary focused on ${jobIndustry?.targetJob} role
//    - Location should include city, state, and country
//    - Keep contact details professional and business-appropriate

// 2. Work Experience:
//    - Each position should have:
//      * Clear job title and company name
//      * Location with city, state, country, and workplace type
//      * Dates in {month: string, year: string} format
//      * 3-5 measurable achievements
//      * Relevant technologies and skills used
//      * Project details if applicable

// 3. Skills:
//    - Technical skills must include:
//      * Name of the skill
//      * Proficiency level
//      * Years of experience
//      * Last used date
//    - Include relevant soft skills for ${jobIndustry?.targetJob}

// 4. Education and Certifications:
//    - Format dates as {month: string, year: string}
//    - Include relevant courses and projects
//    - List certifications with proper verification details

// 5. Additional Sections:
//    - Projects should highlight technical abilities
//    - Publications and awards should be industry-relevant
//    - Open source contributions should demonstrate expertise

// 6. ATS Optimization:
//    - Calculate ATS compatibility score (0-100)
//    - Include relevant keywords for ${jobIndustry?.industry}
//    - Ensure all dates follow the schema format

// Generate a response that fits EXACTLY into the MongoDB schema structure without any additional fields or modifications.`;
// };

// export const generateResume = async (
//   resumeData: IResumeGenerationRequest
// ): Promise<IResumeGenerationResponse> => {
//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: createSystemPrompt(resumeData.jobIndustry),
//         },
//         {
//           role: "user",
//           content: JSON.stringify({
//             resumeTitle: resumeData.resumeTitle,
//             targetJobTitle: resumeData.targetJobTitle,
//             targetedJobAndIndustry: resumeData.jobIndustry,
//             personalInfo: {
//               firstName: resumeData.personalInfo?.firstName,
//               lastName: resumeData.personalInfo?.lastName,
//               phoneNumber: resumeData.personalInfo?.phone,
//               email: resumeData.personalInfo?.email,
//               image: resumeData.personalInfo?.image,
//               location: {
//                 city: resumeData.personalInfo?.location?.city,
//                 state: resumeData.personalInfo?.location?.state,
//                 country: resumeData.personalInfo?.location?.country,
//               },
//               summary: resumeData.personalInfo?.summary,
//               visaStatus: resumeData.personalInfo?.visaStatus,
//             },
//             languages: resumeData.languages?.map((lang) => ({
//               language: lang.language,
//               proficiency: lang.proficiency,
//               certifications: lang.certifications,
//             })),
//             socialLinks: resumeData.socialLinks?.map((link) => ({
//               platform: link.platform,
//               url: link.url,
//               username: link.username,
//             })),
//             workExperience: resumeData.workExperience?.map((exp) => ({
//               jobTitle: exp.jobTitle,
//               company: exp.company,
//               jobType: exp.jobType,
//               location: {
//                 city: exp.location?.city,
//                 state: exp.location?.state,
//                 country: exp.location?.country,
//                 workplaceType: exp.location?.workplaceType,
//               },
//               startDate: exp.startDate,
//               endDate: exp.endDate,
//               isCurrentJob: exp.isCurrentJob,
//               responsibilities: exp.responsibilities,
//               achievements: exp.achievements,
//               technologies: exp.technologies,
//               projects: exp.projects?.map((proj) => ({
//                 name: proj.name,
//                 description: proj.description,
//                 role: proj.role,
//                 technologies: proj.technologies,
//                 achievements: proj.achievements,
//               })),
//             })),
//             education: resumeData.education?.map((edu) => ({
//               degree: edu.degree,
//               institution: edu.institution,
//               location: {
//                 city: edu.location?.city,
//                 state: edu.location?.state,
//                 country: edu.location?.country,
//               },
//               description: edu.description,
//               startDate: edu.startDate,
//               endDate: edu.endDate,
//               isCurrentlyStudying: edu.isCurrentlyStudying,
//               gpa: edu.gpa,
//               relevantCourses: edu.relevantCourses,
//               projects: edu.projects,
//               honors: edu.honors,
//               activities: edu.activities,
//             })),
//             certifications: resumeData.certifications?.map((cert) => ({
//               name: cert.name,
//               issuingOrganization: cert.issuingOrganization,
//               issueDate: cert.issueDate,
//               expirationDate: cert.expirationDate,
//               isNeverExpires: cert.isNeverExpires,
//               credentialId: cert.credentialId,
//               skills: cert.skills,
//               verificationUrl: cert.verificationUrl,
//               description: cert.description,
//             })),
//             projects: resumeData.projects?.map((proj) => ({
//               title: proj.title,
//               contributions: proj.contributions,
//               role: proj.role,
//               startDate: proj.startDate,
//               endDate: proj.endDate,
//               technologies: proj.technologies,
//               achievements: proj.achievements,
//               links: proj.links?.map((link) => ({
//                 platform: link.platform,
//                 url: link.url,
//               })),
//               mediaLinks: proj.mediaLinks,
//             })),
//             skills: {
//               technicalSkills: resumeData.skills?.technicalSkills?.map(
//                 (skill) => ({
//                   name: skill.name,
//                   proficiency: skill.proficiency,
//                   yearsOfExperience: skill.yearsOfExperience,
//                   lastUsed: skill.lastUsed,
//                 })
//               ),
//               softSkills: resumeData.skills?.softSkills,
//             },
//             achievements: resumeData.achievements?.map((achievement) => ({
//               title: achievement.title,
//               description: achievement.description,
//               date: achievement.date,
//               url: achievement.url,
//             })),
//             publications: resumeData.publications?.map((pub) => ({
//               title: pub.title,
//               publishedIn: pub.publishedIn,
//               date: pub.date,
//               url: pub.url,
//               description: pub.description,
//             })),
//             volunteerExperience: resumeData.volunteerExperience?.map((vol) => ({
//               organization: vol.organization,
//               role: vol.role,
//               startDate: vol.startDate,
//               endDate: vol.endDate,
//               description: vol.description,
//               skills: vol.skills,
//             })),
//             awards: resumeData.awards?.map((award) => ({
//               name: award.name,
//               issuingOrganization: award?.issuingOrganization,
//               date: award.date,
//               description: award.description,
//             })),
//             openSourceContributions: resumeData.openSourceContributions?.map(
//               (contrib) => ({
//                 projectName: contrib.projectName,
//                 role: contrib.role,
//                 technologies: contrib.technologies,
//                 description: contrib.description,
//                 contributions: contrib.contributions,
//                 links: contrib.links?.map((link) => ({
//                   platform: link.platform,
//                   url: link.url,
//                 })),
//                 startDate: contrib.startDate,
//                 endDate: contrib.endDate,
//                 isOngoing: contrib.isOngoing,
//               })
//             ),
//             customSections: resumeData.customSections?.map((section) => ({
//               title: section.title,
//               subtitle: section.subtitle,
//               description: section.description,
//               startDate: section.startDate,
//               endDate: section.endDate,
//               isPresent: section.isPresent,
//             })),
//           }),
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 3000,
//     });

//     const generatedContent = completion.choices[0].message?.content;

//     if (!generatedContent) {
//       throw new Error("Failed to generate resume content");
//     }

//     const parsedContent: IResumeGenerationResponse =
//       JSON.parse(generatedContent);

//     const enhancedContent = {
//       ...parsedContent,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       creationMethod: "AI_GENERATED",
//       atsCompatibilityScore: calculateAtsScore(parsedContent),
//       templateName: "template3",
//       isPremiumTemplate: false,
//     };

//     return enhancedContent;
//   } catch (error) {
//     console.error("Resume generation error:", error);
//     throw new Error("Failed to generate resume");
//   }
// };

// const calculateAtsScore = (resume: IResumeGenerationResponse): number => {
//   let score = 0;
//   const maxScore = 100;

//   // Basic structure checks
//   if (resume.personalInfo?.summary) score += 10;
//   if (resume.workExperience?.length > 0) score += 20;
//   if (resume.education?.length > 0) score += 15;
//   if (resume.skills?.technicalSkills?.length > 0) score += 15;
//   if (resume.skills?.softSkills?.length > 0) score += 10;
//   if (resume.certifications?.length > 0) score += 10;
//   if (resume.projects?.length > 0) score += 10;
//   if (resume.keywords?.length > 0) score += 10;

//   // Return final score
//   return Math.min(score, maxScore);
// };

// export default generateResume;

// const resumeJSONSchema = {
//   // userId: { type: "ObjectId", ref: "User" },
//   resumeTitle: { type: "string" },
//   targetJobTitle: { type: "string" },
//   // resumeSettingsId: { type: "ObjectId", ref: "ResumeSettings" },
//   // creationMethod: {
//   //   type: "string",
//   //   default: "USER_CREATED",
//   //   enum: ["USER_CREATED", "AI-assisted"],
//   // },
//   targetedJobAndIndustry: {
//     industry: { type: "string" },
//     targetJob: { type: "string" },
//     experience: { type: "string" },
//   },
//   personalInfo: {
//     name: { type: "string" as "full name one string" },
//     phoneNumber: { type: "string" },
//     email: { type: "string" },
//     image: { type: "string" },
//     location: {
//       city: { type: "string" },
//       state: { type: "string" },
//       country: { type: "string" },
//     },
//     // summary: { type: "string" },
//   },
//   languages: [
//     {
//       language: { type: "string" },
//       proficiency: {
//         type: "string",
//         enum: ["native", "advanced", "intermediate", "beginner"],
//       },
//       certifications: [{ type: "string" }],
//     },
//   ],
//   socialLinks: [
//     {
//       platform: { type: "string" },
//       url: { type: "string" },
//       username: { type: "string", default: "" },
//     },
//   ],
//   workExperience: [
//     {
//       jobTitle: { type: "string" },
//       company: { type: "string" },
//       jobType: { type: "string" },
//       location: {
//         city: { type: "string" },
//         state: { type: "string" },
//         country: { type: "string" },
//         workplaceType: { type: "string" },
//       },
//       startDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       endDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       isCurrentJob: { type: "boolean", default: false },
//       responsibilities: [{ type: "string" as "description not list" }],
//       responsibilitiesAsList: false,
//       // achievements: [{ type: "string" }],
//       // technologies: [{ type: "string" }],
//       // projects: [
//       //   {
//       //     name: { type: "string" },
//       //     description: { type: "string" },
//       //     role: { type: "string" },
//       //     technologies: [{ type: "string" }],
//       //     achievements: [{ type: "string" }],
//       //   },
//       // ],
//     },
//   ],
//   education: [
//     {
//       degree: { type: "string" },
//       institution: { type: "string" },
//       location: {
//         city: { type: "string" },
//         state: { type: "string" },
//         country: { type: "string" },
//       },
//       description: { type: "string" },
//       startDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       endDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       isCurrentlyStudying: { type: "boolean", default: false },
//       // gpa: { type: "number" },
//       // relevantCourses: [{ type: "string" }],
//       // projects: [{ type: "string" }],
//       // honors: [{ type: "string" }],
//       // activities: [{ type: "string" }],
//     },
//   ],
//   certifications: [
//     {
//       name: { type: "string" },
//       issuingOrganization: { type: "string" },
//       issueDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       expirationDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       isNeverExpires: { type: "boolean", default: false },
//       credentialId: { type: "string" },
//       // skills: [{ type: "string" }],
//       verificationUrl: { type: "string" },
//       description: { type: "string" },
//     },
//   ],
//   projects: [
//     {
//       title: { type: "string" },
//       contributions: { type: "string" },
//       role: { type: "string" },
//       startDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       endDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       technologies: [{ type: "string" }],
//       achievements: [{ type: "string" }],
//       links: [
//         {
//           platform: { type: "string" },
//           url: { type: "string" },
//         },
//       ],
//       mediaLinks: [{ type: "string" }],
//     },
//   ],
//   skills: {
//     technicalSkills: [
//       {
//         name: { type: "string" },
//         proficiency: { type: "string" },
//         yearsOfExperience: { type: "number" },
//         lastUsed: { type: "date" },
//       },
//     ],
//     softSkills: [{ type: "string" }],
//   },
//   achievements: [
//     {
//       title: { type: "string" },
//       description: { type: "string" },
//       date: { type: "date" },
//       url: { type: "string" },
//     },
//   ],
//   publications: [
//     {
//       title: { type: "string" },
//       publishedIn: { type: "string" },
//       date: { type: "date" },
//       url: { type: "string" },
//       description: { type: "string" },
//     },
//   ],
//   volunteerExperience: [
//     {
//       organization: { type: "string" },
//       role: { type: "string" },
//       startDate: { type: "date" },
//       endDate: { type: "mixed" },
//       description: { type: "string" },
//       skills: [{ type: "string" }],
//     },
//   ],
//   awards: [
//     {
//       name: { type: "string" },
//       issuingOrganization: { type: "string" },
//       date: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       description: { type: "string" },
//     },
//   ],
//   // openSourceContributions: [
//   //   {
//   //     projectName: { type: "string" },
//   //     role: { type: "string", default: "" },
//   //     technologies: [{ type: "string" }],
//   //     description: { type: "string", default: "" },
//   //     contributions: { type: "string", default: "" },
//   //     links: [
//   //       {
//   //         platform: { type: "string" },
//   //         url: { type: "string" },
//   //       },
//   //     ],
//   //     startDate: {
//   //       month: { type: "string" },
//   //       year: { type: "string" },
//   //     },
//   //     endDate: {
//   //       month: { type: "string" },
//   //       year: { type: "string" },
//   //     },
//   //     isOngoing: { type: "boolean", default: false },
//   //   },
//   // ],
//   customSections: [
//     {
//       title: { type: "string" },
//       subtitle: { type: "string" },
//       description: { type: "string" },
//       startDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       endDate: {
//         month: { type: "string" },
//         year: { type: "string" },
//       },
//       isPresent: { type: "boolean", default: false },
//     },
//   ],
//   atsCompatibilityScore: {
//     type: "number",
//     // score: { type: "number" },
//   },
//   resumeAnalytics: {
//     views: { type: "number", default: 0 },
//     downloads: { type: "number", default: 0 },
//   },
// };

const resumeJSONSchema = {
  resumeTitle: "string",
  jobIndustry: {
    industry: "string",
    targetJob: "string",
    experience: "string",
  },
  personalInfo: {
    firstName: "string",
    lastName: "string",
    email: "string",
    phone: "string",
    city: "string",
    country: "string",
    address: "string",
    postalCode: "string",
    photo: "string",
  },
  professionalSummary: {
    summaryText: "string",
  },
  workExperience: [
    {
      id: "string",
      jobTitle: "string",
      company: "string",
      startDate: {
        month: "string",
        year: "string",
      },
      endDate: {
        month: "string",
        year: "string",
      },
      isCurrentJob: "boolean",
      location: "string",
      description: "string",
    },
  ],
  education: [
    {
      id: "string",
      degree: "string",
      school: "string",
      startDate: {
        month: "string",
        year: "string",
      },
      endDate: {
        month: "string",
        year: "string",
      },
      isCurrentlyStudying: "boolean",
      location: "string",
      description: "string",
    },
  ],
  socialLinks: [
    {
      id: "string",
      platform: "string",
      url: "string",
    },
  ],
  projects: [
    {
      id: "string",
      title: "string",
      technologies: ["string"],
      role: "string",
      contributions: "string",
      links: [
        {
          platform: "string",
          url: "string",
        },
      ],
    },
  ],
  languages: [
    {
      id: "string",
      name: "string",
      proficiency: "string",
      isCustom: "boolean",
    },
  ],
  selectedSkills: [
    {
      id: "string",
      name: "string",
    },
  ],
  customSkills: [
    {
      id: "string",
      name: "string",
    },
  ],
  certificate: [
    {
      id: "string",
      name: "string",
      issuingOrganization: "string",
      issueDate: {
        month: "string",
        year: "string",
      },
      expirationDate: {
        month: "string",
        year: "string",
      },
      credentialId: "string",
      verificationUrl: "string",
      description: "string",
      isNeverExpires: "boolean",
    },
  ],
  awards: [
    {
      id: "string",
      name: "string",
      issuer: "string",
      date: {
        month: "string",
        year: "string",
      },
      description: "string",
    },
  ],
  openSourceContributions: [
    {
      id: "string",
      projectName: "string",
      role: "string",
      technologies: ["string"],
      description: "string",
      contributions: "string",
      links: [
        {
          platform: "string",
          url: "string",
        },
      ],
      startDate: {
        month: "string",
        year: "string",
      },
      endDate: {
        month: "string",
        year: "string",
      },
      isOngoing: "boolean",
    },
  ],
  customSections: [
    {
      id: "string",
      title: "string",
      subtitle: "string",
      description: "string",
      startDate: {
        month: "string",
        year: "string",
      },
      endDate: {
        month: "string",
        year: "string",
      },
      isPresent: "boolean",
    },
  ],
};

import OpenAI from "openai";
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const createSystemPrompt = (
  jobIndustry: IResumeGenerationRequest["jobIndustry"]
) => {
  return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes. Generate a detailed professional resume that strictly follows the provided MongoDB schema structure.

Key Requirements:

2. ONLY generate content that matches the MongoDB schema structure exactly
3. Format dates as objects with month and year fields
4. Include relevant industry-specific keywords and skills
5. Focus on quantifiable achievements and metrics
6. Generate content that is specific to the ${
    jobIndustry?.targetJob
  } position in ${jobIndustry?.industry} industry
7. Tailor the content based on ${jobIndustry?.experience} years of experience

Schema-Specific Guidelines:

jobIndustry:
   - if no data is provided, then use default values for industry: "tech",
    targetJob: "Full Stack Developer",
    experience: "1-3 (years not required)",

1. Personal Information:
   - Generate a professional summary focused on ${jobIndustry?.targetJob} role
   - Location should include city and country
   - Keep contact details professional and business-appropriate 
   - Do not make assumptions about Personal Information like phone number or email If number provided return the number, if no number provided use country code and xx like +91-xxxxxxxxxx
   - Do not make assumptions or add any content unless explicitly specified about sensitive personal information such as:
     Phone numbers
     Email addresses
     Personal websites or links
     Social security numbers
     location
2. Work Experience: 
   - Do not make assumptions about Work Experience unless explicitly specified
   - Each position should have:
     * Clear job title and company name
     * Location with city, country, and workplace type no need to add state
     * Dates in {month: string, year: string} format
     * It is essential to make the description under 30-35 words and add only important achievements
     * Make the description short and make it as one paragraph description not as a list but make this inside one array of string ["one paragraph description"]
     * Relevant technologies and skills used
     * Project details if applicable

3. Skills:
   - Technical skills must include:
     * Name of the skill
     * Proficiency level
     * Years of experience
     * If No skills listed, then add minimum 10-15 skills by analyzing the job description and work experience and flow the same format
     * Based on the current skill, job title, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format
   - Include relevant soft skills for ${jobIndustry?.targetJob}

4. Education and Certifications:
   -If No Education and Certifications provided, then keep it empty
   - Format dates as {month: string, year: string}
   - Include relevant courses and projects
   - List certifications with proper verification details

5. socialLinks Sections:
   -  Do not make assumptions or add any socialLinks if the user does not have any socialLinks keep it empty

6. Project Sections:
   - Projects should highlight technical abilities
   - It is essential to make the project description under 30-35 words and add only important achievements
   -
7. Additional Sections:
   - Projects should highlight technical abilities
   - Publications and awards should be industry-relevant
   - Open source contributions should demonstrate expertise

8. Languages Section:
  -If No languages provided, then understand the information, user location and other related info and based on that add communication languages and add 3 languages by following the same format

8. ATS Optimization:
   - Calculate ATS compatibility score (0-100)
   - Include relevant keywords for ${jobIndustry?.industry}
   - Ensure all dates follow the schema format

Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included in the response give me the data in This JSON format ${JSON.stringify(
    resumeJSONSchema
  )}.
`;
};

export const generateResume = async (resumeData: IResumeGenerationRequest) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: createSystemPrompt(resumeData.jobIndustry),
        },
        {
          role: "user",
          content: JSON.stringify(resumeData),
        },
      ],
      temperature: 0.7,
    });

    const responseData = completion.choices[0].message?.content
      ?.replace(/```json|```/g, "")
      .trim();
    console.log("the data for ai generate resume got hear", responseData);
    if (!responseData) {
      throw new Error("No response from OpenAI API");
    }
    // responseData = responseData;

    const parsedResponse = JSON.parse(responseData);
    console.log("json parsed response", parsedResponse);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error("Failed to generate resume");
  }
};
