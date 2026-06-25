import { type Response, type NextFunction } from "express"
import { type Request } from '../types/Request.ts';
import sessionService from '../session.service.ts';

export const checkAuth = (req: Request, _: Response, next: NextFunction) => {
    const { sessionId } = req.cookies;

    req.session = sessionService.find(sessionId);

    return next();
}