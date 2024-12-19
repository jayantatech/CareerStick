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

// import OpenAI from "openai";
// import {
//   IResumeGenerationRequest,
//   IResumeGenerationResponse,
// } from "../types/resumeGenerationType";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// const createSystemPrompt = (
//   jobIndustry: IResumeGenerationRequest["jobIndustry"]
// ) => {
//   return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes. Generate a detailed professional resume that strictly follows the provided MongoDB schema structure.

// Key Requirements:

// 2. ONLY generate content that matches the MongoDB schema structure exactly
// 3. Format dates as objects with month and year fields
// 4. Include relevant industry-specific keywords and skills
// 5. Focus on quantifiable achievements and metrics
// 6. Generate content that is specific to the ${
//     jobIndustry?.targetJob
//   } position in ${jobIndustry?.industry} industry
// 7. Tailor the content based on ${jobIndustry?.experience} years of experience
// 8. Focus on using the most relevant keywords and skills for the ${
//     jobIndustry?.targetJob
//   } role

// Schema-Specific Guidelines:

// jobIndustry:
//    - if no data is provided, then use default values for industry: "tech",
//     targetJob: "Full Stack Developer",
//     experience: "1-3 (years not required)",

// 1. Personal Information:
//    - Generate a professional summary focused on ${jobIndustry?.targetJob} role
//    - Location should include city and country
//    - Keep contact details professional and business-appropriate
//    -Make the professionalSummary summaryText short around 40 words but not too short and make it as one paragraph description not as a list but make this inside one array of string ["one paragraph description"]
//    - Do not make assumptions about Personal Information like phone number or email If number provided return the number or if email not provided keep it empty,
//    - Do not make assumptions or add any content unless explicitly specified about sensitive personal information such as:
//      Phone numbers
//      Email addresses
//      Personal websites or links
//      Social security numbers
//      location
// 2. Work Experience:
//    - Do not make assumptions about Work Experience unless explicitly specified
//    - Each position should have:
//      * Clear job title and company name
//      * Location with city, country, and workplace type no need to add state
//      * Dates in {month: string, year: string} format
//      * It is essential to make the description under 30-35 words and add only important achievements
//      * Make the description short and make it as one paragraph description not as a list but make this inside one array of string ["one paragraph description"]
//      * Relevant technologies and skills used
//      * Project details if applicable

// 3. Skills:
//    - Technical skills must include:
//      * Name of the skill
//      * Proficiency level
//      * Years of experience
//      * If No skills listed, then add minimum 10-12 skills by analyzing the job description and work experience and flow the same format
//      * Based on the current skill, job title, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format
//    - Include relevant soft skills for ${jobIndustry?.targetJob}

// 4. Education and Certifications:
//    -If No Education and Certifications provided, then keep it empty
//    - Format dates as {month: string, year: string}
//    - Include relevant courses and projects
//    - List certifications with proper verification details

// 5. socialLinks Sections:
//    -  Do not make assumptions or add any socialLinks if the user does not have any socialLinks keep it empty

// 6. Project Sections:
//    - Projects should highlight technical abilities
//    - It is essential to make the project description under 35-40 words and add only important achievements
//    - In the project contributions, use action verbs relevant to ${
//      jobIndustry?.targetJob
//    } (e.g., "developed," "optimized," "led").
//    - Make the contributions as one paragraph contributions string  not as a list or array  like contributions: "string",

// 7. Additional Sections:
//    - Projects should highlight technical abilities
//    - Publications and awards should be industry-relevant
//    - Open source contributions should demonstrate expertise

// 8. Languages Section:
//   -If No languages provided, then understand the information, user location and other related info and based on that add communication languages and add 3 languages by following the same format
//   -In the mongoDB schema languages in the enum format it could be native or advanced or intermediate or beginner nothing else

// 8. ATS Optimization:
//    - Calculate ATS compatibility score (0-100)
//    - Include relevant keywords for ${jobIndustry?.industry}
//    - Ensure all dates follow the schema format

// Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included in the response give me the data in This JSON format ${JSON.stringify(
//     resumeJSONSchema
//   )}.
// `;
// };

// export const generateResume = async (resumeData: IResumeGenerationRequest) => {
//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: createSystemPrompt(resumeData.jobIndustry),
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
//     // console.log("the data for ai generate resume got hear", responseData);
//     if (!responseData) {
//       throw new Error("No response from OpenAI API");
//     }
//     // responseData = responseData;

//     const parsedResponse = JSON.parse(responseData);
//     // console.log("json parsed response", parsedResponse);
//     return parsedResponse;
//   } catch (error) {
//     console.error("Error generating resume:", error);
//     throw new Error("Failed to generate resume");
//   }
// };
import Groq from "groq-sdk";
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

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

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
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
8. Focus on using the most relevant keywords and skills for the ${
    jobIndustry?.targetJob
  } role

Schema-Specific Guidelines:

jobIndustry:
   - if no data is provided, then use default values for industry: "tech",
    targetJob: "Full Stack Developer",
    experience: "1-3 (years not required)",

1. Personal Information:
   - Generate a professional summary focused on ${jobIndustry?.targetJob} role
   - Location should include city and country
   - Keep contact details professional and business-appropriate
   - Generate a concise professional summary for a resume, on ${
     jobIndustry?.targetJob
   } job role in approximately 60 words. Focus on clarity and natural flow, avoiding excessive creativity. The description should be a single, coherent paragraph string of 60 words and not enclosed in any array or additional structure. Example: Experienced web developer skilled in creating responsive, user-friendly applications using modern frameworks like Next.js and TypeScript. Proficient in optimizing performance, implementing scalable backend solutions, and collaborating across teams to deliver high-quality digital products on time etc.
   - Do not make assumptions about user social media profiles If socialLinks do not have any social media profiles then keep socialLinks section empty,
   - Do not make assumptions about Personal Information like phone number or email If number provided return the number or if email not provided keep it empty,
   - Do not make assumptions or add any content unless explicitly specified about sensitive personal information such as:
     Phone numbers
     Email addresses
     Personal websites or links like linkedin, github, twitter
     Social security numbers
     location
2. Work Experience:
   - If the user submitted work experience, enhance the work experience section by adding:
     * Clear job title and company name
     * Location with city, country, and workplace type no need to add state
     * Dates in {month: string, year: string} format
     * It is essential to make the description around 35 words and add only important achievements
     * Make the description short and make it as one paragraph description not as a list but make this inside one array of string ["one paragraph description"]
     * Relevant technologies and skills used
     * Project details if applicable
   - Do not make assumptions about Work Experience unless explicitly specified

3. Skills:
   - Technical skills must include:
     * Name of the skill
     * If No skills listed, then add minimum 10-14 or more skills by analyzing the job description and work experience and flow the same format
     * Based on the current skill, job title and ${
       jobIndustry?.targetJob
     }  targeted job, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format
   - Include relevant soft skills for ${jobIndustry?.targetJob}

4. Education and Certifications:
   -If No Education and Certifications provided, then keep it empty
   - Format dates as {month: string, year: string}
   - Include relevant courses and projects
   - List certifications with proper verification details

5. socialLinks Sections:
   - Do not make assumptions about user social media profiles If they do not have any social media profiles keep it empty,
   - And remember to add the same format for all social media profiles and make the socialLinks platform name as lowercase string like linkedin, github, portfolio etc.
6. Project Sections:
   - Do not make assumptions or add any projects if the user does not have any projects in the projects section  keep it empty 
   - If projects provided, then Projects should highlight technical abilities
   - If projects provided, It is essential to make the project description under 35-40 words and add only important achievements
   - If projects provided, In the project contributions, use action verbs relevant to ${
     jobIndustry?.targetJob
   } (e.g., "developed," "optimized," "led").
   - Make the contributions as one paragraph contributions string  not as a list or array  like contributions: "string",

7. Additional Sections:
   - Projects should highlight technical abilities
   - Publications and awards should be industry-relevant
   - Open source contributions should demonstrate expertise

8. Languages Section:
  -If No languages provided, then understand the information, user location and other related info and based on that add communication languages and add 3 languages by following the same format
  -In the mongoDB schema languages in the enum format it could be native or advanced or intermediate or beginner nothing else

9. awards Section:
 - Do not make assumptions about user awards If they do not have any awards keep it empty
 - If No awards provided, then keep it empty

10. customSections Section:
 - Do not make assumptions about user customSections If they do not have any customSections keep it empty
 - If No customSections provided, then keep it empty


Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included in the response give me the data in This JSON format ${JSON.stringify(
    resumeJSONSchema
  )}.
`;
};

export const generateResume = async (resumeData: IResumeGenerationRequest) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // You can change this to other available models
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
      max_tokens: 4096,
      response_format: { type: "json_object" },
    });

    console.log("completion response", completion);
    console.log(
      "completion response with filds",
      completion.choices[0].message?.content
    );

    const responseData = completion.choices[0].message?.content;

    if (!responseData) {
      throw new Error("No response from Groq API");
    }

    const parsedResponse = JSON.parse(
      responseData
    ) as IResumeGenerationResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error("Failed to generate resume");
  }
};
