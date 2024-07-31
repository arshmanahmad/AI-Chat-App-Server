import joi from 'joi';
import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isValid: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model("User", schema)


const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})
export {
    loginSchema,
    User
}