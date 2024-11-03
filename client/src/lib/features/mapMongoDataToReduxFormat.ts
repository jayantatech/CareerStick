const mapMongoDataToReduxFormat = (mongoData: any) => {
  return {
    jobIndustry: {
      industry: mongoData.targetedJobAndIndustry?.industry || "",
      targetJob: mongoData.targetedJobAndIndustry?.targetJob || "",
      experience: mongoData.targetedJobAndIndustry?.experience || "",
    },
    personalInfo: {
      firstName: mongoData.personalInfo?.name?.split(" ")[0] || "",
      lastName:
        mongoData.personalInfo?.name?.split(" ").slice(1).join(" ") || "",
      email: mongoData.personalInfo?.email || "",
      phone: mongoData.personalInfo?.phoneNumber || "",
      city: mongoData.personalInfo?.location?.city || "",
      country: mongoData.personalInfo?.location?.country || "",
      address: "", // Add if available in MongoDB
      postalCode: "", // Add if available in MongoDB
      photo: mongoData.personalInfo?.image || null,
    },
    professionalSummary: {
      summaryText: mongoData.personalInfo?.summary || "",
    },
    workExperience:
      mongoData.workExperience?.map((job: any) => ({
        id: job._id || `job-${Math.random()}`,
        jobTitle: job.jobTitle || "",
        company: job.company || "",
        startDate: {
          month: job.startDate.month || "",
          year: job.startDate.year || "",
        },
        endDate:
          job.endDate === "Present"
            ? { month: "", year: "" }
            : {
                month: job.endDate.month || "",
                year: job.endDate.year || "",
              },
        isCurrentJob: job.isCurrentJob || false,
        location: `${job.location?.city || ""}${
          job.location?.state ? `, ${job.location.state}` : ""
        }${job.location?.country ? `, ${job.location.country}` : ""}`,
        description: job.responsibilities?.join("\n") || "",
      })) || [],
    education:
      mongoData.education?.map((edu: any) => ({
        id: edu._id || `edu-${Math.random()}`,
        degree: edu.degree || "",
        school: edu.institution || "",
        startDate: {
          month: new Date(edu.startDate).toLocaleString("default", {
            month: "long",
          }),
          year: new Date(edu.startDate).getFullYear().toString(),
        },
        endDate:
          edu.endDate === "Present"
            ? { month: "", year: "" }
            : {
                month: new Date(edu.endDate).toLocaleString("default", {
                  month: "long",
                }),
                year: new Date(edu.endDate).getFullYear().toString(),
              },
        isCurrentlyStudying: edu.endDate === "Present",
        location: `${edu.location?.city || ""}${
          edu.location?.state ? `, ${edu.location.state}` : ""
        }${edu.location?.country ? `, ${edu.location.country}` : ""}`,
        description: edu.relevantCourses?.join("\n") || "",
      })) || [],
    socialLinks: Object.entries(mongoData.personalInfo?.socialLinks || {}).map(
      ([platform, data]: [string, any]) => ({
        id: `social-${Math.random()}`,
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        url: data.url || "",
      })
    ),
    projects:
      mongoData.projects?.map((project: any) => ({
        id: project._id || `proj-${Math.random()}`,
        title: project.title || "",
        technologies: project.technologies || [],
        role: project.role || "",
        contributions: project.description || "",
        links: project.url ? [{ platform: "GitHub", url: project.url }] : [],
      })) || [],
    languages:
      mongoData.personalInfo?.languages?.map((lang: any) => ({
        id: `lang-${Math.random()}`,
        name: lang.language || "",
        proficiency: lang.proficiency || "",
        isCustom: false,
      })) || [],
    selectedSkills:
      mongoData.skills?.technicalSkills?.[0]?.skills?.map((skill: any) => ({
        id: `skill-${Math.random()}`,
        name: skill.name,
      })) || [],
    customSkills: [],
    certificate:
      mongoData.certifications?.map((cert: any) => ({
        id: cert._id || `cert-${Math.random()}`,
        name: cert.name || "",
        issuingOrganization: cert.issuingOrganization || "",
        issueDate: {
          month: new Date(cert.issueDate).toLocaleString("default", {
            month: "long",
          }),
          year: new Date(cert.issueDate).getFullYear().toString(),
        },
        expirationDate: cert.expirationDate
          ? {
              month: new Date(cert.expirationDate).toLocaleString("default", {
                month: "long",
              }),
              year: new Date(cert.expirationDate).getFullYear().toString(),
            }
          : { month: "", year: "" },
        credentialId: cert.credentialId || "",
        verificationUrl: "",
        description: "",
        isNeverExpires: !cert.expirationDate,
      })) || [],
    awards:
      mongoData.awards?.map((award: any) => ({
        id: award._id || `award-${Math.random()}`,
        name: award.name || "",
        issuer: award.issuingOrganization || "",
        date: {
          month: new Date(award.date).toLocaleString("default", {
            month: "long",
          }),
          year: new Date(award.date).getFullYear().toString(),
        },
        description: award.description || "",
      })) || [],
    openSourceContributions:
      mongoData.openSourceContributions?.map((contrib: any) => ({
        id: contrib._id || `opensource-${Math.random()}`,
        projectName: contrib.projectName || "",
        role: "",
        technologies: [],
        description: contrib.description || "",
        contributions: "",
        links: contrib.url ? [{ platform: "GitHub", url: contrib.url }] : [],
        startDate: {
          month: new Date(contrib.startDate).toLocaleString("default", {
            month: "long",
          }),
          year: new Date(contrib.startDate).getFullYear().toString(),
        },
        endDate:
          contrib.endDate === "Present"
            ? { month: "", year: "" }
            : {
                month: new Date(contrib.endDate).toLocaleString("default", {
                  month: "long",
                }),
                year: new Date(contrib.endDate).getFullYear().toString(),
              },
        isOngoing: contrib.endDate === "Present",
      })) || [],
    customSections:
      mongoData.customSections?.map((section: any) => ({
        id: section._id || `custom-${Math.random()}`,
        title: section.title || "",
        subtitle: "",
        description: section.content?.join("\n") || "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        isPresent: false,
      })) || [],
  };
};

export default mapMongoDataToReduxFormat;
