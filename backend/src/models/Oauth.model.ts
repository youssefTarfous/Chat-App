import mongoose, { Schema, Document } from "mongoose";

export interface IOauthUser extends Document {
  googleId?: string;
  name: string;
  email: string;
  avatar: string;
}

// Google Schema definition
const GoogleSchema: Schema = new Schema<IOauthUser>(
  {
    googleId: { type: String, unique: true, sparse: true }, 
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);


const oAuthModel = mongoose.model<IOauthUser>("Google", GoogleSchema);

export default oAuthModel;
