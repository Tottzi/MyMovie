import './App.css';
import './index.css'
import Searchbar from './components/Searchbar';
import Movie from './components/Movie';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Login from './components/Login'
import Navbar from './components/layouts/Navbar';
import Mymovies from './components/Mymovies';
import Welcome from './components/layouts/Welcome';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

function App() {
  const [ movies, setMovies] = useState([]);
  const [ localMovies, setLocalMovies ] = useState([])
  const [ movie, setMovie] = useState({});
  const [ userName, setUserName ] = useState('')
  const [ user, setUser] = useState({});
  const [ mymovies, setMymovies] = useState([]);


  useEffect(() => {
    // fetchAllMovies()
    setUserName(localStorage.getItem('userName'))
    setTimeout(() => {
      fetchuserInfo(localStorage.getItem('userName'))
    }, 100);
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem('userData')))
    }, 1000);
  }, [])

  const addComment = (com, movie) => {
    const timeStamp = new Date()
    const localMovie = {...movie}
    if(movie.localData){
      if(movie.localData.comments){
      localMovie.localData.comments.unshift(com)}
      else {
        localMovie.localData.comments = [] 
        localMovie.localData.comments.unshift(com)
      }
      setMovie(localMovie)
    } else {
      localMovie.localData = {}
      localMovie.localData.imdbID = com.imdbID
      localMovie.localData.comments = []
      localMovie.localData.comments.unshift(com)
      setMovie(localMovie)
    }
    axios.post(`${fetchURL}/api/movie/comment`, {
      imdbID: movie.imdbID,
      comments: [com]
    })
  }

  const fetchMyMovies = async (user) => {
    const response = await axios.get(`${fetchURL}/api/user/mymovies/${user}`)
    // localStorage.setItem('mymovies', response.data)
    setMymovies(response.data)
  }
  const fetchAllMovies = async () => {
    const response = await axios.get(`${fetchURL}/api/movies/`);
    return localStorage.setItem('movies', JSON.stringify(response.data))
  }

  const fetchuserInfo = async user => {
    const response = await axios.get(`${fetchURL}/api/user/${user}`);
    localStorage.setItem('userData', await JSON.stringify(response.data))
  }

  const readLocalMovies = () => {
    setLocalMovies(JSON.parse(localStorage.getItem('movies')))
  }

  const fetchMoviesByText = async search => {
    const response = await axios.get(`${fetchURL}/api/movies/${search}`);
    response.data.Search && setMovies(response.data.Search)
    return response.data.Search;
  }

  const fetchMoviesById = async imdbID => {
    const response = await axios.get(`${fetchURL}/api/movie/${imdbID}`)
    response.data && setMovie(response.data)
    return response.data;
  }

  const updateUser = (data, imdbID) => {
    const userStateUpdate = JSON.parse(localStorage.getItem('userData'));
    const userStateUpdateMovies = userStateUpdate.movies.map(movie => {
      if(movie.imdbID === imdbID) {
        movie.ratings = data
      }
      return movie
    })
    userStateUpdate.movies = userStateUpdateMovies
    setUser(userStateUpdate)
  }
  
  return (
    <BrowserRouter>
    {!localStorage.getItem('userName') && <Redirect to={{ pathname: "/MyMovie/login" }} />}
    <Navbar />
    <Switch>
        <Route path='/MyMovie/' exact>
          <div className="App login_page">
            <div className='login_page'>
              <Welcome />
            </div>
          </div>
        </Route>
      </Switch>
    <Switch>
        <Route path='/MyMovie/login' exact>
          <div className="App login_page">
            <div className='login_page'>
              <Login style={{maxWidth: '300px', position: 'absolute'}}/>
            </div>
          </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/MyMovie/search' exact>
          <div className="App">
            <Searchbar movies={movies} fetchMoviesByText={fetchMoviesByText}/>
          </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/MyMovie/movie/:id'>
        <div className="App">
            <div className="movie__present">
              <Searchbar movies={movies} fetchMoviesByText={fetchMoviesByText} fetchMoviesById={fetchMoviesById}/>
              <Movie movie={movie}
              user={user}
              fetchMoviesById={fetchMoviesById}
              updateUser={updateUser}
              addComment={addComment}
              localMovies={localMovies} />
            </div>
        </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/MyMovie/mymovies'>
        <div className="App movietile_conteiner">
          <Mymovies mymovies={mymovies} fetchMyMovies={fetchMyMovies}/>
        </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
