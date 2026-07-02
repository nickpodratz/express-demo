import { type Response } from "express"
import { type Request } from "./types/Request.ts"
import sessionService from "./session.service.ts"
import authService from "./auth.service.ts"

interface LoginBody {
    username?: string
    password?: string
}

const login = (req: Request<any, any, LoginBody>, res: Response) => {
    const { username, password } = req.body ?? {}

    if (!username || !password) {
        return res.status(400).json({ error: "Username or password not provided." })
    }

    authService.assertCredentials(username, password)

    const sessionId = sessionService.create(username)

    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.send()
}

export const logout = (req: Request, res: Response) => {
    const sessionId = req.session!.id

    sessionService.delete(sessionId)

    res.clearCookie("sessionId", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    return res.json({ message: "User signed out successfully!" })
}

export default {
    login,
    logout
}
