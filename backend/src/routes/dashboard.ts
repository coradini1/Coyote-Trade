import express from "express"
import { dashboardController } from "../controllers/dashboardController"
import { authenticateToken } from "../middleware/tokenMiddleware"

const router = express.Router()

router.get("/", authenticateToken ,dashboardController)

export default router
