import { Resend } from "resend";
import crypto from "crypto";

// Verify this is initialized with your Resend API key elsewhere in your app
const resend = new Resend(process.env.RESEND_API_KEY!);

interface VerificationEmailParams {
  email: string;
  verificationToken: string;
}

async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "careerstick Account Verification <support@careerstick.com>",
      to: [email],
      subject: "Verify Your Account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify Your Account</h2>
          <p>Thank you for signing up! To complete your registration, please click the button below:</p>
          <a href="${verificationLink}" 
             style="display: inline-block; 
                    background-color: #3B41E9; 
                    color: white; 
                    padding: 10px 20px; 
                    text-decoration: none; 
                    border-radius: 5px;">
            Verify Account
          </a>
          <p>If the button doesn't work, copy and paste this link in your browser:</p>
          <p>${verificationLink}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
      `,
    });

    // Handle sending result
    if (error) {
      console.error("Failed to send verification email", error);
      return {
        success: false,
        message: "Failed to send verification email",
        error,
      };
    }

    // Return the verification token for storing in your database
    return {
      success: true,
      message: "Verification email sent successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    throw error;
  }
}

async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "CareerStick Password Reset <support@careerstick.com>",
      to: [email],
      subject: "Password Reset Request",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password. Click the button below to reset:</p>
            <a href="${resetLink}"
               style="display: inline-block;
                      background-color: #3B41E9;
                      color: white;
                      padding: 10px 20px;
                      text-decoration: none;
                      border-radius: 5px;">
              Reset Password
            </a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
    });

    if (error) {
      console.error("Failed to send password reset email", error);
      return {
        success: false,
        message: "Failed to send password reset email",
        error,
      };
    }

    return {
      success: true,
      message: "Password reset email sent successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
    throw error;
  }
}

export { sendVerificationEmail, sendPasswordResetEmail };
