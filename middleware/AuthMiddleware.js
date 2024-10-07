import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
    try {
        const token = req.headers['Authorization'].split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, ans) => {
            if (err) {
                res.json(err)
                // res.json("You need to log in first")
            }
            next()
        })

    } catch (err) {
        res.json(err)
    }
    // res.json(token)

}