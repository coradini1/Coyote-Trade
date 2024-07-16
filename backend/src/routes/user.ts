import express from "express";

import { userController } from "../controllers/userController";
import { userDeleteController } from "../controllers/userDeleteController";
import { userLogoutController } from "../controllers/userLogoutController";
import { userUpdateController } from "../controllers/userUpdateController";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { authenticateMobileToken } from "../middleware/mobileTokenMiddleware";
import { userDepositController } from "../controllers/user/userDepositController";
import { userWithdrawController } from "../controllers/user/userWithdrawController";

const router = express.Router();

router.get("/", authenticateToken, userController);
router.get("/mobile", authenticateMobileToken, userController);
router.delete("/delete", authenticateToken, userDeleteController);
router.patch("/update", authenticateToken, userUpdateController);
router.get("/logout", authenticateToken, userLogoutController);
router.post("/deposit", authenticateToken, userDepositController);
router.post("/withdraw", authenticateToken, userWithdrawController);

export default router;
