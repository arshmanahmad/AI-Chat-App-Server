import { loginSchema } from "../models/uesrModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import bodyValidator from "../validation/bodyValidator.js";
import * as userService from '../services/user.service.js'
import express from 'express';
const authRoutes = express.Router()

authRoutes.post('/login',
    bodyValidator(loginSchema),
    catchAsync(userService.loginUser)

)
export default authRoutes;