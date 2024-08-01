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
    },
    role: {
        type: String,
        role: "user"
    },
})

const User = mongoose.model("User", schema)

const userSchema = joi.object({
    name: joi.string().required,
    email: joi.string().required,
    phoneNumber: joi.number().required,
    password: joi.string().required,
})

const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})

export {
    User,
    loginSchema,
    userSchema,
}