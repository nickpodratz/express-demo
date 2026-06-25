import express from "express";
import userController from "./user.controller.ts";
import { checkAuth } from "../auth/utils/checkAuth.ts";

const router = express.Router();

router.get("/me", checkAuth, userController.getSelf)

export default router;
