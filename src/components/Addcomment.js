import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addComment} from '../slices/movies-slice';

const Addcomment = () => {
  const dispatch = useDispatch()
  const user = localStorage.getItem('userName')
  const [ comment, setComment ] = useState('');

  const onSubmit = e => {
    e.preventDefault()
    const timeStamp = new Date()
    const com = {
      author: Math.random().toString(16).substr(2,10),
      authorName: user,
      text: comment,
      timeStamp: `${timeStamp}`,
      id: Math.random().toString(16).substr(2,10)
    }
    dispatch(addComment(com))
    setComment('')
  }

  return (
    <div className='form_comment_add'>
      <form onSubmit={onSubmit}>
        {/* <input type='text'
        className='form_comment_add__input'
        value={comment} onChange={e => setComment(e.target.value)}></input> */}
        <textarea rows="4" cols="25"
        className='form_comment_add__input'
        value={comment} onChange={e => setComment(e.target.value)}
        required
        ></textarea>
        <input type='submit' value='Add'
        className='form_comment_add_button'
        />
      </form>
    </div>
  )
}

export default Addcomment
