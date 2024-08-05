import { User } from "../models/uesrModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken'

const createUser = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
        // Check if email already exists
        const emailExist = await User.findOne({ email });
        const phoneNumberExists = await User.findOne({ phoneNumber });

        if (emailExist) {
            return res.status(409).json({
                success: false,
                message: "Email already taken",
            });
        }

        if (phoneNumberExists) {
            return res.status(409).json({
                success: false,
                message: "Phone Number already taken",
            });
        }

        // Hash the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: encryptedPassword,
        });

        // Save the user and generate a token
        const savedUser = await newUser.save();
        const token = jsonwebtoken.sign(
            {
                userId: savedUser._id,
                role: savedUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        // Send the response with the token
        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


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