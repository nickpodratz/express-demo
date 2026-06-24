import { type Session, type SessionId } from './types/Session.ts';
import { randomUUID } from 'node:crypto';

const sessions = new Map<SessionId, Session>()

const deleteSession = (id: SessionId): boolean => {
    return sessions.delete(id)
}

const createSession = (username: string): SessionId => {
    const sessionId = randomUUID();
    const session: Session = {
        id: sessionId,
        username,
        createdAt: new Date()
    };

    sessions.set(sessionId, session);
    return sessionId;
}

const findSession = (id: SessionId): Session | null => {
    return sessions.get(id) ?? null;
}

export default {
    delete: deleteSession,
    create: createSession,
    find: findSession
}