import Groq from "groq-sdk";

// Load environment variables
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

// interface JobDescription {
//   jobTitle: string;
//   jobDescription: string;
// }

// Groq client initialization

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

const jobDescriptionSchema = {
  summaries: ["string", "string", "string", "string", "string"],
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Helper to create the system prompt
function createSystemPrompt(
  name: string,
  targetedJobRole: string,
  yearsOfExperience: number,
  jobIndustry: string
) {
  return `
You are an AI resume assistant specializing in recreating highly optimized, ATS-friendly resumes introduction description. Understand the current content and regenerate a detailed professional resume that strictly adheres to the provided MongoDB schema.
Key Requirements:

Generate a professional, easy-to-read, and comprehensive resume introduction description based on the following details:

User Name: ${name}
Targeted Job Role: ${targetedJobRole}
Years of Experience: ${yearsOfExperience}
Industry: ${jobIndustry}

Your task:

 1. Write six easy-to-read, professional, and concise paragraph inside the array in string format that highlights the user's expertise, accomplishments, and suitability for the targeted role.
 2. Make multiple combination in one or two paragraphs mention things related to skills and technologies based on the user's experience and industry and job role etc but keep it short because it is a resume introduction not skill description.
 3. Ensure the tone is professional yet approachable, avoiding unnecessary jargon while keeping it comprehensive.
 4.Emphasize how the user's experience aligns with the expectations of the targeted role and industry.
 5.Make the description impactful enough to capture the attention of hiring managers in seconds.

Generate the response in JSON format using this schema:
${JSON.stringify(jobDescriptionSchema)}.
`;
}

// Main resume generation function
export async function generateAiJobDescription(
  //   resumeData: IResumeGenerationRequest,
  //   jobDescription: JobDescription
  name: string,
  jobTitle: string,
  yearsOfExperience: number,
  jobIndustry: string
) {
  try {
    // Create system prompt
    const systemPrompt = createSystemPrompt(
      name,
      jobTitle,
      yearsOfExperience,
      jobIndustry
    );

    // Generate resume using Groq
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // You can change this to other available models
      messages: [
        { role: "system", content: systemPrompt },
        // {
        //   role: "user",
        //   content: JSON.stringify(resumeData),
        // },
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
    return JSON.parse(responseContent);
  } catch (error) {
    console.error("Error generating ATS-optimized resume:", error);
    throw new Error("Failed to generate ATS-optimized resume");
  }
}
