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

  useEffect(() => {
    // fetchAllMovies()
    setTimeout(() => {
      fetchuserInfo(localStorage.getItem('userName'))
    }, 100);
  }, [])

  const fetchuserInfo = async user => {
    const response = await axios.get(`${fetchURL}/api/user/${user}`);
    localStorage.setItem('userData', await JSON.stringify(response.data))
  }

  const fetchMoviesByText = async search => {
    const response = await axios.get(`${fetchURL}/api/movies/${search}`);
    response.data.Search && setMovies(response.data.Search)
    return response.data.Search;
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
  }
  
  return (
    <BrowserRouter>
    {!localStorage.getItem('userName') && <Redirect to={{ pathname: "/login" }} />}
    <Navbar />
    <Switch>
        <Route path='/' exact>
          <div className="App login_page">
            <div className='login_page'>
              <Welcome />
            </div>
          </div>
        </Route>
      </Switch>
    <Switch>
        <Route path='/login' exact>
          <div className="App login_page">
            <div className='login_page'>
              <Login style={{maxWidth: '300px', position: 'absolute'}}/>
            </div>
          </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/search' exact>
          <div className="App">
            <Searchbar movies={movies} fetchMoviesByText={fetchMoviesByText}/>
          </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/movie/:id'>
        <div className="App">
            <div className="movie__present">
              <Searchbar movies={movies} fetchMoviesByText={fetchMoviesByText}/>
              <Movie 
              updateUser={updateUser} />
            </div>
        </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/mymovies'>
        <div className="App movietile_conteiner">
          <Mymovies />
        </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
