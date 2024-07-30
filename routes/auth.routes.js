import { loginSchema } from "../models/uesrModel";

const authRoutes = express.Router()

authRoutes.post('/login',
    bodyValidator(loginSchema),
    catchAsync()

)
export default authRoutes;