import express from "express"
import { checkAuth, handleLogin, handleLogout } from "./auth.controller.ts";

const router = express.Router()

router.post("/login", handleLogin);
router.post("/logout", checkAuth, handleLogout);

export default router;