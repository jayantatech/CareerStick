import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

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
  verification_code?: string;
  verification_code_ExpiresAt: Date;
  emailVerified: boolean;
  lastLogin: Date;
  refreshToken: string;
  resetPasswordToken?: string | undefined;
  resetPasswordExpiresAt?: Date | undefined;
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
  verification_code: { type: String, required: false },
  verification_code_ExpiresAt: { type: Date, required: false },
  emailVerified: { type: Boolean, default: false, required: true },
  lastLogin: { type: Date, required: false },
  refreshToken: { type: String, required: false }, //have to change this to true
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.methods.generateVerificationCode = function () {
//   this.verification_code = Math.floor(100000 + Math.random() * 900000);
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET!, {
//     expiresIn: "7d",
//   });
// };

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       firstName: this.firstName,
//       email: this.email,
//       isSubscribed: this.isSubscribed,
//       subscribedPlan: this.subscribedPlan,
//     },
//     process.env.ACCESS_TOKEN_SECRET!
//   );
// };

const User = mongoose.model<IUser>("User", userSchema);

export default User;
