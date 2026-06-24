import { type Request as ExpressRequest } from "express"
import { type Session } from "./Session.ts"

export type Request = ExpressRequest & { session?: Session }