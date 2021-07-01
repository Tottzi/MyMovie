import React, { useEffect } from 'react'
import Movietile from './Movietile'

const Mymovies = ({mymovies, fetchMyMovies}) => {

  useEffect(() => {
    fetchMyMovies(localStorage.getItem('userName'))
  },[])

  if(mymovies.length < 1){
    return (<h2>You don't have movies in the collection</h2>)
  }
  console.log('Rerender', mymovies)
  return (
    <div className='mymovies'>
      {mymovies.length > 0 && mymovies.map(movie => (
        <Movietile key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default Mymovies
