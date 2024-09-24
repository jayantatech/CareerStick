import OpenAI from "openai";

// Initialize OpenAI client with API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure API key is correctly loaded
});

const resumeJSONSchema = {
  isPrime: "boolean", // Marks if this is the prime version of the resume
  personalInfo: {
    name: "string", // Full name of the user
    phoneNumber: "string", // Phone number of the user
    email: "string", // Professional email of the user
    location: {
      // User's location details
      city: "string",
      state: "string",
      country: "string",
      postalCode: "string", // Added for more precise location
    },
    socialLinks: {
      // Professional social media and portfolio links
      linkedIn: "string", // LinkedIn profile URL
      github: "string", // GitHub profile URL
      stackOverflow: "string", // Stack Overflow profile URL
      personalWebsite: "string", // Personal website or portfolio URL
      twitter: "string", // Twitter profile URL (optional)
      medium: "string", // Medium profile URL (for tech bloggers)
      devTo: "string", // Dev.to profile URL
    },
    languages: [
      // Languages the user speaks (important for international roles)
      {
        language: "string", // Name of the language (e.g., English, Spanish)
        proficiency: "string", // Level of proficiency (e.g., Native, Fluent, Intermediate, Basic)
        certifications: ["string"], // Any language certifications (e.g., TOEFL, IELTS)
      },
    ],
    summary: "string", // Professional summary or objective statement
    image: "string", // URL of the user's professional headshot (optional)
    visaStatus: "string", // Visa/work authorization status (important for international applicants)
  },

  workExperience: [
    {
      jobTitle: "string", // Job title (e.g., "Senior Software Engineer")
      company: "string", // Company name
      jobType: "string", // Job type (e.g., "Full-time", "Part-time", "Internship", "Contract")
      location: {
        city: "string",
        state: "string",
        country: "string",
        workplaceType: "string", // "On-site", "Remote", or "Hybrid"
      },
      startDate: "Date", // Start date of the job
      endDate: "Date or 'Present'", // End date or "Present" if current job
      responsibilities: ["string"], // Key job responsibilities
      achievements: ["string"], // Notable achievements or contributions
      technologies: ["string"], // Technologies used in this role
      projects: [
        {
          name: "string", // Project name
          description: "string", // Brief project description
          role: "string", // User's role in the project
          technologies: ["string"], // Technologies used in the project
          achievements: ["string"], // Specific achievements in this project
        },
      ],
    },
  ],
  education: [
    // Formal education history
    {
      degree: "string", // Degree obtained (e.g., "BSc in Computer Science")
      institution: "string", // Institution name
      location: {
        // Location of the institution
        city: "string",
        state: "string",
        country: "string",
      },
      startDate: "Date", // Start date of the degree/program
      endDate: "Date", // End date or year of graduation
      gpa: "number", // GPA (if applicable)
      relevantCourses: ["string"], // Relevant coursework
      projects: ["string"], // Academic projects
      honors: ["string"], // Academic honors or awards
      activities: ["string"], // Relevant extracurricular activities
    },
  ],
  certifications: [
    // Professional certifications
    {
      name: "string", // Name of the certification (e.g., "AWS Certified Solutions Architect")
      issuingOrganization: "string", // Organization issuing the certification
      issueDate: "Date", // Date certification was obtained
      expirationDate: "Date", // Expiration date (if applicable)
      credentialId: "string", // Credential ID or verification URL
      skills: ["string"], // Skills demonstrated by this certification
    },
  ],
  projects: [
    // Significant projects (personal, open-source, or academic)
    {
      title: "string", // Project title
      description: "string", // Detailed project description
      role: "string", // User's role in the project
      startDate: "Date", // Project start date
      endDate: "Date or 'Ongoing'", // Project end date or "Ongoing"
      technologies: ["string"], // Technologies used in the project
      achievements: ["string"], // Key achievements or features
      url: "string", // Project URL or repository link
      mediaLinks: ["string"], // Links to demos, screenshots, or videos
    },
  ],
  skills: {
    // Comprehensive skills section
    technicalSkills: [
      // Technical skills categorized
      {
        category: "string", // Skill category (e.g., "Programming Languages", "Frameworks", "Databases")
        skills: [
          {
            name: "string", // Skill name (e.g., "JavaScript", "React", "PostgreSQL")
            proficiency: "string", // Proficiency level (e.g., "Expert", "Advanced", "Intermediate", "Beginner")
            yearsOfExperience: "number", // Years of experience with this skill
            lastUsed: "Date", // When the skill was last used professionally
          },
        ],
      },
    ],
    softSkills: ["string"], // Soft skills relevant to tech roles (e.g., "Problem-solving", "Team leadership")
  },
  achievements: [
    // Notable professional or academic achievements
    {
      title: "string", // Title of the achievement
      description: "string", // Detailed description
      date: "Date", // Date of achievement
      url: "string", // URL for verification or more info (optional)
    },
  ],
  publications: [
    // Technical publications or articles
    {
      title: "string", // Title of the publication
      publishedIn: "string", // Where it was published (e.g., journal name, website)
      date: "Date", // Publication date
      url: "string", // Link to the publication
      description: "string", // Brief description or abstract
    },
  ],
  volunteerExperience: [
    // Tech-related volunteer work
    {
      organization: "string", // Name of the organization
      role: "string", // Volunteer role
      startDate: "Date", // Start date
      endDate: "Date or 'Present'", // End date or "Present" if ongoing
      description: "string", // Description of volunteer work
      skills: ["string"], // Skills used or developed
    },
  ],
  awards: [
    // Professional awards or recognitions
    {
      name: "string", // Name of the award
      issuingOrganization: "string", // Organization that gave the award
      date: "Date", // Date received
      description: "string", // Brief description of the award
    },
  ],
  openSourceContributions: [
    // Open source project contributions
    {
      projectName: "string", // Name of the open source project
      url: "string", // Project or contribution URL
      description: "string", // Description of contributions
      startDate: "Date", // Start date of involvement
      endDate: "Date or 'Ongoing'", // End date or "Ongoing" if still active
    },
  ],
  atsCompatibilityScore: "number", // ATS compatibility score (0-100)
  keywords: ["string"], // Keywords extracted from the resume for ATS optimization
};

// Function to generate resume using OpenAI's chat API
async function aiGenerateResume(prompt: string) {
  console.log("OpenAI API Key:", process.env.OPENAI_API_KEY!);

  try {
    // Call OpenAI's chat completion API
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI-powered resume assistant designed to help users create highly optimized, ATS-friendly resumes. First, thoroughly understand the user's query by analyzing the provided job description, industry requirements, key achievements, and skills relevant to the desired position. Based on this analysis, generate a detailed and personalized resume output that is comprehensive, modern, and tailored to the user’s specific needs.

The resume should adhere to the following enhanced guidelines to ensure it meets modern professional standards and maximizes ATS compatibility:

### 1. **ATS Optimization:**
- Structure the resume in a way that makes it highly scannable by Applicant Tracking Systems (ATS).
- Calculate and display an ATS compatibility score (out of 100).
- Integrate essential keywords and phrases from the job description and the user's experiences.
- Prioritize formatting and readability: ensure no use of images, charts, or unconventional fonts.
- Use common section titles (e.g., "Work Experience" instead of "Career Journey") to improve ATS parsing.

### 2. **Modern Professional Structure:**
- **Contact Information:** Display the user's name, professional email, phone number, LinkedIn profile, and portfolio link (if applicable).
- **Professional Summary:** Craft a compelling 2-3 sentence summary (around 50-75 words), emphasizing the user's primary skills, years of experience, and core strengths relevant to the target role.
- **Key Skills:** Ensure the list of key skills includes at least 6-8 relevant technical and soft skills. Prioritize keywords matching the job description.
- **Work Experience:** 
   - For each position, list the job title, company name, and employment dates.
   - Aim for 3-5 bullet points per job, detailing achievements in measurable terms (e.g., "Increased sales by 20% in 6 months by implementing new outreach strategies").
   - Use action verbs (e.g., "led," "developed," "optimized") and quantify impact wherever possible.
   - Job descriptions should contain **minimum 60-80 words** per entry to ensure enough detail is provided.
   - Ensure each bullet point is no longer than **20 words** for easy readability.
- **Education:** Include degrees, institutions, and graduation dates. Include GPA if applicable and recent (within the last 5 years).
- **Certifications:** List all relevant certifications with the name and date obtained. Prioritize certifications that enhance credibility for technical or specialized roles (e.g., AWS Certified Solutions Architect).

### 3. **Comprehensive Skills Section:**
- Divide the skills into **Technical Skills** and **Soft Skills**. 
- **Technical Skills:** Prioritize industry-relevant skills, especially those critical for tech roles (e.g., programming languages like Python, Java, frameworks like React or Node.js, cloud services like AWS or Azure).
- **Soft Skills:** Include a minimum of 3 soft skills (e.g., leadership, teamwork, problem-solving).
- Minimum total number of skills: **6-8** to ensure the resume meets industry standards.

### 4. **Personalization and Role-Specific Adjustments:**
- Tailor each resume for the job position by emphasizing the user's most relevant experiences and achievements.
- Adjust the wording and focus of the Professional Summary and Work Experience to reflect the user's qualifications and match the job description.
- Emphasize accomplishments, especially those that demonstrate leadership, innovation, and measurable success.
- Ensure the tone is professional yet friendly to create a personalized but polished resume.

### 5. **Length and Formatting Guidelines:**
- The resume should be no longer than **1-2 pages**.
- Maintain consistent formatting, using bullet points, section headers, and bold text to ensure readability.
- Avoid excessive use of colors or graphics that could interfere with ATS parsing.

### 6. **Tech-Specific Guidelines:**
- Focus on highlighting relevant technical skills, projects, and software proficiencies, especially for users applying to tech positions (e.g., software engineers, data analysts, IT managers).
- Include a **Projects** section if applicable, to detail specific technical projects, the tools and technologies used, and the outcomes. Ensure this section has at least 2-3 projects if the user is in a tech role.
- For developers, include **GitHub** or other portfolio links to showcase code samples or projects.

Please generate the response in JSON format using the following schema, ensuring only the relevant fields are included:

${JSON.stringify(resumeJSONSchema)}`,
        },
        {
          role: "user",
          content: `${JSON.stringify(prompt)}`,
        },
      ],
      model: "gpt-4o-mini", // Use the correct model name
      max_tokens: 3000, // Set token limit based on requirements
      temperature: 0.7, // Control randomness
    });

    // Return the first choice in the response if it exists
    if (chatCompletion.choices && chatCompletion.choices.length > 0) {
      return chatCompletion.choices[0].message?.content;
    } else {
      throw new Error("No choices found in the response.");
    }
  } catch (error: any) {
    // Log detailed error and throw custom error message
    console.error(
      "Error generating resume:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate resume");
  }
}

export { aiGenerateResume };
