import express from "express"
import { loginController } from "../controllers/loginController" 
import { checkAuthenticated } from "../middleware/tokenMiddleware"

const router = express.Router()

router.post("/", checkAuthenticated, loginController)

export default router
