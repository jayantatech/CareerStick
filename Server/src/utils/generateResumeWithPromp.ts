import Groq from "groq-sdk";
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";

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
  return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes by following the user prompt. Generate a detailed professional resume that strictly follows the provided MongoDB schema structure.

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

  -try to understand the user prompt and based on that generate the resume jobIndustry all three fields
  - understand the user's prompt and other information and based on that choose the best industry in short for user between "tech",      "finance", "healthcare", "education", "construction", "hospitality", "retail", "legal", "marketing", "real_estate", "telecom" "government", "manufacturing", "energy"
   - in the targetJob field(targetJob) choose the best job title for user by analyzing the user's prompt and other information like  "Frontend Developer", "Backend Developer", "Full Stack Developer", "MERN Stack Developer", "MEAN Stack Developer", "React Developer", "Angular Developer", "Vue.js Developer", "Node.js Developer", "Python Developer", "Java Developer", ".NET Developer", "PHP Developer", "Ruby on Rails Developer", "iOS Developer", "Android Developer", "Flutter Developer", "Swift Developer" etc.
   - for the targetedJobAndIndustry experience section choose the right experience for user by analyzing the user's prompt and other information between "fresher", "0-1", "1-3", "3-5", "5-10", "10-15", "15+" (years not required)
  - if you don't find any relevant data in the user's prompt, then use default values for industry: "tech",
    targetJob: "Full Stack Developer",
    experience: "1-3 (years not required)",

1. Personal Information:
   - Generate a professional summary focused on ${jobIndustry?.targetJob} role
   - Location should include city and country
   - Keep contact details professional and business-appropriate
   - Generate a concise professional summary for a resume, on ${
     jobIndustry?.targetJob
   } job role in approximately 60 words and give the data in html format inside one p tag. Focus on clarity and natural flow, avoiding excessive creativity. The description should be a single p tag, coherent paragraph string of 60 words and not enclosed in any array or additional structure. Example: <p><strong>Experienced web developer</strong> skilled in creating responsive, user-friendly applications using modern frameworks like <strong>Next.js</strong> and <strong>TypeScript</strong>. Proficient in optimizing performance, implementing scalable backend solutions, and collaborating across teams to deliver high-quality digital products on time etc.</p>
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
     * It is essential to make the description in html format with 3 bullet points and make each bullet points detailed but not too big with 90 words each bullet point and like that 3 for every work experience and only include bullet points do not include any description before or after the bullet points
     * It is important to make the description simple and easy to understand and easy to read it give a personal touch to the description and make it more engaging and interesting
     * Relevant technologies and skills used
     * Project details if applicable
     * Put the work experience in the same format put the latest work experience first and then put the previous work experience in the same format
   - Do not make assumptions about Work Experience unless explicitly specified in the resume data or in the user prompt

3. Skills:
   - Technical skills must include:
     * Name of the skill
     * If No skills listed in the resume data, then understand the user prompt and based on that and work experience add minimum 10-14 or more skills and flow the same format
     * Based on the current skill, job title and user prompt ${
       jobIndustry?.targetJob
     }  targeted job, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format
   - Include relevant soft skills for ${jobIndustry?.targetJob}

4. Education and Certifications:
   -If No Education and Certifications provided in the resume data or in the user prompt, then keep it empty
   - Format dates as {month: string, year: string}
   - Include relevant courses and projects
   - List certifications with proper verification details

5. socialLinks Sections:
   - Do not make assumptions about user social media profiles If they do not have any social media profiles keep it empty,
   - And remember to add the same format for all social media profiles and make the socialLinks platform name as lowercase string like linkedin, github, portfolio etc.
6. Project Sections:
   - Do not make assumptions or add any projects if the user does not have any projects in the projects section or in the user prompt, keep it empty 
   - If projects provided, then Projects should highlight technical abilities
   - It is essential to make the description in html format with 3 bullet points and make each bullet points comprehensive around 90 words each bullet point and like that 3 for every work experience
   - It is essential to make the description simple and easy to understand and easy to read but comprehensive and flow the same format and give a personal touch to the description and make it more engaging and interesting
   - If projects provided, In the project contributions, use action verbs relevant to ${
     jobIndustry?.targetJob
   } (e.g., "developed," "optimized," "led").
   - based on the user prompt and work experience and job title add the project contributions you can add 5-6 technologies in the project contributions technologies array and flow the same format

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

export const generateResumeWithPromptAI = async (
  resumeData: IResumeGenerationRequest,
  prompt: string
) => {
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
          content: `User prompt: ${prompt}`,
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
