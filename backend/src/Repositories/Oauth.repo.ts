import oAuthModel, { IOauthUser } from "../models/Oauth.model";
import {  Iprofile } from "../Services/GoogleAuth.service";

export interface IOauthRepo {
  createUser(body:  Iprofile): Promise<IOauthUser>;
  saveUser(user: IOauthUser): Promise<IOauthUser | null>;
}

class OauthRepo implements IOauthRepo {
  async createUser(body: Iprofile): Promise<IOauthUser> {
    try {
      return await oAuthModel.create({
        googleId: body.googleId || undefined,
        name: body.name,
        email: body.email,
        avatar: body.avatar,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async saveUser(user: IOauthUser): Promise<IOauthUser | null> {
    try {
      return await user?.save();
    } catch (error) {
      console.error("Error saving user:", error);
      return null;
    }
  }
}

const oauthRepoInstance = new OauthRepo();
export default oauthRepoInstance;
