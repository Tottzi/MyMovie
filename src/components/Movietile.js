import React from 'react';
import { Rating } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deleteMyMovie } from '../slices/mymovies-slice'

// const fetchURL = process.env.MODE !== 'PROD'
//   ? 'http://localhost:5000'
//   : 'https://hackday-mymovies-backend.herokuapp.com'

const Movietile = ({movie}) => {
  const link = `/movie/${movie.imdbID}`
  const dispatch = useDispatch()
  const rating = movie.localData.ratings[0]
    ? Math.round(parseInt(movie.localData.ratings[0].rating/2))
    : 0

  const onClick = e => {
    dispatch(deleteMyMovie(movie.imdbID))
  }
    return (
      <div className='movietile'>
            <button onClick={onClick}
            className='movietile__button'>
            X
            </button>
          <a href={link}><img src={movie.Poster} alt={movie.Title}/></a>
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
