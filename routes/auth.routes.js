import { loginSchema, userSchema } from "../models/uesrModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import bodyValidator from "../validation/bodyValidator.js";
import * as userService from '../services/user.service.js'
import express from 'express';
import * as authentication from "../middlewares/authentication.js";
const authRoutes = express.Router()

authRoutes.post('/register',
    bodyValidator(userSchema),
    authentication.authenticate,
    catchAsync(userService.createUser)
)
authRoutes.post('/login',
    bodyValidator(loginSchema),
    authentication.authenticate,
    catchAsync(userService.loginUser)
)
export default authRoutes;