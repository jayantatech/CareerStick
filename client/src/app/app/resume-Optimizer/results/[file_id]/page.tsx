"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { FaParagraph, FaRuler, FaSpellCheck } from "react-icons/fa";

interface Issue {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  details: string;
}

// interface Category {
//   name: string;
//   score: number;
//   status: "locked" | "passed" | "warning";
//   icon?: React.ReactNode;
// }
import {
  FaMailBulk,
  FaBullseye,
  FaBookOpen,
  FaFileAlt,
  FaBriefcase,
  FaUserGraduate,
  FaCheckCircle,
  FaCalendarAlt,
  FaLinkedin,
  FaLanguage,
} from "react-icons/fa";

import { pdfjs } from "react-pdf";
// import ResumePreview from "@/components/app/ats/PDFPreview";
import AppHeader from "@/components/AppHeader";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ATSResults() {
  // const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const score = 75;
  const totalIssues = 6;

  // const categories: Category[] = [
  //   {
  //     name: "Content",
  //     score: 100,
  //     status: "passed",
  //     icon: <FileText className="h-4 w-4" />,
  //   },
  // ];

  const issues: Issue[] = [
    {
      title: "Missing Key Skills",
      description:
        "Add more relevant technical skills that match the job description.",
      severity: "high",
      details:
        "Your resume is missing key skills that are often required for this type of position. Consider adding skills such as project management, data analysis, or specific programming languages that are relevant to the job you're applying for.",
    },
    {
      title: "Improve Formatting",
      description:
        "Use consistent spacing and bullet points throughout the resume.",
      severity: "medium",
      details:
        "Inconsistent formatting can make your resume difficult to read. Ensure that you use the same font size and style throughout, and that your bullet points are aligned and formatted consistently.",
    },
    {
      title: "Section Headers",
      description: "Add clear section headers to improve readability.",
      severity: "medium",
      details:
        "Clear section headers help organize your resume and make it easier for recruiters to find the information they're looking for. Use bold, slightly larger font for your section headers, and ensure they stand out from the rest of the text.",
    },
    {
      title: "Contact Info",
      description: "Ensure all contact information is properly formatted.",
      severity: "low",
      details:
        "Your contact information should be prominently displayed at the top of your resume. Include your full name, phone number, email address, and location (city and state). Make sure this information is up-to-date and easy to read.",
    },
  ];

  // const checkItems = [
  //   {
  //     name: "Contact Info",
  //     score: 100,
  //     status: "passed",
  //     icon: <Mail className="h-5 w-5" />,
  //     description: "Essential contact details present and properly formatted",
  //   },
  //   {
  //     name: "Summary",
  //     score: 85,
  //     status: "passed",
  //     icon: <FileText className="h-4 w-4" />,
  //     description: "Clear and concise career summary",
  //   },
  //   {
  //     name: "Work Experience",
  //     score: 92,
  //     status: "passed",
  //     icon: <BriefcaseIcon className="h-4 w-4" />,
  //     description: "Detailed work history with achievements",
  //   },
  //   {
  //     name: "Education",
  //     score: 100,
  //     status: "passed",
  //     icon: <GraduationCap className="h-4 w-4" />,
  //     description: "Educational background properly listed",
  //   },
  //   {
  //     name: "Skills Section",
  //     score: 78,
  //     status: "warning",
  //     icon: <ListChecks className="h-4 w-4" />,
  //     description: "Technical and soft skills presentation",
  //   },
  //   {
  //     name: "Keywords Match",
  //     score: 65,
  //     status: "warning",
  //     icon: <Target className="h-4 w-4" />,
  //     description: "Job-specific keyword optimization",
  //   },
  //   {
  //     name: "Formatting",
  //     score: 95,
  //     status: "passed",
  //     icon: <Settings2 className="h-4 w-4" />,
  //     description: "Clean and consistent formatting",
  //   },
  //   {
  //     name: "File Format",
  //     score: 100,
  //     status: "passed",
  //     icon: <Link className="h-4 w-4" />,
  //     description: "ATS-compatible file format",
  //   },
  //   {
  //     name: "Achievements",
  //     score: 82,
  //     status: "passed",
  //     icon: <Award className="h-4 w-4" />,
  //     description: "Quantifiable achievements and results",
  //   },
  //   {
  //     name: "Chronological Order",
  //     score: 100,
  //     status: "passed",
  //     icon: <Calendar className="h-4 w-4" />,
  //     description: "Proper chronological work history",
  //   },
  //   {
  //     name: "Section Headers",
  //     score: 90,
  //     status: "passed",
  //     icon: <BookOpen className="h-4 w-4" />,
  //     description: "Clear and consistent section headers",
  //   },
  //   {
  //     name: "Contact Methods",
  //     score: 100,
  //     status: "passed",
  //     icon: <Phone className="h-4 w-4" />,
  //     description: "Multiple contact methods provided",
  //   },
  //   {
  //     name: "Overall Readability",
  //     score: 88,
  //     status: "passed",
  //     icon: <CheckCircle2 className="h-4 w-4" />,
  //     description: "Easy to read and scan content",
  //   },
  //   {
  //     name: "Critical Elements",
  //     score: 73,
  //     status: "warning",
  //     icon: <AlertTriangle className="h-4 w-4" />,
  //     description: "Essential resume components check",
  //   },
  // ];
  // const checkItems = [
  //   {
  //     name: "Contact Information",
  //     score: 100,
  //     status: "passed",
  //     icon: <Mail className="h-5 w-5" />,
  //     description:
  //       "Essential contact details are present and properly formatted.",
  //   },
  //   {
  //     name: "Keyword Optimization",
  //     score: 95,
  //     status: "passed",
  //     icon: <Target className="h-4 w-4" />,
  //     description:
  //       "Resume includes relevant keywords from the job description.",
  //   },
  //   {
  //     name: "Formatting Consistency",
  //     score: 90,
  //     status: "passed",
  //     icon: <Settings2 className="h-4 w-4" />,
  //     description:
  //       "Resume uses ATS-friendly formatting without tables or images.",
  //   },
  //   {
  //     name: "Section Headers",
  //     score: 88,
  //     status: "passed",
  //     icon: <BookOpen className="h-4 w-4" />,
  //     description: "Standard section headers are used for clear navigation.",
  //   },
  //   {
  //     name: "File Format",
  //     score: 85,
  //     status: "passed",
  //     icon: <Link className="h-4 w-4" />,
  //     description:
  //       "Resume is saved in an ATS-compatible format, such as .docx.",
  //   },
  //   {
  //     name: "Work Experience",
  //     score: 82,
  //     status: "passed",
  //     icon: <BriefcaseIcon className="h-4 w-4" />,
  //     description: "Detailed work history with achievements is provided.",
  //   },
  //   {
  //     name: "Education",
  //     score: 80,
  //     status: "passed",
  //     icon: <GraduationCap className="h-4 w-4" />,
  //     description: "Educational background is properly listed.",
  //   },
  //   {
  //     name: "Skills Section",
  //     score: 78,
  //     status: "warning",
  //     icon: <ListChecks className="h-4 w-4" />,
  //     description: "Technical and soft skills are clearly presented.",
  //   },
  //   {
  //     name: "Achievements",
  //     score: 75,
  //     status: "passed",
  //     icon: <Award className="h-4 w-4" />,
  //     description: "Quantifiable achievements and results are highlighted.",
  //   },
  //   {
  //     name: "Chronological Order",
  //     score: 73,
  //     status: "warning",
  //     icon: <Calendar className="h-4 w-4" />,
  //     description: "Work history is in reverse chronological order.",
  //   },
  //   {
  //     name: "Grammar and Spelling",
  //     score: 70,
  //     status: "warning",
  //     icon: <CheckCircle2 className="h-4 w-4" />,
  //     description: "Resume is free from grammatical errors and typos.",
  //   },
  //   {
  //     name: "Action Verbs Usage",
  //     score: 68,
  //     status: "warning",
  //     icon: <Zap className="h-4 w-4" />,
  //     description: "Strong action verbs are used to describe responsibilities.",
  //   },
  //   {
  //     name: "Professional Summary",
  //     score: 65,
  //     status: "warning",
  //     icon: <FileText className="h-4 w-4" />,
  //     description: "A clear and concise career summary is included.",
  //   },
  //   {
  //     name: "Bullet Point Optimization",
  //     score: 63,
  //     status: "warning",
  //     icon: <List className="h-4 w-4" />,
  //     description:
  //       "Bullet points are concise and effectively describe experiences.",
  //   },
  //   {
  //     name: "Font Consistency",
  //     score: 60,
  //     status: "warning",
  //     icon: <Calendar className="h-4 w-4" />,
  //     description:
  //       "Standard fonts are used consistently throughout the resume.",
  //   },
  //   {
  //     name: "Date Formatting",
  //     score: 58,
  //     status: "warning",
  //     icon: <Calendar className="h-4 w-4" />,
  //     description: "Employment dates are consistently formatted.",
  //   },
  //   {
  //     name: "File Size",
  //     score: 55,
  //     status: "warning",
  //     icon: <File className="h-4 w-4" />,
  //     description: "Resume file size is optimized for ATS processing.",
  //   },
  //   {
  //     name: "LinkedIn Profile",
  //     score: 53,
  //     status: "warning",
  //     icon: <Linkedin className="h-4 w-4" />,
  //     description: "LinkedIn profile link is included and up-to-date.",
  //   },
  //   {
  //     name: "Cover Letter",
  //     score: 50,
  //     status: "warning",
  //     icon: <FileText className="h-4 w-4" />,
  //     description: "A tailored cover letter accompanies the resume.",
  //   },
  //   {
  //     name: "Certifications",
  //     score: 48,
  //     status: "warning",
  //     icon: <Award className="h-4 w-4" />,
  //     description: "Relevant certifications are listed appropriately.",
  //   },
  //   {
  //     name: "Language Proficiency",
  //     score: 45,
  //     status: "warning",
  //     icon: <Globe className="h-4 w-4" />,
  //     description: "Language skills are clearly stated.",
  //   },
  //   {
  //     name: "Hobbies and Interests",
  //     score: 43,
  //     status: "warning",
  //     icon: <Heart className="h-4 w-4" />,
  //     description: "Relevant hobbies and interests are included.",
  //   },
  //   {
  //     name: "References",
  //     score: 40,
  //     status: "warning",
  //     icon: <Users className="h-4 w-4" />,
  //     description: "References are available upon request.",
  //   },
  //   {
  //     name: "Volunteer Experience",
  //     score: 38,
  //     status: "warning",
  //     icon: <FaHandsHelping className="h-4 w-4" />,
  //     description: "Volunteer work is included if relevant.",
  //   },
  //   {
  //     name: "Projects",
  //     score: 35,
  //     status: "warning",
  //     icon: <Folder className="h-4 w-4" />,
  //     description: "Significant projects are highlighted.",
  //   },
  //   {
  //     name: "Publications",
  //     score: 33,
  //     status: "warning",
  //     icon: <Book className="h-4 w-4" />,
  //     description: "Relevant publications are listed.",
  //   },
  //   {
  //     name: "Patents",
  //     score: 30,
  //     status: "warning",
  //     icon: <FilePlus className="h-4 w-4" />,
  //     description: "Patents are included if applicable.",
  //   },
  //   {
  //     name: "Professional Affiliations",
  //     score: 28,
  //     status: "warning",
  //     icon: <Briefcase className="h-4 w-4" />,
  //     description: "Memberships in professional organizations are listed.",
  //   },
  // ];
  const checkItems = [
    {
      name: "Contact Information",
      score: 100,
      status: "passed",
      icon: <FaMailBulk className="text-blue-500" />,
      description:
        "Essential contact details are present and properly formatted.",
    },
    {
      name: "LinkedIn Profile",
      score: 53,
      status: "warning",
      icon: <FaLinkedin className="text-blue-700" />,
      description: "LinkedIn profile link is included and up-to-date.",
    },
    {
      name: "Keyword Match",
      score: 95,
      status: "passed",
      icon: <FaBullseye className="text-green-500" />,
      description:
        "Resume includes relevant keywords from the job description.",
    },
    {
      name: "Job Customization",
      score: 52,
      status: "warning",
      icon: <FaBullseye className="text-purple-700" />,
      description:
        "Assessment of resume tailoring to specific job requirements",
    },
    {
      name: "Format Consistency",
      score: 72,
      status: "warning",
      icon: <FaParagraph className="text-purple-600" />,
      description: "Check for consistent formatting, spacing, and styling",
    },
    {
      name: "Resume Length",
      score: 92,
      status: "passed",
      icon: <FaRuler className="text-yellow-500" />,
      description:
        "Evaluation of resume length based on career level and industry standards",
    },
    {
      name: "Section Headers",
      score: 88,
      status: "passed",
      icon: <FaBookOpen className="text-orange-500" />,
      description: "Standard section headers are used for clear navigation.",
    },
    {
      name: "File Format & Size",
      score: 85,
      status: "passed",
      icon: <FaFileAlt className="text-teal-500" />,
      description:
        "Resume is saved in an ATS-compatible format, such as .docx.",
    },
    {
      name: "Work Experience",
      score: 82,
      status: "passed",
      icon: <FaBriefcase className="text-purple-500" />,
      description: "Detailed work history with achievements is provided.",
    },
    {
      name: "Education",
      score: 80,
      status: "passed",
      icon: <FaUserGraduate className="text-indigo-500" />,
      description: "Educational background is properly listed.",
    },
    {
      name: "Grammar & Spelling",
      score: 85,
      status: "passed",
      icon: <FaSpellCheck className="text-red-500" />,
      description:
        "Detailed grammar and spelling check with correction suggestions",
    },
    {
      name: "Action Verbs Usage",
      score: 68,
      status: "warning",
      icon: <FaCheckCircle className="text-red-400" />,
      description: "Strong action verbs are used to describe responsibilities.",
    },

    {
      name: "Date Formatting",
      score: 58,
      status: "warning",
      icon: <FaCalendarAlt className="text-gray-500" />,
      description: "Employment dates are consistently formatted.",
    },
    {
      name: "Language Proficiency",
      score: 45,
      status: "warning",
      icon: <FaLanguage className="text-pink-500" />,
      description: "Language skills are clearly stated.",
    },
  ];
  // const checkItems = [
  //   {
  //     name: "Contact Details",
  //     score: 100,
  //     status: "passed",
  //     icon: <FaUserAlt className="text-blue-500" />,
  //     description:
  //       "Verification of complete and properly formatted contact information",
  //   },
  //   {
  //     name: "ATS Compatibility",
  //     score: 95,
  //     status: "passed",
  //     icon: <FaRobot className="text-green-500" />,
  //     description:
  //       "Analysis of resume parsing success rate through ATS systems",
  //   },
  //   {
  //     name: "Resume Length",
  //     score: 92,
  //     status: "passed",
  //     icon: <FaRuler className="text-yellow-500" />,
  //     description:
  //       "Evaluation of resume length based on career level and industry standards",
  //   },
  //   {
  //     name: "File Format & Size",
  //     score: 90,
  //     status: "passed",
  //     icon: <FaFileAlt className="text-purple-500" />,
  //     description:
  //       "Verification of ATS-friendly file format and optimal file size",
  //   },
  //   {
  //     name: "Content Structure",
  //     score: 88,
  //     status: "passed",
  //     icon: <FaColumns className="text-indigo-500" />,
  //     description: "Assessment of essential sections and their organization",
  //   },
  //   {
  //     name: "Grammar & Spelling",
  //     score: 85,
  //     status: "passed",
  //     icon: <FaSpellCheck className="text-red-500" />,
  //     description:
  //       "Detailed grammar and spelling check with correction suggestions",
  //   },
  //   {
  //     name: "Action Verbs",
  //     score: 82,
  //     status: "passed",
  //     icon: <FaBolt className="text-orange-500" />,
  //     description:
  //       "Analysis of strong action verb usage in experience descriptions",
  //   },
  //   {
  //     name: "Skills Balance",
  //     score: 80,
  //     status: "passed",
  //     icon: <FaTools className="text-teal-500" />,
  //     description: "Evaluation of hard and soft skills distribution",
  //   },
  //   {
  //     name: "Impact Quantification",
  //     score: 78,
  //     status: "warning",
  //     icon: <FaChartLine className="text-green-600" />,
  //     description: "Assessment of measurable achievements and results",
  //   },
  //   {
  //     name: "Keyword Optimization",
  //     score: 75,
  //     status: "warning",
  //     icon: <FaSearch className="text-blue-600" />,
  //     description: "Analysis of industry-relevant keyword usage and placement",
  //   },
  //   {
  //     name: "Formatting Consistency",
  //     score: 72,
  //     status: "warning",
  //     icon: <FaParagraph className="text-purple-600" />,
  //     description: "Check for consistent formatting, spacing, and styling",
  //   },
  //   {
  //     name: "Bullet Point Structure",
  //     score: 70,
  //     status: "warning",
  //     icon: <FaList className="text-gray-500" />,
  //     description: "Optimization of bullet point length and content structure",
  //   },
  //   {
  //     name: "Active Voice Usage",
  //     score: 68,
  //     status: "warning",
  //     icon: <FaPen className="text-pink-500" />,
  //     description: "Assessment of active voice usage in descriptions",
  //   },
  //   {
  //     name: "Employment Gaps",
  //     score: 65,
  //     status: "warning",
  //     icon: <FaCalendarTimes className="text-red-600" />,
  //     description: "Identification and analysis of career timeline gaps",
  //   },
  //   {
  //     name: "Professional Branding",
  //     score: 62,
  //     status: "warning",
  //     icon: <FaUserTie className="text-blue-800" />,
  //     description: "Evaluation of personal brand consistency and presentation",
  //   },
  //   {
  //     name: "LinkedIn Integration",
  //     score: 60,
  //     status: "warning",
  //     icon: <FaLinkedin className="text-blue-700" />,
  //     description: "Assessment of LinkedIn profile alignment and integration",
  //   },
  //   {
  //     name: "Buzzword Analysis",
  //     score: 58,
  //     status: "warning",
  //     icon: <FaBullhorn className="text-yellow-600" />,
  //     description: "Identification of overused phrases and industry clichés",
  //   },
  //   {
  //     name: "Readability Score",
  //     score: 55,
  //     status: "warning",
  //     icon: <FaBook className="text-green-700" />,
  //     description:
  //       "Analysis of content clarity and reading level appropriateness",
  //   },
  //   {
  //     name: "Job Customization",
  //     score: 52,
  //     status: "warning",
  //     icon: <FaBullseye className="text-purple-700" />,
  //     description:
  //       "Assessment of resume tailoring to specific job requirements",
  //   },
  //   {
  //     name: "Design Elements",
  //     score: 50,
  //     status: "warning",
  //     icon: <FaPalette className="text-pink-600" />,
  //     description: "Evaluation of visual presentation and professional design",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-[#F3F5F6] ">
      <AppHeader title="ATS Resume Checker" />
      <div className="max-w-[1400px] mx-auto flex gap-4 p-3 max-md:flex-col max-s-desktop:flex-col ">
        {/* First Column - Score and Categories */}
        <div className="w-auto flex h-auto gap-6 max-md:flex-col">
          <div className="w-[360px] max-md:w-full max-s-desktop:w-[440px] space-y-4 ">
            <Card className="p-6 rounded">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-6">Your Score</h2>
                <div className="space-y-2">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Overall Score</span>
                    <span className="font-medium text-[#3B41E9]">{score}%</span>
                  </div>
                  <Progress value={score} className="h-3 bg-[#EFF0FD]" />
                  <p className="text-sm text-gray-500 text-right">
                    {totalIssues} Issues Found
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  className="flex-1 rounded hover:text-white bg-primary hover:bg-primary/90 text-white"
                  variant="outline"
                >
                  Fix All Issues & Generate ATS Resume
                </Button>
              </div>

              {/* <div className="space-y-1">
              {/* {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-2 bg-white rounded hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        category.score >= 80
                          ? "text-green-500"
                          : category.score >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {category.score}%
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))} 
            </div> */}
            </Card>

            <Card className="p-6 rounded">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">
                  ATS Parse Results
                </h3>
                <div className="bg-[#EFF0FD] p-4 rounded">
                  <div className="flex items-center gap-2 text-[#3B41E9]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Great!</span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    We parsed 100% of your resume successfully using an
                    industry-leading ATS.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex justify-between items-center">
                  Major Issues to Fix
                  <span className="text-sm text-gray-500">
                    {issues.length} Issues
                  </span>
                </h3>
                <ScrollArea className="h-[240px] pr-4">
                  <div className="space-y-2">
                    {issues.map((issue, index) => (
                      // <Dialog key={index}>
                      //   <DialogTrigger asChild>
                      //     <div className="flex gap-4 p-4 bg-white rounded border cursor-pointer hover:bg-gray-50">
                      //       <AlertTriangle
                      //         className={`h-5 w-5 flex-shrink-0 ${
                      //           issue.severity === "high"
                      //             ? "text-red-500"
                      //             : issue.severity === "medium"
                      //             ? "text-yellow-500"
                      //             : "text-blue-500"
                      //         }`}
                      //       />
                      //       <div>
                      //         <h4 className="font-medium">{issue.title}</h4>
                      //         <p className="text-sm text-gray-600">
                      //           {issue.description}
                      //         </p>
                      //       </div>
                      //     </div>
                      //   </DialogTrigger>
                      //   <DialogContent className="sm:max-w-[425px]">
                      //     <DialogHeader>
                      //       <DialogTitle>{issue.title}</DialogTitle>
                      //     </DialogHeader>
                      //     <div className="mt-4">
                      //       <p className="text-sm text-gray-600">
                      //         {issue.details}
                      //       </p>
                      //     </div>
                      //     <div className="mt-6">
                      //       <h4 className="font-medium mb-2">Other Issues</h4>
                      //       <ScrollArea className="h-24">
                      //         <div className="flex gap-2">
                      //           {issues.map((otherIssue, otherIndex) => (
                      //             <div
                      //               key={otherIndex}
                      //               className={`p-2 rounded-md cursor-pointer ${
                      //                 otherIssue.title === issue.title
                      //                   ? "bg-[#3B41E9] text-white"
                      //                   : "bg-gray-100 hover:bg-gray-200"
                      //               }`}
                      //               onClick={() => setSelectedIssue(otherIssue)}
                      //             >
                      //               {otherIssue.title}
                      //             </div>
                      //           ))}
                      //         </div>
                      //       </ScrollArea>
                      //     </div>
                      //     <div className="mt-6 flex justify-between">
                      //       <Button variant="outline">Fix This Issue</Button>
                      //       <Button className="bg-[#3B41E9] hover:bg-[#3B41E9]/90">
                      //         Generate ATS Resume
                      //       </Button>
                      //     </div>
                      //   </DialogContent>
                      // </Dialog>
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <div className="flex gap-4 p-4 bg-white rounded border cursor-pointer hover:bg-gray-50">
                            <AlertTriangle
                              className={`h-5 w-5 flex-shrink-0 ${
                                issue.severity === "high"
                                  ? "text-red-500"
                                  : issue.severity === "medium"
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                              }`}
                            />
                            <div>
                              <h4 className="font-medium">{issue.title}</h4>
                              <p className="text-sm text-gray-600">
                                {issue.description}
                              </p>
                            </div>
                          </div>
                        </DialogTrigger>

                        {/* Improved Dialog Content */}
                        <DialogContent className="sm:max-w-[590px]">
                          <div className="p-3 space-y-6">
                            {/* Header Section */}
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3 items-center">
                                  <AlertTriangle
                                    className={`h-5 w-5 ${
                                      issue.severity === "high"
                                        ? "text-red-500"
                                        : issue.severity === "medium"
                                        ? "text-yellow-500"
                                        : "text-blue-500"
                                    }`}
                                  />
                                  <DialogTitle className="text-xl font-semibold">
                                    {issue.title}
                                  </DialogTitle>
                                </div>
                                <div
                                  className={`px-2 py-0.5 rounded border capitalize mr-4 text-sm ${
                                    issue.severity === "high"
                                      ? "bg-red-50 text-red-600"
                                      : issue.severity === "medium"
                                      ? "bg-yellow-50 text-yellow-600"
                                      : "bg-blue-50 text-blue-600"
                                  }`}
                                >
                                  {issue.severity} priority
                                </div>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="border-t border-b py-6">
                              <p className="text-gray-600 leading-relaxed">
                                {issue.details}
                              </p>
                            </div>

                            {/* Action Button */}
                            <div>
                              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg font-medium">
                                Fix and Generate New Resume
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* <div className="flex gap-4 mt-6">
              <Button className="flex-1 rounded" variant="outline">
                Fix Issues & Generate ATS Resume
              </Button>
            </div> */}
            </Card>
          </div>

          {/* Second Column - Resume Preview */}
          <div className="flex-1">
            <Card className="p-6 h-[774px] w-[480px] max-md:w-full max-md:h-[580px] rounded">
              <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
              <div className="h-[calc(100%-3rem)] bg-white border-2 border-dashed border-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Resume Preview</span>
              </div>
            </Card>
          </div>
        </div>

        {/* <ResumePreview /> */}

        {/* Third Column - ATS Compatibility Checklist */}
        <div className="w-[484px] max-s-desktop:w-full h-auto max-md:w-full">
          <Card className="p-6 rounded">
            <h2 className="text-xl font-semibold mb-4">
              ATS Compatibility Checklist
            </h2>
            <ScrollArea className="h-[680px] pr-4 max-md:pr-0">
              <div className="w-full h-[60px] bg-red-2d00 mb-2.5">
                <div className="space-y-2 border p-2 rounded">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Job Match Score</span>
                    <span className="font-medium text-[#3B41E9]">{score}%</span>
                  </div>
                  <Progress
                    value={score}
                    className="h-3 bg-[#EFF0FD] rounded"
                  />
                  {/* <p className="text-sm text-gray-500 text-right">
                    {totalIssues} Issues Found
                  </p> */}
                </div>
              </div>
              <div className="grid grid-cols-2 max-s-desktop:grid-cols-4 max-md:grid-cols-1 gap-4">
                {checkItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white  relative p-2.5 rounded border hover:border-blue-200  duration-200 cursor-pointer hover:scale-[.98] transition-all"
                  >
                    <div className="absolute -top-2 right-2 w-[60px] hidden h-[16px] p-0.5 flex items-center justify-center rounded-[2px]  border border-red-200 bg-red-100">
                      <span className="text-xs font-heading">2 Issues</span>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        //   className={`p-1 rounded ${
                        //     item.score >= 90
                        //       ? "bg-green-100 text-green-600"
                        //       : item.score >= 80
                        //       ? "bg-blue-100 text-blue-600"
                        //       : item.score >= 70
                        //       ? "bg-yellow-100 text-yellow-600"
                        //       : "bg-red-100 text-red-600"
                        //   }`}
                        // >
                        className={`p-1 rounded border bg-gray-100`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-900">
                          {item.name}
                        </h3>
                        {/* {item.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {item.description}
                          </p>
                        )} */}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Score</span>
                        <span
                          className={`text-sm font-medium ${
                            item.score >= 90
                              ? "text-green-600"
                              : item.score >= 80
                              ? "text-blue-600"
                              : item.score >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.score}%
                        </span>
                      </div>
                      <Progress
                        value={item.score}
                        color="red"
                        className={`h-1.5 rounded `}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
