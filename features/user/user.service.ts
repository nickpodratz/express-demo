import type { User } from "./types/user.ts";
import { UsernameTooShort, UserNotFound } from "./user.errors.ts";
import userRepo from "./user.repo.ts"

const createUser = async (username: string): Promise<User> => {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort();
    }

    return await userRepo.create(username);
}

const findUser = async (id: number): Promise<User> => {
    const user = await userRepo.find(id);
    
    if (!user) {
        throw new UserNotFound(id)
    }

    return user
}

export default {
    create: createUser,
    find: findUser
}