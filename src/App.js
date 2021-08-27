import './App.css';
import './index.css'
import Searchbar from './components/Searchbar';
import Movie from './components/Movie';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import Login from './components/Login'
import Navbar from './components/layouts/Navbar';
import Mymovies from './components/Mymovies';
import Welcome from './components/layouts/Welcome';
import Posts from './components/Posts';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

function App() {
  const [ movies, setMovies] = useState([]);

  const fetchMoviesByText = async search => {
    const response = await axios.get(`${fetchURL}/api/movies/${search}`);
    response.data.Search && setMovies(response.data.Search)
    return response.data.Search;
  }

  const updateUser = (data, imdbID) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userStateUpdateMovies = user.movies.map(movie => {
      if(movie.imdbID === imdbID) {
        movie.ratings = data
      }
      return movie
    })
    user.movies = userStateUpdateMovies
  }
  
  return (
    <BrowserRouter>
    {!localStorage.getItem('user') && <Redirect to={{ pathname: "/login" }} />}
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
        <div className="App movietile_container">
          <Mymovies />
        </div>
        </Route>
      </Switch>
      <Switch>
        <Route path='/posts'>
        <div className="App posts-container">
          <Posts />
        </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
