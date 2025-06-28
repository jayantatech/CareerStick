import { availableFonts } from "../utils/fonts";
import { generateFontStyles } from "./templateUtils";
export interface FontSettings {
  primary: string;
  secondary?: string;
  headerSize?: string;
  bodySize?: string;
  lineHeight?: string;
}

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  [key: string]: any;
}
export const generateModernTemplate = (
  data: ResumeData,
  fontSettings: FontSettings
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${data.personalInfo.firstName}'s Resume</title>
      ${Object.values(availableFonts)
        .filter((font) => font.url)
        .map((font) => `<link href="${font.url}" rel="stylesheet">`)
        .join("\n")}
      <style>
        ${generateFontStyles(fontSettings)}
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .experience-item {
          margin-bottom: 20px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Resume content -->
        <div class="header">
          <h1>${data.personalInfo.firstName} ${data.personalInfo.lastName}</h1>
          <p>${data.personalInfo.email} | ${data.personalInfo.phone || ""}</p>
        </div>
        
        <!-- Experience Section -->
        <div class="section">
          <h2>Experience</h2>
          ${data.experience
            .map(
              (exp: any) => `
            <div class="experience-item">
              <h3>${exp.position} at ${exp.company}</h3>
              <p>${exp.startDate} - ${exp.endDate}</p>
              ${exp.description.map((desc: any) => `<p>• ${desc}</p>`).join("")}
            </div>
          `
            )
            .join("")}
        </div>
        
        <!-- Add other sections -->
      </div>
    </body>
    </html>
  `;
};
