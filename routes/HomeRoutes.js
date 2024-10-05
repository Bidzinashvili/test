import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = "asjkdhajksdakjs"

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email (this would be replaced by a real DB query)
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        // Check if the provided password matches the hashed password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { email: user.email },  // Payload (typically user info)
            JWT_SECRET,             // Secret key to sign the JWT
            { expiresIn: '1h' }     // Token expiration time
        );

        // Send the token as the response
        return res.json({ message: "done", token })

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;