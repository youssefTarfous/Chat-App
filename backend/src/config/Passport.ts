import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import GoogleAuthService, { Iprofile } from "../Services/GoogleAuth.service";
import { IOauthUser } from "../models/Oauth.model";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      if (
        !profile ||
        !profile.displayName ||
        !profile.emails ||
        !profile.emails[0]?.value
      ) {
        return done(new Error("Missing profile data"), undefined);
      }
      const name = profile.displayName || profile.username;
      const email = profile.emails?.[0]?.value;

      if (!name || !email) {
        console.log("Missing name or email in the profile data.");
        return undefined;
      }
      const body: Iprofile = {
        googleId: profile.id,
        name,
        email,
        avatar: profile.photos?.[0]?.value || "default-avatar-url.jpg",
      };
      const user: IOauthUser | undefined =
        await GoogleAuthService.findOrCreateUser(body);
      return done(null, user);
    }
  )
);
passport.serializeUser((user: any, done) => {
  if (user) {
    done(null, user);
  } else {
    done(new Error("User data is incomplete"));
  }
});

passport.deserializeUser(async (user: any, done) => {
  try {
    if (!user) {
      return done(new Error("User not found"), null);
    }
    return done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    return done(error);
  }
});
