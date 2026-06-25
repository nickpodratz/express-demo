// src/server.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import todoRouter from './todo/todo.routes.ts';
import authRouter from './auth/auth.routes.ts';
import userRouter from './user/user.routes.ts'

const port = 3000;
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/todos", todoRouter);
app.use("/", authRouter);
app.use("/", userRouter);

app.get("/health", (_, res) => {
    res.json({
        message: "Server is running",
        timestamp: new Date().toISOString()
    })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    return res.status(500).json({ error: "An unknown error occured." });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});