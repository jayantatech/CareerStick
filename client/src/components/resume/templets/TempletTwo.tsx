import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1E90FF",
    borderBottomStyle: "solid",
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    marginTop: 10,
  },
  contactText: {
    fontSize: 10,
    color: "#666666",
    marginRight: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    borderBottomStyle: "solid",
    paddingBottom: 5,
  },
  summaryText: {
    fontSize: 11,
    color: "#4A4A4A",
    lineHeight: 1.5,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    fontSize: 11,
    backgroundColor: "#F0F8FF",
    padding: "5 10",
    borderRadius: 3,
    color: "#1E90FF",
    marginRight: 10,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 15,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  jobTitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 3,
  },
  dateLocation: {
    fontSize: 10,
    color: "#888888",
    marginTop: 3,
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    color: "#4A4A4A",
    lineHeight: 1.5,
  },
});

interface ResumeState {
  personalInfo: {
    firstName: string;
    phone: string;
    email: string;
    city: string;
    country: string;
  };
  jobIndustry: {
    targetJob: string;
  };
  professionalSummary: {
    summaryText: string;
  };
  workExperience?: Array<{
    company: string;
    jobTitle: string;
    location: string;
    startDate: { month: string; year: string };
    endDate: { month: string; year: string };
    isCurrentJob: boolean;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    startDate: { month: string; year: string };
    endDate: { month: string; year: string };
    isCurrentlyStudying: boolean;
    description?: string;
  }>;
  selectedSkills?: Array<{ name: string }>;
  certificate?: Array<{
    name: string;
    issuingOrganization: string;
    description: string;
  }>;
}

const TempletTwo = ({ data }: { data: ResumeState }) => {
  console.log("Rendering ResumeTwo template");
  const placeholderText = {
    name: data.personalInfo.firstName || "Enter your name",
    title: data.jobIndustry.targetJob || "Enter your job title",
    summary:
      data.professionalSummary.summaryText || "Enter your professional summary",
    phone: data.personalInfo.phone || "Enter phone number",
    email: data.personalInfo.email || "Enter email address",
    location: `${data.personalInfo.city || "City"}, ${
      data.personalInfo.country || "Country"
    }`,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{placeholderText.name}</Text>
          <Text style={styles.title}>{placeholderText.title}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>{placeholderText.phone}</Text>
            <Text style={styles.contactText}>{placeholderText.email}</Text>
            <Text style={styles.contactText}>{placeholderText.location}</Text>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summaryText}>{placeholderText.summary}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.skillsGrid}>
            {(data.selectedSkills || []).map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {skill.name || "Enter skill"}
              </Text>
            ))}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL Jay EXPERIENCE</Text>
          {(data.workExperience || []).map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.companyName}>
                {exp.company || "Enter company name"}
              </Text>
              <Text style={styles.jobTitle}>
                {exp.jobTitle || "Enter job title"}
              </Text>
              <Text style={styles.dateLocation}>
                {`${exp.startDate.month} ${exp.startDate.year} - ${
                  exp.isCurrentJob
                    ? "Present"
                    : `${exp.endDate.month} ${exp.endDate.year}`
                } | ${exp.location || "Enter location"}`}
              </Text>
              <Text style={styles.description}>
                {exp.description || "Enter job description"}
              </Text>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {(data.education || []).map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.companyName}>
                {edu.school || "Enter school name"}
              </Text>
              <Text style={styles.jobTitle}>
                {edu.degree || "Enter degree"}
              </Text>
              <Text style={styles.dateLocation}>
                {`${edu.startDate.month} ${edu.startDate.year} - ${
                  edu.isCurrentlyStudying
                    ? "Present"
                    : `${edu.endDate.month} ${edu.endDate.year}`
                }`}
              </Text>
              {edu.description && (
                <Text style={styles.description}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Certifications Section */}
        {data.certificate && data.certificate.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {data.certificate.map((cert, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.companyName}>
                  {cert.name || "Enter certification name"}
                </Text>
                <Text style={styles.jobTitle}>
                  {cert.issuingOrganization || "Enter issuing organization"}
                </Text>
                <Text style={styles.description}>
                  {cert.description || "Enter certification description"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default TempletTwo;
