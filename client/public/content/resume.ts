const demoResumeData = {
  jobIndustry: {
    industry: "Information Technology",
    targetJob: "Full Stack Developer",
    experience: "3 years",
  },
  personalInfo: {
    firstName: "Arjun",
    lastName: "Patel",
    email: "arjun.patel@email.com",
    phone: "+91 98765 43210",
    city: "Bangalore",
    country: "India",
    address: "123 Tech Park Road, Whitefield",
    postalCode: "560066",
    photo: null,
  },
  professionalSummary: {
    summaryText:
      "Dedicated Full Stack Developer with 3 years of experience building scalable web applications using modern technologies. Specialized in MERN stack development with a strong foundation in both frontend and backend technologies. Proven track record of delivering high-quality solutions for e-commerce and fintech clients. Passionate about clean code, performance optimization, and staying current with emerging technologies.",
  },
  workExperience: [
    {
      id: "job-1",
      jobTitle: "Senior Full Stack Developer",
      company: "TechSolutions India Pvt Ltd",
      startDate: { month: "June", year: "2023" },
      endDate: { month: "", year: "" },
      isCurrentJob: true,
      location: "Bangalore, India",
      description:
        "• Led a team of 4 developers in building a high-traffic e-commerce platform using React, Node.js, and MongoDB\n• Implemented microservices architecture resulting in 40% improved application performance\n• Integrated payment gateways and implemented secure authentication using JWT and OAuth\n• Mentored junior developers and conducted code reviews",
    },
    {
      id: "job-2",
      jobTitle: "Full Stack Developer",
      company: "Digital Innovations Ltd",
      startDate: { month: "May", year: "2021" },
      endDate: { month: "May", year: "2023" },
      isCurrentJob: false,
      location: "Pune, India",
      description:
        "• Developed and maintained multiple web applications using React, Express.js, and PostgreSQL\n• Implemented responsive designs using Tailwind CSS and Material-UI\n• Created RESTful APIs and integrated third-party services\n• Reduced page load time by 50% through code optimization and lazy loading",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science",
      school: "VIT University",
      startDate: { month: "August", year: "2017" },
      endDate: { month: "May", year: "2021" },
      isCurrentlyStudying: false,
      location: "Vellore, India",
      description:
        "• Graduated with First Class Honours\n• Specialized in Web Technologies and Database Management\n• Led technical team in college fest",
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      platform: "LinkedIn",
      url: "linkedin.com/in/arjun-patel",
    },
    {
      id: "social-2",
      platform: "GitHub",
      url: "github.com/arjun-dev",
    },
    {
      id: "social-3",
      platform: "Portfolio",
      url: "arjunpatel.dev",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-learning Platform",
      technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
      role: "Lead Developer",
      contributions:
        "Developed a full-featured e-learning platform with live video streaming, course management, and payment integration",
      links: [
        { platform: "GitHub", url: "github.com/arjun-dev/elearn-platform" },
        { platform: "Live Demo", url: "elearn-demo.netlify.app" },
      ],
    },
    {
      id: "proj-2",
      title: "Restaurant Management System",
      technologies: ["Next.js", "Express.js", "PostgreSQL", "Redis", "Docker"],
      role: "Full Stack Developer",
      contributions:
        "Built a comprehensive restaurant management system with real-time order tracking and inventory management",
      links: [{ platform: "GitHub", url: "github.com/arjun-dev/resto-manage" }],
    },
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Professional",
      isCustom: false,
    },
    {
      id: "lang-2",
      name: "Hindi",
      proficiency: "Native",
      isCustom: false,
    },
    {
      id: "lang-3",
      name: "Gujarati",
      proficiency: "Native",
      isCustom: false,
    },
  ],
  selectedSkills: [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "TypeScript" },
    { id: "skill-3", name: "React.js" },
    { id: "skill-4", name: "Node.js" },
    { id: "skill-5", name: "Express.js" },
    { id: "skill-6", name: "MongoDB" },
    { id: "skill-7", name: "PostgreSQL" },
    { id: "skill-8", name: "Redis" },
    { id: "skill-9", name: "Docker" },
    { id: "skill-10", name: "AWS" },
  ],
  customSkills: [
    { id: "custom-1", name: "Agile Methodologies" },
    { id: "custom-2", name: "Team Leadership" },
  ],
  certificate: [
    {
      id: "cert-1",
      name: "AWS Certified Developer – Associate",
      issuingOrganization: "Amazon Web Services",
      issueDate: { month: "January", year: "2023" },
      expirationDate: { month: "January", year: "2026" },
      credentialId: "AWS-DEV-123456",
      verificationUrl: "aws.amazon.com/verification/abc123",
      description:
        "Comprehensive certification covering AWS services and best practices",
      isNeverExpires: false,
    },
    {
      id: "cert-2",
      name: "MongoDB Professional Certification",
      issuingOrganization: "MongoDB University",
      issueDate: { month: "March", year: "2022" },
      expirationDate: { month: "March", year: "2025" },
      credentialId: "MDB-123-456",
      verificationUrl: "university.mongodb.com/verify/mdb123",
      description:
        "Advanced certification in MongoDB database design and operations",
      isNeverExpires: false,
    },
  ],
  awards: [
    {
      id: "award-1",
      name: "Best Innovation Award",
      issuer: "TechSolutions India",
      date: { month: "December", year: "2023" },
      description:
        "Awarded for developing an AI-powered customer service chatbot that reduced support tickets by 30%",
    },
  ],
  openSourceContributions: [
    {
      id: "opensource-1",
      projectName: "React-Query",
      role: "Contributor",
      technologies: ["TypeScript", "React"],
      description:
        "Contributing to React-Query, a popular data-fetching library for React applications",
      contributions:
        "Implemented new features and fixed bugs related to cache management",
      links: [
        {
          platform: "GitHub",
          url: "github.com/tanstack/query/pulls?q=author%3Aarjun-dev",
        },
      ],
      startDate: { month: "June", year: "2022" },
      endDate: { month: "", year: "" },
      isOngoing: true,
    },
  ],
  customSections: [
    {
      id: "custom-1",
      title: "Technical Writing",
      subtitle: "Dev.to Blog",
      description:
        "Maintain a technical blog with focus on full-stack development best practices and tutorials",
      startDate: { month: "January", year: "2022" },
      endDate: { month: "", year: "" },
      isPresent: true,
    },
  ],
  isLoading: false,
  error: null,
};

export { demoResumeData };
