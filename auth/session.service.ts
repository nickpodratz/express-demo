import { type Session, type SessionId } from './types/Session.ts';

const sessions = new Map<SessionId, Session>()

const deleteSession = (id: SessionId): boolean => {
    return sessions.delete(id)
}

const createSession = (id: SessionId, session: Session) => {
    sessions.set(id, session);
}

const findSession = (id: SessionId): Session | null => {
    return sessions.get(id) ?? null;
}

export default {
    delete: deleteSession,
    create: createSession,
    find: findSession
}