import { IUser } from "../models/Auth.model";
import authRepoInstance, { IAuthRepo } from "../Repositories/Auth.repo";

interface IAuthService{
    findUser(email:string):Promise<IUser | undefined>
    createUser(body: IUser): Promise<IUser>
}
class AuthService implements IAuthService{  
    constructor(private authRepo:IAuthRepo){}
    async findUser(email: string): Promise<IUser | undefined> {
        try {
            const user = await this.authRepo.findUserByEmail(email);
            return user ?? undefined
            
        } catch (error) {
            throw new Error("Error finding user by email")
        }
    }
    async createUser(body: IUser): Promise<IUser> {
        const createdUser = await this.authRepo.createUser(body);
        if (!createdUser) throw new Error("Failed to create user");
        const savedUser:IUser | undefined = await this.authRepo.saveUser(createdUser);
        if (!savedUser) throw new Error("Failed to save user");
        return savedUser
    }
}


export default new AuthService(authRepoInstance)