import { getUsers, signin, signup, updateInformation } from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/authMiddleware.js"
import {Router} from express;

const router = Router()

router.route("/signup").post(signup)

router.route("/signin").get(signin)

router.route("/update-info").put(authMiddleware, updateInformation)

router.route("/bulk").get(authMiddleware, getUsers)


export default userRouter