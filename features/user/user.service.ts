import type { User } from "./types/user.ts";
import { UsernameTaken, UsernameTooShort, UserNotFound } from "./user.errors.ts";
import userRepo from "./user.repo.ts"

const createUser = async (username: string): Promise<User> => {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort();
    }

    if (await userRepo.checkUsernameTaken(username)) {
        throw new UsernameTaken(username);
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