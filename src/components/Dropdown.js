import { concat } from 'lodash';
import React from 'react';
import '../style/Dropdown.css'

const fakeImg = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id1138179183?k=6&m=1138179183&s=612x612&w=0&h=prMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE="

const Dropdown = ({movies}) => {
  return (
    <div className='dropdown'>
      {movies.length > 0 && 
      movies.map(movie => (
      <a key={movie.imdbID} href={concat('/movie/' + movie.imdbID)} style={{display: 'flex', flexDirection: 'row'}}>
        {movie.Poster !== 'N/A'
        ? <img alt='pic' src={movie.Poster} style={{maxWidth: '80px'}}/>
        : <img alt='pictures' src={fakeImg} style={{maxWidth: '80px'}}/>}
        <h3 key={movie.imdbID}>{movie.Title}</h3>
      </a>
  ))}
    </div>
  )
}

export default Dropdown
