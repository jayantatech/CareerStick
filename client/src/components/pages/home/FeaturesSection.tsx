import {
  Bot,
  Rocket,
  Shield,
  Wand2,
  FileCheck,
  Sparkles,
  Target,
  Files,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FaRegWindowRestore } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-4 bg-transparent  rounded flex flex-row justify-between  border  ", ///border-gray-100 bg-white shadow-sm
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "dark:bg-gray-800 dark:border-gray-700"
        // className
      )}
    >
      <div className="flex flex-row gap-4 ">
        <div className="inline-flex items-center justify-center w-10 h-10 -mt-1 rounded-lg text-blue-600  transition-colors duration-300 dark:bg-blue-900 dark:text-blue-200">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold font-heading text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed font-body  dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Resume Generator",
      description:
        "Create a personalized, professional resume in seconds with one click, tailored to your goals and powered by AI.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Quick AI ATS Optimizer",
      description:
        "Enhance your resume for ATS compatibility, ensuring it passes screenings and reaches recruiters effectively.",
    },
    {
      icon: <FaRegWindowRestore className="w-6 h-6" />,
      title: "Professional Templates Library",
      description:
        "Choose from expertly designed templates tailored for different industries and job types.",
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "AI-Powered Grammar Checker",
      description:
        "Fix grammar, spelling, and sentence structure errors instantly using AI tools. Deliver a polished and error-free resume every time.",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Resume Strength Analyzer",
      description:
        "Get AI-driven feedback on your resume to refine it and boost your job search success.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Custom Fonts And Colors",
      description:
        "Personalize your resume with a selection of fonts and colors to create a unique, professional look that reflects your style.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mobile-Friendly Editor",
      description:
        "Edit and update your resume conveniently from any mobile device, making changes on the go quick and hassle-free.",
    },
    {
      icon: <Files className="w-6 h-6" />,
      title: "Export As PDF Option",
      description:
        "Download a professionally formatted PDF version of your resume instantly.",
    },
    {
      icon: <MdOutlineTipsAndUpdates className="w-6 h-6" />,
      title: "Job-Specific AI Tips",
      description:
        "Receive tailored tips from AI to customize your resume for specific job roles and industries with precision.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-gray-900">
      {" "}
      {/*bg-gray-50 */}
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Features designed to help you win
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            your dream job
          </h3>
        </div> */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
            Essential Features for Job Seekers{" "}
            {/* <span className="block mt-2">your dream job</span> */}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={cn(
                // Add subtle entrance animations with different delays
                "opacity-1 animate-in fade-in-50 duration-1000 fill-mode-forwards",
                {
                  "delay-150": index % 3 === 0,
                  "delay-300": index % 3 === 1,
                  "delay-500": index % 3 === 2,
                }
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
