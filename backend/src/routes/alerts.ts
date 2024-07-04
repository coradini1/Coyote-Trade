import express from "express"
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware";
import { allAlertsController } from "../controllers/alerts/allAlertsController";

const router = express.Router();

router.get("/all", authenticateMobileToken, allAlertsController);

export default router;