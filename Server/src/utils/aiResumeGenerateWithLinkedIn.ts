import Groq from "groq-sdk";
import {
  IResumeGenerationRequest,
  IResumeGenerationResponse,
} from "../types/resumeGenerationType";
import { LinkedInProfile } from "./fetchLinkedInProfile";

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

const linkedInProfileSchema = {
  publicIdentifier: "string",
  firstName: "string",
  lastName: "string",
  fullName: "string",
  headline: "string",
  profilePicture: "string",
  linkedInProfileUrl: "string",
  isAIGenerated: "boolean",
  summary: "string",
  location: {
    country: "string",
    city: "string",
    state: "string",
  },
  targetedJobAndIndustry: {
    industry: "string",
    targetJob: "string",
    experience: "string",
  },
  occupation: "string",
  followerCount: "number",
  education: [
    {
      startDate: { month: "string", year: "string" },
      endDate: { month: "string", year: "string" },
      degreeName: "string",
      school: "string",
      description: "string",
    },
  ],
  experience: [
    {
      startDate: { month: "string", year: "string" },
      endDate: { month: "string", year: "string" },
      company: "string",
      title: "string",
      description: "string",
      location: "string",
    },
  ],
  certifications: [
    {
      startDate: { month: "string", year: "string" },
      name: "string",
      authority: "string",
      url: "string",
      licenseNumber: "string",
    },
  ],
  languages: [
    {
      name: "string",
      proficiency: "string",
    },
  ],
  projects: [
    {
      title: "string",
      contributions: "string",
      role: "string",
      startDate: { month: "string", year: "string" },
      endDate: { month: "string", year: "string" },
      technologies: ["string"],
      achievements: ["string"],
      links: [{ platform: "string", url: "string" }],
      mediaLinks: ["string"],
    },
  ],
  skills: ["string"],
  connections: "number",
};

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// const createSystemPrompt = () => {
//   return `You are an AI resume assistant specializing in creating highly optimized, ATS-friendly resumes With LinkedIn Profile Data. Generate a detailed professional resume that strictly follows the provided MongoDB schema structure.

//   Key Requirements:

//   2. ONLY generate content that matches the MongoDB schema structure exactly
//   3. Format dates as objects with month and year fields
//   4. Include relevant industry-specific keywords and skills
//   5. Focus on quantifiable achievements and metrics
//   6. Generate content that is specific to the most position in user's linkedin profile summary and other information
//   7. Tailor the content based on user's linkedin profile experience and other information
//   8. Focus on using the most relevant keywords and skills for the user's linkedin profile summary and other information

//   Schema-Specific Guidelines:

//   jobIndustry:
//     - understand the user's linkedin profile summary and other information and based on that add the industry and targetJob and experience and choose the best industry in short for all like "tech", "finance", "healthcare", "education", "construction", "hospitality", "retail", "legal", "marketing", "real_estate", "telecom", "government", "manufacturing", "energy"
//      - if no data is provided, then use default values for industry: "tech",
//       targetJob: "Full Stack Developer",
//       experience: "1-3 (years not required)",

//   1. Personal Information:
//      - Generate a professional summary focused on user's linkedin profile information
//      - Location should include city and country
//      - Keep contact details professional and business-appropriate
//      - Generate a concise professional summary in html format for a resume, on user's linkedin profile summary in approximately 60 words. Focus on clarity and natural flow, avoiding excessive creativity. The description should be a single p tag html string, coherent paragraph string of 60 words and not enclosed in any array or additional structure. Example:<p>
//   <strong>Experienced web developer</strong> skilled in creating responsive, user-friendly applications using modern frameworks like <strong>Next.js</strong> and <strong>TypeScript</strong>. Proficient in optimizing performance, implementing scalable backend solutions, and collaborating across teams to deliver high-quality digital products on time.
// </p>.
//      - Do not make assumptions about user social media profiles If socialLinks do not have any social media profiles then keep socialLinks section empty,
//      - Do not make assumptions about Personal Information like phone number or email If number provided return the number or if email not provided keep it empty,
//      - Do not make assumptions or add any content unless explicitly specified about sensitive personal information such as:
//        Phone numbers
//        Email addresses
//        Personal websites or links like linkedin, github, twitter
//        Social security numbers
//        location
//   2. Work Experience:
//      - If the user submitted work experience, enhance the work experience section by adding:
//        * Clear job title and company name
//        * Location with city, country, and workplace type no need to add state
//        * Dates in {month: string, year: string} format
//        * It is essential to make the description in html format with 3 short bullet points and and add only important achievements
//        * Make the description short and make it as one html ul tag and make this as string
//        * Relevant technologies and skills used
//        * Project details if applicable
//      - Do not make assumptions about Work Experience unless explicitly specified in the user's linkedin profile

//   3. Skills:
//      - Technical skills must include:
//        * Name of the skill
//        * If No skills listed, then add minimum 10-14 or more skills by analyzing the user's linkedin profile summary and other information and work experience and flow the same format
//        * Based on user linkedin profile previous job experience and summary and other information, and years of experience. If you think they should have more skills listed, then feel free to add them by following the same format

//   4. Education and Certifications:
//      -If No Education and Certifications provided, then keep it empty
//      - Format dates as {month: string, year: string}
//      - Include relevant courses and projects
//      - List certifications with proper verification details

//   5. socialLinks Sections:
//      - Do not make assumptions about user social media profiles If they do not have any social media profiles keep it empty,
//      - And remember to add the same format for all social media profiles and make the socialLinks platform name as lowercase string like linkedin, github, portfolio etc.
//   6. Project Sections:
//      - Do not make assumptions or add any projects if the user does not have any projects in the projects section  keep it empty
//      - If projects provided, then Projects should highlight technical abilities
//      - If projects provided, It is essential to make the project description in html format with 3 short bullet points and and add only important achievements
//      - If projects provided, In the project contributions, use action verbs relevant to user's linkedin profile summary and other information (e.g., "developed," "optimized," "led").

//   7. Additional Sections:
//      - Projects should highlight technical abilities
//      - Publications and awards should be industry-relevant
//      - Open source contributions should demonstrate expertise

//   8. Languages Section:
//     -If No languages provided, then understand the information, user location and other related info and based on that add communication languages and add 3 languages by following the same format
//     -In the mongoDB schema languages in the enum format it could be native or advanced or intermediate or beginner nothing else

//   9. awards Section:
//    - Do not make assumptions about user awards If they do not have any awards keep it empty
//    - If No awards provided, then keep it empty

//   10. customSections Section:
//    - Do not make assumptions about user customSections If they do not have any customSections keep it empty
//    - If No customSections provided, then keep it empty

//   Please generate the response in JSON format the same format as the user provided data using the following schema, ensuring only the relevant fields are included in the response give me the data in This JSON format  ${JSON.stringify(
//     linkedInProfileSchema
//   )}.
//   `;
// };
const createSystemPrompt = () => {
  return `You are an AI resume assistant specializing in creating highly optimized, detailed LinkedIn profile summaries from provided data. Generate professional profile content that strictly follows the provided LinkedIn Profile Schema structure.

Key Requirements:
1. ONLY generate content that matches the LinkedIn Profile Schema structure exactly
2. Format dates as proper Date objects
3. Include relevant industry-specific keywords and skills
4. Focus on quantifiable achievements and metrics
5. Generate content that is specific to the user's professional background
6. Ensure all generated content maintains professional standards
7. don not modify the user's linkedin url 
Schema-Specific Guidelines:

1. targetedJobAndIndustry:
   - understand the user's linkedin profile summary and other information and based on that choose the best industry in short for user between "tech", "finance", "healthcare", "education", "construction", "hospitality", "retail", "legal", "marketing", "real_estate", "telecom", "government", "manufacturing", "energy"
   - in the targetJob field choose the best job title for user by analyzing the user's linkedin profile summary and other information like  "Frontend Developer", "Backend Developer", "Full Stack Developer", "MERN Stack Developer", "MEAN Stack Developer", "React Developer", "Angular Developer", "Vue.js Developer", "Node.js Developer", "Python Developer", "Java Developer", ".NET Developer", "PHP Developer", "Ruby on Rails Developer", "iOS Developer", "Android Developer", "Flutter Developer", "Swift Developer" etc.
   - for the targetedJobAndIndustry experience section choose the right experience for user by analyzing the user's linkedin profile summary and other information between "fresher", "0-1", "1-3", "3-5", "5-10", "10-15", "15+" (years not required)

2. Basic Profile Information:
   - Generate full name, headline, and occupation that reflect professional identity
   - Format location with country, city, and state
   - Generate a concise professional summary in HTML format (approximately 60 words)
   - Summary should be a single p tag HTML string, focusing on clarity and natural flow and make this simple easy to understand and easy to read and don't sound too professional and a bit comprehensive but 35 words and not more than that
   - Example summary format:
      <p> I am a <strong>Professional title</strong> followed by key expertise and achievements. Include relevant <strong>technical skills</strong> and industry experience. Focus on value proposition and career trajectory.</p> 

2. Experience Section:
   - Format each position with:
     * Clear job title and company name
     * Complete location information
     * Properly formatted start and end dates
     * Description in HTML format with key achievements (3 bullet points) and only make this as 3 bullet points and no short description before the bullet points
     * Make descriptions concise and impactful and do not make the description too long but detailed and comprehensive but each bullet point should be 18-25 words
   - Focus on quantifiable achievements and impact
   - Include relevant technologies and skills used

3. Education Section:
   - Include complete information for each entry:
     * School name
     * Degree name
     * Start and end dates in {month: string, year: string} format
     * Relevant description or no description
   - Format dates properly as Date objects

4. Certifications:
   - Include for each certification:
     * Name of certification
     * Issuing authority
     * Valid dates
     * License number if available
     * Verification URL

5. Skills Section:
   - List technical and professional skills
   - Skills should be relevant to experience and education
   - Include both technical and soft skills where appropriate

6. Projects Section:
   - For each project, include:
     * Clear title and role
     * Technology stack used
     * Start and end dates in {month: string, year: string} format
     * Contributions in HTML format with 3 bullet points
     * Relevant links and media links
     * Measurable achievements

7. Languages Section:
   - List languages with proficiency levels
   - Use standard proficiency levels as specified in schema
   - If no languages provided, then understand the linkedin profile summary and and location and other information and based on that add languages by following the same format
   - proficiency levels should be between "native", "advanced", "intermediate", "beginner" do not use any other proficiency levels

8. Profile Metrics:
   - Include accurate follower count and connections
   - Ensure numbers are formatted as integers
9. isAIGenerated:
   - isAIGenerated should be true

Response Format Requirements:
- Return data in JSON format matching the LinkedIn Profile Schema exactly
- Ensure all dates are properly formatted
- All HTML content should be properly formatted strings
- Arrays should be properly structured according to schema
- All fields should match the specified types in the schema

Schema Reference:
${JSON.stringify(linkedInProfileSchema, null, 2)}

Please ensure the response strictly adheres to this schema format while maintaining professional standards and attention to detail.`;
};
export const generateResumeWithLinkedIn = async (
  //   resumeData: IResumeGenerationRequest,
  linkedInProfileData: any,
  userPrompt?: string
) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // You can change this to other available models
      messages: [
        {
          role: "system",
          content: createSystemPrompt(),
        },
        {
          role: "user",
          content: userPrompt || "",
        },
        {
          role: "user",
          content: JSON.stringify(linkedInProfileData),
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
