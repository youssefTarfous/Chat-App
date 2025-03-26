import bcrypt from "bcrypt";
import { IUser } from "../models/Auth.model";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
class Helper {
  private static readonly SALT_ROUNDS = 10;

  static async passwordHasher(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(Helper.SALT_ROUNDS);
    return bcrypt.hash(plainPassword, salt);
  }

  static async passwordComparer(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  static async generateToken(user:IUser): Promise<string> {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    })
    return token
  }
}

export default Helper;
