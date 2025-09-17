import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Ensure environment variables are available
const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
if (!bucketName) {
  throw new Error("AWS_S3_BUCKET_NAME environment variable is not set");
}
if (
  !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
  !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ||
  !process.env.NEXT_PUBLIC_AWS_REGION
) {
  throw new Error("One or more AWS environment variables are missing");
}

// Configure AWS S3 Client
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export enum folderNameEnum {
  profile = "profile",
  blog = "blog",
  generalFiles = "general-files",
}

export async function uploadToS3(
  file: File,
  folderName: folderNameEnum = folderNameEnum.profile
): Promise<string> {
  const fileName = `${folderName}/${Date.now()}-careerstick.com`;

  const params = {
    Bucket: bucketName as string, // Ensuring Bucket is treated as a string
    Key: fileName,
    Body: file,
    ContentType: file.type,
    // ACL: "public-read" as ObjectCannedACL, // Explicitly type `ACL` as `ObjectCannedACL`
  };

  try {
    // Create the PutObjectCommand
    const command = new PutObjectCommand(params);

    // Send the command to S3
    await s3.send(command);

    // The public URL for the uploaded file
    return `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("File upload to S3 failed");
  }
}
