import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link} from 'react-router-dom'
import '../../style/Navbar.css'

const Navbar = () => {
  const runType = false;
  const [userState, setUserState ] = useState('')
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    setUserState(user.username)
  },[])
  const onClick = () => {
    localStorage.removeItem('user');
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
  if(runType){
    return (
      <div className='navbar__container'>
        <nav className='navbar__body'>
          <div className='navbar__list'>
            <div className='navbar__list__item'>
              <a href='/'>Home</a>
            </div>
            <div className='navbar__list__item'>
              <Link to='/search'>Search</Link>
            </div>
            <div className='navbar__list__item'>
              <Link to='/mymovies'>MyMovies</Link>
            </div>
            <div className='navbar__list__item'>
              <Link to='/posts'>Posts</Link>
            </div>
          </div>
          <div className='navbar__list navbar__list--right'>
            <div>
              <h2>Hi {userState}!</h2>
            </div>
            <div className='navbar__list__item'>
              <a href='/login' onClick={onClick} >Logout</a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
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
          <li className='navbar__list__item'>
            <Link to='/posts'>Posts</Link>
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
