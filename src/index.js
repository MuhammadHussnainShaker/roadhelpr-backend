import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/db.js'
const app = express()
const port = 3000

dotenv.config({
  path: './env'
})

connectDB()

app.use(express.json())

const dataArray = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]

app.get('/api', (req, res) => {
  console.log('API hit at', new Date().toLocaleTimeString())
  res.json(dataArray)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
