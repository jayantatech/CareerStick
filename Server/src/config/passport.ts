// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/User";
// import connectDB from "./connectDB";
// // import User from "../models/user";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         await connectDB();
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new User({
//             googleId: profile.id,
//             email: profile.emails?.[0].value,
//             firstName: profile.name?.givenName,
//             lastName: profile.name?.familyName,
//             emailVerified: true,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             lastLogin: new Date(),
//           });
//           await user.save();
//         }

//         done(null, user);
//       } catch (error) {
//         done(error, undefined);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, (user as any)._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, undefined);
//   }
// });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/user.model";

// import { generateUsername } from "../utils/auth.utils";
import User from "../models/User";

export const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.API_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Create new user
            user = new User({
              googleId: profile.id,
              email: profile.emails?.[0].value,
              firstName: profile.name?.givenName || "Unknown",
              lastName: profile.name?.familyName || "Unknown",
              emailVerified: true,
              lastLogin: new Date(),
            });
            await user.save();
          } else {
            // Update last login
            user.lastLogin = new Date();
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  // Serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, (user as any)._id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  });
};
