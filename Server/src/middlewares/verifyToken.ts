import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import connectDB from "../config/connectDB";

// interface CustomRequest extends Request {
//   accessToken?: string | jwt.JwtPayload;
//   user?: IUser | null; // Add this line
// }
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;
    // console.log("accessToken", accessToken);
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No access token provided",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload;

    if (!decoded || !decoded._id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid or expired access token",
      });
    }

    // await connectDB();

    const user = await User.findById(decoded._id)
      .select("-password -refreshToken")
      .lean();

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid or expired access token",
      });
    }
    req.user = user as IUser;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid or expired access token",
    });
  }
};

export default verifyToken;
