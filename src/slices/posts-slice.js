import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

const name = localStorage.getItem('userName')

export const fetchPostsRedux = createAsyncThunk(
  'posts/fetchPosts',
  async (userId, thunkAPI) => {
    const response = await axios.get(`${fetchURL}/api/posts/`)
    return response.data
  }
)


const initialState = {
  status: 'idle',
  entities: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.process = 'done'
    },
    uploadImage: (state, action) => {
      console.log('uploadImage')
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPostsRedux.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = 'done'
      if (action.payload.length > 0 ) state.entities = [...action.payload]
      console.log(action.payload)
  })
  }
})

export const { uploadImage } = myMoviesSlice.actions;
export default myMoviesSlice.reducer;