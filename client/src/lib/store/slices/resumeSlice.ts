import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateInfo {
  month: string;
  year: string;
}

type EducationValue = string | boolean | DateInfo;
type AwardValue = string | { month: string; year: string };

interface JobIndustryData {
  industry: string;
  targetJob: string;
  experience: string;
}

interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: File | null;
}

interface ProfessionalSummary {
  summaryText: string;
}

interface Project {
  id: string;
  title: string;
  technologies: string[];
  role: string;
  contributions: string;
  links: { platform: string; url: string }[];
}

interface JobExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentJob: boolean;
  location: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentlyStudying: boolean;
  location: string;
  description: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface Skill {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
  isCustom: boolean;
}
interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: { month: string; year: string };
  expirationDate: { month: string; year: string };
  credentialId: string;
  verificationUrl: string;
  description: string;
  isNeverExpires: boolean;
}
interface Award {
  id: string;
  name: string;
  issuer: string;
  date: { month: string; year: string };
  description: string;
}
interface OpenSourceContribution {
  id: string;
  projectName: string;
  role: string;
  technologies: string[];
  description: string;
  contributions: string;
  links: { platform: string; url: string }[];
  startDate: DateInfo;
  endDate: DateInfo;
  isOngoing: boolean;
}
interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isPresent: boolean;
}

export interface ResumeState {
  jobIndustry: JobIndustryData;
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  workExperience: JobExperience[];
  education: Education[];
  socialLinks: SocialLink[];
  selectedSkills: Skill[];
  customSkills: Skill[];
  projects: Project[];
  languages: Language[];
  certificate: Certificate[];
  awards: Award[];
  openSourceContributions: OpenSourceContribution[];
  customSections: CustomSection[];
  isLoading: boolean;
  error: string | null;
}

// Initial State
// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "Information Technology",
//     targetJob: "Full Stack Developer",
//     experience: "3 years",
//   },
//   personalInfo: {
//     firstName: "Arjun",
//     lastName: "Patel",
//     email: "arjun.patel@email.com",
//     phone: "+91 98765 43210",
//     city: "Bangalore",
//     country: "India",
//     address: "123 Tech Park Road, Whitefield",
//     postalCode: "560066",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText:
//       "Dedicated Full Stack Developer with 3 years of experience building scalable web applications using modern technologies. Specialized in MERN stack development with a strong foundation in both frontend and backend technologies. Proven track record of delivering high-quality solutions for e-commerce and fintech clients. Passionate about clean code, performance optimization, and staying current with emerging technologies.",
//   },
//   workExperience: [
//     {
//       id: "job-1",
//       jobTitle: "Senior Full Stack Developer",
//       company: "TechSolutions India Pvt Ltd",
//       startDate: { month: "June", year: "2023" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: true,
//       location: "Bangalore, India",
//       description:
//         "• Led a team of 4 developers in building a high-traffic e-commerce platform using React, Node.js, and MongoDB\n• Implemented microservices architecture resulting in 40% improved application performance\n• Integrated payment gateways and implemented secure authentication using JWT and OAuth\n• Mentored junior developers and conducted code reviews",
//     },
//     {
//       id: "job-2",
//       jobTitle: "Full Stack Developer",
//       company: "Digital Innovations Ltd",
//       startDate: { month: "May", year: "2021" },
//       endDate: { month: "May", year: "2023" },
//       isCurrentJob: false,
//       location: "Pune, India",
//       description:
//         "• Developed and maintained multiple web applications using React, Express.js, and PostgreSQL\n• Implemented responsive designs using Tailwind CSS and Material-UI\n• Created RESTful APIs and integrated third-party services\n• Reduced page load time by 50% through code optimization and lazy loading",
//     },
//   ],
//   education: [
//     {
//       id: "edu-1",
//       degree: "B.Tech in Computer Science",
//       school: "VIT University",
//       startDate: { month: "August", year: "2017" },
//       endDate: { month: "May", year: "2021" },
//       isCurrentlyStudying: false,
//       location: "Vellore, India",
//       description:
//         "• Graduated with First Class Honours\n• Specialized in Web Technologies and Database Management\n• Led technical team in college fest",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "social-1",
//       platform: "LinkedIn",
//       url: "linkedin.com/in/arjun-patel",
//     },
//     {
//       id: "social-2",
//       platform: "GitHub",
//       url: "github.com/arjun-dev",
//     },
//     {
//       id: "social-3",
//       platform: "Portfolio",
//       url: "arjunpatel.dev",
//     },
//   ],
//   projects: [
//     {
//       id: "proj-1",
//       title: "E-learning Platform",
//       technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
//       role: "Lead Developer",
//       contributions:
//         "Developed a full-featured e-learning platform with live video streaming, course management, and payment integration",
//       links: [
//         { platform: "GitHub", url: "github.com/arjun-dev/elearn-platform" },
//         { platform: "Live Demo", url: "elearn-demo.netlify.app" },
//       ],
//     },
//     {
//       id: "proj-2",
//       title: "Restaurant Management System",
//       technologies: ["Next.js", "Express.js", "PostgreSQL", "Redis", "Docker"],
//       role: "Full Stack Developer",
//       contributions:
//         "Built a comprehensive restaurant management system with real-time order tracking and inventory management",
//       links: [{ platform: "GitHub", url: "github.com/arjun-dev/resto-manage" }],
//     },
//   ],
//   languages: [
//     {
//       id: "lang-1",
//       name: "English",
//       proficiency: "Professional",
//       isCustom: false,
//     },
//     {
//       id: "lang-2",
//       name: "Hindi",
//       proficiency: "Native",
//       isCustom: false,
//     },
//     {
//       id: "lang-3",
//       name: "Gujarati",
//       proficiency: "Native",
//       isCustom: false,
//     },
//   ],
//   selectedSkills: [
//     { id: "skill-1", name: "JavaScript" },
//     { id: "skill-2", name: "TypeScript" },
//     { id: "skill-3", name: "React.js" },
//     { id: "skill-4", name: "Node.js" },
//     { id: "skill-5", name: "Express.js" },
//     { id: "skill-6", name: "MongoDB" },
//     { id: "skill-7", name: "PostgreSQL" },
//     { id: "skill-8", name: "Redis" },
//     { id: "skill-9", name: "Docker" },
//     { id: "skill-10", name: "AWS" },
//   ],
//   customSkills: [
//     { id: "custom-1", name: "Agile Methodologies" },
//     { id: "custom-2", name: "Team Leadership" },
//   ],
//   certificate: [
//     {
//       id: "cert-1",
//       name: "AWS Certified Developer – Associate",
//       issuingOrganization: "Amazon Web Services",
//       issueDate: { month: "January", year: "2023" },
//       expirationDate: { month: "January", year: "2026" },
//       credentialId: "AWS-DEV-123456",
//       verificationUrl: "aws.amazon.com/verification/abc123",
//       description:
//         "Comprehensive certification covering AWS services and best practices",
//       isNeverExpires: false,
//     },
//     {
//       id: "cert-2",
//       name: "MongoDB Professional Certification",
//       issuingOrganization: "MongoDB University",
//       issueDate: { month: "March", year: "2022" },
//       expirationDate: { month: "March", year: "2025" },
//       credentialId: "MDB-123-456",
//       verificationUrl: "university.mongodb.com/verify/mdb123",
//       description:
//         "Advanced certification in MongoDB database design and operations",
//       isNeverExpires: false,
//     },
//   ],
//   awards: [
//     {
//       id: "award-1",
//       name: "Best Innovation Award",
//       issuer: "TechSolutions India",
//       date: { month: "December", year: "2023" },
//       description:
//         "Awarded for developing an AI-powered customer service chatbot that reduced support tickets by 30%",
//     },
//   ],
//   openSourceContributions: [
//     {
//       id: "opensource-1",
//       projectName: "React-Query",
//       role: "Contributor",
//       technologies: ["TypeScript", "React"],
//       description:
//         "Contributing to React-Query, a popular data-fetching library for React applications",
//       contributions:
//         "Implemented new features and fixed bugs related to cache management",
//       links: [
//         {
//           platform: "GitHub",
//           url: "github.com/tanstack/query/pulls?q=author%3Aarjun-dev",
//         },
//       ],
//       startDate: { month: "June", year: "2022" },
//       endDate: { month: "", year: "" },
//       isOngoing: true,
//     },
//   ],
//   customSections: [
//     {
//       id: "custom-1",
//       title: "Technical Writing",
//       subtitle: "Dev.to Blog",
//       description:
//         "Maintain a technical blog with focus on full-stack development best practices and tutorials",
//       startDate: { month: "January", year: "2022" },
//       endDate: { month: "", year: "" },
//       isPresent: true,
//     },
//   ],
//   isLoading: false,
//   error: null,
// };
const initialState: ResumeState = {
  jobIndustry: {
    industry: "",
    targetJob: "",
    experience: "",
  },
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    postalCode: "",
    photo: null,
  },
  professionalSummary: {
    summaryText: "",
  },
  workExperience: [
    {
      id: "default-job",
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentJob: false,
      location: "",
      description: "",
    },
  ],
  education: [
    {
      id: "default-education",
      degree: "",
      school: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentlyStudying: false,
      location: "",
      description: "",
    },
  ],
  socialLinks: [
    {
      id: "default-link",
      platform: "",
      url: "",
    },
  ],
  projects: [
    {
      id: "default-project",
      title: "",
      technologies: [],
      role: "",
      contributions: "",
      links: [],
    },
  ],
  languages: [
    {
      id: "default-language",
      name: "",
      proficiency: "",
      isCustom: false,
    },
  ],
  selectedSkills: [],
  customSkills: [],
  certificate: [],
  awards: [
    {
      id: "default-award",
      name: "",
      issuer: "",
      date: { month: "", year: "" },
      description: "",
    },
  ],
  openSourceContributions: [
    {
      id: "default-contribution",
      projectName: "",
      role: "",
      technologies: [],
      description: "",
      contributions: "",
      links: [],
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isOngoing: false,
    },
  ],
  customSections: [
    {
      id: "default-section",
      title: "",
      subtitle: "",
      description: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isPresent: false,
    },
  ],
  isLoading: false,
  error: null,
};

// Slice Definition
const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Job Industry
    updateJobIndustry: (
      state,
      action: PayloadAction<Partial<JobIndustryData>>
    ) => {
      state.jobIndustry = { ...state.jobIndustry, ...action.payload };
    },

    // Personal Information
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInformation>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    // Professional Summary
    updateProfessionalSummary: (
      state,
      action: PayloadAction<Partial<ProfessionalSummary>>
    ) => {
      state.professionalSummary = {
        ...state.professionalSummary,
        ...action.payload,
      };
    },

    // Projects
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    // updateProject: (
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     field: keyof Project;
    //     value: any;
    //   }>
    // ) => {
    //   const { id, field, value } = action.payload;
    //   const projectIndex = state.projects.findIndex((proj) => proj.id === id);
    //   if (projectIndex !== -1) {
    //     state.projects[projectIndex] = {
    //       ...state.projects[projectIndex],
    //       [field]: value,
    //     };
    //   }
    // },
    updateProject: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Project;
        value: string | string[] | { platform: string; url: string }[];
      }>
    ) => {
      const { id, field, value } = action.payload;
      const projectIndex = state.projects.findIndex((proj) => proj.id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          [field]: value,
        };
      }
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    reorderProjects: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.projects.splice(oldIndex, 1);
      state.projects.splice(newIndex, 0, removed);
    },

    // Work Experience
    setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
      state.workExperience = action.payload;
    },

    updateWorkExperience: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof JobExperience;
        value: string | boolean | DateInfo;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const experienceIndex = state.workExperience.findIndex(
        (exp) => exp.id === id
      );

      if (experienceIndex !== -1) {
        if (field === "isCurrentJob" && value === true) {
          state.workExperience[experienceIndex] = {
            ...state.workExperience[experienceIndex],
            [field]: value,
            endDate: { month: "", year: "" },
          };
        } else {
          state.workExperience[experienceIndex] = {
            ...state.workExperience[experienceIndex],
            [field]: value,
          };
        }
      }
    },

    addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
      state.workExperience.push(action.payload);
    },

    deleteWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperience = state.workExperience.filter(
        (exp) => exp.id !== action.payload
      );
    },

    reorderWorkExperience: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.workExperience.splice(oldIndex, 1);
      state.workExperience.splice(newIndex, 0, removed);
    },

    // Education
    updateEducation: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Education;
        value: EducationValue;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const educationIndex = state.education.findIndex((edu) => edu.id === id);

      if (educationIndex !== -1) {
        if (field === "isCurrentlyStudying" && value === true) {
          state.education[educationIndex] = {
            ...state.education[educationIndex],
            [field]: value,
            endDate: { month: "", year: "" },
          };
        } else {
          state.education[educationIndex] = {
            ...state.education[educationIndex],
            [field]: value,
          };
        }
      }
    },

    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },

    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(
        (edu) => edu.id !== action.payload
      );
    },

    reorderEducation: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.education.splice(oldIndex, 1);
      state.education.splice(newIndex, 0, removed);
    },

    // Social Links
    updateSocialLink: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof SocialLink;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const linkIndex = state.socialLinks.findIndex((link) => link.id === id);
      if (linkIndex !== -1) {
        state.socialLinks[linkIndex] = {
          ...state.socialLinks[linkIndex],
          [field]: value,
        };
      }
    },

    addSocialLink: (state, action: PayloadAction<SocialLink>) => {
      state.socialLinks.push(action.payload);
    },

    deleteSocialLink: (state, action: PayloadAction<string>) => {
      state.socialLinks = state.socialLinks.filter(
        (link) => link.id !== action.payload
      );
    },

    reorderSocialLinks: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.socialLinks.splice(oldIndex, 1);
      state.socialLinks.splice(newIndex, 0, removed);
    },

    // Skills
    setSelectedSkills: (state, action: PayloadAction<Skill[]>) => {
      state.selectedSkills = action.payload;
    },

    addSelectedSkill: (state, action: PayloadAction<Skill>) => {
      if (
        !state.selectedSkills.some((skill) => skill.id === action.payload.id)
      ) {
        state.selectedSkills.push(action.payload);
      }
    },

    removeSelectedSkill: (state, action: PayloadAction<string>) => {
      state.selectedSkills = state.selectedSkills.filter(
        (skill) => skill.id !== action.payload
      );
    },

    reorderSkills: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.selectedSkills.splice(oldIndex, 1);
      state.selectedSkills.splice(newIndex, 0, removed);
    },

    addCustomSkill: (state, action: PayloadAction<Skill>) => {
      state.selectedSkills.push(action.payload);
      state.customSkills.push(action.payload);
    },

    // Languages
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.languages = action.payload;
    },

    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.push(action.payload);
    },

    updateLanguage: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Language;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const languageIndex = state.languages.findIndex((lang) => lang.id === id);
      if (languageIndex !== -1) {
        state.languages[languageIndex] = {
          ...state.languages[languageIndex],
          [field]: value,
        };
      }
    },

    deleteLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
    },

    reorderLanguages: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.languages.splice(oldIndex, 1);
      state.languages.splice(newIndex, 0, removed);
    },

    // Certificates
    setCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificate = action.payload;
    },

    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificate.push(action.payload);
    },

    updateCertificate: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Certificate;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const certificateIndex = state.certificate.findIndex(
        (cert) => cert.id === id
      );
      if (certificateIndex !== -1) {
        state.certificate[certificateIndex] = {
          ...state.certificate[certificateIndex],
          [field]: value,
        };
      }
    },

    deleteCertificate: (state, action: PayloadAction<string>) => {
      state.certificate = state.certificate.filter(
        (cert) => cert.id !== action.payload
      );
    },

    reorderCertificates: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.certificate.splice(oldIndex, 1);
      state.certificate.splice(newIndex, 0, removed);
    },

    setAwards: (state, action: PayloadAction<Award[]>) => {
      state.awards = action.payload;
    },

    updateAward: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Award;
        value: AwardValue;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const awardIndex = state.awards.findIndex((award) => award.id === id);
      if (awardIndex !== -1) {
        state.awards[awardIndex] = {
          ...state.awards[awardIndex],
          [field]: value,
        };
      }
    },

    addAward: (state, action: PayloadAction<Award>) => {
      state.awards.push(action.payload);
    },

    deleteAward: (state, action: PayloadAction<string>) => {
      state.awards = state.awards.filter(
        (award) => award.id !== action.payload
      );
    },

    reorderAwards: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.awards.splice(oldIndex, 1);
      state.awards.splice(newIndex, 0, removed);
    },

    //Open Source Contributions
    setOpenSourceContributions: (
      state,
      action: PayloadAction<OpenSourceContribution[]>
    ) => {
      state.openSourceContributions = action.payload;
    },

    updateOpenSourceContribution: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof OpenSourceContribution;
        value:
          | string
          | string[]
          | boolean
          | DateInfo
          | { platform: string; url: string }[];
      }>
    ) => {
      const { id, field, value } = action.payload;
      const contributionIndex = state.openSourceContributions.findIndex(
        (contribution) => contribution.id === id
      );
      if (contributionIndex !== -1) {
        state.openSourceContributions[contributionIndex] = {
          ...state.openSourceContributions[contributionIndex],
          [field]: value,
        };
      }
    },

    addOpenSourceContribution: (
      state,
      action: PayloadAction<OpenSourceContribution>
    ) => {
      state.openSourceContributions.push(action.payload);
    },

    deleteOpenSourceContribution: (state, action: PayloadAction<string>) => {
      state.openSourceContributions = state.openSourceContributions.filter(
        (contribution) => contribution.id !== action.payload
      );
    },

    reorderOpenSourceContributions: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.openSourceContributions.splice(oldIndex, 1);
      state.openSourceContributions.splice(newIndex, 0, removed);
    },

    // Add custom section
    setCustomSections: (state, action: PayloadAction<CustomSection[]>) => {
      state.customSections = action.payload;
    },

    updateCustomSection: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof CustomSection;
        value: string | boolean | { month: string; year: string };
      }>
    ) => {
      const { id, field, value } = action.payload;
      const sectionIndex = state.customSections.findIndex(
        (section) => section.id === id
      );
      if (sectionIndex !== -1) {
        state.customSections[sectionIndex] = {
          ...state.customSections[sectionIndex],
          [field]: value,
        };
      }
    },

    addCustomSection: (state, action: PayloadAction<CustomSection>) => {
      state.customSections.push(action.payload);
    },

    deleteCustomSection: (state, action: PayloadAction<string>) => {
      state.customSections = state.customSections.filter(
        (section) => section.id !== action.payload
      );
    },

    reorderCustomSections: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.customSections.splice(oldIndex, 1);
      state.customSections.splice(newIndex, 0, removed);
    },

    resetSkills: () => {
      return initialState;
    },

    // Reset Form
    resetForm: () => {
      return initialState;
    },
  },
});

// Export actions
export const {
  updateJobIndustry,
  updatePersonalInfo,
  updateProfessionalSummary,
  setProjects,
  updateProject,
  addProject,
  deleteProject,
  reorderProjects,
  setWorkExperience,
  updateWorkExperience,
  addWorkExperience,
  deleteWorkExperience,
  reorderWorkExperience,
  updateEducation,
  addEducation,
  deleteEducation,
  reorderEducation,
  updateSocialLink,
  addSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
  setSelectedSkills,
  addSelectedSkill,
  removeSelectedSkill,
  reorderSkills,
  addCustomSkill,
  setLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  reorderLanguages,
  resetSkills,
  resetForm,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  reorderCertificates,
  setAwards,
  updateAward,
  addAward,
  deleteAward,
  reorderAwards,
  setOpenSourceContributions,
  updateOpenSourceContribution,
  addOpenSourceContribution,
  deleteOpenSourceContribution,
  reorderOpenSourceContributions,
  // Add custom section
  setCustomSections,
  updateCustomSection,
  addCustomSection,
  deleteCustomSection,
  reorderCustomSections,
} = resumeSlice.actions;

// Export the reducer
export default resumeSlice.reducer;
