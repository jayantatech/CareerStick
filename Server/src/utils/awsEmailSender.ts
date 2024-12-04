import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;

  const params = {
    Source: process.env.SENDER_EMAIL!, // Verified SES email
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Verify Your Email Address",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F3F5F6;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            padding: 40px;
            text-align: center;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 30px;
        }
        .verification-title {
            color: #3B41E9;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .verification-text {
            color: #333;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .verify-button {
            display: inline-block;
            background-color: #3B41E9;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }
        .verify-button:hover {
            background-color: #2A30B8;
        }
        .footer-text {
            color: #666;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://via.placeholder.com/150" alt="Company Logo" class="logo">
        
        <h1 class="verification-title">Verify Your Email</h1>
        
        <p class="verification-text">
            Thank you for signing up! To complete your registration, 
            please click the button below to verify your email address.
        </p>
        
        <a href="${verificationLink}" class="verify-button">Verify Email Address</a>
        
        <p class="footer-text">
            If you didn't request this verification, please ignore this email 
            or contact our support team.
        </p>
    </div>
</body>
</html>
            `,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    // console.log("Verification email sent successfully", response);
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

export default sendVerificationEmail;
