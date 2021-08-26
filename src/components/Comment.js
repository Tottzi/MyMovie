import axios from "axios"
import { useState } from "react"
import { Confirm } from "semantic-ui-react"
import { useRef } from "react"
const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'


const Comment = ({ comment, imdbID }) => {
  const time = new Date(comment.timeStamp)
  const day = time.getDate().toString().length === 1 ? `0${time.getDate()}` : time.getDate()
  const month = time.getMonth().toString().length === 1 ? `0${time.getMonth()}` : time.getMonth()
  const hour = time.getHours().toString().length === 1 ? `0${time.getHours()}` : time.getHours()
  const minutes = time.getMinutes().toString().length === 1 ? `0${time.getMinutes()}` : time.getMinutes()
  const shownDate = `${day}/${month} ${hour}:${minutes}`
  const author = localStorage.getItem('userName')
  const [ isChanging, setIsChanging ] = useState(false);
  const [ localComment, setLocalComment ] = useState(comment.text);
  const [ open, setOpen] = useState(false);
  const textInput = useRef(null);

  const removeBtn = (e) => {
    textInput.current.remove()
    setOpen(false)
    axios.delete(`${fetchURL}/api/movie/comment`, { data: {
      "imdbID": imdbID,
      "comment": comment.id
    }})
  }

  const onEdit= (e) => {
    // const newCom = comment.text !== localComment ? {...comment, text: localComment, changed: new Date}
    isChanging && comment.text !== localComment && axios.put(`${fetchURL}/api/movie/comment`, { data: {
      "imdbID": imdbID,
      "comment": {...comment, text: localComment, changed: new Date}
    }})
    setIsChanging(!isChanging)
    console.log(isChanging)
  }

  if (comment === 'undefined') 
    return (<h2>No comment</h2>)
    
  return (
    <div className='comment_container' ref={textInput}>
      {author === comment.authorName &&
      <>
      <button className='comment__remove comment__edit' onClick={onEdit}>E</button>
      <button className='comment__remove' onClick={() => setOpen(true)}>X</button>
      <Confirm
          className='comment__remove__confirm'
          header='Delete comment'
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={removeBtn}
          size='small'
        />
      </>}
      {comment && <>
      <h3>{comment.authorName}</h3>
      {isChanging
      ? <input className='comment__text' value={localComment} onChange={(e) => setLocalComment(e.target.value)} />
      : <p className='comment__text'> {localComment}</p>}
      {comment.changed && <p className='comment__date__changed'>Edited</p>}
      <p className='comment__date'>{shownDate}</p>
      </>}
    </div>
  )
}

export default Comment
