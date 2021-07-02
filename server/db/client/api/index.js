const express = require('express');
const axios = require('axios');
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');

const { movieRatings,
  addComments,
  deleteComment,
  addMovieUser,
  updateComment
} = require('../index')

const router = express.Router();

const readWriteMovie = (body, params) => {
  const fileName = `${body.imdbID.toLowerCase()}.json`
  fs.readFile(path.join(__dirname, '../../movies', `${fileName}`), (err, data) => {
    if(err){
      console.log(body)
      return fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(body, 0, 1))
    }
    const db = JSON.parse(data.toString())
    params === 'rating'
    && fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(movieRatings(body, db), 0, 1))
    params === 'comment'
    && fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(addComments(body, db), 0, 1))
  })
}

const readWriteUser = (body, params) => {
  let fileName = ''
  if(params === 'rating') fileName = `${body.ratings[0].authorName.toLowerCase()}.json`
  if(params === 'comment') fileName = `${body.comments[0].authorName.toLowerCase()}.json`
  
  fs.readFile(path.join(__dirname, '../../users', `${fileName}`), (err, data) => {
    if(err){
      const userId = Math.random().toString(16).substr(2,10)
      const name = fileName.match(/^\w+/)
      const rating = body.ratings[0].rating || 0
      const newUser = {
        "userId": userId,
        "name": name,
        "movies": [
         {
          "imdbID": body.imdbID,
          "rating": rating
         }
        ]
       }
      return fs.writeFileSync(path.join(__dirname, '../../users', `${fileName}`), JSON.stringify(newUser, 0, 1))
    }
    const db = JSON.parse(data.toString())
    fs.writeFileSync(path.join(__dirname, '../../users', `${fileName}`), JSON.stringify(addMovieUser(body, db), 0, 1))
  })
}


router.get('/api/movies/:query', async (req, res) => {
  const search = req.params.query
  const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=d9835cc5`);
  res.json(response.data);
})

router.get('/api/movie/:id', async (req, res) => {
  const id = req.params.id
  const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=d9835cc5`);
  fs.readFile(path.join(__dirname, '../../movies', `${id}.json`), (err, data) => {
    if(err){
      console.log(err.message)
      return res.json(response.data)
    }
    const file = JSON.parse(data.toString())
    const responseObj = response.data;
    responseObj.localData = file
    res.json(responseObj);
  })
  
})

router.get('/api/movies', async (req, res) => {
  const movies = await readMoviesAll();
  res.json(movies)
})

router.post('/api/movie/:type', (req, res) => {
  readWriteMovie(req.body, req.params.type)
  readWriteUser(req.body, req.params.type)
  res.sendStatus(201)
})

router.delete('/api/movie/comment', (req, res) => {
  const {imdbID, comment} = req.body
  deleteComment(imdbID, comment)
  res.sendStatus(204)
})

router.put('/api/movie/comment', (req, res) => {
  const {imdbID, comment} = req.body.data
  console.log(req.body.data)
  updateComment(imdbID, comment)
  res.json(req.body)
})

module.exports = router;
