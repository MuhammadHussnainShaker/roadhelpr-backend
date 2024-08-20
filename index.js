console.log("I am index.js")

// require("dotenv").config()
import "dotenv/config"

// const express = require("express")
import express from 'express'
const app = express()
const port = process.env.PORT || 7001

app.get("/", (req, res) => {
  res.send("Home")
})

app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome to Trelpo.</h1>")
})

app.get("/photos", (req, res) => {
  const photos = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      albumId: 1,
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
    {
      albumId: 1,
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "https://via.placeholder.com/600/d32776",
      thumbnailUrl: "https://via.placeholder.com/150/d32776",
    },
  ]
  res.send(photos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})