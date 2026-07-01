import express from "express";
import userController from "./user.controller.ts";
import { requireAuth } from "../auth/auth.middleware.ts";
import { userErrorHandler } from "./user.middleware.ts";

const router = express.Router();

router.get("/me", requireAuth, userController.getSelf);

router.post("/users", userController.create);
router.get("/users/:id", userController.find);
router.use(userErrorHandler);

export default router;
