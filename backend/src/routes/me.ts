import express from "express"
import { authenticateToken } from "../middleware/tokenMiddleware"
import { meController } from "../controllers/meController"


const router = express.Router()

router.get("/", authenticateToken, meController)

export default router
