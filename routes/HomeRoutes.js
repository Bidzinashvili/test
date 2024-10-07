import express from "express"
const router = express.Router()

import { requireAuth } from '../middleware/AuthMiddleware.js'

router.get('/', requireAuth, (req, res) => {
    res.send("Hello")
})

export default router;