import axios from "axios"
import { useEffect } from "react"


const Comment = ({ comment, imdbID }) => {
  const time = new Date(comment.timeStamp)
  const day = time.getDate().toString().length === 1 ? `0${time.getDate()}` : time.getDate()
  const month = time.getMonth().toString().length === 1 ? `0${time.getMonth()}` : time.getMonth()
  const hour = time.getHours().toString().length === 1 ? `0${time.getHours()}` : time.getHours()
  const minutes = time.getMinutes().toString().length === 1 ? `0${time.getMinutes()}` : time.getMinutes()
  const shownDate = `${day}/${month} ${hour}:${minutes}`
  const author = localStorage.getItem('userName')

  const onClick = (e) => {
    console.log(e.target.parentNode.remove())
    console.log(imdbID)
    axios.delete('http://localhost:5000/api/movie/comment', { data: {
      "imdbID": imdbID,
      "comment": comment.id
    }})
  }

  if (comment === 'undefined') 
    return (<h2>No comment</h2>)
    
  return (
    <div className='comment_container'>
      {author === comment.authorName && 
      <button className='comment__remove' onClick={onClick}>X</button>}
      {comment && <>
      <h3>{comment.authorName}</h3>
      <p className='comment__text'> {comment.text}</p>
      <p className='comment__date'>{shownDate}</p>
      </>}
    </div>
  )
}

export default Comment
