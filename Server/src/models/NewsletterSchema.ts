// // const mongoose = require("mongoose");

// // const newsletterSchema = new mongoose.Schema({
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true,
// //     trim: true,
// //   },
// //   source: { type: String, required: true },
// //   subscriptionDate: { type: Date, default: Date.now },
// //   isActive: { type: Boolean, default: true },
// // });

// // export const Newsletter =
// //   mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);

// import mongoose, { Document, Schema, Model } from "mongoose";

// // Enum for subscription sources to ensure data consistency
// export enum SubscriptionSource {
//   WEBSITE = "website",
//   EVENT = "event",
//   REFERRAL = "referral",
//   SOCIAL_MEDIA = "social_media",
//   OTHER = "other",
// }

// // Interface for Metadata subdocument
// interface INewsletterMetadata {
//   firstName?: string;
//   lastName?: string;
//   preferences?: string[]; // Optional: Interest areas
// }

// // Interface for the full Subscriber document
// export interface INewsletterSubscriber extends Document {
//   email: string;
//   subscriptionDate: Date;
//   isActive: boolean;
//   source: SubscriptionSource;
//   metadata?: INewsletterMetadata;
// }

// // Create the Mongoose Schema
// const NewsletterSchema = new Schema<INewsletterSubscriber>(
//   {
//     email: {
//       type: String,
//       required: [true, "Email address is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please provide a valid email address",
//       ],
//     },
//     subscriptionDate: {
//       type: Date,
//       default: Date.now,
//       immutable: true, // Prevent modification after initial creation
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     source: {
//       type: String,
//       enum: Object.values(SubscriptionSource),
//       default: SubscriptionSource.WEBSITE,
//       required: [true, "Subscription source is required"],
//     },
//     metadata: {
//       type: {
//         firstName: {
//           type: String,
//           maxlength: [50, "First name cannot exceed 50 characters"],
//         },
//         lastName: {
//           type: String,
//           maxlength: [50, "Last name cannot exceed 50 characters"],
//         },
//         preferences: {
//           type: [String],
//           default: [],
//         },
//       },
//       default: {},
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//     collection: "newsletter_subscribers", // Explicit collection name
//   }
// );

// // Indexing for performance
// NewsletterSchema.index({ email: 1 }, { unique: true });
// NewsletterSchema.index({ isActive: 1, subscriptionDate: -1 });

// // Static method to check if email exists
// NewsletterSchema.statics.emailExists = async function (
//   email: string
// ): Promise<boolean> {
//   const subscriber = await this.findOne({ email: email.toLowerCase().trim() });
//   return !!subscriber;
// };

// // Create the model
// export const NewsletterSubscriber: Model<INewsletterSubscriber> =
//   mongoose.model<INewsletterSubscriber>(
//     "NewsletterSubscriber",
//     NewsletterSchema
//   );

// // Example usage
// async function createSubscriber(
//   email: string,
//   source: SubscriptionSource,
//   metadata?: INewsletterMetadata
// ) {
//   try {
//     const newSubscriber = new NewsletterSubscriber({
//       email,
//       source,
//       metadata,
//     });

//     await newSubscriber.save();
//     console.log("Subscriber created successfully");
//   } catch (error) {
//     console.error("Error creating subscriber:", error);
//   }
// }

import mongoose, { Schema } from "mongoose";

// Enum for subscription sources
export enum SubscriptionSource {
  WEBSITE = "website",
  EVENT = "event",
  REFERRAL = "referral",
  SOCIAL_MEDIA = "social_media",
  OTHER = "other",
}

// Create the Mongoose Schema
const NewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true, // Ensure email is unique
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    subscriptionDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    source: {
      type: String,
      enum: Object.values(SubscriptionSource),
      default: SubscriptionSource.WEBSITE,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "newsletterSubscribers",
  }
);

// Disable automatic index creation in production environments
// NewsletterSchema.set("autoIndex", process.env.NODE_ENV !== "production");

// Create the model
const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  NewsletterSchema
);

export default NewsletterSubscriber;
