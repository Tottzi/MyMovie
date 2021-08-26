import React from 'react'
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const Searchbar = ({movies, fetchMoviesByText}) => {
  const [search, setSearch] = useState('');
  const place = useLocation().pathname;
  const searchClass = place === '/search' ? 'searchbar searchbar__margin' : 'searchbar'

  useEffect(() => {
    search.length >2 && fetchMoviesByText(search)
  }, [fetchMoviesByText, search])

  return (
    <div className={searchClass}>
      <label className='searchbar__label' htmlFor='search'>Search ...        </label>
      <input type='text' placeholder='type a movie' value={search} onChange={e => setSearch(e.target.value)}/>
      {movies.length > 0 && <Dropdown movies={movies}/>}
    </div>
  )
}

export default Searchbar
