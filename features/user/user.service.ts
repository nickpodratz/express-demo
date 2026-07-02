import type { User } from "./types/user.ts";
import { DatabaseQueryFailed, UsernameTaken, UsernameTooShort, UserNotFound } from "./user.errors.ts";
import userRepo from "./user.repo.ts"

const createUser = async (username: string): Promise<User> => {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort();
    }

    let user: User | undefined = undefined;
    try {
        user = await userRepo.create(username);
    } catch (err) {
        if ((err as any).code === "23505") {
            throw new UsernameTaken(username);
        } else {
            throw new DatabaseQueryFailed();
        }
    }

    return user;
}

const findUser = async (id: number): Promise<User> => {
    const user = await userRepo.find(id);
    
    if (!user) {
        throw new UserNotFound(id)
    }

    return user
}

const findAllUsers = async (): Promise<User[]> => {
    return await userRepo.findAll();
}

export default {
    create: createUser,
    find: findUser,
    findAll: findAllUsers
}