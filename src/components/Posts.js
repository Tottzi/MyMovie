import React, {useState} from 'react';
import axios from 'axios';

const Posts = () => {
  const newUserInitial = {
    name: 'Test',
    photo: '',
}
  const [newUser, setNewUser] = useState(newUserInitial);
  const [posts, setPosts] = useState([])
  const [previewSource, setPreviewSource] = useState()

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try{
      await fetch('http://localhost:5000/users/add/', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
    });
    }catch(err){

    }
  }

const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(previewSource)
}

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setPreviewSource(reader.result)
  }
}

const handleChange = (e) => {
  setNewUser({...newUser, [e.target.name]: e.target.value});
}

const handlePhoto = (e) => {
  previewFile(e.target.files[0])
}

console.log(posts)
return (
  <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input 
              type="file" 
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
          />

          <input 
              type="text"
              placeholder="name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
          />
          <input 
              type="submit"
          />
      </form>
      {previewSource &&
      <img
      src={previewSource}
      alt="chosen"
      style={{height: '300px'}}/>}
      <div>
        {posts.map(post => (
          <>
          <p key={Math.random()}>{post.name}</p>
          <img src={post.photo}></img>
          </>
        ))}
      </div>
    </div>
);
}

export default Posts
