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
//       name: "string",
//       proficiency: "string",
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

//   Key Requirements:

//   2. ONLY generate content that matches the MongoDB schema structure exactly
//   3. Format dates as objects with month and year fields
//   4. Include relevant industry-specific keywords and skills
//   5. Focus on quantifiable achievements and metrics
//   6. Generate content that is specific to the ${
//     jobIndustry?.targetJob
//   } position in ${jobIndustry?.industry} industry
//   7. Tailor the content based on ${jobIndustry?.experience} years of experience
//   8. Focus on using the most relevant keywords and skills for the ${
//     jobIndustry?.targetJob
//   } role

//   Schema-Specific Guidelines:

//   jobIndustry:
//      - if no data is provided, then use default values for industry: "tech",
//       targetJob: "Full Stack Developer",
//       experience: "1-3 (years not required)",

//   1. Personal Information:
//      - Generate a professional summary focused on ${jobIndustry?.targetJob} role
//      - Location should include city and country
//      - Keep contact details professional and business-appropriate
//      - Do not make assumptions about Personal Information like phone number or email If number provided return the number or if email not provided keep it empty,
//      - Do not make assumptions or add any content unless explicitly specified about sensitive personal information such as:
//        Phone numbers
//        Email addresses
//        Personal websites or links
//        Social security numbers
//        location
//   2. Work Experience:
//      - Do not make assumptions about Work Experience unless explicitly specified
//      - Each position should have:
//        * Clear job title and company name
//        * Location with city, country, and workplace type no need to add state
//        * Dates in {month: string, year: string} format
//        * It is essential to make the description under 30-35 words and add only important achievements
//        * Make the description short and make it as one paragraph description not as a list but make this inside one array of string ["one paragraph description"]
//        * Relevant technologies and skills used
//        * Project details if applicable

//   3. Skills:
//      - Technical skills must include:
//        * Name of the skill
//        * Proficiency level
//        * Years of experience
//        * If No skills listed, then add minimum 10-12 skills by analyzing the job description and work experience and flow the same format
//        * Based on the current skill, job title, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format
//      - Include relevant soft skills for ${jobIndustry?.targetJob}

//   4. Education and Certifications:
//      -If No Education and Certifications provided, then keep it empty
//      - Format dates as {month: string, year: string}
//      - Include relevant courses and projects
//      - List certifications with proper verification details

//   5. socialLinks Sections:
//      -  Do not make assumptions or add any socialLinks if the user does not have any socialLinks keep it empty

//   6. Project Sections:
//      - Projects should highlight technical abilities
//      - It is essential to make the project description under 30-35 words and add only important achievements
//      -
//   7. Additional Sections:
//      - Projects should highlight technical abilities
//      - Publications and awards should be industry-relevant
//      - Open source contributions should demonstrate expertise

//   8. Languages Section:
//     -If No languages provided, then understand the information, user location and other related info and based on that add communication languages and add 3 languages by following the same format

//   8. ATS Optimization:
//      - Calculate ATS compatibility score (0-100)
//      - Include relevant keywords for ${jobIndustry?.industry}
//      - Ensure all dates follow the schema format

//   Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included in the response give me the data in This JSON format ${JSON.stringify(
//     resumeJSONSchema
//   )}.
//   `;
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
//     console.log("the data for ai generate resume got hear", responseData);
//     if (!responseData) {
//       throw new Error("No response from OpenAI API");
//     }
//     // responseData = responseData;

//     const parsedResponse = JSON.parse(responseData);
//     console.log("json parsed response", parsedResponse);
//     return parsedResponse;
//   } catch (error) {
//     console.error("Error generating resume:", error);
//     throw new Error("Failed to generate resume");
//   }
// };

import OpenAI from "openai";
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

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

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Helper to create the system prompt
const createSystemPrompt = (
  jobIndustry: IResumeGenerationRequest["jobIndustry"],
  jobDescription: { jobTitle: string; jobDescription: string }
): string => {
  // return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes. Generate a detailed professional resume that strictly adheres to the provided MongoDB schema.

  //   Key Requirements:
  //   1. **Schema Adherence**: ONLY generate content that matches the provided MongoDB schema.
  //   2. **Tailored Content**:
  //      - Industry: Use default values ("tech") if not provided.
  //      - Target Job: ${jobIndustry?.targetJob || "Full Stack Developer"}.
  //      - Experience: ${
  //        jobIndustry?.experience || "1-3"
  //      } years (use ranges only).
  //      - I am Tergeting a job title: ${jobDescription?.jobTitle}.
  //      - Target Job Description: ${jobDescription?.jobDescription}.
  //      - Use the provided job title and description to optimize the resume and make it ATS friendly.
  //   3. **ATS Optimization**:
  //      - Incorporate industry-specific keywords, skills, and phrases from the job description.
  //      - Ensure quantifiable achievements with metrics (e.g., "Increased efficiency by 30%").
  //      - Include ATS compatibility score (0-100).
  //      - Use precise action verbs relevant to ${
  //        jobIndustry?.targetJob
  //      } (e.g., "developed," "optimized," "led").
  //      - Map resume sections to ATS-friendly formats:
  //        * Use standard section titles like "Work Experience," "Skills," "Education."
  //        * Avoid unnecessary formatting (e.g., tables or graphics).
  //      - Match resume language with the job description (e.g., "JavaScript" vs. "JS").
  //      - Optimize for readability by maintaining bullet point consistency and concise phrasing.

  //   4. **Formatting**:
  //      - Dates: Use {month: "string", year: "string"} format.
  //      - Work descriptions: Limit to 30-35 words, one paragraph, in an array of strings.
  //      - Professional and business-appropriate tone throughout.

  //   Schema-Specific Guidelines:

  //   1. **Personal Information**:
  //      - Include professional summary focused on ${jobIndustry?.targetJob} role.
  //      - Location should include city and country only.
  //      - Contact details:
  //        * If email or phone number is not provided, leave empty.
  //        * Do not infer personal websites, links, or sensitive details.

  //   2. **Work Experience**:
  //      - Each position must include:
  //        * Clear job title and company name.
  //        * Location (city, country; omit state).
  //        * Dates formatted as {month: "string", year: "string"}.
  //        * One-paragraph descriptions (under 35 words) in an array of strings.
  //        * Relevant technologies, skills, and achievements.
  //      - Align descriptions with ATS keywords:
  //        * Include measurable outcomes (e.g., "Reduced costs by 20%").
  //        * Highlight technical tools and frameworks explicitly.

  //   3. **Skills**:
  //      - Include:
  //        * Skill name, proficiency level, and years of experience.
  //        * If no skills provided, analyze job description and add 10-12 relevant skills.
  //      - Separate technical skills (e.g., "React, Node.js") and soft skills (e.g., "problem-solving").
  //      - Align terminology with industry standards (e.g., "RESTful APIs" instead of just "APIs").

  //   4. **Education and Certifications**:
  //      - If none provided, leave empty.
  //      - Include relevant courses, projects, and certifications.
  //      - Format dates as {month: "string", year: "string"}.
  //      - Highlight education achievements with metrics if applicable (e.g., "Graduated top 5%").

  //   5. **Social Links**:
  //      - Do not add links unless explicitly provided.
  //      - Keep this section empty if no social links are listed.

  //   6. **Projects**:
  //      - Highlight technical abilities and measurable outcomes.
  //      - Limit descriptions to 30-35 words, focusing on key achievements.
  //      - Match project technologies to the job description (e.g., React, Tailwind CSS).

  //   7. **Additional Sections**:
  //      - Publications, awards, and open-source contributions must demonstrate industry expertise.
  //      - If no data is provided, omit this section.

  //   8. **Languages**:
  //      -In the mongoDB schema languages proficiency is in the enum format it could be native or advanced or intermediate or beginner nothing else
  //      - If none provided, infer from location or user details and list up to 3 languages.
  //      - Include proficiency levels (e.g., "Fluent in English").

  //   9. **Expanded ATS Optimization**:
  //      - Include role-specific keywords:
  //        * For ${jobIndustry?.targetJob}, focus on terms like ${
  //   jobIndustry?.industry === "tech"
  //     ? '"Full Stack Development, APIs, Scalable Systems"'
  //     : '"Management, Leadership, Strategy"'
  // }.
  //      - Ensure resume passes ATS keyword density checks:
  //        * Keywords should appear naturally throughout the resume without overstuffing.
  //      - Use hierarchical relevance:
  //        * Most critical skills and achievements should appear early in each section.
  //      - Tailor phrases to match job description synonyms:
  //        * "Developed RESTful APIs" should match "Built scalable APIs."
  //      - Add skills/tools related to ${
  //        jobIndustry?.targetJob
  //      } not explicitly listed but commonly expected:
  //        * Examples: "TypeScript, Agile methodologies, Git."

  //   Generate the response in JSON format using this schema:
  //   ${JSON.stringify(resumeJSONSchema)}.
  //   `;
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
};

export const generateATSOptimizedResume = async (
  resumeData: IResumeGenerationRequest,
  jobTitleAndDescription: {
    jobTitle: string;
    jobDescription: string;
  }
): Promise<IResumeGenerationResponse> => {
  try {
    const systemPrompt = createSystemPrompt(
      resumeData.jobIndustry,
      jobTitleAndDescription
    );

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
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

    if (!responseData) {
      throw new Error("No response from OpenAI API");
    }

    const parsedResponse = JSON.parse(responseData);
    return parsedResponse as IResumeGenerationResponse;
  } catch (error) {
    console.error("Error generating ATS-optimized resume:", error);
    throw new Error("Failed to generate ATS-optimized resume");
  }
};
