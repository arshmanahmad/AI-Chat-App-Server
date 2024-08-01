import { loginSchema } from "../models/uesrModel";
import { catchAsync } from "../utils/catchAsync";
import bodyValidator from "../validation/bodyValidator";
import * as userService from '../services/user.service.js'
const authRoutes = express.Router()

authRoutes.post('/login',
    bodyValidator(loginSchema),
    catchAsync(userService.loginUser)

)
export default authRoutes;