import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.json('You need to log in first!')
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                res.json('You need to log in first!')
            } else {
                next()
            }
        })
    }
}