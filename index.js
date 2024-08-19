console.log("I am index.js")

require("dotenv").config()
console.log(process.env);


const express = require("express")
// import express from 'express'
const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
  res.send("Home")
})

app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome to Trelpo</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
