import { UniqueConstraintViolation } from "../../db/postgres.errors.ts";
import type { User } from "./types/user.ts";
import { UsernameTaken, UsernameTooShort, UserNotFound } from "./user.errors.ts";
import userRepo from "./user.repo.ts"

const createUser = async (username: string): Promise<User> => {
    if (username.length < UsernameTooShort.minLength) {
        throw new UsernameTooShort();
    }

    let user: User
    try {
        user = await userRepo.create(username);
    } catch (err) {
        if (err instanceof UniqueConstraintViolation) throw new UsernameTaken(username)
        throw err
    }

    return user
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