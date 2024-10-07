import express from "express"
const router = express.Router()
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import Joi from "joi"
const validationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required()
})

import AuthModel from "../models/AuthModel.js"
import { requireAuth } from "../middleware/AuthMiddleware.js"
router.post('/register', async (req, res) => {
    const { email, password } = req.body

    validationSchema.validateAsync({ email, password })
        .then(async () => {
            if (await AuthModel.findOne({ email }) === null) {
                await new AuthModel({
                    email,
                    password: bcrypt.hashSync(password, 10)
                }).save()
                res.status(200).json({
                    message: "Account Created!"
                })
            } else {
                res.status(404).json({
                    message: "An account already exists by this email!"
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    validationSchema.validateAsync({ email, password })
        .then(async () => {
            if (AuthModel.findOne({ email }) === null) {
                res.status(404).json({
                    message: "An account with this email address does not exist!"
                })
            } else {
                const user = await AuthModel.findOne({ email })
                bcrypt.compare(password, user.password, (err, ans) => {
                    if (err) {
                        res.status(200).json(err)
                    }
                    const token = jwt.sign(user.id, process.env.JWT_SECRET)
                    res.status(200).json({ token })
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
})

router.post('/logout', requireAuth, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    const _id = jwt.verify(token, process.env.JWT_SECRET)
    const newToken = jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: '1s' });

    res.json(newToken)
})

export default router;