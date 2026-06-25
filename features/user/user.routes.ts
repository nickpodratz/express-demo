import express from "express";
import userController from "./user.controller.ts";
import { requireAuth } from "../auth/auth.middleware.ts";

const router = express.Router();

router.get("/me", requireAuth, userController.getSelf)

export default router;
