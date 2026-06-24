import express, { type Request as ExpressRequest, type Response, type NextFunction } from "express"
import { checkAuth, handleLogin, handleLogout } from "./auth.controller.ts";
import { type Request } from "./types/Request.ts"

const router = express.Router()

router.post("/login", handleLogin);

router.post("/logout", checkAuth, handleLogout);

router.get("/me", checkAuth, (req: Request, res: Response) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
})

export default router;