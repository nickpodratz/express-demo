import express from "express"
import controller from "./todo.controller.ts"

const router = express.Router();

router.post("/", controller.post);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

export default router;