import { type Response } from "express"
import { type Request } from './types/Request.ts';
import sessionService from './session.service.ts';
import authService from './auth.service.ts';

interface LoginQuery { username?: string, password?: string };

const login = (req: Request<any, any, any, LoginQuery>, res: Response) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: "Username or password not provided." })
    }

    const isLoginValid = authService.validateCredentials(username, password);
    if (!isLoginValid) {
        return res.status(401).json({ error: "Authentication failed" })
    }

    const sessionId = sessionService.create(username);
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
    });

    return res.json({ message: "User signed out successfully!" });
}

export default {
    login,
    logout
}