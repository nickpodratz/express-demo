import express from "express"
import todoController from "./todo.controller.ts"
import { handleTodoErrors } from "./todo.error.ts";

const router = express.Router();

router.post("/", todoController.post);
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.use("/", handleTodoErrors);

export default router;