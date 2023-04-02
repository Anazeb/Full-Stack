const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express()
const uri = process.env.URI
const port = process.env.PORT


app.listen = (port, () => {
  console.log("Server started on port 3000")
})

async function dbConnect() {
  await mongoose.connect(uri)
  console.log("Connection established")
}

dbConnect()