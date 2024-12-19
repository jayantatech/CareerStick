// import OpenAI from "openai";
// import {
//   IResumeGenerationRequest,
//   IResumeGenerationResponse,
// } from "../types/resumeGenerationType";

// const resumeJSONSchema = {
//   resumeTitle: "string",
//   jobIndustry: {
//     industry: "string",
//     targetJob: "string",
//     experience: "string",
//   },
//   personalInfo: {
//     firstName: "string",
//     lastName: "string",
//     email: "string",
//     phone: "string",
//     city: "string",
//     country: "string",
//     address: "string",
//     postalCode: "string",
//     photo: "string",
//   },
//   professionalSummary: {
//     summaryText: "string",
//   },
//   workExperience: [
//     {
//       id: "string",
//       jobTitle: "string",
//       company: "string",
//       startDate: {
//         month: "string",
//         year: "string",
//       },
//       endDate: {
//         month: "string",
//         year: "string",
//       },
//       isCurrentJob: "boolean",
//       location: "string",
//       description: "string",
//     },
//   ],
//   education: [
//     {
//       id: "string",
//       degree: "string",
//       school: "string",
//       startDate: {
//         month: "string",
//         year: "string",
//       },
//       endDate: {
//         month: "string",
//         year: "string",
//       },
//       isCurrentlyStudying: "boolean",
//       location: "string",
//       description: "string",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "string",
//       platform: "string",
//       url: "string",
//     },
//   ],
//   projects: [
//     {
//       id: "string",
//       title: "string",
//       technologies: ["string"],
//       role: "string",
//       contributions: "string",
//       links: [
//         {
//           platform: "string",
//           url: "string",
//         },
//       ],
//     },
//   ],
//   languages: [
//     {
//       id: "string",
//       name: "string in small letter",
//       proficiency:
//         "string enum ['beginner', 'intermediate', 'advanced', 'native']",
//       isCustom: "boolean",
//     },
//   ],
//   selectedSkills: [
//     {
//       id: "string",
//       name: "string",
//     },
//   ],
//   customSkills: [
//     {
//       id: "string",
//       name: "string",
//     },
//   ],
//   certificate: [
//     {
//       id: "string",
//       name: "string",
//       issuingOrganization: "string",
//       issueDate: {
//         month: "string",
//         year: "string",
//       },
//       expirationDate: {
//         month: "string",
//         year: "string",
//       },
//       credentialId: "string",
//       verificationUrl: "string",
//       description: "string",
//       isNeverExpires: "boolean",
//     },
//   ],
//   awards: [
//     {
//       id: "string",
//       name: "string",
//       issuer: "string",
//       date: {
//         month: "string",
//         year: "string",
//       },
//       description: "string",
//     },
//   ],
//   openSourceContributions: [
//     {
//       id: "string",
//       projectName: "string",
//       role: "string",
//       technologies: ["string"],
//       description: "string",
//       contributions: "string",
//       links: [
//         {
//           platform: "string",
//           url: "string",
//         },
//       ],
//       startDate: {
//         month: "string",
//         year: "string",
//       },
//       endDate: {
//         month: "string",
//         year: "string",
//       },
//       isOngoing: "boolean",
//     },
//   ],
//   customSections: [
//     {
//       id: "string",
//       title: "string",
//       subtitle: "string",
//       description: "string",
//       startDate: {
//         month: "string",
//         year: "string",
//       },
//       endDate: {
//         month: "string",
//         year: "string",
//       },
//       isPresent: "boolean",
//     },
//   ],
// };

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// // Helper to create the system prompt
// const createSystemPrompt = (
//   jobIndustry: IResumeGenerationRequest["jobIndustry"],
//   jobDescription: { jobTitle: string; jobDescription: string }
// ): string => {
//   return `
// You are an AI resume assistant specializing in recreating highly optimized, ATS-friendly resumes. Understand the current content and regenerate a detailed professional resume that strictly adheres to the provided MongoDB schema.
// Key Requirements:

// 1. **Schema Adherence**:
//    - ONLY generate content that matches the provided MongoDB schema.

// 2. **Tailored Content**:
//    - Industry: Use default values ("tech") if not provided.
//    - Target Job: ${jobIndustry?.targetJob || "Full Stack Developer"}.
//    - Experience: ${jobIndustry?.experience || "1-3"} years (use ranges only).
//    - Target Job Title: ${jobDescription?.jobTitle}.
//    - Target Job Description: ${jobDescription?.jobDescription}.
//    - If experience does not match job requirements:
//       * Then in the SUMMARY Include a professional justification such as,
//         * "I may not have 5 years of experience, but in my 2 years of experience, I have mastered [list technologies/tools relevant to job]."

// 3. **ATS Optimization**:
//    - Incorporate industry-specific keywords, skills, and phrases from the job description.
//    - Include measurable achievements with metrics (e.g., "Increased efficiency by 30%").
//    - Ensure ATS compatibility score (0-100).
//    - Use action verbs relevant to ${
//      jobIndustry?.targetJob
//    } (e.g., "developed," "optimized," "led").
//    - Match resume language with the job description (e.g., "JavaScript" vs. "JS").
//    - Keep work descriptions concise (30-35 words in one-paragraph format).
//    - Avoid repetition by using varied examples when listing achievements, tools, or technologies.

// 4. **Formatting**:
//    - Dates: Use {month: "string", year: "string"} format.
//    - Work descriptions: Use an array of strings, each a single-paragraph description under 35 words.
//    - Maintain a professional tone throughout.

// Schema-Specific Guidelines:

// 1. **Personal Information**:
//    - Include professional summary focused on ${jobIndustry?.targetJob} role.
//    - Location should include city and country only.
//    - Contact details:
//       * If email or phone number is not provided, leave empty.
//       * Do not infer personal websites, links, or sensitive details.

// 2. **Work Experience**:
//    - Each position must include:
//       * Clear job title and company name.
//       * Location (city, country; omit state).
//       * Dates formatted as {month: "string", year: "string"}.
//       * One-paragraph descriptions (under 35 words) in an array of strings.
//       * Relevant technologies, skills, and achievements.
//    - Align descriptions with ATS keywords:
//       * Include measurable outcomes (e.g., "Reduced costs by 20%").
//       * Highlight technical tools and frameworks explicitly.

// 3. **Skills**:
//    - Include:
//       * Skill name, proficiency level, and years of experience.
//       * If no skills are provided, analyze the job description and add 10-12 relevant skills.
//    - Separate technical skills (e.g., "React, Node.js") and soft skills (e.g., "problem-solving").
//    - Align terminology with industry standards (e.g., "RESTful APIs" instead of just "APIs").

// 4. **Education and Certifications**:
//    - If none provided, leave empty.
//    - Include relevant courses, projects, and certifications.
//    - Format dates as {month: "string", year: "string"}.
//    - Highlight educational achievements with metrics if applicable (e.g., "Graduated top 5%").

// 5. **Projects**:
//    - Projects should highlight technical abilities
//    - It is essential to make the project description under 35-40 words and add only important achievements
//    - In the project contributions, use action verbs relevant to ${
//      jobIndustry?.targetJob
//    } (e.g., "developed," "optimized," "led").
//    - Make the contributions as one paragraph contributions string  not as a list or array  like contributions: "string",

// 6. **Languages**:
//    - Include proficiency levels (e.g., "Fluent in English").
//    - Proficiency must match enum values: "native," "advanced," "intermediate," or "beginner."
//    - If none provided, infer from location or user details and list up to 3 languages.

// 7. **Expanded ATS Optimization**:
//    - Include role-specific keywords:
//       * For ${jobIndustry?.targetJob}, focus on terms like ${
//     jobIndustry?.industry === "tech"
//       ? '"Full Stack Development, APIs, Scalable Systems"'
//       : '"Management, Leadership, Strategy"'
//   }.
//    - Ensure resume passes ATS keyword density checks:
//       * Keywords should appear naturally throughout the resume without overstuffing.
//    - Use hierarchical relevance:
//       * Most critical skills and achievements should appear early in each section.
//    - Tailor phrases to match job description synonyms:
//       * "Developed RESTful APIs" should match "Built scalable APIs."
//    - Add skills/tools related to ${
//      jobIndustry?.targetJob
//    } not explicitly listed but commonly expected:
//       * Examples: "TypeScript, Agile methodologies, Git."

// Generate the response in JSON format using this schema:
// ${JSON.stringify(resumeJSONSchema)}.
// `;
// };

// export const generateATSOptimizedResume = async (
//   resumeData: IResumeGenerationRequest,
//   jobTitleAndDescription: {
//     jobTitle: string;
//     jobDescription: string;
//   }
// ): Promise<IResumeGenerationResponse> => {
//   try {
//     const systemPrompt = createSystemPrompt(
//       resumeData.jobIndustry,
//       jobTitleAndDescription
//     );

//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: systemPrompt,
//         },
//         {
//           role: "user",
//           content: JSON.stringify(resumeData),
//         },
//       ],
//       temperature: 0.7,
//     });

//     const responseData = completion.choices[0].message?.content
//       ?.replace(/```json|```/g, "")
//       .trim();

//     if (!responseData) {
//       throw new Error("No response from OpenAI API");
//     }

//     const parsedResponse = JSON.parse(responseData);
//     return parsedResponse as IResumeGenerationResponse;
//   } catch (error) {
//     console.error("Error generating ATS-optimized resume:", error);
//     throw new Error("Failed to generate ATS-optimized resume");
//   }
// };

import Groq from "groq-sdk";

// Load environment variables
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

interface JobDescription {
  jobTitle: string;
  jobDescription: string;
}

// Groq client initialization

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
      name: "string in small letter",
      proficiency:
        "string enum ['beginner', 'intermediate', 'advanced', 'native']",
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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Helper to create the system prompt
function createSystemPrompt(
  jobIndustry: IResumeGenerationRequest["jobIndustry"],
  jobDescription: JobDescription
): string {
  return `
You are an AI resume assistant specializing in recreating highly optimized, ATS-friendly resumes. Understand the current content and regenerate a detailed professional resume that strictly adheres to the provided MongoDB schema.
Key Requirements:

1. **Schema Adherence**:
   - ONLY generate content that matches the provided MongoDB schema.

2. **Tailored Content**:
   - Industry: Use default values ("tech") if not provided.
   - Target Job: ${jobIndustry?.targetJob || "Full Stack Developer"}.
   - Experience: ${jobIndustry?.experience || "1-3"} years (use ranges only).
   - Target Job Title: ${jobDescription?.jobTitle}.
   - Target Job Description: ${jobDescription?.jobDescription}.
   - If experience does not match job requirements:
      * Then in the SUMMARY Include a professional justification such as,
        * "I may not have 5 years of experience, but in my 2 years of experience, I have mastered [list technologies/tools relevant to job]."

3. **ATS Optimization**:
   - Incorporate industry-specific keywords, skills, and phrases from the job description.
   - Include measurable achievements with metrics (e.g., "Increased efficiency by 30%").
   - Ensure ATS compatibility score (0-100).
   - Use action verbs relevant to ${
     jobIndustry?.targetJob
   } (e.g., "developed," "optimized," "led").
   - Match resume language with the job description (e.g., "JavaScript" vs. "JS").
   - Keep work descriptions concise (30-35 words in one-paragraph format).
   - Avoid repetition by using varied examples when listing achievements, tools, or technologies.

4. **Formatting**:
   - Dates: Use {month: "string", year: "string"} format.
   - Work descriptions: Use an array of strings, each a single-paragraph description under 35 words.
   - Maintain a professional tone throughout.

Schema-Specific Guidelines:

1. **Personal Information**:
   - Include professional summary focused on ${jobIndustry?.targetJob} role.
   - Location should include city and country only.
   - Contact details:
      * If email or phone number is not provided, leave empty.
      * Do not infer personal websites, links, or sensitive details.

2. **Work Experience**:
   - Each position must include:
      * Clear job title and company name.
      * Location (city, country; omit state).
      * Dates formatted as {month: "string", year: "string"}.
      * One-paragraph descriptions (under 35 words) in an array of strings.
      * Relevant technologies, skills, and achievements.
   - Align descriptions with ATS keywords:
      * Include measurable outcomes (e.g., "Reduced costs by 20%").
      * Highlight technical tools and frameworks explicitly.

3. **Skills**:
   - Include:
      * Skill name, proficiency level, and years of experience.
      * If no skills are provided, analyze the job description and add 10-12 relevant skills.
   - Separate technical skills (e.g., "React, Node.js") and soft skills (e.g., "problem-solving").
   - Align terminology with industry standards (e.g., "RESTful APIs" instead of just "APIs").

4. **Education and Certifications**:
   - If none provided, leave empty.
   - Include relevant courses, projects, and certifications.
   - Format dates as {month: "string", year: "string"}.
   - Highlight educational achievements with metrics if applicable (e.g., "Graduated top 5%").

5. **Projects**:
   - Projects should highlight technical abilities
   - It is essential to make the project description under 35-40 words and add only important achievements
   - In the project contributions, use action verbs relevant to ${
     jobIndustry?.targetJob
   } (e.g., "developed," "optimized," "led").
   - Make the contributions as one paragraph contributions string  not as a list or array  like contributions: "string",

6. **Languages**:
   - Include proficiency levels (e.g., "Fluent in English").
   - Proficiency must match enum values: "native," "advanced," "intermediate," or "beginner."
   - If none provided, infer from location or user details and list up to 3 languages.

7. **Expanded ATS Optimization**:
   - Include role-specific keywords:
      * For ${jobIndustry?.targetJob}, focus on terms like ${
    jobIndustry?.industry === "tech"
      ? '"Full Stack Development, APIs, Scalable Systems"'
      : '"Management, Leadership, Strategy"'
  }.
   - Ensure resume passes ATS keyword density checks:
      * Keywords should appear naturally throughout the resume without overstuffing.
   - Use hierarchical relevance:
      * Most critical skills and achievements should appear early in each section.
   - Tailor phrases to match job description synonyms:
      * "Developed RESTful APIs" should match "Built scalable APIs."
   - Add skills/tools related to ${
     jobIndustry?.targetJob
   } not explicitly listed but commonly expected:
      * Examples: "TypeScript, Agile methodologies, Git."

Generate the response in JSON format using this schema:
${JSON.stringify(resumeJSONSchema)}.
`;
}

// Main resume generation function
export async function generateATSOptimizedResume(
  resumeData: IResumeGenerationRequest,
  jobDescription: JobDescription
): Promise<IResumeGenerationResponse> {
  try {
    // Create system prompt
    const systemPrompt = createSystemPrompt(
      resumeData.jobIndustry,
      jobDescription
    );

    // Generate resume using Groq
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // You can change this to other available models
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify(resumeData),
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    });

    // Extract and clean the response
    const responseContent = chatCompletion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response from Groq API");
    }

    // Parse the response
    return JSON.parse(responseContent) as IResumeGenerationResponse;
  } catch (error) {
    console.error("Error generating ATS-optimized resume:", error);
    throw new Error("Failed to generate ATS-optimized resume");
  }
}
