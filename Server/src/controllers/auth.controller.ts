// import { Request, Response } from "express";
// // import User from "../models/user";
// import User from "../models/User";

// // Register with email and password
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists." });

//     const newUser = new User({ firstName, lastName, email, password });
//     await newUser.save();

//     const accessToken = newUser.generateAccessToken();
//     const refreshToken = newUser.generateRefreshToken();
//     res.status(201).json({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user." });
//   }
// };

// // Login with email and password
// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();
//     res.json({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in user." });
//   }
// };

// // Google callback (handled by Passport)
// export const googleAuthCallback = (req: Request, res: Response) => {
//   const accessToken = req.user?.generateAccessToken();
//   const refreshToken = req.user?.generateRefreshToken();
//   res.json({ accessToken, refreshToken });
// };
