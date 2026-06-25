import express from "express"
import authController from "./auth.controller.ts";
import { authErrorHandler, checkAuth } from "./auth.middleware.ts";

const router = express.Router()

router.post("/login", authController.login);
router.post("/logout", checkAuth, authController.logout);
router.use(authErrorHandler);

export default router;