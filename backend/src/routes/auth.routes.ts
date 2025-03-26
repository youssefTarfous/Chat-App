import { Request, Response, Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
import googleAuthController from "../controllers/Oauth.controller";
import { validateLogin, validateRegister } from "../Schema/Login.schema";
import { validationResultHandler } from "../middlewares/Validation";
import authController from "../controllers/Auth.controller";
dotenv.config();
const router = Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authController.logout);



router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
router.get("/google/callback",googleAuthController.googleCallback);
router.get("/google/success",googleAuthController.loginSuccess);
router.get("/google/logout",googleAuthController.logout);
export default router;

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: process.env.FRONTEND_URL,
//     failureRedirect: "/login/error",
//   })
// );

// router.get("/login/error", (req, res) => {
//   console.log("Login failed");
//   res.status(401).send({
//     error: true,
//     messages: "Login failed",
//   });
// });

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       messages: "Login successful",
//       user: req.user,
//     });
//   } else {
//     res.status(403).send("Not authenticated");
//   }
// });
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).send("Error during logout");
//     }
//     res.redirect("/");
//   });
// });