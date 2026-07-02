import type { QueryResult } from "pg";
import { getPostgresPool } from "../../db/pool.postgres.ts"
import type { User } from "./types/user.ts"
import { DatabaseQueryFailed, UsernameTaken } from "./user.errors.ts";

const pool = getPostgresPool();

const createUser = async (username: string): Promise<User> => {
    let result: QueryResult<User> | undefined = undefined

    try {
        result = await pool.query<User>(
            `
            INSERT INTO users (username)
            VALUES ($1)
            RETURNING id, username
            `,
            [username]
        )
    } catch (err) {
        const UNIQUE_CONSTRAINT_VIOLATION_CODE = "23505"
        if ((err as any).code === UNIQUE_CONSTRAINT_VIOLATION_CODE) {
            throw new UsernameTaken(username);
        } else {
            throw new DatabaseQueryFailed();
        }
    }

    return result.rows[0]!;
}

const findUser = async (id: number): Promise<User | null> => {
    const result = await pool.query<User>(
        `
        SELECT id, username
        FROM users
        WHERE id = $1
        `,
        [id]
    )
    return result.rows[0] ?? null
}

const findAllUsers = async (): Promise<User[]> => {
    const result = await pool.query<User>(
        `
        SELECT id, username
        FROM users
        `
    )
    return result.rows
}

export default {
    create: createUser,
    find: findUser,
    findAll: findAllUsers
}