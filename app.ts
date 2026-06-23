// src/server.ts
import express, { type Request as ExpressRequest, type Response, type NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(morgan("dev"));

let count = 0;
let todos: string[] = [];

app.get('/', (_, res) => {
  res.send('Hello, Syntax!');
});

app.get('/counter', (_, res) => {
    res.json({ count });
});

app.post('/counter', (_, res) => {
    count += 1;
    res.status(204).send();
});

app.get("/health", (_, res) => {
    res.json({
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

app.post("/todos", (req, res) => {
    const { text } = req.query as { text?: string };
    if (text) {
        todos.push(text);
        res.status(201).send();
    } else {
        res.status(400)
    }
})

app.get("/todos", (_, res) => {
    res.status(200).json({ todos });
})

app.get("/todos/:id", (req, res) => {
    const { id } = req.params  as { id?: string };
    const index = Number(id);

    if (index < todos.length) {
        const todo = todos[index];
        res.status(200).json({ text: todo });
    } else {
        res.status(404).send();
    }
})

type SessionId = string;
type Session = {
    id: SessionId,
    username: string,
    createdAt: Date
}
const sessions = new Map<SessionId, Session>()
type Request = ExpressRequest & { session?: Session }

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { sessionId } = req.cookies;
    const session = sessions.get(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    req.session = session;

    return next();
}

app.post("/login", (req, res) => {
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
})

app.get("/me", checkAuth, (req: Request, res) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
})

app.post("/logout", checkAuth, (req: Request, res) => {
    sessions.delete(req.session!.id);
    res.clearCookie("sessionId", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.json({ message: "User signed out successfully!" });
})

app.use((_, res) => {
    return res.status(404).json({ error: "Unknown resource" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});