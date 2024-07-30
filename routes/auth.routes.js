const authRoutes = express.Router()

authRoutes.post('/login',
    bodyValidator(),
    catchAsync()

)
export default authRoutes;