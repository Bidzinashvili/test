import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3001

app.use(bodyParser.json())

import HomeRoutes from "./routes/HomeRoutes.js"
app.use('/', HomeRoutes)

app.listen(port, () => {
  console.log(`App running on localhost:${port}`)
})