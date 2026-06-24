import { randomUUID } from 'node:crypto';
import { type Session, type SessionId } from './types/Session.ts';
import { type Response, type NextFunction } from "express"
import { type Request } from './types/Request.ts';
import sessionService from './session.service.ts'

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

    if (username !== "admin" || password !== "123") {
        return res.status(401).json({ error: "Authentication failed" })
    }

    const sessionId = randomUUID();
    const session: Session = {
        id: sessionId,
        username,
        createdAt: new Date()
    };

    sessionService.create(sessionId, session);
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