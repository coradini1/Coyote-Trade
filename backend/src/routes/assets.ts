import express from "express";
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware";
import { assetsController } from "../controllers/assetsController";
import { authenticateToken } from "../middleware/tokenMiddleware";

const router = express.Router();

router.get("/all", authenticateMobileToken, assetsController);
router.get("/allWeb", authenticateToken, assetsController);


export default router;
