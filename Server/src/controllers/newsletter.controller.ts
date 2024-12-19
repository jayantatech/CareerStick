import { Request, Response } from "express";
import NewsletterSubscriber, {
  SubscriptionSource,
} from "../models/NewsletterSchema";

const handleNewsletterSubscribe = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check for existing subscription
    const existingSubscriber = await NewsletterSubscriber.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({
      email: email.toLowerCase().trim(),
      name: name || "",
      source: SubscriptionSource.WEBSITE,
    });

    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Subscription error:", error);

    // Handle specific MongoDB duplicate key error
    if (error instanceof Error && "code" in error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default handleNewsletterSubscribe;
