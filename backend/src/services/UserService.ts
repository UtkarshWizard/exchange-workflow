import { UserModel } from "../models/index.js"

export const createUser = async ({name , email , password} : {
    name: string,
    email : string,
    password: string
}) => {
    const existingUser = await UserModel.findOne({email});
    if (existingUser) throw new Error("User already exist");

    return UserModel.create({ name , email , password})
}

export const getUserbyId = async (id: string) => {
    const user = UserModel.findById(id);

    return user
}