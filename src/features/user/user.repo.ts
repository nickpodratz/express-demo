import type { QueryResult } from "pg"
import { getPostgresPool } from "../../db/postgres.pool.ts"
import type { User } from "./types/user.ts"
import { DatabaseError } from "pg"
import { PG_ERROR_CODES } from "../../db/postgres.constants.ts"
import { UniqueConstraintViolation } from "../../db/postgres.errors.ts"
import assert from "node:assert"

const pool = getPostgresPool()

const createUser = async (username: string): Promise<User> => {
    let result: QueryResult<User> | undefined

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
        if (err instanceof DatabaseError && err.code === PG_ERROR_CODES.UNIQUE_VIOLATION) {
            throw new UniqueConstraintViolation()
        }
        throw err
    }

    const user = result.rows[0]
    assert(user, "INSERT returned no rows unexpectedly")
    return user
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
