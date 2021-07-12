import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import '../../style/Navbar.css'

const Navbar = () => {
  const [userState, setUserState ] = useState('')
  useEffect(() => {
    const user = localStorage.getItem('userName')
    setUserState(user)
  },[])
  const onClick = () => {
    localStorage.removeItem('userName')
    setUserState('')
  }
  if(!userState){
  return (
    <div className='navbar__container'>
      <nav className='navbar__body'>
        <ul className='navbar__list'>
          <li className='navbar__list__item'>
            <a href='/'>Home</a>
          </li>
        </ul>
        <ul className='navbar__list navbar__list--right'>
          <li className='navbar__list__item'>
            <a href='/login' >Login</a>
          </li>
        </ul>
      </nav>
    </div>
  )}

  return (
    <div className='navbar__container'>
      <nav className='navbar__body'>
        <ul className='navbar__list'>
          <li className='navbar__list__item'>
            <a href='/'>Home</a>
          </li>
          <li className='navbar__list__item'>
            <Link to='/search'>Search</Link>
          </li>
          <li className='navbar__list__item'>
            <Link to='/mymovies'>MyMovies</Link>
          </li>
        </ul>
        <ul className='navbar__list navbar__list--right'>
          <li>
            <h2>Hi {userState}!</h2>
          </li>
          <li className='navbar__list__item'>
            <a href='/login' onClick={onClick} >Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
