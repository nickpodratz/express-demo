import { type Response, type NextFunction } from "express"
import { type Request } from '../types/Request.ts';
import sessionService from '../session.service.ts';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.cookies;
    const session = sessionService.find(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    req.session = session;

    return next();
}