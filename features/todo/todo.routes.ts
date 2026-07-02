import express from "express"
import todoController from "./todo.controller.ts"
import { todoErrorHandler } from "./todo.middleware.ts"

const router = express.Router()

router.post("/", todoController.post)
router.get("/", todoController.getAll)
router.get("/:id", todoController.getById)
router.use(todoErrorHandler)

export default router
