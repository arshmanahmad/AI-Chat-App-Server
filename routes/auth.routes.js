import { loginSchema } from "../models/uesrModel";
import { catchAsync } from "../utils/catchAsync";
import bodyValidator from "../validation/bodyValidator";

const authRoutes = express.Router()

authRoutes.post('/login',
    bodyValidator(loginSchema),
    catchAsync()

)
export default authRoutes;