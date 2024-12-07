// src/services/emailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter function
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Generic email send function
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Email template functions
const getVerificationEmailTemplate = (verificationLink: string) => `
  <h1>Email Verification</h1>
  <p>Click the link below to verify your email:</p>
  <a href="${verificationLink}">Verify Email</a>
  <p>This link will expire in 1 hour.</p>
`;

const getPasswordResetTemplate = (resetLink: string) => `
  <h1>Password Reset Request</h1>
  <p>You have requested to reset your password. Click the link below:</p>
  <a href="${resetLink}">Reset Password</a>
  <p>This link will expire in 30 minutes.</p>
`;

const getPasswordChangedTemplate = (timestamp: string) => `
  <h1>Password Changed</h1>
  <p>Your account password was successfully changed on ${timestamp}.</p>
  <p>If you did not make this change, please contact support immediately.</p>
`;

// Specific email sending functions
const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  return sendEmail(
    email,
    "Verify Your Email",
    getVerificationEmailTemplate(verificationLink)
  );
};

const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  return sendEmail(
    email,
    "Password Reset Request",
    getPasswordResetTemplate(resetLink)
  );
};

const sendPasswordChangedConfirmation = async (email: string) => {
  return sendEmail(
    email,
    "Password Changed",
    getPasswordChangedTemplate(new Date().toLocaleString())
  );
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedConfirmation,
};
