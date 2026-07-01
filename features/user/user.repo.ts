import { getPostgresPool } from "../../db/pool.postgres.ts"
import type { User } from "./types/user.ts"

const pool = getPostgresPool();

const createUser = async (username: string): Promise<User> => {
    const result = await pool.query<User>(
        `
        INSERT INTO users (username)
        VALUES ($1)
        RETURNING id, username
        `,
        [username]
    )
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

const checkUsernameTaken = async (username: string): Promise<boolean> => {
    const result = await pool.query<[User]>(
        `
        SELECT id, username
        FROM users
        WHERE username = $1
        `,
        [username]
    )
    return result.rows.length >= 1;
}

export default {
    create: createUser,
    find: findUser,
    checkUsernameTaken
}