import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import { VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from 'react';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

const Movietile = ({movie}) => {
  const link = `/MyMovie/movie/${movie.imdbID}`
  const [ rating , setRating ] = useState(0)
  const ratingt = movie.localData && movie.localData.ratings[0].rating/2
  const name = localStorage.getItem('userName')

  useEffect(() => {
    // setTimeout(() => {
    //   setRating(Math.round(parseInt(movie.localData.ratings[0].rating/2)))
    //   console.log(Math.round(parseInt(movie.localData.ratings[0].rating/2)))
    // }, 1000);
    
  },[])

  const onClick = e => {
    axios.delete(`${fetchURL}/api/user/mymovies`, {data:{
      "name": name,
      "imdbID": movie.imdbID
    }})
    e.target.parentNode.remove();
  }
    return (
      <div className='movietile'>
            <button onClick={onClick}
            className='movietile__button'>
            {/* <VscChromeClose onClick={onClick}
             className='movietile__button'
            style={{color: 'white', fontSize:'1rem'}}/> */}
            X
            </button>
          <Link to={link}><img src={movie.Poster} alt={movie.Title}/></Link>
          <div className='movietile__text'>
            <h4 className='movietile__text__heading'>{movie.Title}</h4>
            <Rating icon='star'
            defaultRating={rating ? rating : ratingt} 
            maxRating={5}
            disabled
            />
          </div>
      </div>
    )

}

export default Movietile
