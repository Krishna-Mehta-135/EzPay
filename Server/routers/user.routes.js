import {Router} from express;

const router = Router()

router.route("/").get(userDetails)
// make functionality for user to get his profile details