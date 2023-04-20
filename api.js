const express = require('express')
const album = require('./album');
const mongoose = require('mongoose')
const router = express.Router()

router.post('/albums', async (req, res) => {
const title = req.body.title
  const artist = req.body.artist
  const year = req.body.year

  if (!title || !artist || !year) {
    res.status(400).send(JSON.stringify("The fields cannot be empty"))
  } 

    const musicAlbum = new album({
      title: title,
      artist: artist,
      year: year
    })
  console.log(musicAlbum)
  const titleExists = await album.find(musicAlbum);
  console.log(titleExists.length)
  if (titleExists.length > 0) {
              console.log(titleExists)
                console.error('The title already exists');
                return res
                    .status(409)
                    .send(JSON.stringify({ message: 'Title exists' }));
            }
  try {
    const musicAlbums = await musicAlbum.save()
  
    res.status(201).send(JSON.stringify(musicAlbums))
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/albums', async (req, res) => {
  try {
    const musicAlbums = await album.find()
    res.send(JSON.stringify(musicAlbums))
    
  } catch (error) {
    console.log(error)
    res.status(500).send(JSON.stringify({ message: 'unable to get the albums' }))
  }
})

router.get('/albums/:title', async (req, res) => {
  try {
    const title = req.params.title
    const musicAlbum = await album.find({ title })
    console.log("Title found")
    console.log(title)
    res.status(201).send(JSON.stringify(musicAlbum))
  } catch (error) {
    console.log("Error")
  }
})

  router.put('/albums/:id', async (req, res) => {
    
    try {
      const id = req.params.id 
      
      const updatedAlbum = await album.findByIdAndUpdate(id, req.body)
      if (!album) {
        res.status(404).json("cannot find any product")
      }
      res.status(200).send(JSON.stringify(updatedAlbum))
    } catch(error) {
      console.log("error", error)}
  })

router.delete('/albums/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedAlbum = await album.findByIdAndDelete(id)
    res.status(200).send(JSON.stringify("The record has been deleted"))
  } catch (error){
    console.log(error)
  }
    })


  
module.exports = router 