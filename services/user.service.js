import { User } from "../models/uesrModel";
import bcrypt from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken'
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({
            success: false,
            message: "Invalid credentials",
        })
        return;
    }
    if (user.invalid === false) {
        res.status(400).json({
            success: false,
            message: 'user is not valid',
        })
        return;
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(400).json({
            success: false,
            message: "invald credentials"
        })
    }
    if (validPassword) {
        const token = jsonwebtoken.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        )
        res.status(200).json({
            success: true,
            token,
        })
    }
    else {
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }


}
export { loginUser }