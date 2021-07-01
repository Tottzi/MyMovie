import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import { VscChromeClose } from "react-icons/vsc";

const Movietile = ({movie}) => {
  const link = `/movie/${movie.imdbID}`
  const rating = movie.localData && movie.localData.ratings[0].rating/2
  const name = localStorage.getItem('userName')

  const onClick = e => {
    axios.delete('http://localhost:5000/api/user/mymovies', {data:{
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
            defaultRating={rating} 
            maxRating={5}
            disabled
            />
          </div>
      </div>
    )

}

export default Movietile
