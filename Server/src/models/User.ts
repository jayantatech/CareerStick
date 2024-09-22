import e from "express";
import mongoose, { Schema, Document } from "mongoose";

enum subscribedPlan {
  FREE = "free",
  PREMIUM = "premium",
  SPONSOR = "sponsor",
  ADMIN = "admin",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verification_code: number;
  emailVerified: boolean;
  lastLogin: Date;
  refreshToken: string;
  resetPasswordToken: string;
  resetPasswordExpiresAt: Date;
  isSubscribed: boolean;
  subscribedPlan: subscribedPlan;
  preferences: {
    darkMode: boolean;
    language: string;
    theme: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: { type: String, required: true },
  verification_code: { type: Number, required: false },
  emailVerified: { type: Boolean, default: false, required: true },
  lastLogin: { type: Date, required: true },
  refreshToken: { type: String, required: true },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpiresAt: { type: Date, required: false },
  isSubscribed: { type: Boolean, default: false, required: true },
  subscribedPlan: {
    type: String,
    default: subscribedPlan.FREE,
    required: true,
  },
  preferences: {
    darkMode: { type: Boolean, default: false, required: true },
    language: { type: String, default: "en", required: true },
    theme: { type: String, default: "light", required: true },
  },

  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

userSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
