import express from "express"
import { metricsController } from "../controllers/metricsController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken, metricsController)

export default router
