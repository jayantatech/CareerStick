import { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  console.log(email, password, firstName, lastName);
  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
};

export { registerUser };
