import 'dotenv/config.js'
import express from 'express'

const app = express()

app.use(express.json())

app.listen(process.env.SERVER_PORT, () => console.log('listening on port 8080'))
