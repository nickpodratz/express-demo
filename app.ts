// src/server.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import todoRouter from './todo/todo.routes.ts';
import authRouter from './auth/auth.routes.ts';

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/todos", todoRouter);
app.use("/", authRouter)

app.get("/health", (_, res) => {
    res.json({
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

app.use((_, res) => {
    return res.status(404).json({ error: "Unknown resource" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});