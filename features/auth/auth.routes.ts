import express from "express"
import authController from "./auth.controller.ts";
import { checkAuth } from "./utils/checkAuth.ts";
import { handleAuthErrors } from "./auth.error.ts";

const router = express.Router()

router.post("/login", authController.login);
router.post("/logout", checkAuth, authController.logout);
router.use("/", handleAuthErrors);

export default router;