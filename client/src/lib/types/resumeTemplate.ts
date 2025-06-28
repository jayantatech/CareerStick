export interface StyleConfig {
  fontSize: {
    body: "small" | "normal" | "large" | "extraLarge";
    heading: "small" | "normal" | "large" | "extraLarge";
  };
  margins: {
    page: "compact" | "normal" | "spacious";
    section: "compact" | "normal" | "spacious";
  };
  fontFamily:
    | "Helvetica"
    | "Times-Roman"
    | "Courier"
    | "Inter"
    | "Roboto"
    | "Merriweather";
  // | "font-montserrat"
  // | "font-merriweather";
  colorScheme: {
    primary: string;
    secondary: string;
    text: string;
  };
  lineHeight: "compact" | "normal" | "spacious";
  sectionSpacing: "compact" | "normal" | "spacious";
  activeSections: {
    jobIndustry: boolean;
    personalInfo: boolean;
    professionalSummary: boolean;
    workExperience: boolean;
    education: boolean;
    socialLinks: boolean;
    projects: boolean;
    languages: boolean;
    selectedSkills: boolean;
    certificate: boolean;
    awards: boolean;
    openSourceContributions: boolean;
    customSections: boolean;
  };
}
