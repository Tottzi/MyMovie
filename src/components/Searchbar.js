import React from 'react'
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';

const Searchbar = ({movies, fetchMoviesByText}) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    search.length >2 && fetchMoviesByText(search)
    
  }, [search])

  return (
    <div className='searchbar'>
      <input type='text' placeholder='type a movie' value={search} onChange={(e) => setSearch(e.target.value)}/>
      {movies.length > 0 && <Dropdown movies={movies}/>}
    </div>
  )
}

export default Searchbar
