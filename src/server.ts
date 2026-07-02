// src/server.ts
import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import todoRouter from "./features/todo/todo.routes.ts"
import authRouter from "./features/auth/auth.routes.ts"
import userRouter from "./features/user/user.routes.ts"
import { errorFallback } from "./error.middleware.ts"
import { getHealth } from "./health.ts"

const port = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/todos", todoRouter)
app.use("/", authRouter)
app.use("/", userRouter)
app.get("/health", getHealth)
app.use(errorFallback)

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
