import express from "express"
const router = express.Router()

import { requireAuth } from '../middleware/AuthMiddleware.js'

import ProductModel from "../models/ProductModel.js"

router.get('/all', requireAuth, async (req, res) => {
    const products = await ProductModel.find()

    res.json(products)
})

router.post('/create', requireAuth, async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        res.status(400).json("You are missing some information!")
    }

    if (await ProductModel.findOne({ name }) !== null) {
        res.status(400).json("A product by that name already exists!")
    } else {
        const newProduct = new ProductModel({ name, description, price })
        await newProduct.save()

        res.status(200).json(`Product has been created by the name ${name}`)
    }

})

export default router;