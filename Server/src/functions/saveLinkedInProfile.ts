import LinkedInProfile from "../models/LinkedInProfileSchema";
import {
  LinkedInApiResponseProfileType,
  LinkedInProfileType,
} from "../types/linkedInProfileType";

const saveLinkedInProfile = async (
  profileData: LinkedInApiResponseProfileType,
  userId: string
) => {
  console.log("profileData to save", profileData);
  // Transform the data to match our schema
  const transformedProfile = {
    userId: userId,
    publicIdentifier: profileData.public_identifier,
    firstName: profileData.first_name,
    lastName: profileData.last_name,
    fullName: profileData.full_name,
    headline: profileData.headline,
    summary: profileData.summary,
    location: {
      country: profileData.country,
      city: profileData.city,
      state: profileData.state,
    },
    occupation: profileData.occupation,
    followerCount: profileData.follower_count,
    connections: profileData.connections,
    education: profileData.education
      .filter((edu: any) => edu.school && edu.degree_name)
      .map((edu: any) => ({
        startDate: new Date(
          edu.starts_at.year,
          edu.starts_at.month - 1,
          edu.starts_at.day
        ),
        endDate: edu.ends_at
          ? new Date(edu.ends_at.year, edu.ends_at.month - 1, edu.ends_at.day)
          : undefined,
        degreeName: edu.degree_name,
        school: edu.school,
        description: edu.description,
      })),
    experience: profileData.experiences
      .filter((exp: any) => exp.company && exp.title)
      .map((exp: any) => ({
        startDate: new Date(
          exp.starts_at.year,
          exp.starts_at.month - 1,
          exp.starts_at.day
        ),
        endDate: exp.ends_at
          ? new Date(exp.ends_at.year, exp.ends_at.month - 1, exp.ends_at.day)
          : undefined,
        company: exp.company,
        title: exp.title,
        description: exp.description,
        location: exp.location,
      })),
    certifications: profileData.certifications
      .filter((cert: any) => cert.name && cert.authority)
      .map((cert: any) => ({
        startDate: new Date(
          cert.starts_at.year,
          cert.starts_at.month - 1,
          cert.starts_at.day
        ),
        name: cert.name,
        authority: cert.authority,
        url: cert.url,
        licenseNumber: cert.license_number,
      })),
    languages: profileData.languages.map(
      (lang: any) => `${lang.name} (${lang.proficiency})`
    ),
    updatedAt: new Date(),
  };

  // Use findOneAndUpdate to either update existing profile or create new one
  // First check if profile exists with same publicIdentifier

  return transformedProfile;

  //   } catch (error) {
  //     console.error("Error saving LinkedIn profile:", error);
  //     res.status(500).json({
  //       success: false,
  //       error: "Failed to save LinkedIn profile",
  //     });
  //   }
};

export default saveLinkedInProfile;
