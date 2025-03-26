import { Request, Response } from "express";
import passport from "passport";
import GoogleAuthService, { Iprofile } from "../Services/GoogleAuth.service";

interface IOauthController {
  googleCallback(req: Request, res: Response, next: Function): Promise<void>;
  loginSuccess(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}

class GoogleAuthController implements IOauthController {
  async googleCallback(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    passport.authenticate("google", async (err: Error, user: Iprofile) => {
      if (err || !user) {
        return res.status(401).json({ error: true, message: "Login failed" });
      }

      try {
        const createdUser = await GoogleAuthService.findOrCreateUser(user);
        if (!createdUser) {
          return res
            .status(500)
            .json({ error: true, message: "User creation failed" });
        }

        req.login(createdUser, (loginErr) => {
          if (loginErr) {
            return res
              .status(500)
              .json({ error: true, message: "Session creation failed" });
          }
          res.redirect(process.env.FRONTEND_URL!);
        });
      } catch (error) {
        console.error("Google Authentication Error:", error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    })(req, res, next);
  }

  async loginSuccess(req: Request, res: Response): Promise<void> {
    if (req.isAuthenticated()) {
      res
        .status(200)
        .json({ error: false, message: "Login successful", user: req.user });
    } else {
      res.status(403).json({ error: true, message: "Not authenticated" });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: true, message: "Error during logout" });
      }
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          return res
            .status(500)
            .json({ error: true, message: "Failed to destroy session" });
        }
        res.redirect(`${process.env.FRONTEND_URL!}/login`);
      });
    });
  }
}

const googleAuthController = new GoogleAuthController();
export default googleAuthController;
