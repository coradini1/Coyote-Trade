import express from "express"
import { usersController } from "../controllers/usersControllers"
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware"
import { assetsController } from "../controllers/assetsController"

const router = express.Router()

router.get("/", authenticateMobileToken, assetsController)
router.get("/users", authenticateMobileToken, usersController)

export default router
