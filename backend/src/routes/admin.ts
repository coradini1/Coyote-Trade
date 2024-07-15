import express from "express";
import { getTotalAssetsTradedController } from "../controllers/admin/getTotalAssetsTradedController";
import { getTotalUsersBalanceController } from "../controllers/admin/getTotalUsersBalanceController";
import { authenticateToken } from "../middleware/tokenMiddleware";
const router = express.Router();

router.get(
  "/total-assets-traded",
  authenticateToken,
  getTotalAssetsTradedController
);
router.get(
  "/total-users-balance",
  authenticateToken,
  getTotalUsersBalanceController
);

export default router;
