import React, { useEffect } from 'react'
import Movietile from './Movietile'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyMoviesRedux } from '../slices/mymovies-slice';

const Mymovies = () => {
  const dispatch = useDispatch();
  const {entities: myMovies, status} = useSelector(state => state.myMoviesSlice)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(fetchMyMoviesRedux(user.username));
  },[dispatch])

  if(myMovies.length < 1){
    return (<h2>You don't have movies in the collection</h2>)
  }

  return (
    <div className='mymovies'>
      {status === 'done' && myMovies.map(movie => (
        <Movietile key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default Mymovies
