import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { app } from './app.js'

const port = process.env.PORT || 3000

dotenv.config({
  path: './.env',
})

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server listening at port no.: ${port}`)
    })
  })
  .catch((err) => console.log('MongoDB connection failed: ', err))

const dataArray = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]

app.get('/api', (req, res) => {
  console.log('API hit at', new Date().toLocaleTimeString())
  res.json(dataArray)
})
