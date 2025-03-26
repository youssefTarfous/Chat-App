import LoginModel, { IUser } from "../models/Auth.model"

export interface IAuthRepo{
    findUserByEmail(email: string): Promise<IUser | undefined>
    createUser(body: IUser): Promise<IUser | undefined>
    saveUser(user:IUser): Promise<IUser | undefined>
}
class AuthRepo implements IAuthRepo{
    async findUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            const user:IUser | null =  await LoginModel.findOne({email})
            return user ?? undefined
        } catch (error) {
            throw new Error("Error finding user by email")
        }
    }
    async createUser(body: IUser): Promise<IUser | undefined> {
        try {
            const createdUser:IUser | undefined = await LoginModel.create(body)
            return createdUser
        } catch (error) {
            throw new Error("Error creating user")
        }
        
    }
    async saveUser(user: IUser | undefined): Promise<IUser | undefined> {
        try {
            return await user?.save();  
        } catch (error) {
            throw new Error("Error saving user")
        }
        
    }
}

const authRepoInstance = new AuthRepo()
export default authRepoInstance