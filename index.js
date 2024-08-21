// server.js
import express from "express"
const app = express()
const port = 3000

app.use(express.json())

// Define an array
const dataArray = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
]

// Endpoint to get data
app.get("/api", (req, res) => {
  console.log('API hit at', new Date().toLocaleTimeString());
  res.json(dataArray)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// '0.0.0.0',