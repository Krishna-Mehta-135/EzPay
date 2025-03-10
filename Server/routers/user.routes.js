import { getUsers, signin, signup, updateInformation } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {Router} from "express";

const userRouter = Router()

userRouter.route("/signup").post(signup)

userRouter.route("/signin").post(signin)

userRouter.route("/update-info").put(authMiddleware, updateInformation)

userRouter.route("/bulk").get(authMiddleware, getUsers)


export default userRouter