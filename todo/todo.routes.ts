import express from "express"
import todoController from "./todo.controller.ts"

const router = express.Router();

router.post("/", todoController.post);
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);

export default router;