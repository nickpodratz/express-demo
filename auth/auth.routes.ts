import express from "express"
import authController from "./auth.controller.ts";
import { checkAuth } from "./utils/checkAuth.ts";

const router = express.Router()

router.post("/login", authController.login);
router.post("/logout", checkAuth, authController.logout);

export default router;