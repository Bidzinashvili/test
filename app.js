import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import { configDotenv } from "dotenv"

import express from "express"
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())
configDotenv()

import HomeRoutes from "./routes/HomeRoutes.js"
app.use('/', HomeRoutes)

import AuthRoutes from './routes/AuthRoutes.js'
app.use('/auth', AuthRoutes)

import ProductRoutes from "./routes/ProductRoutes.js"
app.use('/products', ProductRoutes)

mongoose.connect(process.env.DB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  })
