import { type Response, type NextFunction } from "express"
import { type Request } from './types/Request.ts';
import sessionService from './session.service.ts';
import authService from './auth.service.ts';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.cookies;
    const session = sessionService.find(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    req.session = session;

    return next();
}

export const handleLogin = (req: Request, res: Response) => {
    const { username, password } = req.query as { username?: string, password?: string };

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

export const handleLogout = (req: Request, res: Response) => {
    const sessionId = req.session!.id

    sessionService.delete(sessionId)
    res.clearCookie("sessionId", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({ message: "User signed out successfully!" });
}