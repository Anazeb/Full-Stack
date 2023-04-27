const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config();
const album = require('./album');
const router = require('./api')
const app = express()
const cors = require('cors')
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);
app.use(express.static( __dirname + '/public' ));

app.use(cors({
  origin: "*",
}))

const uri = process.env.URI
const port = process.env.PORT
console.log(uri)
console.log(port)

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log("Connection established")).catch(error => console.error('Error in connection', error))

app.use(express.json())
app.use(bodyParser.json())
app.use('/api', router)

app.get('/', async (req, res) => {
  res.render('index.html')
  res.status(200)
})

app.listen(port, () => {
  console.log("Server started on port 3000")
})




