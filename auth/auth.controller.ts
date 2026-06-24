import { randomUUID } from 'node:crypto';
import { type Session, type SessionId } from './types/Session.ts';
import { type Response, type NextFunction } from "express"
import { type Request } from './types/Request.ts';

const sessions = new Map<SessionId, Session>()

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.cookies;
    const session = sessions.get(sessionId);

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
    sessions.set(sessionId, session);
    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.send()
}

export const handleLogout = (req: Request, res: Response) => {
    sessions.delete(req.session!.id);
    res.clearCookie("sessionId", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({ message: "User signed out successfully!" });
}