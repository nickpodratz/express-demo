import { type Request as ExpressRequest } from "express"
import { type Session } from "./Session.ts"

export interface Request extends ExpressRequest {
    session?: Session
}