import mongoose, { Document, Schema } from "mongoose";
import Helper from "../utils/Helper";
// import PasswordManager from "../utils/Helper";

export interface IUser extends Document {
  _id: any;
  email: string;
  username: string;
  password: string;
}

const loginAuth: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

loginAuth.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await Helper.passwordHasher(
      this.password as string
    );
    next();
  } catch (error: any) {
    return next(error);
  }
});

const LoginModel = mongoose.model<IUser>("user", loginAuth);

export default LoginModel;
