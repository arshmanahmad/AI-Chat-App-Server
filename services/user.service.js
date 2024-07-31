import { User } from "../models/uesrModel";
import bcrypt from "bcryptjs";
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

}