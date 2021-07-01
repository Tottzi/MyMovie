const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const PORT = process.env.PORT || '5000'
const router = require('./db/client/api')

const readWriteMovie = (body, params) => {
  const fileName = `${body.imdbID.toLowerCase()}.json`
  fs.readFile(path.join(__dirname, '../../movies', `${fileName}`), (err, data) => {
    if(err){
      return fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(body, 0, 1))
    }
    const db = JSON.parse(data.toString())
    params === 'rating'
    && fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(movieRatings(body, db), 0, 1))
    params === 'comment'
    && fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(addComments(body, db), 0, 1))
  })
}

// const userLogin = (body, params) => {
//   const fileName = `${userId}.json`
//   fs.readFile(path.join(__dirname, '../../movies', `${fileName}`), (err, data) => {
//     if(err){
//       return fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(body, 0, 1))
//     }
//     const db = JSON.parse(data.toString())
//     fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(movieRatings(body, db), 0, 1))
//   })
// }

// const userData = (body) => {
//   const fileName = `${body.name}.json`
//   fs.readFile(path.join(__dirname, '../../movies', `${fileName}`), (err, data) => {
//     if(err){
//       // fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(body, 0, 1))
//       console.log(err.message)
//     }
//     const db = JSON.parse(data.toString())
//     fs.writeFileSync(path.join(__dirname, '../../movies', `${fileName}`), JSON.stringify(movieRatings(body, db), 0, 1))
//   })
// }


const logging = (req, res, next) => {
  const stamp = new Date().toISOString();
  req.requestId = (Math.random().toString(16).substr(2, 8));
  console.log(`Request: ${req.requestId} ${stamp} ${req.method} ${req.headers['content-type']} ${req.originalUrl}`);
  next();
};

const app = express();
app.use(cors());
app.use(express.json());

app.delete('/api/user/mymovies', (req, res) => {
  const fileName = `${req.body.name.toLowerCase()}.json`
  fs.readFile(path.join(__dirname, './db/users', `${fileName}`), async (err, data) => {
    if(err){
      console.log(err.message)
      res.sendStatus(400)
    }
    const db = JSON.parse(data.toString())
    const filterdDb = db.movies.filter(movie => movie.imdbID !== req.body.imdbID)
    db.movies = filterdDb
    fs.writeFileSync(path.join(__dirname, './db/users', `${fileName}`), JSON.stringify(db, 0, 1))
    res.sendStatus(204)
  })
  
})

app.get('/api/user/mymovies/:name', async (req, res) => {
  const fileName = `${req.params.name.toLowerCase()}.json`
  fs.readFile(path.join(__dirname, './db/users', `${fileName}`), async (err, data) => {
    if(err){
      console.log(err.message)
    }
    const db = JSON.parse(data.toString())
    const movies = await Promise.all(db.movies.map(async movie => {
      const response = await axios.get(`http://localhost:5000/api/movie/${movie.imdbID}`)
      return response.data
    }))
    res.json(movies)
  })
})



app.get('/api/user/:id', (req, res) => {
  console.log(req.params)
  const userId = Math.random().toString(16).substr(2,10)
  const fileName = `${req.params.id.toLowerCase()}.json`
  fs.readFile(path.join(__dirname, './db/users', `${fileName}`), (err, data) => {
    if(err){
      const newUser = {
        "userId": userId,
        "name": req.params.id,
        "movies": [
        ]
       }
      fs.writeFileSync(path.join(__dirname, './db/users', `${fileName}`), JSON.stringify(newUser, 0, 1))
      return console.log(err.message)
    }
    res.json(JSON.parse(data.toString()))
  })
})



app.post('/api/user', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.use('/', logging, router);

app.all('*', logging, (req, res, next) => {
  next(new Error(`404: Page not found on the following route: ${req.method} ${req.originalUrl}`));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  if (err) {
    const endStatus = Number.isFinite(parseInt(err.message.substr(0, 3), 10))
      ? err.message.substr(0, 3)
      : 400;
    res.status(endStatus).json({ ErrorMessage: err.message });
    next();
  } else {
    res.status(500).json({ ErrorMessage: err.message });
    next();
  }
});

app.listen(PORT, process.env.IP, () => console.log(`listening on port: ${PORT}`))
