import oAuthModel, { IOauthUser } from "../models/Oauth.model";
import { IOauthRepo } from "../Repositories/Oauth.repo";
import oauthRepoInstance from "../Repositories/Oauth.repo";

export interface Iprofile {
  id?: string;
  googleId: string;
  name: string;
  email: string;
  avatar: string;
}


interface IAuthService {
  findOrCreateUser(profile: Iprofile): Promise<IOauthUser | undefined>;
}

class GoogleAuthService implements IAuthService {
  constructor(private oauthRepo: IOauthRepo) {}

  async findOrCreateUser(profile: Iprofile): Promise<IOauthUser | undefined> {
    const { googleId } = profile;
    let user: IOauthUser | null = await oAuthModel.findOne({ googleId });
    if (!user) {
      const createdUser = await this.oauthRepo.createUser(profile);
      if (createdUser) user = await this.oauthRepo.saveUser(createdUser);
    }
    return user ?? undefined;
  }
}

export default new GoogleAuthService(oauthRepoInstance);
