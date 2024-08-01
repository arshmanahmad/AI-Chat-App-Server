import { User } from "../models/uesrModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken'

const createUser = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    const emailExist = await User.findOne({ email });
    const passwordExist = await User.findOne({ password });

    if (emailExist || passwordExist) {
        res.status(201).json({
            success: false,
            message: `${emailExist ? "Email" : "Password"} already Taken`,
        })
        return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        phoneNumber,
        password: encryptedPassword,
    })
    try {
        const savedUser = newUser.save();
        const token = jsonwebtoken.sign(
            {
                userId: savedUser._id,
                role: savedUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        )
        res.status(201).json({
            success: true,
            message: "user created successfully",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "server error",
        })
    }
}

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
            message: "invalid credentials"
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
export {
    loginUser,
    createUser
}