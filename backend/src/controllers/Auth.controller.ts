import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import AuthService from "../Services/Auth.service";
import { IUser } from "../models/Auth.model";
import Helper from "../utils/Helper";

interface IAuthController {
  register(req: Request, res: Response): Promise<string | Response | any>;
  login(req: Request, res: Response): Promise<string | Response | any>;
  logout(req: Request, res: Response): Promise<string | Response | any>;
}

const handleError = (res: Response, error: any, message: string) => {
  console.error(`${message}:`, error);
  res.status(500).json({ error: true, message: "Internal Server Error" });
};

class AuthController implements IAuthController {
  async login(req: Request, res: Response): Promise<string | Response | any> {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const body: IUser = matchedData(req);
      const user = await AuthService.findUser(body.email);
      if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      const comparePassword = await Helper.passwordComparer(
        body.password,
        user.password
      );
      if (!comparePassword) {
        return res
          .status(401)
          .json({ error: true, message: "Incorrect password" });
      }

      const token = await Helper.generateToken(user);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ error: false, message: "Login successful" });
    } catch (error) {
      return handleError(res, error, "Login Error");
    }
  }

  async register(
    req: Request,
    res: Response
  ): Promise<string | Response | any> {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const body: IUser = matchedData(req);
      const existingUser = await AuthService.findUser(body.email);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: true, message: "Email already registered" });
      }

      const newUser: IUser = await AuthService.createUser(body);
      const token = await Helper.generateToken(newUser);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(201)
        .json({ error: false, message: "Registration successful" });
    } catch (error) {
      return handleError(res, error, "Registration Error");
    }
  }

  async logout(req: Request, res: Response): Promise<string | Response | any> {
    try {
      res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res
        .status(200)
        .json({ error: false, message: "Logout successful" });
    } catch (error) {
      return handleError(res, error, "Logout Error");
    }
  }
}

const authController = new AuthController();
export default authController;
