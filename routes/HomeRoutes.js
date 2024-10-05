import express from "express"
import bcrypt from "bcrypt"
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Hello")
})

let users = []

router.post('/register', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.json({
            "error": "Please enter your credentials!"
        })
    }

    users.forEach((user) => {
        if (user.email === email) {
            res.json({ error: "email not available" })
        }
    })

    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({
        email,
        hashedPassword
    })

    res.json({
        users
    })
})

export default router;