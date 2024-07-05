import express from "express";
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware";
import { alertsAllController } from "../controllers/alerts/alertsAllController";
import { alertsCreateController } from "../controllers/alerts/alertsCreateController";
import { alertsDeleteController } from "../controllers/alerts/alertsDeleteController";
import { alertsUpdateController } from "../controllers/alerts/alertsUpdateController";
const router = express.Router();

router.get("/all", authenticateMobileToken, alertsAllController);
router.post("/create", authenticateMobileToken, alertsCreateController);
router.put("/update", authenticateMobileToken, alertsUpdateController);
router.delete("/delete/:assetId", authenticateMobileToken, alertsDeleteController);

export default router;
