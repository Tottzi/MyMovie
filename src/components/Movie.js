import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from 'semantic-ui-react';
import Addcomment from "./Addcomment";
import Comment from "./Comment";


const Movie = ({movie, user, addComment, fetchMoviesById, updateUser}) => {
  const {id: imdbID} = useParams()
  const [ rating , setRating ] = useState('')

  useEffect(() => {
    fetchMoviesById(imdbID)
    setRating(parseInt(movie.imdbRating))
  },[])

  const onRate = (e) => {
    updateUser(e.target.getAttribute('aria-posinset'), imdbID)
    axios.post('http://localhost:5000/api/movie/rating', {
      imdbID,
      ratings: [
        {
          author: 'asdfgghj',
          authorName: localStorage.getItem('userName'),
          rating: e.target.getAttribute('aria-posinset')
        }
      ]
    })
  }
  return (
    <div>
    <div className='movietile__store'>
      <img src={movie.Poster}></img>
      <div className='movietile__store__details'>
        <h3>{movie.Title}</h3>
        <p>IMDB Rating:</p>
        <Rating icon='star'
        defaultRating={parseInt(movie.imdbRating)} 
        maxRating={10}
        onRate={onRate}
        />
        <p>{movie.Plot}</p>
        <div className='movietile__store__desc'>
          <p style={{marginBottom: '0'}}>Actors:</p>
          <p style={{marginBottom: '2rem'}}>{movie.Actors}</p>
        </div>
        <p>{movie.Released}</p>
      </div>
    </div>
    <Addcomment movie={movie}
    addComment={addComment}/>
    <div className='comment'>
    {movie.localData && 
     movie.localData.comments ? movie.localData.comments.map(comment => (
    <Comment imdbID={imdbID} key={comment.timeStamp} comment={comment}/>))
    : <p className='comment'>No comment</p>}
    </div>

    </div>
  )
}

export default Movie


// Actors: "Cecilia Cheung, Ching Wan Lau, Louis Koo"
// Awards: "6 wins & 13 nominations"
// BoxOffice: "N/A"
// Country: "Hong Kong"
// DVD: "01 Jun 2004"
// Director: "Tung-Shing Yee"
// Genre: "Drama"
// Language: "Cantonese"
// Metascore: "N/A"
// Plot: "Sui Wai lost her fiance Ah Man in a car accident. With the obligations of life sitting heavy on her shoulders, she lives on only to find herself confiding in her beloved through a phone call. Dai Fai. a mini-bus driver who witnessed "
// Poster: "https://m.media-amazon.com/images/M/MV5BOWE5ZDBjYTItOTNlNy00YjE4LWFlZjUtMTFiNmVhMzUyMTgwXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg"
// Production: "N/A"
// Rated: "N/A"
// Ratings: (2) [{…}, {…}]
// Released: "20 Nov 2003"
// Response: "True"
// Runtime: "109 min"
// Title: "Mong bat liu"
// Type: "movie"
// Website: "N/A"
// Writer: "James Yuen"
// Year: "2003"
// imdbID: "tt0390272"
// imdbRating: "7.2"
// imdbVotes: "986"
