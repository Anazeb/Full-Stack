const mongoose = require('mongoose')

const musicAlbumsSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},

  artist: { type: String, required: true, unique: false},
  year: { type: String, required: true, unique: false }
}) ;

module.exports = new mongoose.model("album",musicAlbumsSchema) 

