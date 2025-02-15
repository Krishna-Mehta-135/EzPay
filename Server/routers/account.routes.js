import { authMiddleware } from '../middlewares/authMiddleware.js';
import { accountBalance, transferMoney } from '../controllers/account.controller.js';
import {Router} from "express";

const accountRouter = Router();

accountRouter.route("/balance").get( authMiddleware, accountBalance )
accountRouter.route("/transfer").post( authMiddleware, transferMoney )

export {accountRouter}